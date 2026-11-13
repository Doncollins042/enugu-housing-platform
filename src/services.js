// ═══════════════════════════════════════════════════════════════
// ENUGU STATE MINISTRY OF HOUSING — BACKEND SERVICES LAYER
// Connects React frontend to Supabase (auth, database, storage)
// ═══════════════════════════════════════════════════════════════

import { supabase } from './supabase'

// ── AUTH SERVICES ──────────────────────────────────────────────

export const auth = {
  // Register new user
  async register({ email, password, firstName, lastName, phone }) {
    // 1. Create auth account
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName, phone } }
    })
    if (authErr) throw authErr

    // 2. Create user profile in our table
    if (authData.user) {
      const { error: profErr } = await supabase.from('users').insert({
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        role: 'user',
        kyc_status: 'none'
      })
      if (profErr) console.warn('Profile insert:', profErr.message)
    }
    return authData
  },

  // Login
  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    // Update last_login
    if (data.user) {
      await supabase.from('users').update({ last_login: new Date().toISOString() }).eq('id', data.user.id)
    }
    return data
  },

  // Logout
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current session
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // Get current user profile
  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data } = await supabase.from('users').select('*').eq('id', user.id).single()
    return data
  },

  // Update profile
  async updateProfile(updates) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    const { data, error } = await supabase.from('users').update(updates).eq('id', user.id).select().single()
    if (error) throw error
    return data
  },

  // Password reset request
  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`
    })
    if (error) throw error
  },

  // Listen to auth state changes
  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// ── ESTATE SERVICES ───────────────────────────────────────────

export const estates = {
  // Get all estates
  async getAll() {
    const { data, error } = await supabase
      .from('estates')
      .select('*, plots(count)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Get estate by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('estates')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  },

  // Get estate with its plots
  async getWithPlots(estateId) {
    const { data: estate, error: eErr } = await supabase
      .from('estates')
      .select('*')
      .eq('id', estateId)
      .single()
    if (eErr) throw eErr

    const { data: plots, error: pErr } = await supabase
      .from('plots')
      .select('*')
      .eq('estate_id', estateId)
      .order('plot_number')
    if (pErr) throw pErr

    return { ...estate, plots }
  }
}

// ── PLOT SERVICES ─────────────────────────────────────────────

export const plots = {
  // Get plot details
  async getById(plotId) {
    const { data, error } = await supabase
      .from('plots')
      .select('*, estates(name, location, slug)')
      .eq('id', plotId)
      .single()
    if (error) throw error
    return data
  },

  // Get all plots for an estate
  async getByEstate(estateId) {
    const { data, error } = await supabase
      .from('plots')
      .select('*')
      .eq('estate_id', estateId)
      .order('plot_number')
    if (error) throw error
    return data
  },

  // Search/verify a plot
  async search(query) {
    const { data, error } = await supabase
      .from('plots')
      .select('*, estates(name, location)')
      .or(`plot_number.ilike.%${query}%,survey_number.ilike.%${query}%,cofo_number.ilike.%${query}%`)
    if (error) throw error
    return data
  }
}

// ── PORTFOLIO (User's Properties) ─────────────────────────────

export const portfolio = {
  // Get user's owned plots
  async getMyPlots() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('plots')
      .select('*, estates(name, location, slug)')
      .eq('owner_id', user.id)
    if (error) throw error
    return data
  },

  // Get total investment value
  async getStats() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { total: 0, count: 0, verified: 0 }
    const { data } = await supabase
      .from('plots')
      .select('price, search_status')
      .eq('owner_id', user.id)
    if (!data) return { total: 0, count: 0, verified: 0 }
    return {
      total: data.reduce((s, p) => s + Number(p.price), 0),
      count: data.length,
      verified: data.filter(p => p.search_status === 'approved').length
    }
  }
}

// ── PURCHASE INTERESTS (Cart) ─────────────────────────────────

export const cart = {
  // Register interest in a plot
  async addInterest(plotId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Check if already expressed interest
    const { data: existing } = await supabase
      .from('purchase_interests')
      .select('id')
      .eq('user_id', user.id)
      .eq('plot_id', plotId)
      .in('status', ['pending', 'approved'])
      .single()
    if (existing) throw new Error('Interest already registered for this plot')

    const { data, error } = await supabase.from('purchase_interests').insert({
      user_id: user.id,
      plot_id: plotId,
      status: 'pending'
    }).select().single()
    if (error) throw error

    // Reserve the plot
    await supabase.from('plots').update({ status: 'reserved' }).eq('id', plotId)

    return data
  },

  // Get my cart items
  async getMyCart() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('purchase_interests')
      .select('*, plots(*, estates(name, location))')
      .eq('user_id', user.id)
      .in('status', ['pending', 'approved'])
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Cancel interest
  async cancelInterest(interestId) {
    const { data: interest } = await supabase
      .from('purchase_interests')
      .select('plot_id')
      .eq('id', interestId)
      .single()

    const { error } = await supabase
      .from('purchase_interests')
      .update({ status: 'cancelled' })
      .eq('id', interestId)
    if (error) throw error

    // Release the plot
    if (interest) {
      await supabase.from('plots').update({ status: 'available' }).eq('id', interest.plot_id)
    }
  }
}

// ── PAYMENT SERVICES (Paystack) ───────────────────────────────

export const payments = {
  // Initialize Paystack payment
  async initiate({ plotId, amount, type, description }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const profile = await auth.getProfile()
    const reference = `EN-${type.toUpperCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    // Save payment record
    const { data: payment, error } = await supabase.from('payments').insert({
      user_id: user.id,
      plot_id: plotId || null,
      reference,
      amount,
      type,
      description,
      status: 'pending'
    }).select().single()
    if (error) throw error

    // Open Paystack popup
    return new Promise((resolve, reject) => {
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: profile.email,
        amount: amount * 100, // Paystack uses kobo
        currency: 'NGN',
        ref: reference,
        metadata: { user_id: user.id, plot_id: plotId, type },
        callback: async (response) => {
          // Payment successful — update record
          await supabase.from('payments').update({
            status: 'completed',
            paystack_ref: response.reference,
            paid_at: new Date().toISOString()
          }).eq('id', payment.id)

          // Handle post-payment logic
          await payments.handleSuccess(payment.id, type, plotId, user.id)
          resolve({ ...payment, status: 'completed' })
        },
        onClose: () => {
          reject(new Error('Payment cancelled'))
        }
      })
      handler.openIframe()
    })
  },

  // Handle successful payment
  async handleSuccess(paymentId, type, plotId, userId) {
    switch (type) {
      case 'plot_purchase':
        // Transfer ownership
        if (plotId) {
          await supabase.from('plots').update({
            status: 'sold',
            owner_id: userId
          }).eq('id', plotId)
          // Update purchase interest
          await supabase.from('purchase_interests').update({ status: 'completed' })
            .eq('user_id', userId).eq('plot_id', plotId)
        }
        break
      case 'search_fee':
        // Update search request
        await supabase.from('search_requests').update({
          status: 'paid',
          payment_id: paymentId
        }).eq('user_id', userId).eq('plot_id', plotId).eq('status', 'pending_payment')
        break
      case 'ground_rent':
        // Mark rent as paid
        await supabase.from('ground_rent').update({
          status: 'paid',
          payment_id: paymentId
        }).eq('user_id', userId).eq('plot_id', plotId).eq('status', 'unpaid')
        break
    }

    // Create notification
    await supabase.from('notifications').insert({
      user_id: userId,
      title: 'Payment Successful',
      message: `Your ${type.replace(/_/g, ' ')} payment of ₦${Number(0).toLocaleString()} has been confirmed.`,
      type: 'payment'
    })
  },

  // Get payment history
  async getHistory() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('payments')
      .select('*, plots(plot_number, estates(name))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Get payment by reference
  async getByRef(ref) {
    const { data, error } = await supabase
      .from('payments')
      .select('*, plots(plot_number, estates(name))')
      .eq('reference', ref)
      .single()
    if (error) throw error
    return data
  }
}

// ── SEARCH / VERIFICATION SERVICES ────────────────────────────

export const searches = {
  // Request a plot search
  async request({ plotId, searchType = 'basic' }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const fees = { basic: 10000, certified: 25000, premium: 50000 }

    const { data, error } = await supabase.from('search_requests').insert({
      user_id: user.id,
      plot_id: plotId,
      search_type: searchType,
      fee_paid: fees[searchType],
      status: 'pending_payment'
    }).select().single()
    if (error) throw error
    return data
  },

  // Get my search requests
  async getMine() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('search_requests')
      .select('*, plots(plot_number, estates(name))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
}

// ── GROUND RENT SERVICES ──────────────────────────────────────

export const groundRent = {
  // Get my ground rent records
  async getMine() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('ground_rent')
      .select('*, plots(plot_number, estates(name))')
      .eq('user_id', user.id)
      .order('year', { ascending: false })
    if (error) throw error
    return data
  }
}

// ── SERVICE REQUESTS ──────────────────────────────────────────

export const services = {
  // Submit a service request
  async submit({ serviceType, plotId, details }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase.from('service_requests').insert({
      user_id: user.id,
      service_type: serviceType,
      plot_id: plotId || null,
      details,
      status: 'submitted'
    }).select().single()
    if (error) throw error
    return data
  },

  // Get my service requests
  async getMine() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('service_requests')
      .select('*, plots(plot_number, estates(name))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
}

// ── OWNERSHIP TRANSFER ────────────────────────────────────────

export const transfers = {
  // Initiate a transfer
  async initiate({ plotId, toEmail, toName, transferType }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase.from('ownership_transfers').insert({
      plot_id: plotId,
      from_user_id: user.id,
      to_email: toEmail,
      to_name: toName,
      transfer_type: transferType,
      status: 'pending'
    }).select().single()
    if (error) throw error
    return data
  },

  // Get my transfers
  async getMine() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('ownership_transfers')
      .select('*, plots(plot_number, estates(name))')
      .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
}

// ── ENQUIRIES ─────────────────────────────────────────────────

export const enquiries = {
  async submit({ category, subject, message }) {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from('enquiries').insert({
      user_id: user?.id || null,
      category, subject, message,
      status: 'open'
    }).select().single()
    if (error) throw error
    return data
  },

  async getMine() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
}

// ── CHAT (Live Support) ───────────────────────────────────────

export const chat = {
  async sendMessage(message) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase.from('chat_messages').insert({
      user_id: user.id,
      sender: 'user',
      message
    }).select().single()
    if (error) throw error
    return data
  },

  async getMessages() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(100)
    if (error) throw error
    return data
  },

  // Real-time subscription
  subscribe(userId, callback) {
    return supabase
      .channel('chat')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe()
  }
}

// ── NOTIFICATIONS ─────────────────────────────────────────────

export const notifications = {
  async getMine() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
    if (error) throw error
    return data
  },

  async markRead(id) {
    await supabase.from('notifications').update({ read_status: true }).eq('id', id)
  },

  async markAllRead() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('notifications').update({ read_status: true }).eq('user_id', user.id)
  },

  async getUnreadCount() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 0
    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read_status', false)
    return count || 0
  }
}

// ── KYC / FILE UPLOAD ─────────────────────────────────────────

export const kyc = {
  async uploadDocument(file, docType) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const ext = file.name.split('.').pop()
    const path = `kyc/${user.id}/${docType}_${Date.now()}.${ext}`

    const { error: upErr } = await supabase.storage.from('documents').upload(path, file)
    if (upErr) throw upErr

    const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(path)

    // Update user profile with document URL
    const updateField = {
      id_document: 'id_document',
      proof_of_address: 'proof_of_address',
      passport_photo: 'passport_photo'
    }[docType] || docType

    await supabase.from('users').update({ [updateField]: publicUrl }).eq('id', user.id)
    return publicUrl
  },

  async submitKYC({ idType, idNumber }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase.from('users').update({
      id_type: idType,
      id_number: idNumber,
      kyc_status: 'pending'
    }).eq('id', user.id)
    if (error) throw error
  }
}

// ── PROJECTS ──────────────────────────────────────────────────

export const projects = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
}

// ── DASHBOARD STATS ───────────────────────────────────────────

export const dashboard = {
  async getStats() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const [portfolioStats, paymentData, pendingInterests, searchData] = await Promise.all([
      portfolio.getStats(),
      supabase.from('payments').select('amount').eq('user_id', user.id).eq('status', 'completed'),
      supabase.from('purchase_interests').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'pending'),
      supabase.from('search_requests').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
    ])

    const totalPaid = paymentData.data?.reduce((s, p) => s + Number(p.amount), 0) || 0

    return {
      propertiesOwned: portfolioStats.count,
      verifiedPlots: portfolioStats.verified,
      totalInvestment: portfolioStats.total,
      totalPaid,
      pendingActions: pendingInterests.count || 0,
      totalSearches: searchData.count || 0
    }
  },

  async getRecentTransactions() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('payments')
      .select('*, plots(plot_number, estates(name))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
    if (error) throw error
    return data
  }
}

// ── ADMIN SERVICES ────────────────────────────────────────────

export const admin = {
  async getStats() {
    const [users, plots_data, payments_data, pendingKyc] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('plots').select('status'),
      supabase.from('payments').select('amount, status'),
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('kyc_status', 'pending')
    ])

    const plotStats = plots_data.data || []
    const payStats = payments_data.data || []

    return {
      totalUsers: users.count || 0,
      totalPlots: plotStats.length,
      soldPlots: plotStats.filter(p => p.status === 'sold').length,
      totalRevenue: payStats.filter(p => p.status === 'completed').reduce((s, p) => s + Number(p.amount), 0),
      pendingKyc: pendingKyc.count || 0
    }
  },

  async getUsers() {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async updateKYC(userId, status) {
    const { error } = await supabase.from('users').update({ kyc_status: status }).eq('id', userId)
    if (error) throw error
  },

  async getPendingInterests() {
    const { data, error } = await supabase
      .from('purchase_interests')
      .select('*, users(first_name, last_name, email), plots(plot_number, price, estates(name))')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async approveInterest(interestId) {
    const { error } = await supabase
      .from('purchase_interests')
      .update({ status: 'approved', approval_date: new Date().toISOString() })
      .eq('id', interestId)
    if (error) throw error
  }
}

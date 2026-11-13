import React, { useState, useEffect, createContext, useContext, useCallback } from "react"
import ReactDOM from "react-dom/client"
import { supabase } from "./supabase"
import * as svc from "./services"
import EnuguHousing from "./EnuguHousing"

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('React Error:', error, info) }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', { style: { padding: 40, fontFamily: 'monospace', background: '#fee', minHeight: '100vh' } },
        React.createElement('h1', { style: { color: '#c00' } }, 'Something went wrong'),
        React.createElement('pre', { style: { whiteSpace: 'pre-wrap', fontSize: 14 } }, String(this.state.error)),
        React.createElement('button', { onClick: () => window.location.reload(), style: { marginTop: 20, padding: '10px 20px' } }, 'Reload')
      )
    }
    return this.props.children
  }
}

const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

const DEMO_MODE = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'YOUR_SUPABASE_URL'
const DEMO_KEY = 'enugu_demo_session'

function AppProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const [estatesData, setEstatesData] = useState([])
  const [portfolioData, setPortfolioData] = useState([])
  const [cartData, setCartData] = useState([])
  const [paymentsData, setPaymentsData] = useState([])
  const [notifData, setNotifData] = useState([])
  const [chatMsgs, setChatMsgs] = useState([])
  const [dashStats, setDashStats] = useState(null)
  const [projectsData, setProjectsData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [serviceRequests, setServiceRequests] = useState([])
  const [enquiriesData, setEnquiriesData] = useState([])
  const [groundRentData, setGroundRentData] = useState([])
  const [transfersData, setTransfersData] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [toast, setToast] = useState(null)
  const showToast = useCallback((msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 4000) }, [])

  useEffect(() => {
    if (DEMO_MODE) {
      try {
        const saved = localStorage.getItem(DEMO_KEY)
        if (saved) {
          const d = JSON.parse(saved)
          if (d.profile) { setProfile(d.profile); setSession({ user: { id: 'demo-user' } }) }
        }
      } catch (e) {}
      setLoading(false)
      return
    }
    try {
      supabase.auth.getSession().then(({ data: { session: s } }) => { setSession(s); if (s) loadProfile(s.user.id); setLoading(false) }).catch(() => setLoading(false))
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); if (s) loadProfile(s.user.id); else { setProfile(null); clearAllData() } })
      return () => subscription.unsubscribe()
    } catch(e) { console.warn('Auth init error:', e); setLoading(false) }
  }, [])

  const loadProfile = async (userId) => { try { const p = await svc.auth.getProfile(); setProfile(p) } catch (e) { console.warn('Profile load:', e.message) } }
  const clearAllData = () => { setPortfolioData([]); setCartData([]); setPaymentsData([]); setNotifData([]); setChatMsgs([]); setDashStats(null); setSearchResults([]); setServiceRequests([]); setEnquiriesData([]); setGroundRentData([]); setTransfersData([]) }

  const register = async ({ email, password, firstName, lastName, phone }) => {
    if (DEMO_MODE) { const p = { first_name: firstName, last_name: lastName, email, phone, role: 'user', kyc_status: 'none' }; setProfile(p); setSession({ user: { id: 'demo-user' } }); try { localStorage.setItem(DEMO_KEY, JSON.stringify({ profile: p })) } catch(e){}; showToast('Account created successfully!'); return true }
    try { setAuthError(null); await svc.auth.register({ email, password, firstName, lastName, phone }); showToast('Account created! Check your email to verify.'); return true } catch (e) { setAuthError(e.message); return false }
  }
  const login = async ({ email, password }) => {
    if (DEMO_MODE) { const p = { first_name: 'Demo', last_name: 'User', email, role: 'user', kyc_status: 'none' }; setProfile(p); setSession({ user: { id: 'demo-user' } }); try { localStorage.setItem(DEMO_KEY, JSON.stringify({ profile: p })) } catch(e){}; showToast('Welcome back!'); return true }
    try { setAuthError(null); const data = await svc.auth.login({ email, password }); setSession(data.session); showToast('Welcome back!'); return true } catch (e) { setAuthError(e.message); return false }
  }
  const logout = async () => { if (DEMO_MODE) { setSession(null); setProfile(null); clearAllData(); try { localStorage.removeItem(DEMO_KEY) } catch(e){}; return } await svc.auth.logout() }
  const updateProfile = async (updates) => {
    if (DEMO_MODE) { setProfile(p => { const np = { ...p, ...updates }; try { localStorage.setItem(DEMO_KEY, JSON.stringify({ profile: np })) } catch(e){}; return np }); showToast('Profile updated!'); return }
    try { const updated = await svc.auth.updateProfile(updates); setProfile(updated); showToast('Profile updated!') } catch (e) { showToast(e.message, 'error') }
  }

  const loadEstates = async () => { if (DEMO_MODE) return; try { const data = await svc.estates.getAll(); setEstatesData(data) } catch (e) { console.warn('Estates:', e.message) } }
  const loadEstateWithPlots = async (estateId) => { if (DEMO_MODE) return null; try { return await svc.estates.getWithPlots(estateId) } catch (e) { console.warn('Estate plots:', e.message); return null } }
  const loadPortfolio = async () => { if (DEMO_MODE) return; try { const data = await svc.portfolio.getMyPlots(); setPortfolioData(data) } catch (e) { console.warn('Portfolio:', e.message) } }
  const loadCart = async () => { if (DEMO_MODE) return; try { const data = await svc.cart.getMyCart(); setCartData(data) } catch (e) { console.warn('Cart:', e.message) } }
  const loadPayments = async () => { if (DEMO_MODE) return; try { const data = await svc.payments.getHistory(); setPaymentsData(data) } catch (e) { console.warn('Payments:', e.message) } }
  const loadDashboard = async () => { if (DEMO_MODE) return; try { const [stats, txns] = await Promise.all([svc.dashboard.getStats(), svc.dashboard.getRecentTransactions()]); setDashStats({ ...stats, recentTransactions: txns }) } catch (e) { console.warn('Dashboard:', e.message) } }
  const loadNotifications = async () => { if (DEMO_MODE) return; try { const [data, count] = await Promise.all([svc.notifications.getMine(), svc.notifications.getUnreadCount()]); setNotifData(data); setUnreadCount(count) } catch (e) { console.warn('Notifications:', e.message) } }
  const loadProjects = async () => { if (DEMO_MODE) return; try { const data = await svc.projects.getAll(); setProjectsData(data) } catch (e) { console.warn('Projects:', e.message) } }
  const loadChat = async () => { if (DEMO_MODE) return; try { const data = await svc.chat.getMessages(); setChatMsgs(data) } catch (e) { console.warn('Chat:', e.message) } }
  const loadServiceRequests = async () => { if (DEMO_MODE) return; try { const data = await svc.services.getMine(); setServiceRequests(data) } catch (e) { console.warn('Services:', e.message) } }
  const loadEnquiries = async () => { if (DEMO_MODE) return; try { const data = await svc.enquiries.getMine(); setEnquiriesData(data) } catch (e) { console.warn('Enquiries:', e.message) } }
  const loadGroundRent = async () => { if (DEMO_MODE) return; try { const data = await svc.groundRent.getMine(); setGroundRentData(data) } catch (e) { console.warn('Ground rent:', e.message) } }
  const loadTransfers = async () => { if (DEMO_MODE) return; try { const data = await svc.transfers.getMine(); setTransfersData(data) } catch (e) { console.warn('Transfers:', e.message) } }

  useEffect(() => { if (session && !DEMO_MODE) { loadEstates(); loadDashboard(); loadPortfolio(); loadCart(); loadPayments(); loadNotifications(); loadProjects(); loadChat() } }, [session])

  const addToCart = async (plotId) => { if (DEMO_MODE) { showToast('Interest registered! (Demo mode)'); return } try { await svc.cart.addInterest(plotId); showToast('Interest registered successfully!'); await loadCart() } catch (e) { showToast(e.message, 'error') } }
  const removeFromCart = async (interestId) => { if (DEMO_MODE) { showToast('Interest cancelled (Demo mode)'); return } try { await svc.cart.cancelInterest(interestId); showToast('Interest cancelled'); await loadCart() } catch (e) { showToast(e.message, 'error') } }
  const makePayment = async ({ plotId, amount, type, description }) => {
    if (DEMO_MODE) { showToast('Payment of N' + Number(amount).toLocaleString() + ' simulated! (Demo mode)'); return { status: 'completed', reference: 'DEMO-' + Date.now() } }
    try { const result = await svc.payments.initiate({ plotId, amount, type, description }); showToast('Payment successful!'); await Promise.all([loadPayments(), loadPortfolio(), loadCart(), loadDashboard()]); return result }
    catch (e) { if (e.message === 'Payment cancelled') { showToast('Payment cancelled', 'warning') } else { showToast(e.message, 'error') } throw e }
  }
  const searchPlots = async (query) => { if (DEMO_MODE) return []; try { const results = await svc.plots.search(query); setSearchResults(results); return results } catch (e) { showToast(e.message, 'error'); return [] } }
  const requestSearch = async ({ plotId, searchType }) => { if (DEMO_MODE) { showToast('Search request submitted! (Demo mode)'); return } try { await svc.searches.request({ plotId, searchType }); showToast('Search request submitted!') } catch (e) { showToast(e.message, 'error') } }
  const submitService = async ({ serviceType, plotId, details }) => { if (DEMO_MODE) { showToast('Service request submitted! (Demo mode)'); return } try { await svc.services.submit({ serviceType, plotId, details }); showToast('Service request submitted!'); await loadServiceRequests() } catch (e) { showToast(e.message, 'error') } }
  const submitEnquiry = async ({ category, subject, message }) => { if (DEMO_MODE) { showToast('Enquiry submitted! (Demo mode)'); return } try { await svc.enquiries.submit({ category, subject, message }); showToast('Enquiry submitted!'); await loadEnquiries() } catch (e) { showToast(e.message, 'error') } }
  const initiateTransfer = async ({ plotId, toEmail, toName, transferType }) => { if (DEMO_MODE) { showToast('Transfer initiated! (Demo mode)'); return } try { await svc.transfers.initiate({ plotId, toEmail, toName, transferType }); showToast('Transfer request submitted!'); await loadTransfers() } catch (e) { showToast(e.message, 'error') } }
  const sendChat = async (message) => {
    if (DEMO_MODE) { setChatMsgs(prev => [...prev, { id: Date.now(), sender: 'user', message, created_at: new Date().toISOString() }]); setTimeout(() => { setChatMsgs(prev => [...prev, { id: Date.now() + 1, sender: 'officer', message: 'Thank you for reaching out. An officer will respond shortly during business hours (Mon-Fri, 8AM-5PM WAT).', created_at: new Date().toISOString() }]) }, 1500); return }
    try { await svc.chat.sendMessage(message); await loadChat() } catch (e) { showToast(e.message, 'error') }
  }
  const uploadKYC = async (file, docType) => { if (DEMO_MODE) { showToast('Document uploaded! (Demo mode)'); return 'demo-url' } try { const url = await svc.kyc.uploadDocument(file, docType); showToast('Document uploaded!'); return url } catch (e) { showToast(e.message, 'error'); throw e } }
  const submitKYC = async ({ idType, idNumber }) => {
    if (DEMO_MODE) { setProfile(p => ({ ...p, kyc_status: 'pending', id_type: idType, id_number: idNumber })); showToast('KYC submitted for review! (Demo mode)'); return }
    try { await svc.kyc.submitKYC({ idType, idNumber }); showToast('KYC submitted for review!'); await loadProfile(session.user.id) } catch (e) { showToast(e.message, 'error') }
  }
  const markNotifRead = async (id) => { if (DEMO_MODE) return; await svc.notifications.markRead(id); await loadNotifications() }

  useEffect(() => { if (!session || DEMO_MODE) return; const channel = svc.chat.subscribe(session.user.id, (payload) => { setChatMsgs(prev => [...prev, payload.new]) }); return () => { supabase.removeChannel(channel) } }, [session])

  const value = {
    DEMO_MODE, session, profile, loading, authError,
    estatesData, portfolioData, cartData, paymentsData,
    notifData, chatMsgs, dashStats, projectsData,
    searchResults, serviceRequests, enquiriesData,
    groundRentData, transfersData, unreadCount,
    register, login, logout, updateProfile,
    loadEstates, loadEstateWithPlots, loadPortfolio,
    loadCart, loadPayments, loadDashboard, loadNotifications,
    loadProjects, loadChat, loadServiceRequests, loadEnquiries,
    loadGroundRent, loadTransfers,
    addToCart, removeFromCart, makePayment,
    searchPlots, requestSearch, submitService,
    submitEnquiry, initiateTransfer, sendChat,
    uploadKYC, submitKYC, markNotifRead, showToast
  }
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

function PaystackLoader() { useEffect(() => { if (document.getElementById('paystack-script')) return; const s = document.createElement('script'); s.id = 'paystack-script'; s.src = 'https://js.paystack.co/v2/inline.js'; s.async = true; document.head.appendChild(s) }, []); return null }

ReactDOM.createRoot(document.getElementById('root')).render(<ErrorBoundary><AppProvider><PaystackLoader /><EnuguHousing /></AppProvider></ErrorBoundary>)

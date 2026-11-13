-- ================================================================
-- ENUGU STATE MINISTRY OF HOUSING - SUPABASE SCHEMA
-- Run this ONCE in Supabase SQL Editor (Dashboard > SQL Editor)
-- ================================================================

-- ── USERS PROFILE ──
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user','admin','super_admin')),
  kyc_status TEXT DEFAULT 'none' CHECK (kyc_status IN ('none','pending','verified','rejected')),
  id_type TEXT,
  id_number TEXT,
  id_document TEXT,
  proof_of_address TEXT,
  passport_photo TEXT,
  address TEXT,
  state TEXT,
  lga TEXT,
  two_factor_enabled BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── ESTATES ──
CREATE TABLE IF NOT EXISTS public.estates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  description TEXT,
  total_plots INT DEFAULT 0,
  available_plots INT DEFAULT 0,
  sold_plots INT DEFAULT 0,
  min_price NUMERIC(15,2) DEFAULT 0,
  max_price NUMERIC(15,2) DEFAULT 0,
  estate_type TEXT DEFAULT 'residential' CHECK (estate_type IN ('residential','commercial','mixed')),
  image_url TEXT,
  features JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active' CHECK (status IN ('active','coming_soon','sold_out')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── PLOTS ──
CREATE TABLE IF NOT EXISTS public.plots (
  id SERIAL PRIMARY KEY,
  estate_id INT NOT NULL REFERENCES estates(id) ON DELETE CASCADE,
  plot_number TEXT NOT NULL,
  plot_type TEXT DEFAULT 'residential' CHECK (plot_type IN ('residential','commercial','mixed','corner')),
  size_sqm NUMERIC(10,2) NOT NULL,
  dimensions TEXT,
  price NUMERIC(15,2) NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available','reserved','sold','processing')),
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  search_status TEXT DEFAULT 'unsearched' CHECK (search_status IN ('unsearched','pending','approved','rejected')),
  cofo_number TEXT,
  survey_number TEXT,
  gazette_ref TEXT,
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(estate_id, plot_number)
);

-- ── PURCHASE INTERESTS (Cart) ──
CREATE TABLE IF NOT EXISTS public.purchase_interests (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plot_id INT NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','completed','cancelled')),
  approval_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── PAYMENTS ──
CREATE TABLE IF NOT EXISTS public.payments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plot_id INT REFERENCES plots(id) ON DELETE SET NULL,
  reference TEXT NOT NULL UNIQUE,
  paystack_ref TEXT,
  amount NUMERIC(15,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('plot_purchase','search_fee','ground_rent','cofo_fee','service_fee','development_levy')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed','refunded')),
  payment_method TEXT,
  description TEXT,
  metadata JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── GROUND RENT ──
CREATE TABLE IF NOT EXISTS public.ground_rent (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plot_id INT NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  year INT NOT NULL,
  amount NUMERIC(15,2) NOT NULL,
  status TEXT DEFAULT 'unpaid' CHECK (status IN ('unpaid','paid','overdue')),
  due_date DATE NOT NULL,
  payment_id INT REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── SEARCH REQUESTS ──
CREATE TABLE IF NOT EXISTS public.search_requests (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plot_id INT NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  search_type TEXT DEFAULT 'basic' CHECK (search_type IN ('basic','certified','premium')),
  fee_paid NUMERIC(15,2) DEFAULT 0,
  payment_id INT REFERENCES payments(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending_payment','paid','processing','completed','rejected')),
  result JSONB,
  certificate_url TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── SERVICE REQUESTS ──
CREATE TABLE IF NOT EXISTS public.service_requests (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN ('cofo_application','cofo_renewal','rectification','subdivision','merger','consent_transfer','survey','building_permit')),
  plot_id INT REFERENCES plots(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted','under_review','approved','rejected','completed')),
  details JSONB,
  documents JSONB,
  fee_amount NUMERIC(15,2) DEFAULT 0,
  payment_id INT REFERENCES payments(id) ON DELETE SET NULL,
  admin_notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── OWNERSHIP TRANSFERS ──
CREATE TABLE IF NOT EXISTS public.ownership_transfers (
  id SERIAL PRIMARY KEY,
  plot_id INT NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  from_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  to_email TEXT,
  to_name TEXT,
  transfer_type TEXT DEFAULT 'sale' CHECK (transfer_type IN ('sale','gift','inheritance')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','completed','rejected')),
  fee_amount NUMERIC(15,2) DEFAULT 0,
  payment_id INT REFERENCES payments(id) ON DELETE SET NULL,
  documents JSONB,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── ENQUIRIES ──
CREATE TABLE IF NOT EXISTS public.enquiries (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general','payment','technical','land','cofo','complaint')),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
  admin_reply TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── CHAT MESSAGES ──
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sender TEXT DEFAULT 'user' CHECK (sender IN ('user','officer','system')),
  message TEXT NOT NULL,
  read_status BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── NOTIFICATIONS ──
CREATE TABLE IF NOT EXISTS public.notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info','success','warning','payment','approval')),
  read_status BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── PROJECTS ──
CREATE TABLE IF NOT EXISTS public.projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'ongoing' CHECK (status IN ('ongoing','completed','planned')),
  progress INT DEFAULT 0,
  budget NUMERIC(15,2) DEFAULT 0,
  contractor TEXT,
  start_date DATE,
  end_date DATE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── ACTIVITY LOG ──
CREATE TABLE IF NOT EXISTS public.activity_log (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  description TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ════════════════════════════════════════

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ground_rent ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ownership_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Users: read own, admins read all
CREATE POLICY "Users read own profile" ON public.users FOR SELECT USING (auth.uid() = id OR EXISTS(SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin')));
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Estates: public read
CREATE POLICY "Estates public read" ON public.estates FOR SELECT USING (true);

-- Plots: public read
CREATE POLICY "Plots public read" ON public.plots FOR SELECT USING (true);
CREATE POLICY "Plots admin update" ON public.plots FOR UPDATE USING (EXISTS(SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin')));

-- Payments: own only
CREATE POLICY "Payments own read" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Payments own insert" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Payments own update" ON public.payments FOR UPDATE USING (auth.uid() = user_id);

-- Purchase interests: own only
CREATE POLICY "Interests own read" ON public.purchase_interests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Interests own insert" ON public.purchase_interests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Interests own update" ON public.purchase_interests FOR UPDATE USING (auth.uid() = user_id);

-- Search requests: own only
CREATE POLICY "Searches own read" ON public.search_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Searches own insert" ON public.search_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ground rent: own only
CREATE POLICY "Rent own read" ON public.ground_rent FOR SELECT USING (auth.uid() = user_id);

-- Service requests: own only
CREATE POLICY "Services own read" ON public.service_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Services own insert" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Transfers: involved parties
CREATE POLICY "Transfers own read" ON public.ownership_transfers FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY "Transfers own insert" ON public.ownership_transfers FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- Enquiries: own only
CREATE POLICY "Enquiries own read" ON public.enquiries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enquiries own insert" ON public.enquiries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat: own only
CREATE POLICY "Chat own read" ON public.chat_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Chat own insert" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications: own only
CREATE POLICY "Notifs own read" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Notifs own update" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Projects: public read
CREATE POLICY "Projects public read" ON public.projects FOR SELECT USING (true);

-- Activity log: own read
CREATE POLICY "Log own read" ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Log insert" ON public.activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ════════════════════════════════════════
-- REALTIME (for live chat)
-- ════════════════════════════════════════
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ════════════════════════════════════════
-- SEED DATA
-- ════════════════════════════════════════

-- Estates
INSERT INTO estates (name, slug, location, description, total_plots, available_plots, sold_plots, min_price, max_price, estate_type, status, features) VALUES
('Royal Gardens Estate', 'royal-gardens', 'Independence Layout, Enugu', 'Premium residential estate in the heart of Independence Layout with modern infrastructure, 24/7 security, and underground utilities.', 120, 78, 42, 12000000, 35000000, 'residential', 'active', '["24/7 Security","Underground Drainage","Street Lights","Paved Roads","Green Areas","Perimeter Fencing"]'),
('Independence Heights', 'independence-heights', 'New Haven Extension, Enugu', 'Exclusive hilltop estate offering panoramic city views with premium road infrastructure and reliable water supply.', 85, 53, 32, 8000000, 22000000, 'mixed', 'active', '["City View","Water Supply","Commercial Zone","Playground","Medical Centre","Power Backup"]'),
('Centenary City Estate', 'centenary-city', 'Centenary City, Enugu', 'Ultra-modern smart city development featuring automated gates, fibre optic connectivity, and eco-friendly construction standards.', 200, 145, 55, 15000000, 50000000, 'residential', 'active', '["Smart City","Fibre Optic","Solar Power","Automated Gates","Golf Course","Shopping Mall"]'),
('Green Valley Estate', 'green-valley', 'Trans-Ekulu, Enugu', 'Serene residential enclave surrounded by natural greenery with emphasis on eco-friendly development.', 60, 38, 22, 6000000, 18000000, 'residential', 'active', '["Eco-Friendly","Nature Reserve","Children Park","Jogging Track","Community Hall","CCTV"]'),
('Legacy Estates', 'legacy-estates', 'Agbani Road, Nkanu West, Enugu', 'Flagship development by Legacy Homes — premium residential plots with modern infrastructure, gated entry, and estate management.', 150, 95, 55, 8500000, 12000000, 'residential', 'active', '["Gated Entry","Estate Management","Tarred Roads","Perimeter Fence","Green Belt","Street Lights"]'),
('Satellite Estate', 'satellite-estate', 'Udi Road, Udi LGA, Enugu', 'Strategic satellite town development along Udi Road corridor. Affordable housing with modern amenities.', 100, 68, 32, 5500000, 9000000, 'mixed', 'active', '["Affordable","Market Zone","School Zone","Paved Roads","Water Supply","Security"]'),
('IGP Ogbonnaya Onovo Police Housing Estate', 'police-housing', 'New Artisan, Enugu South', 'Government-backed police housing estate with perimeter fencing, CCTV, and dedicated security post.', 80, 45, 35, 7000000, 8500000, 'residential', 'active', '["Police Security","CCTV","Perimeter Wall","Recreation Area","Clinic","Paved Roads"]'),
('Rehoboth Estate', 'rehoboth-estate', 'Amorji Nike, Enugu East', 'Serene residential estate in Amorji Nike offering affordable plots in a rapidly developing corridor.', 90, 58, 32, 4500000, 6000000, 'residential', 'active', '["Affordable","Growing Area","Green Area","Estate Road","Security Gate","Drainage"]'),
('Airport Garden Estate', 'airport-garden', 'Orie Emene, Near Akanu Ibiam Airport, Enugu', 'Premium estate near Akanu Ibiam International Airport. Strategic location for residential and commercial investment.', 110, 72, 38, 6500000, 14000000, 'mixed', 'active', '["Airport Proximity","Commercial Zone","Hotel Zone","Paved Roads","Power Supply","Security"]'),
('Kings Court Estate', 'kings-court', 'Centenary City Road, Enugu East', 'Royal-themed gated community with interlocked roads, underground drainage, and 24/7 power backup.', 75, 42, 33, 10000000, 14500000, 'residential', 'active', '["Interlocked Roads","Underground Drainage","24/7 Power","Clubhouse","Garden","CCTV"]'),
('Divine Garden Estate', 'divine-garden', 'Abakpa Nike, Enugu East', 'Faith-inspired residential community with landscaped gardens, playground, worship centre, and community hall.', 85, 52, 33, 4000000, 7500000, 'mixed', 'active', '["Worship Centre","Playground","Community Hall","Gardens","Security","Paved Roads"]'),
('Communication Estate', 'communication-estate', 'Nkwubor Nike, Enugu East', 'Well-planned estate with excellent network coverage, underground cable infrastructure, and fibre optic readiness.', 70, 40, 30, 5000000, 7000000, 'residential', 'active', '["Fibre Optic","Underground Cables","Network Coverage","Paved Roads","Security","Drainage"]'),
('Rectors Garden Estate', 'rectors-garden', 'Nsukka Road, Nsukka LGA, Enugu', 'Academic-belt estate near University of Nigeria Nsukka. Perfect for faculty housing and student accommodation.', 65, 42, 23, 3500000, 6000000, 'mixed', 'active', '["UNN Proximity","Rental Investment","Commercial Zone","Paved Roads","Water Supply","Security"]'),
('Valley View Estate', 'valley-view', '9th Mile Corner, Udi LGA, Enugu', 'Scenic estate at 9th Mile Corner with panoramic valley views on the Enugu-Onitsha expressway corridor.', 95, 62, 33, 4500000, 10000000, 'mixed', 'active', '["Valley Views","Expressway Access","Commercial Zone","Paved Roads","Security","Green Areas"]'),
('Cordial Estate', 'cordial-estate', 'Ngwo, Udi LGA, Enugu', 'Peaceful hillside community in Ngwo with cool climate, natural vegetation, and Miliken Hill range views.', 55, 35, 20, 5000000, 6500000, 'residential', 'active', '["Cool Climate","Mountain Views","Natural Vegetation","Private Roads","Borehole","Solar Power"]'),
('Ikenga Estate', 'ikenga-estate', 'Agbani, Nkanu West LGA, Enugu', 'Well-planned residential community with perimeter wall and manned security gate in Agbani growth corridor.', 100, 65, 35, 4000000, 7500000, 'mixed', 'active', '["Perimeter Wall","Security Gate","Community Centre","Paved Roads","Drainage","Street Lights"]'),
('Innovation Phase Estate', 'innovation-phase', 'Nike Lake Road Extension, Enugu East', 'Tech-forward estate with smart home readiness, fibre optic pre-wired, solar street lights, and EV charging planned.', 80, 55, 25, 9000000, 12500000, 'residential', 'active', '["Smart Home Ready","Fibre Optic","Solar Lights","EV Charging","Innovation Hub","CCTV"]'),
('Camp David Estate', 'camp-david', 'Amagunze, Nkanu East LGA, Enugu', 'Exclusive gated community with military-grade security, CCTV, armed response, and biometric gate access.', 60, 38, 22, 6000000, 8500000, 'residential', 'active', '["Military Security","Biometric Gate","CCTV","Armed Response","Clubhouse","Perimeter Wall"]'),
('Hill View Estate', 'hill-view', 'Maryland, Enugu South', 'Elevated residential estate with stunning hillside views. Low-density with generous plot sizes.', 50, 30, 20, 8000000, 12000000, 'residential', 'active', '["Hill Views","Low Density","Natural Vegetation","Private Roads","Transformer","Borehole"]'),
('Top Hill Estate', 'top-hill', 'Golf Course Road, GRA, Enugu', 'Ultra-premium estate near the golf course. Diplomatic enclave proximity with underground utilities.', 35, 18, 17, 25000000, 32000000, 'residential', 'active', '["Golf Course","Diplomatic Zone","Underground Utilities","Mature Trees","Private Roads","24/7 Security"]'),
('New Town Estate', 'new-town', 'Obeagu, Enugu South', 'Emerging residential hub with affordable plots in rapidly urbanising corridor. Government road expansion underway.', 120, 82, 38, 3500000, 8000000, 'mixed', 'active', '["Affordable","Government Road","Shopping Centre","School Zone","Security","Drainage"]'),
('New Era Eastern City Garden', 'new-era-eastern', 'Enugu-Abakaliki Expressway, Enugu East', 'Expansive garden estate on Eastern corridor. Mixed-use with residential, commercial, and recreational zones.', 200, 140, 60, 5500000, 12000000, 'mixed', 'active', '["Expressway Access","Mixed Use","Recreational Zone","Gardens","Commercial Area","Security"]'),
('God''s Light Estate', 'gods-light', 'Ugwuaji, Enugu South', 'Faith-centered community with dedicated worship grounds, community garden, and children''s educational centre.', 75, 50, 25, 3000000, 4500000, 'residential', 'active', '["Worship Ground","Community Garden","Educational Centre","Affordable","Security","Paved Roads"]'),
('Unity Estate', 'unity-estate', 'Awgu Road, Awgu LGA, Enugu', 'Community-focused estate promoting unity with shared recreational facilities, community hall, and farming zone.', 85, 55, 30, 3500000, 6000000, 'mixed', 'active', '["Community Hall","Farming Zone","Recreation","Borehole","Solar Power","Security"]'),
('Tomorrow Is Here Estate', 'tomorrow-is-here', 'Iva Valley Road, Enugu North', 'Futuristic estate with smart infrastructure, solar-powered street lights, rainwater harvesting, and green building.', 70, 48, 22, 7500000, 10000000, 'residential', 'active', '["Solar Power","Rainwater Harvesting","Green Building","Smart Infrastructure","Nature Trails","CCTV"]'),
('Mass Housing Estate', 'mass-housing', 'Nkpokiti, Enugu East', 'Government mass housing initiative for civil servants and low-income earners. Subsidised pricing.', 250, 180, 70, 2000000, 2000000, 'residential', 'active', '["Government Subsidised","Affordable","Flexible Payment","Municipal Water","Roads","Security"]'),
('Innovation Estate', 'innovation-estate', 'Emene Industrial Corridor, Enugu East', 'Tech-industrial estate for innovation-driven businesses. Warehouse-ready plots and startup incubator zone.', 90, 62, 28, 8000000, 22000000, 'commercial', 'active', '["Tech Hub","Warehouse Ready","Incubator Zone","3-Phase Power","Fibre Optic","Heavy Vehicle Access"]'),
('Pitakwa Garden Estate', 'pitakwa-garden', 'Nike Road, Enugu East', 'Garden-themed estate with lush landscaping, botanical gardens, ornamental trees, and nature walking trails.', 85, 56, 29, 5500000, 7500000, 'residential', 'active', '["Botanical Garden","Nature Trails","Landscaping","Ornamental Trees","Fountain","Security"]');

-- Plots for Royal Gardens
INSERT INTO plots (estate_id, plot_number, plot_type, size_sqm, dimensions, price, status, survey_number) VALUES
(1, 'RG-001', 'residential', 460, '20m x 23m', 15000000, 'available', 'EN/IL/2024/001'),
(1, 'RG-002', 'residential', 460, '20m x 23m', 15000000, 'available', 'EN/IL/2024/002'),
(1, 'RG-003', 'corner', 520, '22m x 23.6m', 18500000, 'available', 'EN/IL/2024/003'),
(1, 'RG-004', 'residential', 460, '20m x 23m', 15000000, 'sold', 'EN/IL/2024/004'),
(1, 'RG-005', 'commercial', 680, '25m x 27.2m', 28000000, 'available', 'EN/IL/2024/005'),
(1, 'RG-006', 'residential', 460, '20m x 23m', 15000000, 'available', 'EN/IL/2024/006'),
(1, 'RG-007', 'residential', 460, '20m x 23m', 15000000, 'sold', 'EN/IL/2024/007'),
(1, 'RG-008', 'corner', 520, '22m x 23.6m', 18500000, 'available', 'EN/IL/2024/008');

-- Plots for Independence Heights
INSERT INTO plots (estate_id, plot_number, plot_type, size_sqm, dimensions, price, status, survey_number) VALUES
(2, 'IH-001', 'residential', 400, '18m x 22.2m', 10000000, 'available', 'EN/NH/2024/001'),
(2, 'IH-002', 'residential', 400, '18m x 22.2m', 10000000, 'sold', 'EN/NH/2024/002'),
(2, 'IH-003', 'commercial', 600, '24m x 25m', 18000000, 'available', 'EN/NH/2024/003'),
(2, 'IH-004', 'residential', 400, '18m x 22.2m', 10000000, 'available', 'EN/NH/2024/004'),
(2, 'IH-005', 'corner', 480, '20m x 24m', 14000000, 'available', 'EN/NH/2024/005');

-- Plots for Centenary City
INSERT INTO plots (estate_id, plot_number, plot_type, size_sqm, dimensions, price, status, survey_number) VALUES
(3, 'CC-001', 'residential', 500, '20m x 25m', 20000000, 'available', 'EN/CC/2024/001'),
(3, 'CC-002', 'residential', 500, '20m x 25m', 20000000, 'available', 'EN/CC/2024/002'),
(3, 'CC-003', 'corner', 600, '24m x 25m', 28000000, 'available', 'EN/CC/2024/003'),
(3, 'CC-004', 'commercial', 800, '28m x 28.5m', 45000000, 'sold', 'EN/CC/2024/004'),
(3, 'CC-005', 'residential', 500, '20m x 25m', 20000000, 'available', 'EN/CC/2024/005');

-- Plots for Green Valley
INSERT INTO plots (estate_id, plot_number, plot_type, size_sqm, dimensions, price, status, survey_number) VALUES
(4, 'GV-001', 'residential', 380, '17m x 22.3m', 7500000, 'available', 'EN/TE/2024/001'),
(4, 'GV-002', 'residential', 380, '17m x 22.3m', 7500000, 'sold', 'EN/TE/2024/002'),
(4, 'GV-003', 'residential', 380, '17m x 22.3m', 7500000, 'available', 'EN/TE/2024/003'),
(4, 'GV-004', 'corner', 440, '20m x 22m', 11000000, 'available', 'EN/TE/2024/004'),
(4, 'GV-005', 'residential', 380, '17m x 22.3m', 7500000, 'available', 'EN/TE/2024/005');

-- Projects
INSERT INTO projects (name, location, description, status, progress, budget, contractor, start_date, end_date) VALUES
('Coal City Smart Housing', 'Emene Industrial Layout', 'Construction of 500 affordable smart housing units with solar power and fibre optic connectivity.', 'ongoing', 65, 4500000000, 'Julius Berger Nig. Ltd', '2024-03-15', '2026-06-30'),
('Independence Layout Road Network', 'Independence Layout', 'Complete rehabilitation of 45km road network including drainage and street lighting.', 'ongoing', 40, 2800000000, 'RCC Nigeria Ltd', '2024-07-01', '2026-12-31'),
('Trans-Ekulu Estate Expansion', 'Trans-Ekulu', 'Development of 200 new residential plots with underground utilities.', 'planned', 10, 1200000000, 'TBA', '2025-06-01', '2027-03-31');

-- ════════════════════════════════════════
-- STORAGE BUCKET (for KYC documents)
-- ════════════════════════════════════════
-- NOTE: Create storage bucket manually in Supabase Dashboard:
-- Go to Storage > New Bucket > Name: "documents" > Public: ON

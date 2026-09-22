import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Store,
  Briefcase,
  Utensils,
  MessageSquare,
  Calendar,
  Settings,
  Plus,
  Search,
  Globe,
  Wifi,
  WifiOff,
  User,
  Users,
  Send,
  AlertTriangle,
  FileText,
  Filter,
  Eye,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  Download,
  Building,
  HeartHandshake,
  LogOut,
  ShieldCheck,
  KeyRound,
  Printer
} from 'lucide-react';
import { CouncilPitchModal } from './components/CouncilPitchModal';
import { LoginModal } from './components/LoginModal';
import { DigitalCardModal } from './components/DigitalCardModal';
import { ToastContainer, ToastMessage } from './components/Toast';


// --- Ismaili Jamati Colors ---
// Primary Green: #006A4E
// Primary Red: #8B1E2D
// Accent Gold: #D4AF37

export type Language = 'en' | 'gu' | 'fa' | 'ur' | 'lg' | 'sw';

export type UserRole = 'SUPER_ADMIN' | 'EXECUTIVE_ADMIN' | 'ASSIGNED_ADMIN' | 'MEMBER';

export interface Member {
  id: string;
  fullName: string;
  jamatkhana: string;
  phone: string;
  role: UserRole;
  cardNo: string;
  pin?: string;
  email?: string;
  joinedDate?: string;
  status?: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
}


export interface EatableItem {
  id: string;
  title: string;
  category: string;
  priceUgx: number;
  description: string;
  sellerName: string;
  sellerPhone: string;
  jamatkhana: string;
  isVegetarian: boolean;
  isHomeMade: boolean;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  orderNotice: string;
}

export interface ClassifiedAd {
  id: string;
  title: string;
  businessName: string;
  category: string;
  location: string;
  contactPhone: string;
  priceInfo: string;
  description: string;
  submittedBy: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  stipendUgx: string;
  description: string;
  requirements: string;
  contactEmail: string;
  postedBy: string;
  date: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  jamatkhana: string;
  date: string;
  isPinned: boolean;
  isOfficial: boolean;
}

export interface ChatMsg {
  id: string;
  channel: string;
  senderName: string;
  senderRole: UserRole;
  senderJamatkhana: string;
  text: string;
  timestamp: string;
}

export interface JamatEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  details: string;
}

// Translations mapping
const translations: Record<Language, Record<string, string>> = {
  en: {
    app_title: 'DARKHANA',
    tagline: 'Uganda Ismaili Community Jamatkhana',
    tab_notices: 'Notices',
    tab_eatables: 'Eatables',
    tab_ads: 'Directory',
    tab_jobs: 'Careers',
    tab_chat: 'Community Chat',
    tab_calendar: 'Calendar',
    tab_admin: 'Admin Hub',
    offline_badge: 'Offline Mode: Browsing local cached records',
    online_badge: 'Connected to Darkhana Live Sync',
    post_eatable: '+ Post Food / Kitchen',
    post_ad: '+ Post Business Ad',
    post_job: '+ Post Vacancy',
    call_seller: 'Call / Order',
    contact_business: 'Contact Business',
    apply_now: 'Apply for Role',
    pending_badge: 'Pending Review',
    approved_badge: 'Verified & Live',
    welcome: 'Ya Ali Madad'
  },
  gu: {
    app_title: 'ધારખાના',
    tagline: 'યુગાન્ડા ઇસ્માઇલી જમાતખાના પ્લેટફોર્મ',
    tab_notices: 'સૂચનાઓ',
    tab_eatables: 'વાનગીઓ / ખાણીપીણી',
    tab_ads: 'વ્યવસાય જાહેરાત',
    tab_jobs: 'નોકરી / કારકિર્દી',
    tab_chat: 'જમાતી ચેટ',
    tab_calendar: 'કેલેન્ડર',
    tab_admin: 'એડમિન કંટ્રોલ',
    offline_badge: 'ઑફલાઇન મોડ: સ્થાનિક સંગ્રહિત માહિતી ઉપલબ્ધ છે',
    online_badge: 'ધારખાના સાથે કનેક્ટેડ',
    post_eatable: '+ વાનગી મૂકો',
    post_ad: '+ વ્યવસાય જાહેરાત',
    post_job: '+ નોકરી મૂકો',
    call_seller: 'ઓર્ડર માટે કૉલ કરો',
    contact_business: 'સંપર્ક કરો',
    apply_now: 'અરજી કરો',
    pending_badge: 'ચકાસણી બાકી',
    approved_badge: 'મંજૂર અને લાઇવ',
    welcome: 'યા અલી મદદ'
  },
  fa: {
    app_title: 'دارخانه',
    tagline: 'جامعه اسماعیلی دارخانه اوگاندا',
    tab_notices: 'اطلاعیه‌ها',
    tab_eatables: 'غذا و خوراک',
    tab_ads: 'اعلانات تجارتی',
    tab_jobs: 'فرصت‌های شغلی',
    tab_chat: 'گفتگوی جمعی',
    tab_calendar: 'تقویم جماعت‌خانه',
    tab_admin: 'مرکز مدیریت',
    offline_badge: 'حالت آفلاین: مشاهده اطلاعات ذخیره شده',
    online_badge: 'متصل به دارخانه',
    post_eatable: '+ ثبت غذا',
    post_ad: '+ ثبت اعلان تجارتی',
    post_job: '+ ثبت شغل',
    call_seller: 'تماس / سفارش',
    contact_business: 'تماس با شرکت',
    apply_now: 'درخواست وظیفه',
    pending_badge: 'در انتظار تایید',
    approved_badge: 'تایید شده و فعال',
    welcome: 'یا علی مدد'
  },
  ur: {
    app_title: 'ڈارخانہ',
    tagline: 'یوگنڈا اسماعیلی جماعت پلیٹ فارم',
    tab_notices: 'اعلانات',
    tab_eatables: 'کھانے اور پکوان',
    tab_ads: 'کاروباری اشتہارات',
    tab_jobs: 'ملازمتیں',
    tab_chat: 'جماعتی گفتگو',
    tab_calendar: 'کیلنڈر',
    tab_admin: 'انتظامیہ کنٹرول',
    offline_badge: 'آف لائن موڈ: محفوظ شدہ ڈیٹا دستیاب ہے',
    online_badge: 'آن لائن منسلک',
    post_eatable: '+ کھانا شامل کریں',
    post_ad: '+ اشتہار لگائیں',
    post_job: '+ ملازمت پوسٹ کریں',
    call_seller: 'آرڈر کے لیے کال کریں',
    contact_business: 'رابطہ کریں',
    apply_now: 'درخواست دیں',
    pending_badge: 'زیرِ نظر ثانی',
    approved_badge: 'منظور شدہ',
    welcome: 'یا علی مدد'
  },
  lg: {
    app_title: 'DARKHANA',
    tagline: 'Ekibiina ky\'aba Ismaili mu Uganda',
    tab_notices: 'Amawulire',
    tab_eatables: 'Ebyokulya',
    tab_ads: 'Bizinensi',
    tab_jobs: 'Emirimu',
    tab_chat: 'Okwogerezeganya',
    tab_calendar: 'Enteekateeka',
    tab_admin: 'Abakulembeze',
    offline_badge: 'Wabweru wa yintaneeti: Byonna bikyaliwo',
    online_badge: 'Kikuutidwa bulungi ku Darkhana',
    post_eatable: '+ Teekayo emmere',
    post_ad: '+ Teekayo Bizinensi',
    post_job: '+ Teekayo Omulimu',
    call_seller: 'Kuba essimu',
    contact_business: 'Kuba Bizinensi',
    apply_now: 'Saba Omulimu',
    pending_badge: 'Bakyakebera',
    approved_badge: 'Kikkiriziddwa',
    welcome: 'Ya Ali Madad'
  },
  sw: {
    app_title: 'DARKHANA',
    tagline: 'Jumuiya ya Ismaili nchini Uganda',
    tab_notices: 'Matangazo',
    tab_eatables: 'Vyakula',
    tab_ads: 'Biashara',
    tab_jobs: 'Kazi',
    tab_chat: 'Gumzo la Jamat',
    tab_calendar: 'Kalenda',
    tab_admin: 'Usimamizi',
    offline_badge: 'Hali ya Nje ya Mtandao: Data imehifadhiwa',
    online_badge: 'Imeunganishwa na Darkhana',
    post_eatable: '+ Chapisha Chakula',
    post_ad: '+ Chapisha Biashara',
    post_job: '+ Chapisha Kazi',
    call_seller: 'Piga Simu Kuagiza',
    contact_business: 'Wasiliana na Biashara',
    apply_now: 'Omba Kazi',
    pending_badge: 'Inasubiri Uhakiki',
    approved_badge: 'Imethibitishwa',
    welcome: 'Ya Ali Madad'
  }
};

const UGANDA_JAMATKHANAS = [
  'Darkhana Kampala (Nakivubo / Old Kampala)',
  'Old Kampala Jamatkhana',
  'Nakasero Jamatkhana',
  'Jinja Jamatkhana',
  'Masaka Jamatkhana',
  'Mbale Jamatkhana',
  'Mbarara Jamatkhana',
  'Entebbe Jamatkhana'
];

const DEFAULT_MEMBERS: Member[] = [
  {
    id: 'user_mr_asif',
    fullName: 'Mr. Asif',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    phone: '+256 752 110022',
    role: 'EXECUTIVE_ADMIN',
    cardNo: 'UG-DKH-0001'
  },
  {
    id: 'user_zohora_jassani',
    fullName: 'Zohora Jassani',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    phone: '+256 701 445566',
    role: 'EXECUTIVE_ADMIN',
    cardNo: 'UG-DKH-0002'
  },
  {
    id: 'user_jubilee_it',
    fullName: 'Technical Jubilee IT (Superadmin)',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    phone: '+256 772 889900',
    role: 'SUPER_ADMIN',
    cardNo: 'UG-DKH-0000'
  },
  {
    id: 'user_alkarim_lakhani',
    fullName: 'Al-Karim Lakhani',
    jamatkhana: 'Nakasero Jamatkhana',
    phone: '+256 755 334411',
    role: 'MEMBER',
    cardNo: 'UG-NAK-1042'
  },
  {
    id: 'user_fatima_popat',
    fullName: 'Fatima Popat',
    jamatkhana: 'Old Kampala Jamatkhana',
    phone: '+256 702 998877',
    role: 'MEMBER',
    cardNo: 'UG-OKP-2089'
  }
];

// Safety moderation filter against prohibited language
const PROHIBITED_WORDS = [
  'racist', 'nigger', 'coon', 'chink', 'terrorist', 'kill', 'murder',
  'bomb', 'attack', 'idiot', 'moron', 'bastard', 'bitch', 'fuck', 'shit',
  'asshole', 'cunt', 'dick', 'pussy', 'whore', 'hate'
];

function checkContentSafety(text: string): { isSafe: boolean; reason?: string } {
  const lower = text.toLowerCase();
  for (const word of PROHIBITED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lower)) {
      return {
        isSafe: false,
        reason: `Your submission contains language ("${word}") not permitted under Darkhana Community Ethical Standards.`
      };
    }
  }
  return { isSafe: true };
}

export default function App() {
  // Session States
  const [currentMember, setCurrentMember] = useState<Member>(() => {
    const saved = localStorage.getItem('darkhana_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_MEMBERS[0]; // Default Mr. Asif
  });
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('darkhana_members');
    return saved ? JSON.parse(saved) : DEFAULT_MEMBERS;
  });
  const [isVerified, setIsVerified] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'notices' | 'eatables' | 'ads' | 'jobs' | 'chat' | 'calendar' | 'admin'>('notices');
  const [autoApprove, setAutoApprove] = useState(false);

  // Pitch, Auth, and Card Modals
  const [showCouncilPitchModal, setShowCouncilPitchModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDigitalCardModal, setShowDigitalCardModal] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Content States
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 'n1',
      title: 'Darkhana Kampala Daily Evening Dua & Majlis Program',
      content: 'Ya Ali Madad. All Jamati members in Greater Kampala are cordially invited to daily Evening Dua at 6:45 PM followed by Ghatpat ceremonies. Chandraat Majlis will be celebrated this Friday at Darkhana Kampala.',
      category: 'Official Darkhana',
      author: 'Mr. Asif (Executive Council)',
      jamatkhana: 'Darkhana Kampala',
      date: 'Today, 6:00 PM',
      isPinned: true,
      isOfficial: true
    },
    {
      id: 'n2',
      title: 'Ismaili CIVIC Uganda: Environmental Green Day at Nakasero',
      content: 'In alignment with the global Ismaili CIVIC initiative, volunteers from Darkhana, Old Kampala, and Nakasero Jamatkhanas are planting 500 indigenous trees along the Nakasero corridor this Saturday.',
      category: 'CIVIC & Khidmat',
      author: 'Zohora Jassani (Convenor)',
      jamatkhana: 'Darkhana Kampala',
      date: 'Yesterday',
      isPinned: true,
      isOfficial: true
    },
    {
      id: 'n3',
      title: 'Uganda Jamat Youth Sports & Badminton Tournament',
      content: 'Registration is now officially open for the inter-Jamatkhana badminton and carrom tournament held at the Darkhana Sports Complex. Open to ages 12 to 35.',
      category: 'Youth & Sports',
      author: 'Youth Volunteer Committee',
      jamatkhana: 'Old Kampala',
      date: '2 days ago',
      isPinned: false,
      isOfficial: true
    }
  ]);

  const [eatables, setEatables] = useState<EatableItem[]>([
    {
      id: 'e1',
      title: 'Crispy Punjabi Beef & Mutton Samosas (Dozen)',
      category: 'Samosas & Snacks',
      priceUgx: 35000,
      description: 'Handmade thin pastry filled with seasoned minced beef, fresh coriander, ginger, and green chilies. Fried fresh to order.',
      sellerName: 'Fatima Popat',
      sellerPhone: '+256 702 998877',
      jamatkhana: 'Old Kampala Jamatkhana',
      isVegetarian: false,
      isHomeMade: true,
      status: 'APPROVED',
      orderNotice: 'Order 4 hours ahead. Pickup at Jamatkhana or Kololo delivery.'
    },
    {
      id: 'e2',
      title: 'Hyderabadi Dum Chicken Biryani (Serves 4)',
      category: 'Biryani & Curries',
      priceUgx: 65000,
      description: 'Aromatic long-grain basmati rice layered with tender marinated chicken, saffron, fried onions, and served with raita and mirchi ka salan.',
      sellerName: 'Zainab Merchant',
      sellerPhone: '+256 774 223344',
      jamatkhana: 'Darkhana Kampala',
      isVegetarian: false,
      isHomeMade: true,
      status: 'APPROVED',
      orderNotice: 'Available Fridays & Sundays. Advance booking recommended.'
    },
    {
      id: 'e3',
      title: 'Pista & Kaju Barfi Mithai Box (1kg)',
      category: 'Mithai & Sweets',
      priceUgx: 50000,
      description: 'Traditional rich milk fudge prepared with pure ghee, crushed green pistachios, and roasted cashews. Perfect for Khushiali.',
      sellerName: 'Karim Home Kitchen',
      sellerPhone: '+256 751 667788',
      jamatkhana: 'Nakasero Jamatkhana',
      isVegetarian: true,
      isHomeMade: true,
      status: 'APPROVED',
      orderNotice: 'Order 1 day prior for fresh preparation.'
    },
    {
      id: 'e4',
      title: 'Authentic East African Mandazi & Chapati Pack',
      category: 'Chapatis & Mandazi',
      priceUgx: 20000,
      description: '10 soft layered chapatis and 8 fluffy cardamom mandazis, perfect for morning chai or evening Ghatpat pickup.',
      sellerName: 'Shamira Jivani',
      sellerPhone: '+256 700 882211',
      jamatkhana: 'Darkhana Kampala',
      isVegetarian: true,
      isHomeMade: true,
      status: 'PENDING',
      orderNotice: 'Freshly baked daily at 4:00 PM.'
    }
  ]);

  const [classifieds, setClassifieds] = useState<ClassifiedAd[]>([
    {
      id: 'c1',
      title: 'Jubilee Print Solutions - Offset & Digital Printing',
      businessName: 'Jubilee Print Works Ltd',
      category: 'Services & Trades',
      location: 'Plot 14 Jinja Road, Kampala',
      contactPhone: '+256 772 334455',
      priceInfo: 'Special 15% discount for Jamati businesses',
      description: 'High quality brochure printing, business cards, corporate stationery, banners, and packaging materials.',
      submittedBy: 'Salim Virani',
      status: 'APPROVED'
    },
    {
      id: 'c2',
      title: 'Kampala Eye & Optical Care Centre',
      businessName: 'Agape Vision Clinic',
      category: 'Healthcare',
      location: 'Nakasero Medical Plaza, Kampala',
      contactPhone: '+256 701 665544',
      priceInfo: 'Consultation UGX 40,000 / Free screening for seniors',
      description: 'Comprehensive eye examinations, designer frames, prescription lenses, and pediatric eye care.',
      submittedBy: 'Dr. Nazir Mawji',
      status: 'APPROVED'
    },
    {
      id: 'c3',
      title: 'Prime 3-Bedroom Apartment in Kololo for Rent',
      businessName: 'Kampala Heights Realty',
      category: 'Real Estate',
      location: 'Kololo, Kampala',
      contactPhone: '+256 755 990011',
      priceInfo: 'USD 1,800 / month (or UGX equivalent)',
      description: 'Modern furnished apartment with backup generator, 24/7 security, swimming pool, and 5 minutes to Darkhana.',
      submittedBy: 'Rahim Juma',
      status: 'PENDING'
    }
  ]);

  const [jobs, setJobs] = useState<JobListing[]>([
    {
      id: 'j1',
      title: 'Finance & Senior Accounts Manager',
      company: 'Victoria Commercial Distributors Ltd',
      location: 'Industrial Area, Kampala, Uganda',
      type: 'Full-Time',
      stipendUgx: 'UGX 3,500,000 - 4,800,000 / month',
      description: 'Oversee balance sheet reconciliations, VAT statutory filings with URA, internal audits, and team supervision.',
      requirements: 'Bachelor in Commerce/Finance or CPA/ACCA qualification. 4+ years accounting experience in Uganda.',
      contactEmail: 'careers@victoriadistributors.co.ug',
      postedBy: 'Mr. Asif (Executive Admin)',
      date: 'Posted 2 days ago'
    },
    {
      id: 'j2',
      title: 'Administrative & Communications Officer',
      company: 'Jamatkhana Institutional Secretariat',
      location: 'Darkhana Complex, Kampala',
      type: 'Full-Time',
      stipendUgx: 'UGX 2,200,000 / month',
      description: 'Managing Jamati communications, announcement scheduling, digital record-keeping, and event coordination.',
      requirements: 'Excellent command of English; knowledge of Gujarati is an added benefit. Proficient in MS Office and Google Workspace.',
      contactEmail: 'secretariat@darkhana.ug',
      postedBy: 'Zohora Jassani (Executive Admin)',
      date: 'Posted Yesterday'
    },
    {
      id: 'j3',
      title: 'Logistics & Dispatch Coordinator',
      company: 'Express Cargo Uganda',
      location: 'Bwaise / Kampala',
      type: 'Full-Time',
      stipendUgx: 'UGX 1,800,000 / month',
      description: 'Coordinating delivery van fleets, dispatch schedules, and inventory tracking for pharmaceutical goods.',
      requirements: 'Diploma in Logistics or related field with clean driving permit and 2+ years field experience.',
      contactEmail: 'dispatch@expresscargo.co.ug',
      postedBy: 'Mr. Asif (Executive Admin)',
      date: 'Posted Today'
    }
  ]);

  const [events, setEvents] = useState<JamatEvent[]>([
    {
      id: 'ev1',
      title: 'Daily Evening Dua & Ghatpat',
      category: 'Daily Prayer / Dua',
      date: 'Every Evening',
      time: '6:45 PM - 7:45 PM',
      location: 'All Uganda Jamatkhanas',
      details: 'Congregational evening prayers followed by community announcements and Sukrit distribution.'
    },
    {
      id: 'ev2',
      title: 'Subah Dua & Baitul Khayal',
      category: 'Daily Prayer / Dua',
      date: 'Daily Morning',
      time: '4:00 AM - 5:15 AM',
      location: 'Darkhana Kampala & Nakasero',
      details: 'Early morning meditation, dhikr, and morning prayer congregation.'
    },
    {
      id: 'ev3',
      title: 'Chandraat Majlis Celebration',
      category: 'Majlis',
      date: 'First Friday of Lunar Month',
      time: '6:30 PM - 8:30 PM',
      location: 'Darkhana Kampala Central Hall',
      details: 'Special Chandraat prayers, ginan recitations, and community gathering.'
    },
    {
      id: 'ev4',
      title: 'Ismaili CIVIC Uganda: Clean Water Initiative',
      category: 'Khidmat & Service',
      date: 'Next Sunday',
      time: '9:00 AM - 2:00 PM',
      location: 'Gaba Water Basin, Kampala',
      details: 'Voluntary service day delivering clean sanitation supplies and tree saplings with Uganda Scout volunteers.'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      channel: 'uganda_general',
      senderName: 'Mr. Asif',
      senderRole: 'EXECUTIVE_ADMIN',
      senderJamatkhana: 'Darkhana Kampala',
      text: 'Ya Ali Madad to all Uganda Jamat members! Welcome to our unified Darkhana digital space.',
      timestamp: '08:30 AM'
    },
    {
      id: 'm2',
      channel: 'uganda_general',
      senderName: 'Zohora Jassani',
      senderRole: 'EXECUTIVE_ADMIN',
      senderJamatkhana: 'Darkhana Kampala',
      text: 'Welcome everyone! We encourage home cooks and businesses to list their eatables and services here.',
      timestamp: '08:45 AM'
    },
    {
      id: 'm3',
      channel: 'uganda_general',
      senderName: 'Al-Karim Lakhani',
      senderRole: 'MEMBER',
      senderJamatkhana: 'Nakasero Jamatkhana',
      text: 'Ya Ali Madad! This app is wonderful. It makes keeping up with prayer timings and supporting Jamati food so easy.',
      timestamp: '09:12 AM'
    },
    {
      id: 'm4',
      channel: 'food_bazaar',
      senderName: 'Fatima Popat',
      senderRole: 'MEMBER',
      senderJamatkhana: 'Old Kampala Jamatkhana',
      text: 'Fresh samosas will be available today at Old Kampala Jamatkhana after evening dua. Please reserve early!',
      timestamp: '11:00 AM'
    }
  ]);

  // Modal Dialog States
  const [showPostNoticeModal, setShowPostNoticeModal] = useState(false);
  const [showPostEatableModal, setShowPostEatableModal] = useState(false);
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showRoleSwitchModal, setShowRoleSwitchModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);

  // Chat form state
  const [activeChannel, setActiveChannel] = useState('uganda_general');
  const [chatInput, setChatInput] = useState('');
  const [chatSafetyWarning, setChatSafetyWarning] = useState<string | null>(null);

  // Save to LocalStorage for offline persistence & real app durability
  useEffect(() => {
    localStorage.setItem('darkhana_current_user', JSON.stringify(currentMember));
  }, [currentMember]);

  useEffect(() => {
    localStorage.setItem('darkhana_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('darkhana_eatables', JSON.stringify(eatables));
  }, [eatables]);

  useEffect(() => {
    localStorage.setItem('darkhana_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('darkhana_classifieds', JSON.stringify(classifieds));
  }, [classifieds]);

  useEffect(() => {
    localStorage.setItem('darkhana_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const t = translations[lang] || translations.en;

  // Filtered Items based on status and role
  const isExecutive = currentMember.role === 'SUPER_ADMIN' || currentMember.role === 'EXECUTIVE_ADMIN' || currentMember.role === 'ASSIGNED_ADMIN';

  const visibleEatables = useMemo(() => {
    return eatables.filter(item => {
      if (isExecutive) return true;
      return item.status === 'APPROVED' || item.sellerName === currentMember.fullName;
    });
  }, [eatables, isExecutive, currentMember]);

  const visibleClassifieds = useMemo(() => {
    return classifieds.filter(ad => {
      if (isExecutive) return true;
      return ad.status === 'APPROVED' || ad.submittedBy === currentMember.fullName;
    });
  }, [classifieds, isExecutive, currentMember]);

  const pendingApprovalsCount = useMemo(() => {
    const pEatables = eatables.filter(e => e.status === 'PENDING').length;
    const pAds = classifieds.filter(a => a.status === 'PENDING').length;
    return pEatables + pAds;
  }, [eatables, classifieds]);

  // Handler for sending chat
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Safety check
    const check = checkContentSafety(chatInput);
    if (!check.isSafe) {
      setChatSafetyWarning(check.reason || 'Message violates Darkhana Community Standards.');
      return;
    }

    const newMsg: ChatMsg = {
      id: 'm_' + Date.now(),
      channel: activeChannel,
      senderName: currentMember.fullName,
      senderRole: currentMember.role,
      senderJamatkhana: currentMember.jamatkhana,
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
    setChatSafetyWarning(null);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F5] flex flex-col font-sans text-stone-900 selection:bg-[#006A4E] selection:text-white">
      
      {/* Top Navigation & Brand Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Identity */}
            <div className="flex items-center space-x-3">
              {/* Authentic Ismaili Emblem */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006A4E] to-[#004D38] p-0.5 shadow-xs flex items-center justify-center relative overflow-hidden">
                {/* Red accent band representing flag */}
                <div className="absolute inset-x-0 h-3 bg-[#8B1E2D] rotate-45 transform"></div>
                {/* Gold 8-pointed Islamic rosette */}
                <svg className="w-8 h-8 text-[#D4AF37] relative z-10" viewBox="0 0 100 100" fill="currentColor">
                  <polygon points="50,10 60,35 85,35 65,52 72,78 50,62 28,78 35,52 15,35 40,35" fill="#D4AF37" stroke="#FFF" strokeWidth="2" />
                  <circle cx="50" cy="50" r="10" fill="#006A4E" />
                  <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
                </svg>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-xl tracking-wider text-[#006A4E]">{t.app_title}</span>
                  <span className="bg-[#8B1E2D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">UGANDA</span>
                </div>
                <p className="text-xs text-stone-500 hidden sm:block">{t.tagline}</p>
              </div>
            </div>

            {/* Quick Actions: Offline Simulation, Language Switcher, Active Identity */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Offline Toggle Button */}
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isOffline
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
                title="Toggle offline data simulation"
              >
                {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="hidden md:inline">{isOffline ? 'Offline Cache' : 'Live Sync'}</span>
              </button>

              {/* Language Switcher Button */}
              <button
                onClick={() => setShowLanguageModal(true)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors border border-stone-200"
              >
                <Globe className="w-3.5 h-3.5 text-[#006A4E]" />
                <span className="uppercase">{lang}</span>
              </button>

              {/* Jamati Digital ID Card Trigger */}
              <button
                onClick={() => setShowDigitalCardModal(true)}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
                title="View your verified Jamati Digital ID Card"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#006A4E]" />
                <span>Jamati ID</span>
              </button>

              {/* Council Pitch Presentation Modal Trigger */}
              <button
                onClick={() => setShowCouncilPitchModal(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8B1E2D] text-white hover:bg-[#721724] transition-colors shadow-xs cursor-pointer"
                title="Council Proposal Presentation & Executive Briefing"
              >
                <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden md:inline">Council Pitch Brief</span>
                <span className="md:hidden">Pitch</span>
              </button>

              {/* Active Profile / Council Login & Switcher */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#006A4E] text-white hover:bg-[#00553E] transition-colors text-xs font-medium shadow-xs cursor-pointer"
                title="Click to Switch Account, Sign In, or View Credentials"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="max-w-[110px] truncate">{currentMember.fullName}</span>
                <ChevronDown className="w-3 h-3 text-emerald-200" />
              </button>
            </div>


          </div>
        </div>

        {/* Offline Notification Banner */}
        {isOffline && (
          <div className="bg-amber-100 border-t border-b border-amber-200 px-4 py-1.5 text-center text-xs font-medium text-amber-900 flex items-center justify-center space-x-2">
            <WifiOff className="w-4 h-4 text-amber-700" />
            <span>{t.offline_badge} — All Jamat announcements, eatables, directory, and prayer timings remain 100% accessible.</span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="bg-stone-50 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 overflow-x-auto py-1 scrollbar-none">
              
              <button
                onClick={() => setActiveTab('notices')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'notices'
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.tab_notices}</span>
              </button>

              <button
                onClick={() => setActiveTab('eatables')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'eatables'
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>{t.tab_eatables}</span>
                <span className="ml-1 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-semibold">{visibleEatables.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('ads')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'ads'
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>{t.tab_ads}</span>
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'jobs'
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{t.tab_jobs}</span>
                <span className="ml-1 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-semibold">{jobs.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'chat'
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.tab_chat}</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'calendar'
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{t.tab_calendar}</span>
              </button>

              {/* Admin Hub Tab */}
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'admin'
                    ? 'bg-[#8B1E2D] text-white shadow-xs'
                    : 'text-stone-600 hover:text-[#8B1E2D] hover:bg-red-50'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{t.tab_admin}</span>
                {pendingApprovalsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-full text-[10px] font-extrabold animate-bounce">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>

            </nav>
          </div>
        </div>
      </header>

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* --- TAB 1: NOTICES & ANNOUNCEMENTS --- */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            
            {/* Header / Welcome Banner */}
            <div className="bg-gradient-to-r from-[#006A4E] to-[#004D38] rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-200 font-semibold text-sm">{t.welcome},</span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">{currentMember.fullName}</h1>
                </div>
                <p className="text-emerald-100 text-xs mt-1">
                  Affiliated: <strong className="text-white">{currentMember.jamatkhana}</strong> • Role: <strong className="text-[#D4AF37]">{currentMember.role}</strong>
                </p>
              </div>

              {isExecutive && (
                <button
                  onClick={() => setShowPostNoticeModal(true)}
                  className="flex items-center space-x-2 bg-white text-[#006A4E] hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Jamat Notice</span>
                </button>
              )}
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                  <span>Official Darkhana Jamatkhana Notices</span>
                  <span className="text-xs font-normal text-stone-500">({notices.length} updates)</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notices.map(notice => (
                  <div
                    key={notice.id}
                    className={`bg-white rounded-xl p-5 border transition-shadow hover:shadow-xs flex flex-col justify-between ${
                      notice.isPinned ? 'border-amber-300 bg-amber-50/20' : 'border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2.5">
                        <span className="bg-emerald-100 text-[#006A4E] font-bold px-2 py-0.5 rounded text-[11px]">
                          {notice.category}
                        </span>
                        <span className="text-stone-400 text-[11px]">{notice.date}</span>
                      </div>
                      <h3 className="font-bold text-stone-900 text-base mb-2 leading-snug">{notice.title}</h3>
                      <p className="text-stone-600 text-xs leading-relaxed">{notice.content}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-stone-700">By: {notice.author}</span>
                      <span className="text-[11px]">{notice.jamatkhana}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 2: EATABLES MARKETPLACE --- */}
        {activeTab === 'eatables' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h1 className="text-lg font-extrabold text-stone-900 flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-[#006A4E]" />
                  <span>Jamat Eatables & Kitchen Bazaar</span>
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Order fresh samosas, biryani, sweets, and homemade dishes directly from Ismaili families in Uganda.
                </p>
              </div>

              <button
                onClick={() => setShowPostEatableModal(true)}
                className="flex items-center justify-center space-x-2 bg-[#006A4E] text-white hover:bg-[#00553E] px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t.post_eatable}</span>
              </button>
            </div>

            {/* Eatables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleEatables.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="bg-emerald-50 text-[#006A4E] font-bold px-2 py-0.5 rounded text-[11px]">
                        {item.category}
                      </span>
                      {item.status === 'APPROVED' ? (
                        <span className="flex items-center space-x-1 text-emerald-700 text-[11px] font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{t.approved_badge}</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">
                          <Clock className="w-3 h-3" />
                          <span>{t.pending_badge} (Mr. Asif / Zohora)</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-stone-900 text-base mb-1">{item.title}</h3>
                    <div className="text-lg font-extrabold text-[#006A4E] mb-2">
                      UGX {item.priceUgx.toLocaleString()}
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed mb-3">{item.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.isVegetarian && (
                        <span className="text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded">
                          Vegetarian
                        </span>
                      )}
                      {item.isHomeMade && (
                        <span className="text-[10px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                          Home Kitchen
                        </span>
                      )}
                      <span className="text-[10px] font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded">
                        Halal
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg mb-2">
                      <strong>Notice:</strong> {item.orderNotice}
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="truncate">
                      <p className="text-xs font-bold text-stone-800 truncate">{item.sellerName}</p>
                      <p className="text-[10px] text-stone-500 truncate">{item.jamatkhana}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`https://wa.me/${item.sellerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Ya Ali Madad ${item.sellerName}. I would like to order ${item.title} (UGX ${item.priceUgx.toLocaleString()}) via Darkhana Community Platform.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 bg-emerald-700 text-white hover:bg-emerald-800 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors"
                        title="Order directly via WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${item.sellerPhone}`}
                        className="flex items-center space-x-1 bg-[#006A4E] text-white hover:bg-[#00553E] px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>


                  {/* Admin Fast Approval Controls */}
                  {isExecutive && item.status === 'PENDING' && (
                    <div className="bg-amber-50 p-3 border-t border-amber-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">Admin Action Required:</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEatables(prev => prev.map(e => e.id === item.id ? { ...e, status: 'APPROVED' } : e));
                          }}
                          className="bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-emerald-800"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setEatables(prev => prev.map(e => e.id === item.id ? { ...e, status: 'REJECTED' } : e));
                          }}
                          className="bg-red-600 text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- TAB 3: BUSINESS CLASSIFIEDS --- */}
        {activeTab === 'ads' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h1 className="text-lg font-extrabold text-stone-900 flex items-center space-x-2">
                  <Store className="w-5 h-5 text-[#006A4E]" />
                  <span>Uganda Jamati Business Directory & Classifieds</span>
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Promote your trades, clinics, real estate, and professional services to Ismaili members.
                </p>
              </div>

              <button
                onClick={() => setShowPostAdModal(true)}
                className="flex items-center justify-center space-x-2 bg-[#006A4E] text-white hover:bg-[#00553E] px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t.post_ad}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {visibleClassifieds.map(ad => (
                <div key={ad.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="bg-emerald-50 text-[#006A4E] font-bold px-2 py-0.5 rounded text-[11px]">
                        {ad.category}
                      </span>
                      {ad.status === 'APPROVED' ? (
                        <span className="text-emerald-700 font-bold text-[11px]">✓ Verified Jamati Business</span>
                      ) : (
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">
                          ⏳ Pending Review
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-stone-900 text-base mb-1">{ad.title}</h3>
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[#006A4E] mb-2">
                      <Building className="w-3.5 h-3.5" />
                      <span>{ad.businessName}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-500 font-normal">{ad.location}</span>
                    </div>

                    <p className="text-stone-600 text-xs leading-relaxed mb-3">{ad.description}</p>
                    <div className="text-xs font-bold text-stone-800 bg-stone-50 p-2.5 rounded-lg mb-3">
                      Rate / Offer: <span className="text-[#006A4E]">{ad.priceInfo}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Listed by: {ad.submittedBy}</span>
                    <a
                      href={`tel:${ad.contactPhone}`}
                      className="flex items-center space-x-1 bg-[#006A4E] text-white hover:bg-[#00553E] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t.contact_business}</span>
                    </a>
                  </div>

                  {isExecutive && ad.status === 'PENDING' && (
                    <div className="bg-amber-50 p-3 mt-3 rounded-lg border border-amber-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">Admin Approval Needed:</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setClassifieds(prev => prev.map(a => a.id === ad.id ? { ...a, status: 'APPROVED' } : a));
                          }}
                          className="bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-emerald-800"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setClassifieds(prev => prev.map(a => a.id === ad.id ? { ...a, status: 'REJECTED' } : a));
                          }}
                          className="bg-red-600 text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- TAB 4: JOB ADVERTISEMENTS & CAREERS --- */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h1 className="text-lg font-extrabold text-stone-900 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-[#006A4E]" />
                  <span>Uganda Jamat Career & Employment Opportunities</span>
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Verified job vacancies posted by Mr. Asif and Zohora Jassani for Jamati professionals in Uganda.
                </p>
              </div>

              {isExecutive && (
                <button
                  onClick={() => setShowPostJobModal(true)}
                  className="flex items-center justify-center space-x-2 bg-[#006A4E] text-white hover:bg-[#00553E] px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.post_job}</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-100 text-[#006A4E] text-[11px] font-bold px-2 py-0.5 rounded">
                          {job.type}
                        </span>
                        <span className="text-stone-400 text-[11px]">{job.date}</span>
                      </div>
                      <h3 className="font-bold text-stone-900 text-lg mt-1">{job.title}</h3>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-[#006A4E]">{job.stipendUgx}</span>
                      <p className="text-[11px] text-stone-500">Approved by: {job.postedBy}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-stone-600 font-semibold mb-3">
                    <span className="flex items-center space-x-1">
                      <Building className="w-3.5 h-3.5 text-[#006A4E]" />
                      <span>{job.company}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{job.location}</span>
                    </span>
                  </div>

                  <p className="text-stone-700 text-xs leading-relaxed mb-3">{job.description}</p>

                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-100 mb-4">
                    <p className="text-[11px] font-bold text-stone-800 mb-1">Key Requirements:</p>
                    <p className="text-xs text-stone-600 leading-relaxed">{job.requirements}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <span className="text-xs text-stone-500">Contact: <strong>{job.contactEmail}</strong></span>
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="bg-[#006A4E] text-white hover:bg-[#00553E] px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      {t.apply_now}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- TAB 5: COMMUNITY CHAT (WITH COUNCIL COMMUNITY MODERATION) --- */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col h-[650px]">
            
            {/* Chat Topbar & Channels */}
            <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 overflow-x-auto">
                {[
                  { id: 'uganda_general', label: '# Uganda General Jamat' },
                  { id: 'darkhana_notices', label: '📢 Official Announcements' },
                  { id: 'food_bazaar', label: '🍲 Food & Bazaar Talk' },
                  { id: 'youth_volunteers', label: '🤝 Volunteers & Youth' }
                ].map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      activeChannel === ch.id
                        ? 'bg-[#006A4E] text-white'
                        : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
                    }`}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>

              {/* Ethical Standards Badge */}
              <div className="flex items-center space-x-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 self-start sm:self-auto">
                <Shield className="w-3.5 h-3.5 text-[#006A4E]" />
                <span className="font-semibold text-[11px]">Darkhana Ethics Filter Active (No racist/vulgar words)</span>
              </div>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFBF9]">
              <div className="text-center my-2">
                <span className="text-[10px] text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                  🔒 Restricted exclusively to verified Uganda Ismaili community members
                </span>
              </div>

              {chatMessages
                .filter(m => m.channel === activeChannel)
                .map(msg => {
                  const isMe = msg.senderName === currentMember.fullName;
                  const isExecutiveSender = msg.senderRole === 'EXECUTIVE_ADMIN' || msg.senderRole === 'SUPER_ADMIN';

                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center space-x-1.5 mb-1 text-[11px]">
                        <span className={`font-bold ${isExecutiveSender ? 'text-[#8B1E2D]' : 'text-[#006A4E]'}`}>
                          {msg.senderName}
                        </span>
                        {isExecutiveSender && (
                          <span className="bg-red-100 text-[#8B1E2D] font-extrabold px-1.5 py-0.2 rounded text-[9px]">
                            {msg.senderRole}
                          </span>
                        )}
                        <span className="text-stone-400">• {msg.senderJamatkhana}</span>
                      </div>

                      <div
                        className={`max-w-[80%] sm:max-w-md p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          isMe
                            ? 'bg-[#006A4E] text-white rounded-br-xs'
                            : 'bg-white text-stone-800 border border-stone-200 rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className={`block text-[9px] text-right mt-1 ${isMe ? 'text-emerald-200' : 'text-stone-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Safety Warning if triggered */}
            {chatSafetyWarning && (
              <div className="p-3 bg-red-50 border-t border-red-200 flex items-center space-x-2 text-xs text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span className="font-medium">{chatSafetyWarning}</span>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-stone-200 flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => {
                  setChatInput(e.target.value);
                  if (chatSafetyWarning) setChatSafetyWarning(null);
                }}
                placeholder={`Write message to ${activeChannel === 'darkhana_notices' ? 'leadership' : 'Jamat'}...`}
                className="flex-1 bg-stone-100 border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="bg-[#006A4E] hover:bg-[#00553E] text-white p-2.5 rounded-full shadow-xs transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* --- TAB 6: JAMATKHANA CALENDAR --- */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h1 className="text-lg font-extrabold text-stone-900 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#006A4E]" />
                <span>Uganda Jamatkhanas Prayer & Majlis Calendar</span>
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                Official prayer schedules for Darkhana Kampala, Old Kampala, Nakasero, Jinja, Masaka, Mbale, Mbarara, and Entebbe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map(ev => (
                <div key={ev.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="bg-emerald-50 text-[#006A4E] font-bold px-2 py-0.5 rounded text-[11px]">
                        {ev.category}
                      </span>
                      <span className="font-extrabold text-[#8B1E2D] text-xs">{ev.time}</span>
                    </div>

                    <h3 className="font-bold text-stone-900 text-base mb-1.5">{ev.title}</h3>
                    
                    <div className="flex items-center space-x-1.5 text-xs text-stone-600 font-semibold mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#006A4E]" />
                      <span>{ev.location}</span>
                    </div>

                    <p className="text-stone-600 text-xs leading-relaxed">{ev.details}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Schedule: <strong>{ev.date}</strong></span>
                    <span className="text-emerald-700 font-bold">✓ Confirmed</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- TAB 7: ADMIN HUB (MR. ASIF & ZOHORA JASSANI CONTROL) --- */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="bg-[#8B1E2D] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-amber-200 text-xs font-bold tracking-wider uppercase">Executive Control Center</span>
                <h1 className="text-xl sm:text-2xl font-black mt-0.5">Darkhana Leadership & Admin Delegation</h1>
                <p className="text-red-100 text-xs mt-1">
                  Empowering Mr. Asif, Zohora Jassani, and assigned staff to oversee Jamat notices, food listings, and approvals.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAutoApprove(!autoApprove)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    autoApprove
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {autoApprove ? '✓ Auto-Approve: ON' : 'Auto-Approve: OFF (Review Required)'}
                </button>
              </div>
            </div>

            {/* Pending Reviews Queue */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                  <span>Pending Moderation Queue</span>
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    {pendingApprovalsCount} Items
                  </span>
                </h2>
                <p className="text-xs text-stone-500">
                  {autoApprove ? 'New submissions currently auto-approve.' : 'Requires manual approval from Mr. Asif or Zohora.'}
                </p>
              </div>

              {pendingApprovalsCount === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-200">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-stone-800 text-sm">All clear! No pending submissions.</p>
                  <p className="text-xs text-stone-500 mt-1">Every food item and classified ad has been approved.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Pending Eatables */}
                  {eatables.filter(e => e.status === 'PENDING').map(e => (
                    <div key={e.id} className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.2 rounded">FOOD</span>
                          <h4 className="font-bold text-stone-900 text-sm">{e.title}</h4>
                          <span className="text-xs font-extrabold text-[#006A4E]">UGX {e.priceUgx.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">Submitted by: {e.sellerName} ({e.jamatkhana}) • {e.description}</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => {
                            setEatables(prev => prev.map(item => item.id === e.id ? { ...item, status: 'APPROVED' } : item));
                          }}
                          className="bg-emerald-700 text-white hover:bg-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setEatables(prev => prev.map(item => item.id === e.id ? { ...item, status: 'REJECTED' } : item));
                          }}
                          className="bg-stone-200 text-stone-700 hover:bg-red-100 hover:text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Pending Classifieds */}
                  {classifieds.filter(a => a.status === 'PENDING').map(a => (
                    <div key={a.id} className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.2 rounded">BUSINESS AD</span>
                          <h4 className="font-bold text-stone-900 text-sm">{a.title}</h4>
                          <span className="text-xs font-semibold text-stone-600">{a.businessName}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">Submitted by: {a.submittedBy} • {a.description}</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => {
                            setClassifieds(prev => prev.map(item => item.id === a.id ? { ...item, status: 'APPROVED' } : item));
                          }}
                          className="bg-emerald-700 text-white hover:bg-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setClassifieds(prev => prev.map(item => item.id === a.id ? { ...item, status: 'REJECTED' } : item));
                          }}
                          className="bg-stone-200 text-stone-700 hover:bg-red-100 hover:text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Delegation & Staff Assignment */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#006A4E]" />
                <span>Admin Assignment & Permissions</span>
              </h2>
              <p className="text-xs text-stone-500">
                You can assign members as <strong>Appointed Admins</strong> to help Mr. Asif and Zohora Jassani manage the community app.
              </p>

              <div className="divide-y divide-stone-100">
                {members.map(m => (
                  <div key={m.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-stone-900">{m.fullName}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          m.role === 'SUPER_ADMIN'
                            ? 'bg-purple-100 text-purple-900'
                            : m.role === 'EXECUTIVE_ADMIN'
                            ? 'bg-red-100 text-red-900'
                            : m.role === 'ASSIGNED_ADMIN'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {m.role}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">{m.jamatkhana} • {m.phone}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <select
                        value={m.role}
                        onChange={e => {
                          const newRole = e.target.value as UserRole;
                          setMembers(prev => prev.map(mem => mem.id === m.id ? { ...mem, role: newRole } : mem));
                        }}
                        className="text-xs border border-stone-200 rounded-lg px-2.5 py-1.5 bg-stone-50 font-semibold focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
                      >
                        <option value="EXECUTIVE_ADMIN">Executive Admin (Full Control)</option>
                        <option value="ASSIGNED_ADMIN">Appointed Admin (Employed)</option>
                        <option value="MEMBER">Regular Member</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Data Export & Reporting for Council Meeting */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#006A4E]" />
                  <span>Uganda Council Administrative Reports</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Export live registries of verified members, verified kitchens, and circulars for presentation to Mr. Asif and Zohora Jassani.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    const csvRows = [
                      ['Card No', 'Full Name', 'Role', 'Jamatkhana', 'Phone', 'Status'],
                      ...members.map(m => [m.cardNo, `"${m.fullName}"`, m.role, `"${m.jamatkhana}"`, m.phone, m.status || 'ACTIVE'])
                    ];
                    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', `Darkhana_Members_Registry_${new Date().toISOString().split('T')[0]}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    addToast('Registry Exported', 'Downloaded Uganda Jamat members CSV report.', 'success');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                >
                  <Download className="w-3.5 h-3.5 text-[#006A4E]" />
                  Export Member CSV
                </button>

                <button
                  onClick={() => setShowCouncilPitchModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8B1E2D] hover:bg-[#6e1823] text-white flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Open Council Deck
                </button>
              </div>
            </div>

          </div>
        )}

      </main>


      {/* --- MODAL: ROLE / PROFILE SWITCHER (FOR INSTANT DEMO & VERIFICATION) --- */}
      {showRoleSwitchModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[#006A4E]" />
                <h3 className="font-extrabold text-stone-900 text-base">Select Active Profile for Demo</h3>
              </div>
              <button onClick={() => setShowRoleSwitchModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500 mb-4">
              Switch easily between Mr. Asif, Zohora Jassani, the Superadmin, and regular Jamati members to test role-specific features.
            </p>

            <div className="space-y-2">
              {members.map(m => {
                const isSelected = m.id === currentMember.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setCurrentMember(m);
                      setShowRoleSwitchModal(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#006A4E] bg-emerald-50/50 shadow-2xs'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-stone-900">{m.fullName}</span>
                        <span className="text-[10px] font-extrabold text-[#006A4E] bg-emerald-100 px-2 py-0.2 rounded">
                          {m.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">{m.jamatkhana}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#006A4E]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: LANGUAGE SWITCHER --- */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-[#006A4E]" />
                <h3 className="font-extrabold text-stone-900 text-base">Select Language / ભાષા / زبان</h3>
              </div>
              <button onClick={() => setShowLanguageModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500 mb-4">
              Choose your preferred language for notices, tabs, and Jamat communication.
            </p>

            <div className="space-y-2">
              {[
                { code: 'en', name: 'English', native: 'English' },
                { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
                { code: 'fa', name: 'Dari / Afghan', native: 'دری' },
                { code: 'ur', name: 'Urdu / Hindi', native: 'اردو' },
                { code: 'lg', name: 'Luganda', native: 'Oluganda' },
                { code: 'sw', name: 'Swahili', native: 'Kiswahili' }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLang(item.code as Language);
                    setShowLanguageModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    lang === item.code
                      ? 'border-[#006A4E] bg-emerald-50 text-[#006A4E] font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50 font-medium'
                  }`}
                >
                  <span className="text-sm">{item.name} ({item.native})</span>
                  {lang === item.code && <Check className="w-4 h-4 text-[#006A4E]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: POST EATABLE --- */}
      {showPostEatableModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-stone-900 text-lg">Post Eatable or Kitchen Menu</h3>
              <button onClick={() => setShowPostEatableModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const price = Number((form.elements.namedItem('price') as HTMLInputElement).value);
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                const desc = (form.elements.namedItem('desc') as HTMLTextAreaElement).value;
                const notice = (form.elements.namedItem('notice') as HTMLInputElement).value;
                const isVeg = (form.elements.namedItem('isVeg') as HTMLInputElement).checked;

                // Jamati community standards check
                const check = checkContentSafety(title + ' ' + desc);
                if (!check.isSafe) {
                  addToast('Submission Rejected', check.reason || 'Item violates community guidelines.', 'error');
                  return;
                }

                const newItem: EatableItem = {
                  id: 'e_' + Date.now(),
                  title,
                  priceUgx: price,
                  category,
                  description: desc,
                  sellerName: currentMember.fullName,
                  sellerPhone: currentMember.phone,
                  jamatkhana: currentMember.jamatkhana,
                  isVegetarian: isVeg,
                  isHomeMade: true,
                  status: autoApprove || isExecutive ? 'APPROVED' : 'PENDING',
                  orderNotice: notice
                };

                setEatables(prev => [newItem, ...prev]);
                setShowPostEatableModal(false);
                addToast(
                  autoApprove || isExecutive ? 'Menu Item Published Live' : 'Submitted for Approval',
                  autoApprove || isExecutive ? 'Your food item is now available for ordering across Uganda Jamat.' : 'Submitted for review by Mr. Asif and Zohora Jassani.',
                  'success'
                );
              }}

              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-stone-800 block mb-1">Dish / Item Name</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Crispy Beef Samosas"
                  className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Category</label>
                  <select name="category" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none">
                    <option value="Samosas & Snacks">Samosas & Snacks</option>
                    <option value="Biryani & Curries">Biryani & Curries</option>
                    <option value="Mithai & Sweets">Mithai & Sweets</option>
                    <option value="Chapatis & Mandazi">Chapatis & Mandazi</option>
                    <option value="Restaurant & Catering">Restaurant & Catering</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Price in UGX</label>
                  <input
                    name="price"
                    type="number"
                    required
                    placeholder="e.g. 35000"
                    className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Description & Ingredients</label>
                <textarea
                  name="desc"
                  required
                  rows={3}
                  placeholder="Describe your dish, portion size, and flavor profile..."
                  className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Order & Delivery Notice</label>
                <input
                  name="notice"
                  defaultValue="Order 4 hours ahead. Pickup at Jamatkhana."
                  className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" name="isVeg" id="vegCheck" className="rounded text-[#006A4E]" />
                <label htmlFor="vegCheck" className="font-semibold text-stone-700">Vegetarian Preparation</label>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-stone-500 text-[11px]">
                {autoApprove ? 'Auto-approval is enabled: Your listing will appear live immediately.' : 'Submissions are verified by Mr. Asif and Zohora Jassani before publication.'}
              </div>

              <button
                type="submit"
                className="w-full bg-[#006A4E] hover:bg-[#00553E] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                Submit Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: POST ADVERTISEMENT --- */}
      {showPostAdModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-stone-900 text-lg">Post Jamati Business Advertisement</h3>
              <button onClick={() => setShowPostAdModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const bName = (form.elements.namedItem('bName') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                const loc = (form.elements.namedItem('loc') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                const priceInfo = (form.elements.namedItem('priceInfo') as HTMLInputElement).value;
                const desc = (form.elements.namedItem('desc') as HTMLTextAreaElement).value;

                const check = checkContentSafety(title + ' ' + bName + ' ' + desc);
                if (!check.isSafe) {
                  addToast('Ad Rejected', check.reason || 'Content violates community standards.', 'error');
                  return;
                }

                const newAd: ClassifiedAd = {
                  id: 'c_' + Date.now(),
                  title,
                  businessName: bName,
                  category,
                  location: loc,
                  contactPhone: phone,
                  priceInfo,
                  description: desc,
                  submittedBy: currentMember.fullName,
                  status: autoApprove || isExecutive ? 'APPROVED' : 'PENDING'
                };

                setClassifieds(prev => [newAd, ...prev]);
                setShowPostAdModal(false);
                addToast(
                  autoApprove || isExecutive ? 'Ad Published Live' : 'Ad Submitted for Verification',
                  autoApprove || isExecutive ? 'Your classified listing is now visible to the Jamat.' : 'Listing submitted for verification by Mr. Asif and Zohora Jassani.',
                  'success'
                );
              }}

              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-stone-800 block mb-1">Headline</label>
                <input name="title" required placeholder="e.g. Quality Offset Printing & Packaging" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Business Name</label>
                  <input name="bName" required placeholder="e.g. Jubilee Solutions" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Category</label>
                  <select name="category" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none">
                    <option value="Services & Trades">Services & Trades</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Retail & Groceries">Retail & Groceries</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Location (Uganda)</label>
                  <input name="loc" defaultValue="Kampala, Uganda" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Contact Phone</label>
                  <input name="phone" defaultValue={currentMember.phone} className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Pricing / Rates</label>
                <input name="priceInfo" defaultValue="Contact for quote / 10% Jamati discount" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Description & Services</label>
                <textarea name="desc" required rows={3} placeholder="Describe services offered, opening hours..." className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#006A4E] hover:bg-[#00553E] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors">
                Submit Advertisement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: POST JOB (EXECUTIVE CONTROL) --- */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-stone-900 text-lg">Post Career Opportunity (Executive)</h3>
              <button onClick={() => setShowPostJobModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const company = (form.elements.namedItem('company') as HTMLInputElement).value;
                const loc = (form.elements.namedItem('loc') as HTMLInputElement).value;
                const type = (form.elements.namedItem('type') as HTMLSelectElement).value;
                const stipend = (form.elements.namedItem('stipend') as HTMLInputElement).value;
                const desc = (form.elements.namedItem('desc') as HTMLTextAreaElement).value;
                const reqs = (form.elements.namedItem('reqs') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;

                const newJob: JobListing = {
                  id: 'j_' + Date.now(),
                  title,
                  company,
                  location: loc,
                  type,
                  stipendUgx: stipend,
                  description: desc,
                  requirements: reqs,
                  contactEmail: email,
                  postedBy: currentMember.fullName,
                  date: 'Just now'
                };

                setJobs(prev => [newJob, ...prev]);
                setShowPostJobModal(false);
                addToast('Career Opportunity Live', 'Job posting is now published to the Uganda Jamat.', 'success');
              }}

              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-stone-800 block mb-1">Job Title</label>
                <input name="title" required placeholder="e.g. Accounts Supervisor" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Company / Institution</label>
                  <input name="company" required placeholder="e.g. Victoria Distributors" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Job Type</label>
                  <select name="type" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none">
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Khidmati / Volunteer">Khidmati / Volunteer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Location</label>
                  <input name="loc" defaultValue="Kampala, Uganda" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Stipend / Salary (UGX)</label>
                  <input name="stipend" defaultValue="UGX 2,500,000 / month" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Application Email / Phone</label>
                <input name="email" required defaultValue="careers@darkhana.ug" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Job Description</label>
                <textarea name="desc" required rows={3} placeholder="Roles, tasks, day-to-day responsibilities..." className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"></textarea>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Requirements</label>
                <input name="reqs" required placeholder="Education, years experience, languages..." className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
              </div>

              <button type="submit" className="w-full bg-[#006A4E] hover:bg-[#00553E] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors">
                Publish Opportunity
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: POST NOTICE (LEADERSHIP) --- */}
      {showPostNoticeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-stone-900 text-lg">Post Official Darkhana Notice</h3>
              <button onClick={() => setShowPostNoticeModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
                const isPinned = (form.elements.namedItem('isPinned') as HTMLInputElement).checked;

                const newNotice: Notice = {
                  id: 'n_' + Date.now(),
                  title,
                  category,
                  content,
                  author: currentMember.fullName,
                  jamatkhana: currentMember.jamatkhana,
                  date: 'Just now',
                  isPinned,
                  isOfficial: true
                };

                setNotices(prev => [newNotice, ...prev]);
                setShowPostNoticeModal(false);
                addToast('Official Circular Published', 'Announcement broadcasted to all Uganda Jamatkhanas.', 'success');
              }}

              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-stone-800 block mb-1">Notice Title</label>
                <input name="title" required placeholder="e.g. Chandraat Majlis Timings" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none" />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Category</label>
                <select name="category" className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none">
                  <option value="Official Darkhana">Official Darkhana</option>
                  <option value="CIVIC & Khidmat">CIVIC & Khidmat</option>
                  <option value="Youth & Sports">Youth & Sports</option>
                  <option value="Majlis & Prayers">Majlis & Prayers</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Announcement Details</label>
                <textarea name="content" required rows={4} placeholder="Full announcement text..." className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" name="isPinned" id="pinCheck" className="rounded text-[#006A4E]" />
                <label htmlFor="pinCheck" className="font-semibold text-stone-700">Pin to top of Darkhana feed</label>
              </div>

              <button type="submit" className="w-full bg-[#006A4E] hover:bg-[#00553E] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors">
                Publish Announcement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: APPLY FOR JOB --- */}
      {applyingJob && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-stone-900 text-base">Apply for {applyingJob.title}</h3>
              <button onClick={() => setApplyingJob(null)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-lg">
                <p className="font-bold text-stone-800">{applyingJob.company}</p>
                <p className="text-stone-500">{applyingJob.location} • {applyingJob.stipendUgx}</p>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Applicant Information</label>
                <p className="text-stone-700">{currentMember.fullName} ({currentMember.jamatkhana})</p>
                <p className="text-stone-500">Phone: {currentMember.phone}</p>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Cover Note / Qualifications</label>
                <textarea
                  rows={4}
                  defaultValue={`Ya Ali Madad. I am an Ismaili Jamati member affiliated with ${currentMember.jamatkhana}. I would like to submit my application for the ${applyingJob.title} position.`}
                  className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                ></textarea>
              </div>

              <button
                onClick={() => {
                  addToast('Application Transmitted', `Application successfully submitted to ${applyingJob.contactEmail}.`, 'success');
                  setApplyingJob(null);
                }}
                className="w-full bg-[#006A4E] hover:bg-[#00553E] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Send Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: COUNCIL PITCH PRESENTATION & BRIEF --- */}
      <CouncilPitchModal
        isOpen={showCouncilPitchModal}
        onClose={() => setShowCouncilPitchModal(false)}
      />


      {/* --- MODAL: COUNCIL & JAMAT AUTHENTICATION --- */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        members={members}
        onLogin={m => {
          setCurrentMember(m);
          addToast('Signed In Successfully', `Welcome, ${m.fullName}! Authenticated as ${m.role.replace('_', ' ')}.`, 'success');
        }}
        onRegister={newMember => {
          setMembers(prev => [newMember, ...prev]);
          setCurrentMember(newMember);
          addToast('Jamati Registration Complete', `Your card number is ${newMember.cardNo}. Welcome!`, 'success');
        }}
      />

      {/* --- MODAL: JAMATI DIGITAL ID CARD --- */}
      <DigitalCardModal
        isOpen={showDigitalCardModal}
        onClose={() => setShowDigitalCardModal(false)}
        member={currentMember}
      />

      {/* --- SYSTEM TOAST NOTIFICATIONS --- */}
      <ToastContainer
        toasts={toasts}
        onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-bold text-stone-700">Darkhana Ismaili Community Platform • Uganda Jamat</p>
          <p>Under the Executive Management of Mr. Asif & Zohora Jassani • Full Offline Support Active</p>
        </div>
      </footer>


    </div>
  );
}

import { Member, EatableItem, ClassifiedAd, JobListing, Notice, ChatMsg, JamatEvent, PrayerSchedule, Language } from '../types';

export const JAMATKHANAS = [
  'Darkhana Kampala (Nakivubo / Old Kampala)',
  'Old Kampala Jamatkhana',
  'Nakasero Jamatkhana',
  'Jinja Jamatkhana',
  'Masaka Jamatkhana',
  'Mbale Jamatkhana',
  'Mbarara Jamatkhana',
  'Entebbe Jamatkhana'
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'user_jubilee_it',
    fullName: 'Technical Jubilee IT (Lead Architect)',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    phone: '+256 772 889900',
    role: 'SUPER_ADMIN',
    cardNo: 'UG-DKH-0000',
    pin: '7860',
    email: 'technicaljubileeit@gmail.com',
    joinedDate: '2024-01-15',
    status: 'ACTIVE'
  },
  {
    id: 'user_mr_asif',
    fullName: 'Mr. Asif (Executive Council)',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    phone: '+256 752 110022',
    role: 'EXECUTIVE_ADMIN',
    cardNo: 'UG-DKH-0001',
    pin: '1234',
    email: 'asif.council@darkhana.ug',
    joinedDate: '2023-06-01',
    status: 'ACTIVE'
  },
  {
    id: 'user_zohora_jassani',
    fullName: 'Zohora Jassani (Council Convenor)',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    phone: '+256 701 445566',
    role: 'EXECUTIVE_ADMIN',
    cardNo: 'UG-DKH-0002',
    pin: '1234',
    email: 'zohora.jassani@darkhana.ug',
    joinedDate: '2023-06-01',
    status: 'ACTIVE'
  },
  {
    id: 'user_alkarim_lakhani',
    fullName: 'Al-Karim Lakhani',
    jamatkhana: 'Nakasero Jamatkhana',
    phone: '+256 755 334411',
    role: 'MEMBER',
    cardNo: 'UG-NAK-1042',
    pin: '1111',
    email: 'alkarim.lakhani@gmail.com',
    joinedDate: '2024-03-10',
    status: 'ACTIVE'
  },
  {
    id: 'user_fatima_popat',
    fullName: 'Fatima Popat',
    jamatkhana: 'Old Kampala Jamatkhana',
    phone: '+256 702 998877',
    role: 'MEMBER',
    cardNo: 'UG-OKP-2089',
    pin: '2222',
    email: 'fatima.popat@gmail.com',
    joinedDate: '2024-05-18',
    status: 'ACTIVE'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    circularNo: 'CIR-UG-2026-042',
    title: 'Darkhana Kampala Daily Evening Dua & Majlis Program',
    content: 'Ya Ali Madad. All Jamati members in Greater Kampala are cordially invited to daily Evening Dua at 6:45 PM followed by Ghatpat ceremonies. Chandraat Majlis will be celebrated this Friday at Darkhana Kampala. Members requiring transportation assistance can contact the Volunteer Corps.',
    category: 'Official Darkhana',
    author: 'Mr. Asif (Executive Council)',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    date: 'Today, 6:00 PM',
    isPinned: true,
    isOfficial: true
  },
  {
    id: 'n2',
    circularNo: 'CIR-UG-2026-041',
    title: 'Ismaili CIVIC Uganda: Environmental Green Day at Nakasero',
    content: 'In alignment with the global Ismaili CIVIC mandate, volunteers from Darkhana, Old Kampala, and Nakasero Jamatkhanas are planting 500 indigenous trees along the Nakasero green corridor this Saturday starting at 9:00 AM. Refreshments and equipment will be provided.',
    category: 'CIVIC & Khidmat',
    author: 'Zohora Jassani (Council Convenor)',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    date: 'Yesterday, 11:30 AM',
    isPinned: true,
    isOfficial: true
  },
  {
    id: 'n3',
    circularNo: 'CIR-UG-2026-039',
    title: 'Jinja & Masaka Jamatkhana Regional Outreach Visit',
    content: 'The National Council Leadership delegation will be visiting Jinja Jamatkhana on Saturday evening and Masaka Jamatkhana on Sunday morning for interactive Jamati sessions, youth career counseling, and senior welfare reviews.',
    category: 'Regional Council',
    author: 'Technical Jubilee IT (Lead Architect)',
    jamatkhana: 'Jinja Jamatkhana',
    date: '2 days ago',
    isPinned: false,
    isOfficial: true
  }
];

export const INITIAL_EATABLES: EatableItem[] = [
  {
    id: 'e1',
    title: 'Authentic Hyderabadi Chicken Dum Biryani',
    category: 'Hot Meals & Mains',
    priceUgx: 35000,
    description: 'Aromatic long-grain basmati rice layered with tender marinated chicken, pure saffron, caramelized onions, served with cooling mint raita and mirchi ka salan.',
    sellerName: 'Zainab Merchant',
    sellerPhone: '+256 772 123456',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    isVegetarian: false,
    isHomeMade: true,
    status: 'APPROVED',
    orderNotice: 'Available daily with 2-hour advance notice. Special weekend Jamati orders available.'
  },
  {
    id: 'e2',
    title: 'Golden Crispy Mutton & Veg Samosas (Plate of 10)',
    category: 'Snacks & Savouries',
    priceUgx: 20000,
    description: 'Traditional thin handmade pastry stuffed with mildly spiced minced beef or spiced potatoes/peas, deep fried to golden perfection with tangy tamarind chutney.',
    sellerName: 'Salima Jetha',
    sellerPhone: '+256 701 987654',
    jamatkhana: 'Old Kampala Jamatkhana',
    isVegetarian: false,
    isHomeMade: true,
    status: 'APPROVED',
    orderNotice: 'Fresh batches prepared daily at 4:30 PM for pickup after Dua.'
  },
  {
    id: 'e3',
    title: 'Pista & Kaju Barfi Traditional Mithai Box (1kg)',
    category: 'Mithai & Sweets',
    priceUgx: 45000,
    description: 'Rich royal confection prepared with whole mawa, premium pistachio nuts, cashews, and silver vark. Ideal for family celebrations, Khushiali, and gifts.',
    sellerName: 'Karim Nanji Sweets',
    sellerPhone: '+256 752 443322',
    jamatkhana: 'Nakasero Jamatkhana',
    isVegetarian: true,
    isHomeMade: true,
    status: 'APPROVED',
    orderNotice: 'Packaged in elegant gift boxes. Delivery available across Kampala.'
  },
  {
    id: 'e4',
    title: 'Freshly Rolled Theplas & Cardamom Chai Mandazi Pack',
    category: 'Breakfast & Bakery',
    priceUgx: 18000,
    description: '10 soft spiced fenugreek methi theplas and 8 fluffy cardamom mandazis. Perfect accompaniment for morning chai or evening Ghatpat gatherings.',
    sellerName: 'Farida Bhanji',
    sellerPhone: '+256 788 665544',
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    isVegetarian: true,
    isHomeMade: true,
    status: 'APPROVED',
    orderNotice: 'Freshly made each morning by 7:00 AM.'
  }
];

export const INITIAL_CLASSIFIEDS: ClassifiedAd[] = [
  {
    id: 'c1',
    title: 'Jubilee Star Hardware & Building Materials',
    businessName: 'Jubilee Star Ltd',
    category: 'Construction & Trade',
    location: 'Nakivubo Road, Kampala',
    contactPhone: '+256 772 554433',
    priceInfo: 'Wholesale & Retail Discounts for Jamat',
    description: 'Quality cement, reinforcement steel bars, sanitary fittings, electrical cables, and roofing sheets. Reliable site delivery across Kampala, Wakiso, and Mukono.',
    submittedBy: 'Shamsherali Somani',
    status: 'APPROVED'
  },
  {
    id: 'c2',
    title: 'Pearl Coast Pharmacy & Healthcare Center',
    businessName: 'Pearl Coast Pharma',
    category: 'Healthcare & Wellness',
    location: 'Plot 14 Buganda Road, Nakasero, Kampala',
    contactPhone: '+256 702 112233',
    priceInfo: 'Free Blood Pressure & Glucose Checks',
    description: 'Registered pharmacy with prescription medicines, imported supplements, infant nutrition, and home care supplies. Free doorstep delivery for senior Jamati citizens.',
    submittedBy: 'Dr. Noorudin Valani',
    status: 'APPROVED'
  },
  {
    id: 'c3',
    title: 'Crown Tailoring & Custom Sherwani / Safari Suits',
    businessName: 'Crown Master Tailors',
    category: 'Fashion & Tailoring',
    location: 'Luwum Street, Kampala',
    contactPhone: '+256 754 887766',
    priceInfo: 'Custom stitching from UGX 75,000',
    description: 'Specialists in Jamati dress codes, custom safari suits, blazer stitching, ladies salwar kameez, and choir uniform tailoring. 40 years of trusted experience.',
    submittedBy: 'Mohamed Kassam',
    status: 'APPROVED'
  }
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'j1',
    title: 'Junior Accounts Officer & Financial Analyst',
    company: 'Victoria Commercial Distributors Ltd',
    location: 'Industrial Area, 6th Street, Kampala',
    type: 'Full-time',
    stipendUgx: 'UGX 1,800,000 - 2,500,000 / month',
    description: 'Seeking a detail-oriented accounting professional with QuickBooks or Tally expertise to manage accounts payable, VAT filing, bank reconciliations, and inventory valuation.',
    requirements: 'B.Com or BBA with CPA/ACCA Level 2. Minimum 1-2 years experience in commercial distribution.',
    contactEmail: 'careers@victoriadistributors.co.ug',
    contactPhone: '+256 772 990011',
    postedBy: 'Hassan Virani (HR Director)',
    date: '3 days ago'
  },
  {
    id: 'j2',
    title: 'IT Systems & Network Support Engineer',
    company: 'Jubilee Digital Infrastructure',
    location: 'Nakasero, Kampala',
    type: 'Full-time',
    stipendUgx: 'UGX 2,200,000 - 3,000,000 / month',
    description: 'Responsible for maintaining office LAN/WAN networks, Windows/Linux server administration, cloud backups, and IT helpdesk support for 60+ workstations.',
    requirements: 'Diploma or Degree in Computer Science or IT. CCNA or CompTIA Network+ preferred. Strong troubleshooting skills.',
    contactEmail: 'technicaljubileeit@gmail.com',
    contactPhone: '+256 772 889900',
    postedBy: 'Technical Jubilee IT (Superadmin)',
    date: 'Yesterday'
  },
  {
    id: 'j3',
    title: 'Front Office Executive & Administrative Assistant',
    company: 'Aga Khan Education Services / Jamati Secretariat',
    location: 'Old Kampala Campus, Kampala',
    type: 'Full-time',
    stipendUgx: 'UGX 1,500,000 / month',
    description: 'Manage reception inquiries, correspondence, meeting scheduling, and support Jamati welfare registry records. Warm interpersonal skills and discretion required.',
    requirements: 'Strong proficiency in English; knowledge of Gujarati, Swahili or Luganda is an added asset. Excellent MS Office skills.',
    contactEmail: 'secretariat@darkhana.ug',
    contactPhone: '+256 701 445566',
    postedBy: 'Zohora Jassani (Council Convenor)',
    date: '4 days ago'
  }
];

export const INITIAL_CHAT_MSGS: ChatMsg[] = [
  {
    id: 'm1',
    channel: 'General Jamat',
    senderName: 'Mr. Asif (Executive Council)',
    senderRole: 'EXECUTIVE_ADMIN',
    senderJamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    text: 'Ya Ali Madad to all members of the Uganda Jamat. Welcome to the official Darkhana Digital Platform. Kindly review the updated Khane and Majlis schedule.',
    timestamp: '10:00 AM'
  },
  {
    id: 'm2',
    channel: 'General Jamat',
    senderName: 'Zohora Jassani (Council Convenor)',
    senderRole: 'EXECUTIVE_ADMIN',
    senderJamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    text: 'A reminder that registration for the Ismaili CIVIC Green Day is open under the Notices tab. Youth volunteers are warmly encouraged to lead the tree planting teams.',
    timestamp: '10:30 AM'
  },
  {
    id: 'm3',
    channel: 'Eatables & Kitchens',
    senderName: 'Zainab Merchant',
    senderRole: 'MEMBER',
    senderJamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    text: 'Ya Ali Madad! Fresh Hyderabadi Dum Biryani and Samosas are ready for collection at Darkhana canteen today after evening prayers.',
    timestamp: '11:15 AM'
  },
  {
    id: 'm4',
    channel: 'Youth & Careers',
    senderName: 'Technical Jubilee IT (Lead Architect)',
    senderRole: 'SUPER_ADMIN',
    senderJamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    text: 'Three new career vacancies have been published on the Careers board, including finance and IT positions. Please share with youth seeking opportunities in Kampala.',
    timestamp: '11:45 AM'
  }
];

export const INITIAL_EVENTS: JamatEvent[] = [
  {
    id: 'ev1',
    title: 'Daily Evening Dua & Ghatpat Service',
    category: 'Daily Prayer / Dua',
    date: 'Daily',
    time: '6:45 PM - 8:00 PM',
    location: 'Darkhana Kampala & Regional Jamatkhanas',
    details: 'Congregational evening prayers followed by community announcements and Sukrit distribution.'
  },
  {
    id: 'ev2',
    title: 'Subah Dua & Baitul Khayal Meditation',
    category: 'Daily Prayer / Dua',
    date: 'Daily Morning',
    time: '4:00 AM - 5:30 AM',
    location: 'Darkhana Kampala',
    details: 'Early morning meditation, dhikr, and morning prayer congregation.'
  },
  {
    id: 'ev3',
    title: 'Upcoming Chandraat Majlis & Community Feast',
    category: 'Special Majlis',
    date: 'This Friday',
    time: '6:30 PM - 9:00 PM',
    location: 'Darkhana Kampala Hall',
    details: 'Special Chandraat prayers, ginan recitations, and community gathering. All members and families warmly welcome.'
  },
  {
    id: 'ev4',
    title: 'Ismaili CIVIC Uganda: Environmental Green Day',
    category: 'Community Service',
    date: 'This Saturday',
    time: '9:00 AM - 1:00 PM',
    location: 'Nakasero Green Corridor',
    details: 'Voluntary community service day planting 500 indigenous trees with Ismaili Scout volunteers and youth.'
  }
];

export const PRAYER_SCHEDULES: PrayerSchedule[] = [
  {
    jamatkhana: 'Darkhana Kampala (Nakivubo / Old Kampala)',
    subahDua: '4:15 AM',
    subahBaitulKhayal: '4:00 AM',
    eveningDua: '6:45 PM',
    ghatpatTime: '7:15 PM',
    sukritDistribution: '7:30 PM',
    fridayMajlis: '6:30 PM'
  },
  {
    jamatkhana: 'Nakasero Jamatkhana',
    subahDua: '4:30 AM',
    subahBaitulKhayal: '4:15 AM',
    eveningDua: '6:45 PM',
    ghatpatTime: '7:15 PM',
    sukritDistribution: '7:30 PM',
    fridayMajlis: '6:30 PM'
  },
  {
    jamatkhana: 'Old Kampala Jamatkhana',
    subahDua: '4:30 AM',
    subahBaitulKhayal: '4:15 AM',
    eveningDua: '6:45 PM',
    ghatpatTime: '7:15 PM',
    sukritDistribution: '7:30 PM',
    fridayMajlis: '6:30 PM'
  },
  {
    jamatkhana: 'Jinja Jamatkhana',
    subahDua: '4:45 AM',
    subahBaitulKhayal: '4:30 AM',
    eveningDua: '7:00 PM',
    ghatpatTime: '7:25 PM',
    sukritDistribution: '7:40 PM',
    fridayMajlis: '6:45 PM'
  }
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    app_title: 'DARKHANA',
    tagline: 'His Highness Prince Aga Khan Shia Imami Ismaili Council for Uganda',
    sub_tagline: 'Official Darkhana Jamatkhana & Regional Jamat Portal',
    tab_notices: 'Notices & Circulars',
    tab_eatables: 'Eatables Market',
    tab_ads: 'Business Directory',
    tab_jobs: 'Careers & Jobs',
    tab_chat: 'Community Channels',
    tab_calendar: 'Khane Schedules',
    tab_admin: 'Executive Admin Hub',
    offline_badge: 'Offline Mode: Local Storage Active',
    online_badge: 'Council Server: Live Sync Active',
    post_eatable: '+ List Food / Kitchen',
    post_ad: '+ Register Business Ad',
    post_job: '+ Post Vacancy',
    call_seller: 'Call Kitchen',
    whatsapp_order: 'Order via WhatsApp',
    contact_business: 'Contact Business',
    apply_now: 'Apply for Role',
    pending_badge: 'Pending Council Review',
    approved_badge: 'Verified by Council',
    welcome: 'Ya Ali Madad',
    council_briefing: 'Council Pitch & Proposal',
    digital_card: 'Jamati Digital ID'
  },
  gu: {
    app_title: 'ધારખાના',
    tagline: 'યુગાન્ડા ઇસ્માઇલી જમાત કાઉન્સિલ પ્લેટફોર્મ',
    sub_tagline: 'સત્તાવાર ધારખાના જમાતખાના પોર્ટલ',
    tab_notices: 'સૂચનાઓ અને પરિપત્રો',
    tab_eatables: 'વાનગીઓ / ખાણીપીણી',
    tab_ads: 'વ્યવસાય ડિરેક્ટરી',
    tab_jobs: 'નોકરી / કારકિર્દી',
    tab_chat: 'જમાતી વાર્તાલાપ',
    tab_calendar: 'ખાને સમયપત્રક',
    tab_admin: 'એડમિન કંટ્રોલ હબ',
    offline_badge: 'ઑફલાઇન મોડ: સ્થાનિક ડેટા ઉપલબ્ધ છે',
    online_badge: 'કાઉન્સિલ સર્વર: સિંક ચાલુ છે',
    post_eatable: '+ વાનગી મૂકો',
    post_ad: '+ વ્યવસાય જાહેરાત',
    post_job: '+ નોકરી મૂકો',
    call_seller: 'કૉલ કરો',
    whatsapp_order: 'વોટ્સએપ ઓર્ડર',
    contact_business: 'સંપર્ક કરો',
    apply_now: 'અરજી કરો',
    pending_badge: 'ચકાસણી બાકી',
    approved_badge: 'કાઉન્સિલ મંજૂર',
    welcome: 'યા અલી મદદ',
    council_briefing: 'કાઉન્સિલ પ્રસ્તાવ',
    digital_card: 'ડિજિટલ જમાતી કાર્ડ'
  },
  fa: {
    app_title: 'دارخانه',
    tagline: 'شورای اسماعیلی برای اوگاندا',
    sub_tagline: 'پورتال رسمی دارخانه و جماعت‌خانه‌ها',
    tab_notices: 'اطلاعیه‌ها و احکام',
    tab_eatables: 'غذا و خوراک',
    tab_ads: 'راهنمای تجارتی',
    tab_jobs: 'فرصت‌های کاری',
    tab_chat: 'گفتگوهای جمعی',
    tab_calendar: 'اوقات دعا و برنامه‌ها',
    tab_admin: 'مرکز مدیریت شورا',
    offline_badge: 'حالت آفلاین فعال',
    online_badge: 'همگام‌سازی سرور شورا',
    post_eatable: '+ ثبت خوراک',
    post_ad: '+ ثبت اعلان',
    post_job: '+ ثبت کار',
    call_seller: 'تماس با آشپزخانه',
    whatsapp_order: 'سفارش واتساپ',
    contact_business: 'تماس تجارتی',
    apply_now: 'ارسال درخواست',
    pending_badge: 'در انتظار بررسی',
    approved_badge: 'تایید شده توسط شورا',
    welcome: 'یا علی مدد',
    council_briefing: 'طرح پیشنهادی شورا',
    digital_card: 'کارت دیجیتال جماعت'
  },
  ur: {
    app_title: 'ڈارخانہ',
    tagline: 'یوگنڈا اسماعیلی جماعت کونسل',
    sub_tagline: 'ڈارخانہ جماعت خانہ و علاقائی پورٹل',
    tab_notices: 'اعلانات و سرکلرز',
    tab_eatables: 'کھانے اور پکوان',
    tab_ads: 'کاروباری ڈائرکٹری',
    tab_jobs: 'ملازمت کے مواقع',
    tab_chat: 'کمیونٹی گفتگو',
    tab_calendar: 'دعاؤں کا شیڈول',
    tab_admin: 'ایڈمن کونسل ہب',
    offline_badge: 'آف لائن موڈ فعال',
    online_badge: 'کونسل سرور سے منسلک',
    post_eatable: '+ پکوان شامل کریں',
    post_ad: '+ اشتہار لگائیں',
    post_job: '+ ملازمت شامل کریں',
    call_seller: 'کال کریں',
    whatsapp_order: 'واٹس ایپ پر آرڈر',
    contact_business: 'رابطہ کریں',
    apply_now: 'درخواست دیں',
    pending_badge: 'زیرِ جائزہ',
    approved_badge: 'کونسل سے تصدیق شدہ',
    welcome: 'یا علی مدد',
    council_briefing: 'کونسل بریفنگ',
    digital_card: 'ڈیجیٹل شناختی کارڈ'
  },
  lg: {
    app_title: 'DARKHANA',
    tagline: 'Ekibiina ky\'aba Ismaili mu Uganda',
    sub_tagline: 'Darkhana Jamatkhana Portal',
    tab_notices: 'Amawulire',
    tab_eatables: 'Eby\'okulya n\'Ebyokunnywa',
    tab_ads: 'Bizinesi mu Jamat',
    tab_jobs: 'Emirimu',
    tab_chat: 'Emboozi z\'Abantu',
    tab_calendar: 'Ebiseera by\'Esaala',
    tab_admin: 'Abakulembeze b\'Olukiiko',
    offline_badge: 'Tewali yintaneeti: Byonna bikyaliwo',
    online_badge: 'Kwegatta ku Darkhana Server',
    post_eatable: '+ Teekako Eby\'okulya',
    post_ad: '+ Teekako Bizinesi',
    post_job: '+ Teekako Omulimu',
    call_seller: 'Kuba Essimu',
    whatsapp_order: 'Oda ku WhatsApp',
    contact_business: 'Kwatagana na Bizinesi',
    apply_now: 'Saba Omulimu',
    pending_badge: 'Kikyali mu Kwekenneenyezebwa',
    approved_badge: 'Kikkiriziddwa Olukiiko',
    welcome: 'Ya Ali Madad',
    council_briefing: 'Enteekateeka y\'Olukiiko',
    digital_card: 'Kaadi y\'Obwannannyini'
  },
  sw: {
    app_title: 'DARKHANA',
    tagline: 'Baraza la Jumuiya ya Ismaili Uganda',
    sub_tagline: 'Tovuti Rasmi ya Darkhana Jamatkhana',
    tab_notices: 'Matangazo Rasmi',
    tab_eatables: 'Soko la Vyakula vya Jamat',
    tab_ads: 'Biashara za Jamat',
    tab_jobs: 'Nafasi za Kazi',
    tab_chat: 'Mjadala wa Jamat',
    tab_calendar: 'Ratiba ya Maombi',
    tab_admin: 'Uongozi wa Baraza',
    offline_badge: 'Njia ya Nje ya Mtandao: Data Imehifadhiwa',
    online_badge: 'Imeunganishwa na Seva Kuu',
    post_eatable: '+ Weka Chakula',
    post_ad: '+ Weka Tangazo la Biashara',
    post_job: '+ Weka Nafasi ya Kazi',
    call_seller: 'Piga Simu',
    whatsapp_order: 'Agiza kupitia WhatsApp',
    contact_business: 'Wasiliana na Biashara',
    apply_now: 'Omba Kazi',
    pending_badge: 'Inasubiri Uhakiki',
    approved_badge: 'Imeidhinishwa na Baraza',
    welcome: 'Ya Ali Madad',
    council_briefing: 'Pendekezo kwa Baraza',
    digital_card: 'Kadi ya Kidijitali ya Jamat'
  }
};

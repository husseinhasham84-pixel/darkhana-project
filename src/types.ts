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
  status?: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED';
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
  imageUrl?: string;
  createdAt?: string;
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
  createdAt?: string;
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
  contactPhone?: string;
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
  circularNo?: string;
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

export interface PrayerSchedule {
  jamatkhana: string;
  subahDua: string;
  subahBaitulKhayal: string;
  eveningDua: string;
  ghatpatTime: string;
  sukritDistribution: string;
  fridayMajlis: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  target: string;
  timestamp: string;
  details: string;
}

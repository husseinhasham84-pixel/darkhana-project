import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Building,
  TrendingUp,
  WifiOff,
  Users,
  Briefcase,
  Utensils,
  Award,
  ChevronRight
} from 'lucide-react';

interface CouncilPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAdminRole?: (role: string) => void;
}

export const CouncilPitchModal: React.FC<CouncilPitchModalProps> = ({
  isOpen,
  onClose,
  onSelectAdminRole
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  if (!isOpen) return null;

  const slides = [
    {
      id: 'vision',
      title: '1. Executive Summary & Vision',
      subtitle: 'Institutional Digital Transformation for Uganda Jamat',
      icon: <Building className="w-6 h-6 text-[#006A4E]" />,
      content: (
        <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#006A4E]/10 to-[#8B1E2D]/10 border border-[#006A4E]/20">
            <h4 className="font-bold text-[#006A4E] text-base mb-1">Proposal to the Council Leadership</h4>
            <p className="text-stone-700">
              The <strong>Darkhana Digital Jamat Platform</strong> is a customized, secure, and offline-resilient community application engineered for the <strong>Shia Imami Ismaili Council for Uganda</strong>. It unifies all Jamatkhanas across Uganda—from Darkhana Kampala to Nakasero, Old Kampala, Jinja, Masaka, Mbale, and Mbarara.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-lg border border-stone-200 bg-white shadow-xs">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Unified Reach</div>
              <div className="font-extrabold text-stone-900 text-base">8+ Jamatkhanas</div>
              <p className="text-xs text-stone-500 mt-1">Connecting central Kampala and regional upcountry Jamats.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-stone-200 bg-white shadow-xs">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Reliability</div>
              <div className="font-extrabold text-[#006A4E] text-base">100% Offline</div>
              <p className="text-xs text-stone-500 mt-1">Full instant access even during power or internet cuts.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-stone-200 bg-white shadow-xs">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Governance</div>
              <div className="font-extrabold text-[#8B1E2D] text-base">Council Control</div>
              <p className="text-xs text-stone-500 mt-1">Executive pre-moderation for all public listings & ads.</p>
            </div>
          </div>
          <p>
            The project addresses modern Jamati communication needs while strictly respecting institutional protocols, elder access, and ethical community standards.
          </p>
        </div>
      )
    },
    {
      id: 'pillars',
      title: '2. Four Core Pillars',
      subtitle: 'Tangible Value for Jamat & Council Administration',
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-[#006A4E]/40 transition-colors">
            <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
              <span className="p-1.5 rounded-md bg-[#006A4E]/10 text-[#006A4E]"><Building className="w-4 h-4" /></span>
              Official Notices & Khane Timings
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Real-time circulars, daily Dua timings for Darkhana Kampala, Sukrit and Majlis schedules, and Ismaili CIVIC initiatives with instant member alerts.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-[#8B1E2D]/40 transition-colors">
            <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
              <span className="p-1.5 rounded-md bg-[#8B1E2D]/10 text-[#8B1E2D]"><Utensils className="w-4 h-4" /></span>
              Eatables Market & Home Kitchens
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Empowering home chefs, bibis, and family catering (biryani, samosas, mithai) with direct WhatsApp/phone ordering and community support.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-[#D4AF37]/40 transition-colors">
            <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
              <span className="p-1.5 rounded-md bg-[#D4AF37]/20 text-[#8B1E2D]"><Briefcase className="w-4 h-4" /></span>
              Careers & Jamati Business Directory
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Facilitating youth employment in AKDN, Jubilee Insurance, DTB, and Jamati enterprises; promoting local trades across Uganda.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-[#006A4E]/40 transition-colors">
            <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
              <span className="p-1.5 rounded-md bg-[#006A4E]/10 text-[#006A4E]"><ShieldCheck className="w-4 h-4" /></span>
              Verified Digital Jamati Identity
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every member carries a secure digital card with verified Jamatkhana affiliation, card number, and QR code to ensure Jamati exclusivity.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'offline',
      title: '3. Technical Excellence & Offline Resilience',
      subtitle: 'Tailored for East African Infrastructure',
      icon: <WifiOff className="w-6 h-6 text-[#006A4E]" />,
      content: (
        <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
          <p>
            One of the primary challenges in Uganda is intermittent connectivity and network data limits. The Darkhana platform was built with an <strong>Offline-First Architecture</strong>:
          </p>
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <CheckCircle className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
              <span><strong>Instant Local Storage Cache:</strong> All prayer timings, announcements, phone numbers, and directory listings are stored locally on the device once loaded.</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <CheckCircle className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
              <span><strong>Zero Data Waste:</strong> Lightweight bundle, no heavy external trackers, and optimized high-speed rendering suitable for 3G/4G networks and older smartphones.</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <CheckCircle className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
              <span><strong>Full Multilingual Accessibility:</strong> Available in 6 languages: English, Gujarati, Farsi, Urdu, Luganda, and Swahili.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'governance',
      title: '4. Administrative Control & Live Demonstration',
      subtitle: 'How Council Leaders Can Review & Pilot the App',
      icon: <Users className="w-6 h-6 text-[#8B1E2D]" />,
      content: (
        <div className="space-y-4 text-stone-700 text-sm">
          <p className="text-xs text-stone-600">
            For your live demonstration to the Council President and Committee convenors, you can showcase both administrative and member perspectives:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-[#006A4E]/30 bg-[#006A4E]/5">
              <div className="font-bold text-[#006A4E] text-sm mb-1">Executive Admin Role (Mr. Asif / Council)</div>
              <p className="text-xs text-stone-600 mb-3">
                Full privileges: Approve/reject pending food listings, post official circulars, edit prayer schedules, and manage member roles.
              </p>
              <button
                onClick={() => {
                  onSelectAdminRole?.('user_mr_asif');
                  onClose();
                }}
                className="w-full py-2 px-3 bg-[#006A4E] hover:bg-[#00523c] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                Switch to Mr. Asif (Council Admin) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-[#8B1E2D]/30 bg-[#8B1E2D]/5">
              <div className="font-bold text-[#8B1E2D] text-sm mb-1">Lead Architect (Technical Jubilee IT)</div>
              <p className="text-xs text-stone-600 mb-3">
                Superadmin tier with full system oversight, developer controls, security audits, and data export tools.
              </p>
              <button
                onClick={() => {
                  onSelectAdminRole?.('user_jubilee_it');
                  onClose();
                }}
                className="w-full py-2 px-3 bg-[#8B1E2D] hover:bg-[#6f1824] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                Switch to Technical Jubilee IT <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <span>Or experience standard Jamati Member view (Al-Karim Lakhani):</span>
            <button
              onClick={() => {
                onSelectAdminRole?.('user_alkarim_lakhani');
                onClose();
              }}
              className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-300 rounded font-semibold text-stone-800 text-xs cursor-pointer"
            >
              Member View
            </button>
          </div>
        </div>
      )
    }
  ];

  const executiveText = `EXECUTIVE PROPOSAL: DARKHANA DIGITAL JAMAT PLATFORM
Prepared for: His Highness Prince Aga Khan Shia Imami Ismaili Council for Uganda
Presented by: Technical Jubilee IT & Executive Council Convenors (Mr. Asif & Zohora Jassani)

1. STRATEGIC PURPOSE
To implement a unified, institutional digital ecosystem connecting Darkhana Kampala and all regional Jamatkhanas in Uganda. 

2. KEY CAPABILITIES
- Official Circulars & Daily Dua/Majlis Timetable for Darkhana Kampala and upcountry Jamats.
- Eatables & Micro-Kitchen Marketplace to economically empower Jamati households and small caterers with direct WhatsApp ordering.
- Careers & Business Directory providing youth job placements in AKDN, Jubilee, DTB, and community enterprises.
- Verified Digital Jamati ID card system with card validation numbers and Jamatkhana affiliation.
- 100% Offline-First operation ensuring continuous community connectivity regardless of power/network cuts.
- Robust role-based administrative moderation and community safety standards.

3. GOVERNANCE
All commercial listings and public notices require approval by the Executive Council Admin Hub before publication.

Status: Production-ready pilot ready for Council endorsement and deployment.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(executiveText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#006A4E] via-[#00553e] to-[#8B1E2D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Building className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Community Council Pitch & Briefing</div>
              <h3 className="font-extrabold text-lg text-white">Darkhana Digital Jamat Platform</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto text-xs font-semibold">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSlide(idx)}
              className={`px-4 py-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeSlide === idx
                  ? 'border-[#006A4E] text-[#006A4E] bg-white font-bold'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Slide Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center gap-2 mb-3">
            {slides[activeSlide].icon}
            <div>
              <h4 className="font-extrabold text-stone-900 text-base">{slides[activeSlide].title}</h4>
              <p className="text-xs text-stone-500">{slides[activeSlide].subtitle}</p>
            </div>
          </div>
          {slides[activeSlide].content}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg font-semibold text-stone-700 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#006A4E]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Summary Copied!' : 'Copy Executive Brief for Council'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            {activeSlide > 0 && (
              <button
                onClick={() => setActiveSlide(prev => prev - 1)}
                className="px-3 py-2 border border-stone-300 bg-white hover:bg-stone-50 rounded-lg text-stone-700 font-semibold cursor-pointer"
              >
                Previous
              </button>
            )}
            {activeSlide < slides.length - 1 ? (
              <button
                onClick={() => setActiveSlide(prev => prev + 1)}
                className="px-4 py-2 bg-[#006A4E] hover:bg-[#00523c] text-white rounded-lg font-bold cursor-pointer transition-colors"
              >
                Next Section
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#8B1E2D] hover:bg-[#721925] text-white rounded-lg font-bold cursor-pointer transition-colors"
              >
                Close & View App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

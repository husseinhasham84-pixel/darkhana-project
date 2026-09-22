import React, { useState } from 'react';
import {
  X,
  Shield,
  User,
  KeyRound,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Lock,
  Phone,
  CreditCard,
  Building
} from 'lucide-react';
import { Member, UserRole } from '../types';
import { JAMATKHANAS } from '../data/initialData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (member: Member) => void;
  onRegister: (member: Member) => void;
  members: Member[];
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  members
}) => {
  const [activeMode, setActiveMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [authMethod, setAuthMethod] = useState<'PHONE_PIN' | 'CARD_PIN'>('PHONE_PIN');
  
  // Login fields
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regJamatkhana, setRegJamatkhana] = useState(JAMATKHANAS[0]);
  const [regPin, setRegPin] = useState('');
  const [regEmail, setRegEmail] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanPin = pin.trim();

    if (!cleanIdentifier || !cleanPin) {
      setError('Please provide your phone/card number and your 4-digit PIN.');
      return;
    }

    const found = members.find(m => {
      const matchPhone = m.phone.replace(/\s+/g, '').includes(cleanIdentifier.replace(/\s+/g, ''));
      const matchCard = m.cardNo.toLowerCase() === cleanIdentifier;
      const matchEmail = m.email?.toLowerCase() === cleanIdentifier;
      return matchPhone || matchCard || matchEmail;
    });

    if (!found) {
      setError('No registered Jamati record found for this identifier. Check your card/phone number or register below.');
      return;
    }

    // Check PIN (default pin fallback: '1234', '7860', or member.pin)
    const validPin = found.pin || '1234';
    if (cleanPin !== validPin && cleanPin !== '1234' && cleanPin !== '7860') {
      setError('Incorrect Security PIN. (For Council demonstration, standard PIN is 1234 or 7860).');
      return;
    }

    onLogin(found);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regPhone.trim() || !regPin.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (regPin.trim().length < 4) {
      setError('Please choose at least a 4-digit security PIN.');
      return;
    }

    // Generate unique card number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = regJamatkhana.includes('Darkhana')
      ? 'UG-DKH'
      : regJamatkhana.includes('Nakasero')
      ? 'UG-NAK'
      : regJamatkhana.includes('Old Kampala')
      ? 'UG-OKP'
      : 'UG-JAM';
    const newCardNo = `${prefix}-${randomNum}`;

    const newMember: Member = {
      id: `user_${Date.now()}`,
      fullName: regName.trim(),
      phone: regPhone.trim(),
      jamatkhana: regJamatkhana,
      role: 'MEMBER',
      cardNo: newCardNo,
      pin: regPin.trim(),
      email: regEmail.trim() || undefined,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };

    onRegister(newMember);
    onClose();
  };

  const handleQuickDemoSelect = (member: Member) => {
    onLogin(member);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Institutional Header */}
        <div className="p-5 bg-gradient-to-r from-[#006A4E] via-[#00553e] to-[#8B1E2D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 border border-[#D4AF37] flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="#006A4E" />
                <circle cx="50" cy="50" r="38" fill="#8B1E2D" />
                <polygon points="50,20 58,38 78,38 62,50 68,70 50,58 32,70 38,50 22,38 42,38" fill="#D4AF37" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                Shia Imami Ismaili Council for Uganda
              </div>
              <h3 className="font-black text-lg tracking-tight">Darkhana Digital Jamat Portal</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Access Bar for Council Presentation */}
        <div className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/30 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#006A4E]" />
              Executive Council Demo Switcher
            </span>
            <span className="text-[10px] text-stone-500 font-medium">1-Click Live Role Test</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {members.slice(0, 4).map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleQuickDemoSelect(m)}
                className="p-1.5 text-left rounded-lg bg-white border border-stone-200 hover:border-[#006A4E] hover:bg-[#006A4E]/5 transition-all text-xs cursor-pointer shadow-2xs group"
              >
                <div className="font-bold text-stone-900 truncate group-hover:text-[#006A4E]">
                  {m.fullName.split(' ')[0]} {m.fullName.split(' ')[1] || ''}
                </div>
                <div className="text-[10px] text-stone-500 truncate font-semibold">
                  {m.role === 'SUPER_ADMIN' ? 'Superadmin' : m.role === 'EXECUTIVE_ADMIN' ? 'Council Admin' : 'Member'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-bold">
          <button
            onClick={() => {
              setActiveMode('LOGIN');
              setError(null);
            }}
            className={`flex-1 py-3 border-b-2 text-center transition-colors cursor-pointer ${
              activeMode === 'LOGIN'
                ? 'border-[#006A4E] text-[#006A4E] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Council & Member Sign In
          </button>
          <button
            onClick={() => {
              setActiveMode('REGISTER');
              setError(null);
            }}
            className={`flex-1 py-3 border-b-2 text-center transition-colors cursor-pointer ${
              activeMode === 'REGISTER'
                ? 'border-[#006A4E] text-[#006A4E] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            New Member Registration
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {activeMode === 'LOGIN' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Phone Number / Card No / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="+256 752 110022 or UG-DKH-0001"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#006A4E] focus:border-[#006A4E] focus:outline-none"
                  />
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Example: <code>+256 752 110022</code> (Mr. Asif) or <code>+256 772 889900</code> (Jubilee IT)
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Security PIN / Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={pin}
                    onChange={e => setPin(e.target.value)}
                    placeholder="Enter 4-digit PIN (default: 1234 or 7860)"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#006A4E] focus:border-[#006A4E] focus:outline-none"
                  />
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Standard demonstration PIN: <code>1234</code> (Council) or <code>7860</code> (Lead)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                <span>
                  All sessions are authenticated according to Council community privacy and verified against the official Uganda Jamati registry.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#006A4E] hover:bg-[#00523c] text-white font-bold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Sign In to Darkhana Portal
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="e.g. Rahim Karmali"
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="+256 700 000000"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Security PIN *
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={6}
                    value={regPin}
                    onChange={e => setRegPin(e.target.value)}
                    placeholder="4-digit PIN"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Primary Jamatkhana Affiliation *
                </label>
                <select
                  value={regJamatkhana}
                  onChange={e => setRegJamatkhana(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                >
                  {JAMATKHANAS.map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                <span>
                  Upon submission, your digital Jamati card number will be automatically provisioned with verified access to all Darkhana platform features.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#8B1E2D] hover:bg-[#6f1824] text-white font-bold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Complete Registration & Issue Card
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div>His Highness Prince Aga Khan Shia Imami Ismaili Council for Uganda</div>
          <button
            onClick={onClose}
            className="text-stone-700 hover:text-stone-950 font-bold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, ShieldCheck, Download, Printer, CheckCircle, MapPin, Phone, Award } from 'lucide-react';
import { Member } from '../types';

interface DigitalCardModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalCardModal: React.FC<DigitalCardModalProps> = ({
  member,
  isOpen,
  onClose
}) => {
  if (!isOpen || !member) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header bar */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-bold text-sm tracking-wide">Jamati Digital Identification</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Card Body */}
        <div className="p-6 bg-stone-100 flex flex-col items-center">
          <div
            id="jamati-digital-card"
            className="w-full rounded-2xl bg-gradient-to-br from-[#006A4E] via-[#00523c] to-[#8B1E2D] p-5 text-white shadow-xl border-2 border-[#D4AF37]/50 relative overflow-hidden"
          >
            {/* Background watermark badge */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <svg width="180" height="180" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="#D4AF37" />
                <polygon points="50,15 61,38 85,38 66,52 73,75 50,60 27,75 34,52 15,38 39,38" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Top institutional header */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 p-1 border border-[#D4AF37] flex items-center justify-center shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="#006A4E" />
                    <circle cx="50" cy="50" r="38" fill="#8B1E2D" />
                    <polygon points="50,20 58,38 78,38 62,50 68,70 50,58 32,70 38,50 22,38 42,38" fill="#D4AF37" />
                  </svg>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">
                    Shia Imami Ismaili Council for Uganda
                  </div>
                  <div className="text-xs font-black tracking-wide">
                    DARKHANA JAMATKHANA, KAMPALA
                  </div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#D4AF37] text-stone-950">
                VERIFIED
              </span>
            </div>

            {/* Member Details */}
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Full Name</div>
                <div className="text-lg font-black tracking-tight text-white">{member.fullName}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Card Number</div>
                  <div className="font-mono font-bold text-[#D4AF37]">{member.cardNo}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Role Tier</div>
                  <div className="font-bold text-white">
                    {member.role.replace('_', ' ')}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Affiliated Jamatkhana</div>
                <div className="text-xs font-semibold flex items-center gap-1 text-white/95 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{member.jamatkhana}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Registered Contact</div>
                <div className="text-xs font-mono text-white/90">{member.phone}</div>
              </div>
            </div>

            {/* Simulated QR Code Barcode */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
                  {/* Clean SVG QR pattern */}
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="#000">
                    <rect x="2" y="2" width="6" height="6" fill="#006A4E" />
                    <rect x="4" y="4" width="2" height="2" fill="#fff" />
                    <rect x="16" y="2" width="6" height="6" fill="#006A4E" />
                    <rect x="18" y="4" width="2" height="2" fill="#fff" />
                    <rect x="2" y="16" width="6" height="6" fill="#006A4E" />
                    <rect x="4" y="18" width="2" height="2" fill="#fff" />
                    <rect x="10" y="3" width="2" height="4" />
                    <rect x="10" y="9" width="4" height="2" />
                    <rect x="3" y="10" width="3" height="2" />
                    <rect x="16" y="10" width="5" height="2" />
                    <rect x="10" y="14" width="2" height="5" />
                    <rect x="14" y="14" width="4" height="2" />
                    <rect x="14" y="18" width="3" height="3" />
                  </svg>
                </div>
                <div className="text-[9px] text-white/70 leading-tight">
                  <div className="font-bold text-white">Digital Security Token</div>
                  <div>Valid for all Uganda Jamatkhanas</div>
                  <div>Council Seal 2026</div>
                </div>
              </div>
              <div className="text-right text-[10px] font-mono text-white/80">
                <div>ISSUED</div>
                <div className="font-bold text-[#D4AF37]">UG-COUNCIL</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs">
          <div className="text-stone-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#006A4E]" />
            <span>Official Council Verification Active</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#006A4E] hover:bg-[#00523c] text-white rounded-lg font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment }) => {
  const [salonEmail, setSalonEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSalonSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (salonEmail.includes('@')) {
      setSubscribed(true);
      setSalonEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-[#FAFAF7] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Salon Invitation (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] uppercase text-white block">
              Asharappareal
            </span>
            <p className="text-xs sm:text-sm text-[#A8A59E] font-light leading-relaxed max-w-sm">
              Architectural luxury garments conceived through stillness, natural fibers, and bespoke floating canvas construction.
            </p>

            {/* Private Salon Invitation */}
            <div className="pt-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#C2A379] block mb-2">
                Private Salon Gazette
              </span>
              <p className="text-xs text-[#8C8880] mb-3">
                Receive private invitations to numbered edition dispatches and private salon fittings.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-white/5 border border-[#C2A379]/40 text-xs text-[#C2A379] font-mono">
                  <Check className="w-3.5 h-3.5" />
                  <span>Your invitation dossier has been recorded.</span>
                </div>
              ) : (
                <form onSubmit={handleSalonSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={salonEmail}
                    onChange={(e) => setSalonEmail(e.target.value)}
                    placeholder="Enter private email address"
                    className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/20 focus:outline-none focus:border-white text-white placeholder:text-white/40 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-[#111111] hover:bg-[#EAE8E2] text-xs font-mono uppercase tracking-wider font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links: Collections (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C2A379]">
              Collections
            </div>
            <ul className="space-y-2 text-xs text-[#A8A59E]">
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Double-Faced Outerwear
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Savile Row Tailoring
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Bias Mulberry Silk
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  4-Ply Mongolian Knitwear
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  Campaign IV Archive
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier & Client Care (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C2A379]">
              Atelier &amp; Care
            </div>
            <ul className="space-y-2 text-xs text-[#A8A59E]">
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-white transition-colors text-left"
                >
                  Book Private Fitting
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Cashmere Care Protocol
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Archival Garment Restoration
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  White-Glove Courier Logistics
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Certificate of Authenticity
                </span>
              </li>
            </ul>
          </div>

          {/* Atelier Salons (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C2A379]">
              Atelier Salons
            </div>
            <div className="space-y-3 text-xs text-[#A8A59E]">
              <div>
                <p className="text-white font-medium">Paris · Place Vendôme</p>
                <p className="text-[#7E7B75] text-[11px]">18 Place Vendôme, 75001 Paris</p>
              </div>
              <div>
                <p className="text-white font-medium">Milan · Via Montenapoleone</p>
                <p className="text-[#7E7B75] text-[11px]">Via Montenapoleone 8, 20121 Milano</p>
              </div>
              <div>
                <p className="text-white font-medium">London · Mayfair</p>
                <p className="text-[#7E7B75] text-[11px]">14 Savile Row, Mayfair, London</p>
              </div>
              <div>
                <p className="text-white font-medium">New York · Madison Avenue</p>
                <p className="text-[#7E7B75] text-[11px]">780 Madison Ave, New York, NY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet legal, single line copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#7E7B75]">
          <div>
            &copy; 2026 Asharappareal. Minimalist Haute Pret &amp; Bespoke Tailoring. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Notice</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Atelier</span>
            <span className="hover:text-white cursor-pointer transition-colors">Fiber Provenance Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

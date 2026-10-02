import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { Product } from '../data/collections';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Paris, Place Vendôme');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('14:00');
  const [garmentsOfInterest, setGarmentsOfInterest] = useState(
    selectedProduct ? selectedProduct.name : 'The Monolith Cashmere Coat & Bespoke Suiting'
  );
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FAFAF7] w-full max-w-xl border border-[#D5D3CC] shadow-2xl p-6 sm:p-8 relative"
        >
          <button
            onClick={onClose}
            aria-label="Close salon modal"
            className="absolute top-4 right-4 p-2 text-[#7E7B75] hover:text-[#111111]"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-[#2E5A36] text-white rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#7E7B75]">
                Salon Reserved
              </div>
              <h3 className="font-serif text-2xl text-[#111111]">
                Atelier Fitting Scheduled
              </h3>
              <p className="text-xs text-[#5C5954] max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. Our head cutter in {city} has reserved your private suite for {date} at {time}.
                A bespoke fitting dossier has been dispatched to {email}.
              </p>
              <div className="p-4 bg-white border border-[#E5E4DE] text-left text-xs font-mono space-y-1">
                <div className="text-[#7E7B75]">Location: <span className="text-[#111111]">{city}</span></div>
                <div className="text-[#7E7B75]">Attending Master: <span className="text-[#111111]">Senior Sartorial Director</span></div>
                <div className="text-[#7E7B75]">Prepared Garments: <span className="text-[#111111]">{garmentsOfInterest}</span></div>
              </div>
              <button
                onClick={handleReset}
                className="mt-6 w-full py-3 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-widest hover:bg-[#2A2A2A]"
              >
                Close &amp; Return
              </button>
            </div>
          ) : (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7E7B75] mb-1">
                Private Consultation
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-2">
                Book a Private Atelier Fitting
              </h2>
              <p className="text-xs text-[#5C5954] font-light leading-relaxed mb-6">
                Experience our textiles in person with our master tailors. Complimentary personal measurement taking and silhouette adjustments.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Catherine Wright"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="catherine@domain.com"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Direct Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (212) 555-0149"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Atelier Location *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    >
                      <option value="Paris, Place Vendôme">Paris · Place Vendôme</option>
                      <option value="Milan, Via Montenapoleone">Milan · Via Montenapoleone</option>
                      <option value="London, Mayfair">London · Mayfair</option>
                      <option value="New York, Madison Avenue">New York · Madison Avenue</option>
                      <option value="Dubai, DIFC Gate Precinct">Dubai · DIFC Precinct</option>
                      <option value="Zurich, Bahnhofstrasse">Zurich · Bahnhofstrasse</option>
                      <option value="Tokyo, Ginza 6-chome">Tokyo · Ginza</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    >
                      <option value="11:00">11:00 AM (Morning Salon)</option>
                      <option value="14:00">02:00 PM (Afternoon Fitting)</option>
                      <option value="16:30">04:30 PM (Twilight Fitting)</option>
                      <option value="18:30">06:30 PM (Evening Reception)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                    Silhouettes or Fabrics of Particular Interest
                  </label>
                  <input
                    type="text"
                    value={garmentsOfInterest}
                    onChange={(e) => setGarmentsOfInterest(e.target.value)}
                    placeholder="e.g. Cashmere Coat in Oatmeal, Super 150s Blazer"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors"
                  >
                    Confirm Private Atelier Reservation
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

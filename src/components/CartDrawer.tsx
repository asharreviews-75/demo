import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, PackageCheck } from 'lucide-react';
import { Product, CURRENCIES } from '../data/collections';

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  monogram?: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  currency: typeof CURRENCIES[0];
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  // Checkout form fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [paymentOption, setPaymentOption] = useState<'card' | 'concierge' | 'wire'>('card');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  const formatPrice = (amount: number) => {
    const converted = Math.round(amount * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ASHAR10' || promoCode.trim().toUpperCase() === 'SALON10') {
      setDiscountPercent(10);
      setPromoMessage('Salon Member Privilege applied (-10%)');
    } else if (promoCode.trim().toUpperCase() === 'ARCHIVE15') {
      setDiscountPercent(15);
      setPromoMessage('Archival Collector Privilege applied (-15%)');
    } else {
      setPromoMessage('Unrecognized invitation code');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = `ASHAR-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderNumber(randomOrder);
    setOrderConfirmed(true);
    setIsCheckingOut(false);
  };

  const handleFinishConfirmation = () => {
    setOrderConfirmed(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-[#FAFAF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#D5D3CC] overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#E5E4DE] flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7E7B75]">
                Archival Vault
              </div>
              <h2 className="font-serif text-2xl text-[#111111]">Your Shopping Bag</h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-2 text-[#7E7B75] hover:text-[#111111] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {orderConfirmed ? (
              /* Order Confirmation Receipt */
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-[#2E5A36] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#7E7B75]">
                  Order Confirmed
                </div>
                <h3 className="font-serif text-2xl text-[#111111]">
                  Receipt for {confirmedOrderNumber}
                </h3>
                <p className="text-xs text-[#5C5954] max-w-sm mx-auto leading-relaxed">
                  Your piece has been reserved in our atelier ledger.
                  Our private client concierge will contact {clientEmail || 'you'} within 4 hours to verify garment measurements and dispatch logistics.
                </p>

                <div className="p-4 bg-white border border-[#E5E4DE] text-left text-xs font-mono space-y-1 mt-6">
                  <div className="flex justify-between text-[#7E7B75]">
                    <span>Reference:</span>
                    <span className="text-[#111111] font-semibold">{confirmedOrderNumber}</span>
                  </div>
                  <div className="flex justify-between text-[#7E7B75]">
                    <span>Settlement:</span>
                    <span className="text-[#111111]">{formatPrice(finalTotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#7E7B75]">
                    <span>Dispatch Mode:</span>
                    <span className="text-[#111111]">White-Glove Insured Air Courier</span>
                  </div>
                  <div className="flex justify-between text-[#7E7B75]">
                    <span>Archival Packaging:</span>
                    <span className="text-[#111111]">Signature Trunk &amp; Cedar Hanger</span>
                  </div>
                </div>

                <button
                  onClick={handleFinishConfirmation}
                  className="mt-6 w-full py-3 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors"
                >
                  Return to Asharappareal
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DE]">
                  <span className="font-serif text-lg text-[#111111]">Client &amp; Delivery Particulars</span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#7E7B75] hover:text-[#111111] underline"
                  >
                    Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                      Direct Contact / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 019-2831"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="Street, Suite or Residence"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-1">
                    City &amp; Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    placeholder="e.g. New York, NY 10021"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                {/* Settlement Method */}
                <div className="pt-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#7E7B75] font-mono mb-2">
                    Settlement Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Credit Card / Apple Pay' },
                      { id: 'concierge', label: 'Cash on Courier' },
                      { id: 'wire', label: 'Private Wire Transfer' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentOption(m.id as any)}
                        className={`p-2.5 text-center text-xs border transition-colors ${
                          paymentOption === m.id
                            ? 'bg-[#111111] text-[#FAFAF7] border-[#111111] font-medium'
                            : 'bg-white text-[#5C5954] border-[#D5D3CC] hover:border-[#111111]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E4DE]">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors"
                  >
                    Confirm Reservation &amp; Dispatch · {formatPrice(finalTotal)}
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty Bag State */
              <div className="py-20 text-center space-y-3">
                <p className="font-serif text-xl text-[#3A3834]">Your bag is currently vacant</p>
                <p className="text-xs text-[#7E7B75] max-w-xs mx-auto">
                  Explore our permanent and limited-edition collections to select an archival piece.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              /* Items List */
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white border border-[#EBEAE4] relative group"
                  >
                    <div className="w-20 aspect-[3/4] bg-[#F7F7F4] shrink-0 overflow-hidden border border-[#E5E4DE]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm text-[#111111] font-normal leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                            className="text-[#9C988F] hover:text-[#D9383A] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#7E7B75] font-mono mt-1 space-x-2">
                          <span>Size: {item.size}</span>
                          <span>·</span>
                          <span>Color: {item.color}</span>
                        </div>

                        {item.monogram && (
                          <div className="text-[10px] text-[#C2A379] font-mono mt-0.5">
                            Monogram: [{item.monogram}]
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F4F3EE]">
                        <div className="flex items-center border border-[#D5D3CC] bg-[#FAFAF7]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-[#7E7B75] hover:text-[#111111] hover:bg-[#EAE8E2] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono tabular-nums text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-[#7E7B75] hover:text-[#111111] hover:bg-[#EAE8E2] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-medium text-[#111111] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Privileges Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Salon Privilege Code (Try 'ASHAR10')"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111] uppercase tracking-wider font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#F4F4F0] border border-[#D5D3CC] hover:bg-[#EBE9E2] text-xs font-mono uppercase tracking-wider text-[#111111]"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] mt-1 font-mono ${discountPercent > 0 ? 'text-[#2E5A36]' : 'text-[#8C4A4A]'}`}>
                      {promoMessage}
                    </p>
                  )}
                </form>

                {/* Complimentary Packaging Note */}
                <div className="p-3 bg-[#F4F4F0] border border-[#E0DED7] text-xs text-[#5C5954] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#111111] font-medium text-[11px] uppercase tracking-wider">
                    <PackageCheck className="w-3.5 h-3.5 text-[#C2A379]" />
                    <span>Included with Every Piece</span>
                  </div>
                  <p className="text-[11px] text-[#7E7B75] leading-relaxed">
                    Custom-molded cedar wood coat hanger, breathable cotton-linen archival travel garment bag, and certificate of numbered authenticity.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action Bar */}
          {!orderConfirmed && items.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-[#E5E4DE] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#7E7B75] font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#111111] tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#2E5A36]">
                    <span>Salon Privilege (-{discountPercent}%)</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Insured Courier</span>
                  <span className="text-[#2E5A36] uppercase tracking-widest text-[11px]">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#111111] pt-2 border-t border-[#E5E4DE]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-[#111111] text-[#FAFAF7] hover:bg-[#282828] text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Private Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-center text-[10px] text-[#7E7B75] font-mono tracking-widest uppercase">
                Complimentary 14-Day Atelier Exchanges &amp; Returns
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

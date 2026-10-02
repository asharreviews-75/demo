import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, X, Calendar, Globe } from 'lucide-react';
import { CURRENCIES } from '../data/collections';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
  currency: typeof CURRENCIES[0];
  onSelectCurrency: (c: typeof CURRENCIES[0]) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAppointment,
  currency,
  onSelectCurrency,
  onSearchClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E5E4DE] py-4 shadow-xs'
          : 'bg-gradient-to-b from-[#FAFAF7]/90 to-transparent py-5 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-serif tracking-[0.28em] font-normal uppercase text-[#111111] hover:opacity-85 transition-opacity whitespace-nowrap"
        >
          Asharappareal
        </a>

        {/* Zone 2: Clean 4-6 nav links, single-line text links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.14em] uppercase text-[#4A4742]">
          <a
            href="#collections"
            className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
          >
            Collections
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
          >
            The Atelier
          </a>
          <a
            href="#lookbook"
            className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
          >
            Lookbook
          </a>
          <a
            href="#philosophy"
            className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
          >
            Philosophy
          </a>
          <button
            onClick={onOpenAppointment}
            className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
          >
            Private Fitting
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search Collection"
            className="p-1.5 text-[#3A3834] hover:text-[#111111] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="text-[12px] tracking-[0.08em] font-medium text-[#4A4742] hover:text-[#111111] flex items-center gap-1.5 py-1 px-2 border border-[#E5E4DE] rounded-none hover:border-[#111111] transition-colors"
              aria-label="Change currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#7E7B75]" />
              <span>{currency.code}</span>
            </button>

            {currencyDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-32 bg-[#FAFAF7] border border-[#E5E4DE] py-1 shadow-md z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onSelectCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex justify-between items-center transition-colors ${
                      currency.code === c.code
                        ? 'bg-[#111111] text-[#FAFAF7] font-medium'
                        : 'text-[#3A3834] hover:bg-[#F3F3EF]'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="font-mono text-[11px] opacity-75">{c.symbol.trim()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bag button with live item counter */}
          <button
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="flex items-center gap-2 py-1 px-3 bg-[#111111] text-[#FAFAF7] hover:bg-[#282828] transition-colors text-[12px] tracking-[0.1em] uppercase font-medium whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="tabular-nums font-mono text-[11px] px-1 bg-white/20 ml-0.5">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-[#111111]"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <div className="w-5 flex flex-col items-end gap-1.5">
              <span
                className={`h-[1px] bg-[#111111] transition-all duration-200 ${
                  mobileMenuOpen ? 'w-5 rotate-45 translate-y-[3.5px]' : 'w-5'
                }`}
              />
              <span
                className={`h-[1px] bg-[#111111] transition-all duration-200 ${
                  mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[3.5px]' : 'w-3.5'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#FAFAF7] border-b border-[#E5E4DE] px-6 py-6 shadow-xl flex flex-col gap-4">
          <a
            href="#collections"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.14em] uppercase text-[#111111] py-2 border-b border-[#F0EFEA]"
          >
            Collections
          </a>
          <a
            href="#craftsmanship"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.14em] uppercase text-[#111111] py-2 border-b border-[#F0EFEA]"
          >
            The Atelier
          </a>
          <a
            href="#lookbook"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.14em] uppercase text-[#111111] py-2 border-b border-[#F0EFEA]"
          >
            Lookbook
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.14em] uppercase text-[#111111] py-2 border-b border-[#F0EFEA]"
          >
            Philosophy
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAppointment();
            }}
            className="flex items-center gap-2 text-sm tracking-[0.14em] uppercase text-[#111111] py-2 text-left"
          >
            <Calendar className="w-4 h-4 text-[#7E7B75]" />
            <span>Book Private Fitting</span>
          </button>
        </div>
      )}
    </header>
  );
};

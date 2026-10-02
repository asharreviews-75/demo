import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionShowcase } from './components/CollectionShowcase';
import { AtelierSection } from './components/AtelierSection';
import { LookbookSlider } from './components/LookbookSlider';
import { PhilosophySection } from './components/PhilosophySection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AppointmentModal } from './components/AppointmentModal';
import { CampaignFilmModal } from './components/CampaignFilmModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Product, PRODUCTS, CURRENCIES } from './data/collections';

export default function App() {
  // Application State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Seed one starter piece so the bag immediately has real interactive presence
    {
      id: 'ashar-coat-01-M-Oatmeal',
      product: PRODUCTS[0],
      size: 'M',
      color: 'Oatmeal Melange',
      quantity: 1,
      monogram: 'AA',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentGarment, setAppointmentGarment] = useState<Product | null>(null);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, monogram?: string) => {
    const itemKey = `${product.id}-${size}-${color}-${monogram || 'none'}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          size,
          color,
          monogram,
          quantity: 1,
        },
      ];
    });

    // Provide luxury feedback
    setToastMessage(`Reserved: ${product.name} (${size}) in Bag`);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenFittingForProduct = (product: Product) => {
    setAppointmentGarment(product);
    setIsAppointmentOpen(true);
  };

  const handleExplorePieceByName = (pieceName: string) => {
    const found = PRODUCTS.find((p) =>
      pieceName.toLowerCase().includes(p.name.toLowerCase().slice(0, 12))
    );
    if (found) {
      setSelectedProduct(found);
    } else {
      const el = document.getElementById('collections');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-[#FAFAF7]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#FAFAF7] px-4 py-3 border border-white/20 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-bottom-2 fade-in duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C2A379]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="underline uppercase tracking-wider text-[11px] text-[#C2A379] hover:text-white ml-2"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Navigation adhering to Top Bar Contract */}
      <Navbar
        cartCount={totalCartQuantity}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppointment={() => {
          setAppointmentGarment(null);
          setIsAppointmentOpen(true);
        }}
        currency={currency}
        onSelectCurrency={setCurrency}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('collections');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenFilm={() => setIsFilmOpen(true)}
        />

        {/* Collection Showcase with Interactive Filters & Elegance Micro-interactions */}
        <CollectionShowcase
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          currency={currency}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* The Atelier & Craftsmanship Section with Interactive Blueprint Hotspots */}
        <AtelierSection />

        {/* Runway & Movement Lookbook Gallery */}
        <LookbookSlider onExplorePiece={handleExplorePieceByName} />

        {/* Brand Philosophy: 3 Pillars */}
        <PhilosophySection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAppointment={() => {
          setAppointmentGarment(null);
          setIsAppointmentOpen(true);
        }}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
        onBookFitting={handleOpenFittingForProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        onClearCart={handleClearCart}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setAppointmentGarment(null);
        }}
        selectedProduct={appointmentGarment}
      />

      <CampaignFilmModal
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSearchQuerySubmit={(q) => setSearchQuery(q)}
      />
    </div>
  );
}

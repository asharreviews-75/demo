import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '../data/collections';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchQuerySubmit: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchQuerySubmit,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.colorName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  const handleQuickTag = (tag: string) => {
    setQuery(tag);
  };

  const handleViewAllFiltered = () => {
    onSearchQuerySubmit(query);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-start justify-center pt-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FAFAF7] w-full max-w-2xl border border-[#D5D3CC] shadow-2xl p-6 relative"
        >
          <button
            onClick={onClose}
            aria-label="Close search"
            className="absolute top-4 right-4 p-2 text-[#7E7B75] hover:text-[#111111]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-3 mb-6">
            <Search className="w-5 h-5 text-[#111111]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, cashmere, silk, tailoring..."
              className="w-full bg-transparent text-base sm:text-lg font-serif text-[#111111] focus:outline-none placeholder:text-[#A09D94]"
            />
          </div>

          {/* Quick Filter Inquiries */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-[#7E7B75]">
            <span className="font-mono uppercase text-[11px]">Popular Inquiries:</span>
            {['Double-Faced Cashmere', 'Mulberry Silk', 'Bespoke Blazer', 'Travertine', 'Knitwear'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickTag(tag)}
                className="px-2.5 py-1 bg-white border border-[#E0DED7] hover:border-[#111111] text-[#4A4742] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results */}
          {results.length > 0 ? (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="flex items-center gap-4 p-2.5 bg-white border border-[#EBEAE4] hover:border-[#111111] cursor-pointer transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-16 object-cover bg-[#F7F7F4]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#111111] truncate">{product.name}</p>
                    <p className="text-[11px] text-[#7E7B75] font-mono truncate">{product.fabric}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7E7B75] mr-2" />
                </div>
              ))}

              <button
                onClick={handleViewAllFiltered}
                className="w-full mt-4 py-2.5 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-widest font-medium hover:bg-[#2A2A2A] transition-colors"
              >
                Filter Full Catalogue by &ldquo;{query}&rdquo;
              </button>
            </div>
          ) : query.trim() ? (
            <div className="py-8 text-center text-xs text-[#7E7B75]">
              No pieces found matching &ldquo;{query}&rdquo;.
            </div>
          ) : null}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

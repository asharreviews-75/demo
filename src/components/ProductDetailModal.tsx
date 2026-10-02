import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Shield, Clock, Scissors, Compass, Check, ArrowRight, Ruler } from 'lucide-react';
import { Product, CURRENCIES } from '../data/collections';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, monogram?: string) => void;
  currency: typeof CURRENCIES[0];
  onBookFitting: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currency,
  onBookFitting,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorName);
  const [isDraping, setIsDraping] = useState<boolean>(false);
  const [lightingTone, setLightingTone] = useState<'daylight' | 'chiaroscuro' | 'candlelight'>('daylight');
  const [monogramText, setMonogramText] = useState<string>('');
  const [showMonogramInput, setShowMonogramInput] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const formatPrice = (price: number) => {
    const converted = Math.round(price * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, monogramText ? monogramText.toUpperCase() : undefined);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const getLightingClass = () => {
    switch (lightingTone) {
      case 'chiaroscuro':
        return 'contrast-125 saturate-85 brightness-95';
      case 'candlelight':
        return 'sepia-[0.18] contrast-105 brightness-100';
      default:
        return 'contrast-100 brightness-100';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FAFAF7] w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-[#D5D3CC] shadow-2xl relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 z-30 p-2.5 bg-[#FAFAF7]/90 hover:bg-white text-[#111111] border border-[#E5E4DE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* Left 6-7 Cols: Cinematic Garment Canvas with Interactive Elegance Controls */}
            <div className="lg:col-span-6 bg-[#F2F1EC] p-6 lg:p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#E5E4DE]">
              {/* Top Controls: Interactive Drape & Lighting */}
              <div className="flex items-center justify-between gap-2 mb-4 z-20">
                <div className="flex items-center gap-1 bg-[#FAFAF7] p-1 border border-[#E0DED7] text-[11px]">
                  <span className="text-[#7E7B75] px-1.5 uppercase font-mono">Lighting:</span>
                  {(['daylight', 'chiaroscuro', 'candlelight'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLightingTone(mode)}
                      className={`px-2 py-0.5 uppercase tracking-wider capitalize transition-colors ${
                        lightingTone === mode ? 'bg-[#111111] text-white font-medium' : 'text-[#5C5954] hover:text-[#111111]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsDraping(!isDraping)}
                  className={`px-2.5 py-1 text-[11px] uppercase tracking-wider flex items-center gap-1.5 border transition-all ${
                    isDraping
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FAFAF7] text-[#333] border-[#E0DED7] hover:border-[#111111]'
                  }`}
                  title="Simulate fabric kinetics in motion"
                >
                  <Sparkles className="w-3 h-3 text-[#C2A379]" />
                  <span>{isDraping ? 'Drape Motion: On' : 'Simulate Drape'}</span>
                </button>
              </div>

              {/* Garment Image with Kinetic Motion Animation */}
              <div className="relative aspect-[3/4] overflow-hidden my-auto bg-white border border-[#E5E4DE]">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${getLightingClass()}`}
                  animate={
                    isDraping
                      ? {
                          scale: [1, 1.04, 1.02, 1],
                          y: [0, -6, 2, 0],
                          filter: [
                            'brightness(1)',
                            'brightness(1.05)',
                            'brightness(0.98)',
                            'brightness(1)',
                          ],
                        }
                      : {}
                  }
                  transition={
                    isDraping
                      ? {
                          repeat: Infinity,
                          duration: 4.8,
                          ease: 'easeInOut',
                        }
                      : { duration: 0.3 }
                  }
                />

                {/* Elegance Floating Metrics */}
                <div className="absolute bottom-3 inset-x-3 bg-black/65 backdrop-blur-md text-white p-3 border border-white/15 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider mb-1 text-[#E5D8C5]">
                    <span>{product.eleganceHighlights.tactility}</span>
                    <span>{product.eleganceHighlights.tailoringHours}h Hand-Tailored</span>
                  </div>
                  <p className="text-[12px] font-serif italic text-white/90 truncate">
                    &ldquo;{product.eleganceHighlights.drape}&rdquo;
                  </p>
                </div>
              </div>

              {/* Origin Stamp */}
              <div className="mt-4 pt-3 border-t border-[#E5E4DE] flex items-center justify-between text-[11px] text-[#7E7B75] uppercase font-mono">
                <span>Origin: {product.fabricOrigin}</span>
                <span>{product.edition}</span>
              </div>
            </div>

            {/* Right 6 Cols: Contiguous Purchase Module (PDP) */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#FAFAF7]">
              <div>
                {/* Header Information */}
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#7E7B75] mb-2 font-mono flex items-center gap-2">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.fabricWeight}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] leading-tight">
                  {product.name}
                </h2>

                <div className="mt-2 text-xl font-medium text-[#111111] font-mono tabular-nums">
                  {formatPrice(product.price)}
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#4A4742] leading-relaxed font-light">
                  {product.editorialNote}
                </p>

                {/* Color Selection */}
                <div className="mt-6 pt-5 border-t border-[#E5E4DE]">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="uppercase tracking-wider text-[#7E7B75] text-[11px]">Selected Hue:</span>
                    <span className="font-medium text-[#111111]">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.availableColors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 text-xs flex items-center gap-2 border transition-all ${
                          selectedColor === c.name
                            ? 'border-[#111111] bg-white text-[#111111] font-medium shadow-xs'
                            : 'border-[#E5E4DE] text-[#666] hover:border-[#999]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/15"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="uppercase tracking-wider text-[#7E7B75] text-[11px]">Atelier Sizing:</span>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[11px] underline text-[#5C5954] hover:text-[#111111] flex items-center gap-1 uppercase tracking-wider"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Dimensions &amp; Fit</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                          selectedSize === sz
                            ? 'bg-[#111111] text-[#FAFAF7] border-[#111111] font-medium'
                            : 'bg-white text-[#4A4742] border-[#E0DED7] hover:border-[#111111]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  {showSizeGuide && (
                    <div className="mt-3 p-3 bg-[#F4F4F0] border border-[#E0DED7] text-xs text-[#5C5954] animate-in fade-in duration-150">
                      <p className="font-medium text-[#111111] mb-1">Architectural Fit Guidance</p>
                      <p className="text-[11px] leading-relaxed">
                        Engineered with an intentional relaxed silhouette. If you prefer a tailored bespoke contour, we suggest sizing down.
                      </p>
                    </div>
                  )}
                </div>

                {/* Complimentary Monogramming Option */}
                <div className="mt-5 pt-4 border-t border-[#E5E4DE]">
                  <button
                    onClick={() => setShowMonogramInput(!showMonogramInput)}
                    className="text-[11px] uppercase tracking-wider text-[#5C5954] hover:text-[#111111] flex items-center justify-between w-full"
                  >
                    <span>+ Complimentary Archival Monogram (Blind-Embossed)</span>
                    <span className="text-[10px] text-[#7E7B75]">{showMonogramInput ? 'Hide' : 'Add'}</span>
                  </button>

                  {showMonogramInput && (
                    <div className="mt-2.5 flex items-center gap-2">
                      <input
                        type="text"
                        maxLength={3}
                        value={monogramText}
                        onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                        placeholder="E.g. AL"
                        className="w-24 px-3 py-1.5 text-xs bg-white border border-[#D5D3CC] focus:outline-none focus:border-[#111111] font-mono tracking-widest uppercase text-center"
                      />
                      <span className="text-[11px] text-[#7E7B75]">
                        Up to 3 initials embossed discreetly on interior lining.
                      </span>
                    </div>
                  )}
                </div>

                {/* Craftsmanship Specifications Accordion/Bullets */}
                <div className="mt-6 pt-5 border-t border-[#E5E4DE]">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#7E7B75] font-mono mb-2">
                    Sartorial Construction Details
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#4A4742]">
                    {product.craftsmanshipNotes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#C2A379] text-sm leading-none mt-0.5">·</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase Actions & White Glove Assurance */}
              <div className="mt-8 pt-5 border-t border-[#E5E4DE]">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 transition-all ${
                      addedSuccess
                        ? 'bg-[#2E5A36] text-white'
                        : 'bg-[#111111] text-[#FAFAF7] hover:bg-[#2A2A2A]'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Archival Bag</span>
                      </>
                    ) : (
                      <>
                        <span>Add to Bag</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{formatPrice(product.price)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onBookFitting(product);
                    }}
                    className="py-3.5 px-4 bg-transparent border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#FAFAF7] text-xs uppercase tracking-[0.14em] font-medium transition-colors whitespace-nowrap"
                  >
                    Book Private Fitting
                  </button>
                </div>

                {/* Trust and Delivery markers - Clean unboxed text */}
                <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] text-[#7E7B75] font-mono">
                  <span>Complimentary White-Glove Courier</span>
                  <span>Signature Garment Trunk Included</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

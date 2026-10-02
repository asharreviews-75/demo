import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ShoppingBag, Check, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { Product, PRODUCTS, CURRENCIES } from '../data/collections';

interface CollectionShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  currency: typeof CURRENCIES[0];
  searchQuery: string;
  onClearSearch: () => void;
}

export const CollectionShowcase: React.FC<CollectionShowcaseProps> = ({
  onSelectProduct,
  onAddToCart,
  currency,
  searchQuery,
  onClearSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState<string>('all');
  const [activeColorways, setActiveColorways] = useState<Record<string, string>>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Filter products based on category, fabric filter, and search query
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const matchesFabric =
      selectedFabricFilter === 'all' ||
      (selectedFabricFilter === 'cashmere' && item.fabric.toLowerCase().includes('cashmere')) ||
      (selectedFabricFilter === 'silk' && item.fabric.toLowerCase().includes('silk')) ||
      (selectedFabricFilter === 'wool' && item.fabric.toLowerCase().includes('wool'));

    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.silhouette.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesFabric && matchesSearch;
  });

  const handleColorSelect = (e: React.MouseEvent, productId: string, colorName: string) => {
    e.stopPropagation();
    setActiveColorways((prev) => ({ ...prev, [productId]: colorName }));
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const currentColor = activeColorways[product.id] || product.colorName;
    const defaultSize = product.sizes[1] || product.sizes[0]; // e.g. S or M
    onAddToCart(product, defaultSize, currentColor);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 2200);
  };

  const formatPrice = (price: number) => {
    const converted = Math.round(price * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <section id="collections" className="py-20 lg:py-28 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E5E4DE] pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#7E7B75] mb-2">
            <span>Catalogue 2026</span>
            <span aria-hidden="true">·</span>
            <span>Permanent &amp; Seasonal Editions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] tracking-tight">
            The Autumnal &amp; Archival Collection
          </h2>
          <p className="text-sm text-[#5C5954] mt-2 max-w-xl font-light">
            Each silhouette is conceived through architectural draping, removing non-essential seams to let pure natural fibers articulate structure.
          </p>
        </div>

        {/* Search Status & Clear */}
        {searchQuery && (
          <div className="flex items-center gap-3 bg-[#F4F4F0] px-3.5 py-2 text-xs border border-[#E5E4DE]">
            <span className="text-[#5C5954]">Filtering by: &ldquo;{searchQuery}&rdquo;</span>
            <button
              onClick={onClearSearch}
              className="font-medium underline hover:text-[#111111] uppercase tracking-wider text-[11px]"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar: Category Segmented Controls & Fabric Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4">
        {/* Category Tabs: Interactive Filter Controls as proper functional button elements */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4F4F0] border border-[#E8E6E0]">
          {[
            { id: 'all', label: 'All Silhouettes' },
            { id: 'outerwear', label: 'Coats & Trench' },
            { id: 'tailoring', label: 'Tailored Suiting' },
            { id: 'silk', label: 'Pure Mulberry Silk' },
            { id: 'knitwear', label: '4-Ply Knitwear' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 text-xs tracking-[0.08em] transition-colors whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'bg-[#111111] text-[#FAFAF7] font-medium shadow-xs'
                  : 'text-[#5C5954] hover:text-[#111111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fabric Micro-Filter */}
        <div className="flex items-center gap-3 text-xs text-[#7E7B75]">
          <span className="tracking-wider uppercase text-[11px] hidden md:inline">Material Fiber:</span>
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All Fibers' },
              { id: 'cashmere', label: 'Cashmere' },
              { id: 'silk', label: 'Mulberry Silk' },
              { id: 'wool', label: 'Super 150s Wool' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFabricFilter(f.id)}
                className={`px-2.5 py-1 text-xs border transition-colors ${
                  selectedFabricFilter === f.id
                    ? 'border-[#111111] text-[#111111] font-medium'
                    : 'border-[#E8E6E0] text-[#7E7B75] hover:border-[#BFBCB3]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Cards Grid: 3-column desktop layout with generous whitespace */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-[#DCDAD2] bg-[#F9F9F6]">
          <p className="font-serif text-xl text-[#3A3834] mb-2">No silhouettes match this inquiry</p>
          <p className="text-xs text-[#7E7B75] mb-4">Please adjust your fabric filter or keyword.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedFabricFilter('all');
              onClearSearch();
            }}
            className="px-4 py-2 bg-[#111111] text-[#FAFAF7] text-xs uppercase tracking-widest"
          >
            Show All Silhouettes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => {
            const currentColor = activeColorways[product.id] || product.colorName;
            const isHovered = hoveredProduct === product.id;
            const wasJustAdded = addedNotice === product.id;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer flex flex-col bg-white border border-[#EBEAE4] hover:border-[#111111]/40 transition-all duration-300 relative"
              >
                {/* Visual Area (Product Image occupies ~70% of card) */}
                <div className="relative aspect-[3/4] bg-[#F7F7F4] overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Soft Light Specular Shimmer on Hover - Highlights the drape & fabric sheen */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-white/0 via-white/10 to-amber-50/15 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Floating Edition Tag (Top-left, quiet text, no candy pill) */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] tracking-[0.14em] uppercase bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 font-mono">
                      {product.edition.replace('Limited run of ', 'Run: ')}
                    </span>
                  </div>

                  {/* Tailoring Hours Highlight (Top-right) */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] tracking-wider uppercase text-[#4A4742] bg-[#FAFAF7]/90 px-2 py-0.5 border border-[#E5E4DE] font-mono">
                      {product.eleganceHighlights.tailoringHours}h Atelier Handwork
                    </span>
                  </div>

                  {/* Quick Action Overlay (Slide-up on hover) */}
                  <div
                    className={`absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 transition-all duration-300 ${
                      isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="flex-1 py-2.5 px-3 bg-[#FAFAF7]/95 hover:bg-white text-[#111111] text-[11px] tracking-[0.12em] uppercase font-medium border border-[#D5D3CC] shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Piece</span>
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`py-2.5 px-3.5 text-[11px] tracking-[0.12em] uppercase font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
                        wasJustAdded
                          ? 'bg-[#2E5A36] text-white'
                          : 'bg-[#111111] hover:bg-[#2A2A2A] text-white'
                      }`}
                    >
                      {wasJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Editorial Content Area */}
                <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Quiet Unboxed Metadata */}
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#7E7B75] mb-2 font-mono">
                      <span>{product.category}</span>
                      <span>{product.fabricWeight}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif text-lg font-normal text-[#111111] leading-snug group-hover:text-[#4A4742] transition-colors">
                      {product.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-[#5C5954] mt-1 line-clamp-1 font-light">
                      {product.subtitle}
                    </p>

                    {/* Elegance Drape Note */}
                    <div className="mt-3 pt-3 border-t border-[#F2F1EC] flex items-center gap-2 text-xs text-[#6B6862]">
                      <Sparkles className="w-3 h-3 text-[#C2A379] shrink-0" />
                      <span className="truncate italic font-serif text-[13px]">
                        &ldquo;{product.eleganceHighlights.drape}&rdquo;
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Color Swatches & Price in Tabular Numerals */}
                  <div className="mt-5 pt-3 border-t border-[#F2F1EC] flex items-center justify-between">
                    {/* Available Colorway Dots */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {product.availableColors.map((col) => (
                        <button
                          key={col.name}
                          onClick={(e) => handleColorSelect(e, product.id, col.name)}
                          aria-label={`Select ${col.name}`}
                          className={`w-3.5 h-3.5 rounded-full border transition-all ${
                            currentColor === col.name
                              ? 'ring-1 ring-[#111111] ring-offset-1 scale-110'
                              : 'border-black/20 hover:scale-105'
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        />
                      ))}
                      <span className="text-[11px] text-[#7E7B75] ml-1.5 truncate max-w-[100px]">
                        {currentColor}
                      </span>
                    </div>

                    {/* Price baseline with Tabular Numerals */}
                    <div className="text-right">
                      <span className="text-sm font-medium text-[#111111] font-mono tabular-nums tracking-tight">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

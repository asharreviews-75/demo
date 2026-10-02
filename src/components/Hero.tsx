import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Sparkles, Eye, Sun, Moon, Play } from 'lucide-react';
import { heroImg } from '../data/collections';

interface HeroProps {
  onExploreClick: () => void;
  onOpenFilm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenFilm }) => {
  const [lightingMode, setLightingMode] = useState<'warm' | 'cool' | 'editorial'>('warm');
  const [isDraping, setIsDraping] = useState(false);

  // Lighting overlay styling
  const getLightingStyle = () => {
    switch (lightingMode) {
      case 'cool':
        return 'contrast-105 brightness-95 hue-rotate-[340deg] saturate-90';
      case 'editorial':
        return 'contrast-125 saturate-75 brightness-90';
      default:
        return 'contrast-100 brightness-100 saturate-100';
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-end pt-24 pb-12 sm:pb-16 overflow-hidden bg-[#FAFAF7]">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <motion.img
            src={heroImg}
            alt="Asharappareal Haute Minimalist Campaign"
            className={`w-full h-full object-cover object-center transition-all duration-1000 ${getLightingStyle()}`}
            initial={{ scale: 1.05, opacity: 0.8 }}
            animate={{
              scale: isDraping ? 1.08 : 1.01,
              opacity: 1,
            }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Measured Scrim for Media Overlays: Ensures WCAG AA legibility while letting fabric detail show */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/40 to-black/10" />

          {/* Subtle noise grain texture overlay for tactile fabric feeling */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: '4px 4px',
            }}
          />
        </div>
      </div>

      {/* Floating Lighting & Fabric Control Badge (Top Right) */}
      <div className="absolute top-24 right-6 sm:right-10 z-20 flex flex-col items-end gap-2 text-white/90">
        <div className="flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white">
          <button
            onClick={() => setLightingMode('warm')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
              lightingMode === 'warm' ? 'bg-white text-black font-medium' : 'text-white/70 hover:text-white'
            }`}
            title="Golden travertine natural light"
          >
            Solar Warm
          </button>
          <button
            onClick={() => setLightingMode('editorial')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
              lightingMode === 'editorial' ? 'bg-white text-black font-medium' : 'text-white/70 hover:text-white'
            }`}
            title="High-contrast studio lighting"
          >
            Editorial
          </button>
          <button
            onClick={() => setLightingMode('cool')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
              lightingMode === 'cool' ? 'bg-white text-black font-medium' : 'text-white/70 hover:text-white'
            }`}
            title="Cool twilight studio atmosphere"
          >
            Nocturne
          </button>
        </div>

        {/* Interactive Drape & Motion Highlight Toggle */}
        <button
          onClick={() => setIsDraping(!isDraping)}
          className={`px-3 py-1.5 backdrop-blur-md border text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all ${
            isDraping
              ? 'bg-white text-black border-white'
              : 'bg-black/40 text-white/90 border-white/20 hover:border-white/60'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#C2A379]" />
          <span>{isDraping ? 'Drape Motion: Active' : 'Highlight Fabric Elegance'}</span>
        </button>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Natural human editorial kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.2em] uppercase text-[#E5D8C5] mb-3">
            <span>Archive Edition IV</span>
            <span aria-hidden="true">·</span>
            <span>Handmade in Limited Runs</span>
            <span aria-hidden="true">·</span>
            <span>2026 Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-[-0.01em] leading-[1.08] text-balance mb-5">
            Forms Carved from Silence &amp; Architectural Drape
          </h1>

          <p className="text-sm sm:text-base text-[#D7D4CC] font-light leading-relaxed max-w-2xl mb-8">
            Asharappareal investigates the equilibrium between sculptural restraint and fluid movement.
            Tailored from pure Mongolian cashmere, Italian mulberry silk, and floating horsehair canvases.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 bg-white text-[#111111] hover:bg-[#F2EFEB] text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-sm flex items-center gap-2 group"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenFilm}
              className="px-6 py-3.5 border border-white/30 hover:border-white text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors backdrop-blur-xs flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Campaign Runway</span>
            </button>
          </div>
        </motion.div>

        {/* Bottom Editorial Strip - Clean unboxed metadata with typographic separators */}
        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 tracking-wider uppercase text-[11px]">
            <span>100% Grade-A Mongolian Cashmere</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Bespoke Savile Row Full Floating Canvas</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Mulberry Silk 22 Momme</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] tracking-widest text-[#E5D8C5] uppercase font-mono">
            <span>Edition 04 / 2026</span>
            <span>Worldwide White-Glove Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
};

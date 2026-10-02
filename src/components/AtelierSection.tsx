import React, { useState } from 'react';
import { motion } from 'motion/react';
import { atelierImg } from '../data/collections';
import { Compass, Sparkles, Check, ChevronRight } from 'lucide-react';

export const AtelierSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const HOTSPOTS = [
    {
      id: 0,
      title: '01. The Floating Horsehair Canvas',
      detail:
        'Unlike industrial fused garments glued with synthetic backing, our chest pieces are cut from genuine camelhair and linen canvas. Molded under steam, the chest piece adapts to your natural contours over decades.',
      x: '35%',
      y: '42%',
    },
    {
      id: 1,
      title: '02. Pick-Stitched Lapel Roll (Punto a Mano)',
      detail:
        'Over 320 hand stitches secure the lapel facing without tension. This enables the collar to roll softly against the chest rather than lying flat like mass-market pressed coats.',
      x: '52%',
      y: '30%',
    },
    {
      id: 2,
      title: '03. Hand-Split Double-Faced Edges',
      detail:
        'Our artisans split the dual layers of cashmere wool by hand along the margin, fold the raw edges inward, and stitch them with blind silk stitches for an unlined, weightless finish.',
      x: '68%',
      y: '58%',
    },
    {
      id: 3,
      title: '04. Natural Horn Hardware',
      detail:
        'Buttons are individually lathe-turned from solid ethically recovered water buffalo horn in Cremona, Italy. Each exhibits subtle organic marbling and is cross-stitched with waxed linen thread.',
      x: '25%',
      y: '70%',
    },
  ];

  return (
    <section id="craftsmanship" className="py-20 lg:py-28 bg-[#151515] text-[#FAFAF7] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Editorial Kicker */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#C2A379] mb-3 font-mono">
            <span>Atelier &amp; Provenance</span>
            <span aria-hidden="true">·</span>
            <span>Biella &amp; Piedmont Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            The Architecture of Cloth
          </h2>

          <p className="text-sm sm:text-base text-[#B3AFA8] font-light leading-relaxed">
            Asharappareal rejects disposable fashion in favor of generational preservation.
            We treat tailoring as a discipline of millimeters, where silence and pure structure outshine ephemeral trends.
          </p>
        </div>

        {/* Interactive Atelier Canvas with Hotspot Markers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Cols: High-Res Atelier Image with Interactive Hotspots */}
          <div className="lg:col-span-7 relative aspect-[16/10] bg-[#1F1F1F] border border-white/10 overflow-hidden group">
            <img
              src={atelierImg}
              alt="Asharappareal Master Tailor at Work"
              className="w-full h-full object-cover object-center brightness-90 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Interactive Hotspot Pins */}
            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot.id)}
                style={{ top: spot.y, left: spot.x }}
                aria-label={`View detail: ${spot.title}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin p-2"
              >
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      activeHotspot === spot.id ? 'bg-[#C2A379]' : 'bg-white/40'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3.5 w-3.5 border transition-all ${
                      activeHotspot === spot.id
                        ? 'bg-[#C2A379] border-white scale-125 shadow-lg'
                        : 'bg-white/90 border-black/30'
                    }`}
                  />
                </span>
              </button>
            ))}

            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/15 text-[11px] font-mono text-[#E5D8C5]">
              Interactive Atelier Blueprint · Tap pins to reveal tailoring anatomy
            </div>
          </div>

          {/* Right 5 Cols: Detail Explanatory Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#1A1A1A] border border-white/10 p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between text-xs text-[#C2A379] font-mono mb-2 uppercase tracking-widest">
                <span>Craftsmanship Insight</span>
                <span>Active Spec 0{activeHotspot + 1}/04</span>
              </div>

              <h3 className="font-serif text-2xl text-white mb-3">
                {HOTSPOTS[activeHotspot].title}
              </h3>

              <p className="text-sm text-[#CCCCCC] font-light leading-relaxed mb-6">
                {HOTSPOTS[activeHotspot].detail}
              </p>

              {/* Selector Tabs */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                {HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot.id)}
                    className={`w-full text-left p-2.5 text-xs transition-colors flex items-center justify-between border ${
                      activeHotspot === spot.id
                        ? 'bg-white/10 border-[#C2A379] text-white font-medium'
                        : 'border-transparent text-[#888888] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{spot.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeHotspot === spot.id ? 'translate-x-1 text-[#C2A379]' : 'text-white/30'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantitative Rigor Stats adjacent to claims */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#FAFAF7] tabular-nums">34h</span>
                <p className="text-[11px] text-[#8C8880] uppercase tracking-wider font-mono mt-0.5">
                  Hand-Tailored Per Coat
                </p>
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#FAFAF7] tabular-nums">0%</span>
                <p className="text-[11px] text-[#8C8880] uppercase tracking-wider font-mono mt-0.5">
                  Synthetic Fillers
                </p>
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#FAFAF7] tabular-nums">15.5μ</span>
                <p className="text-[11px] text-[#8C8880] uppercase tracking-wider font-mono mt-0.5">
                  Fiber Diameter Grade-A
                </p>
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#FAFAF7] tabular-nums">60</span>
                <p className="text-[11px] text-[#8C8880] uppercase tracking-wider font-mono mt-0.5">
                  Max Numbered Run
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

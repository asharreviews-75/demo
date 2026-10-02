import React from 'react';
import { ShieldCheck, Feather, Compass, Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 lg:py-28 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left 4 Cols: Brand Manifesto */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#7E7B75] mb-3 font-mono">
            <span>The Ashar Manifesto</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2024</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] leading-tight mb-5">
            Luxury as the Elimination of the Superfluous
          </h2>

          <p className="text-sm text-[#5C5954] font-light leading-relaxed mb-6">
            In an era of hyper-accelerated trends and disposable synthetics, Asharappareal represents a deliberate return to stillness.
            We design for individuals who recognize that true distinction does not announce itself loudly; it whispers through the density of raw cashmere, the precision of a hand-padded lapel, and the poise of a bias drape.
          </p>

          <div className="p-4 bg-[#F4F4F0] border-l-2 border-[#111111] text-xs text-[#4A4742] italic font-serif">
            &ldquo;We do not make clothing for a single season. We create archival forms meant to be inhabited, remembered, and passed down.&rdquo;
          </div>
        </div>

        {/* Right 7 Cols: The Three Pillars */}
        <div className="lg:col-span-7 space-y-8">
          {/* Pillar 01 */}
          <div className="pb-6 border-b border-[#E5E4DE]">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-serif text-xl sm:text-2xl text-[#111111]">
                01. Zero Synthetic Compromise
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7E7B75]">
                100% Natural Fibers
              </span>
            </div>
            <p className="text-sm text-[#5C5954] font-light leading-relaxed">
              Every yard of cloth is selected from family-owned heritage mills in Biella, Como, and the Mongolian plateaus.
              We explicitly reject synthetic fiber blends, acrylic fillers, and microplastic finishes. Only unadulterated cashmere, organic mulberry silk, and long-staple virgin merino wool enter our cutting tables.
            </p>
          </div>

          {/* Pillar 02 */}
          <div className="pb-6 border-b border-[#E5E4DE]">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-serif text-xl sm:text-2xl text-[#111111]">
                02. Full Floating Canvas Engineering
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7E7B75]">
                Living Architecture
              </span>
            </div>
            <p className="text-sm text-[#5C5954] font-light leading-relaxed">
              Modern ready-to-wear often glues front panels with synthetic fusible interfacing that bubbles over time.
              At Asharappareal, every jacket and coat features a traditional floating canvas hand-basted from camel hair and linen.
              With body heat and wear, the canvas molds itself uniquely to your physique, improving in drape with every passing year.
            </p>
          </div>

          {/* Pillar 03 */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-serif text-xl sm:text-2xl text-[#111111]">
                03. Editions, Never Mass Production
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7E7B75]">
                Numbered Serials
              </span>
            </div>
            <p className="text-sm text-[#5C5954] font-light leading-relaxed">
              We produce strictly in micro-editions of 40 to 75 numbered pieces per silhouette.
              Once an edition is claimed, the pattern is archived in our ledger.
              This guarantees absolute rarity for our clients and entirely prevents deadstock fabric landfills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

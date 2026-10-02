import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { LOOKBOOK_SLIDES, LookbookSlide } from '../data/collections';

interface LookbookSliderProps {
  onExplorePiece: (pieceName: string) => void;
}

export const LookbookSlider: React.FC<LookbookSliderProps> = ({ onExplorePiece }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCinematicMotion, setIsCinematicMotion] = useState(true);

  const currentSlide = LOOKBOOK_SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % LOOKBOOK_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + LOOKBOOK_SLIDES.length) % LOOKBOOK_SLIDES.length);
  };

  return (
    <section id="lookbook" className="py-20 lg:py-28 bg-[#F4F4F0] scroll-mt-20 border-y border-[#E5E4DE]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#DCDAD2]">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#7E7B75] mb-2 font-mono">
              <span>Runway &amp; Movement Archive</span>
              <span aria-hidden="true">·</span>
              <span>Lookbook 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Garments in Dialogue with Space
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCinematicMotion(!isCinematicMotion)}
              className="text-xs uppercase tracking-wider text-[#5C5954] hover:text-[#111111] flex items-center gap-1.5 px-3 py-1.5 border border-[#D5D3CC] bg-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A379]" />
              <span>{isCinematicMotion ? 'Motion: Fluid' : 'Motion: Paused'}</span>
            </button>

            <div className="flex items-center border border-[#D5D3CC] bg-white">
              <button
                onClick={handlePrev}
                aria-label="Previous look"
                className="p-2 hover:bg-[#EAE8E2] text-[#111111] transition-colors border-r border-[#D5D3CC]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 text-xs font-mono text-[#5C5954] tabular-nums">
                0{currentIndex + 1} / 0{LOOKBOOK_SLIDES.length}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next look"
                className="p-2 hover:bg-[#EAE8E2] text-[#111111] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative aspect-[16/9] md:aspect-[21/10] bg-white border border-[#DCDAD2] overflow-hidden shadow-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14 text-white"
            >
              {/* Media Backdrop */}
              <motion.img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                animate={
                  isCinematicMotion
                    ? {
                        scale: [1, 1.03, 1],
                        y: [0, -4, 0],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: 'easeInOut',
                }}
                referrerPolicy="no-referrer"
              />

              {/* Gradient scrim ensuring 4.5:1 text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* Content Overlay */}
              <div className="relative z-10 max-w-2xl">
                <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#C2A379] mb-2 block">
                  {currentSlide.season}
                </span>

                <h3 className="font-serif text-2xl sm:text-4xl text-white mb-2 font-normal">
                  {currentSlide.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#D5D3CC] font-light mb-4">
                  {currentSlide.subtitle}
                </p>

                <p className="italic font-serif text-sm sm:text-base text-white/90 border-l border-[#C2A379] pl-3 mb-6">
                  {currentSlide.quote}
                </p>

                {/* Featured Silhouettes clickable tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-white/60 uppercase font-mono mr-1">Look Featuring:</span>
                  {currentSlide.piecesShown.map((p) => (
                    <button
                      key={p}
                      onClick={() => onExplorePiece(p)}
                      className="px-3 py-1 bg-white/15 hover:bg-white text-white hover:text-[#111111] text-[11px] uppercase tracking-wider backdrop-blur-xs transition-colors flex items-center gap-1 border border-white/20"
                    >
                      <span>{p}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

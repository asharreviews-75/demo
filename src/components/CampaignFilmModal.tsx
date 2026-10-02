import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { heroImg, silkGownImg, tailoredBlazerImg, cashmereCoatImg } from '../data/collections';

interface CampaignFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignFilmModal: React.FC<CampaignFilmModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  if (!isOpen) return null;

  const FRAMES = [
    {
      img: heroImg,
      time: '00:04',
      act: 'ACT I: THE MONOLITH',
      caption: 'Double-faced cashmere draping against rough travertine stone.',
    },
    {
      img: silkGownImg,
      time: '00:18',
      act: 'ACT II: THE BIAS RHYTHM',
      caption: 'Pure mulberry silk responding dynamically to motion and light.',
    },
    {
      img: tailoredBlazerImg,
      time: '00:32',
      act: 'ACT III: SHARP GEOMETRY',
      caption: 'Full floating horsehair canvas holding architectural form.',
    },
    {
      img: cashmereCoatImg,
      time: '00:46',
      act: 'ACT IV: THE TRAVERTINE TRENCH',
      caption: 'Unbleached natural fleece swaying with quiet poise.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl bg-[#111111] text-white border border-white/15 relative overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="text-xs font-mono tracking-widest text-[#E5D8C5] uppercase">
                Ashar Runway Film · Campaign IV: Stillness in Cloth
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close runway film"
              className="p-1.5 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Presentation Frame */}
          <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
            <motion.img
              key={currentFrame}
              src={FRAMES[currentFrame].img}
              alt="Asharappareal Runway Still"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover brightness-95"
              referrerPolicy="no-referrer"
            />

            {/* Cinematic Letterbox Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Live Act Overlay */}
            <div className="absolute bottom-6 left-6 sm:left-10 z-10 max-w-lg">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#C2A379] block mb-1">
                {FRAMES[currentFrame].act}
              </span>
              <p className="font-serif text-lg sm:text-2xl text-white font-light">
                {FRAMES[currentFrame].caption}
              </p>
            </div>

            {/* Time Stamp */}
            <div className="absolute top-6 right-6 font-mono text-xs text-white/60 bg-black/50 px-2.5 py-1 border border-white/10">
              {FRAMES[currentFrame].time} / 00:58
            </div>
          </div>

          {/* Playback Controls & Frame Switcher */}
          <div className="p-4 sm:p-6 bg-[#161616] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {FRAMES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentFrame(i)}
                  className={`px-3 py-1.5 text-[11px] font-mono tracking-wider transition-colors border ${
                    currentFrame === i
                      ? 'bg-white text-black border-white font-medium'
                      : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  Act 0{i + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-white/70">
              <span>Score: Ambient Soundscape for Cello &amp; Organ</span>
              <button
                onClick={() => setCurrentFrame((prev) => (prev + 1) % FRAMES.length)}
                className="text-[#C2A379] hover:underline uppercase tracking-wider text-[11px]"
              >
                Next Sequence →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

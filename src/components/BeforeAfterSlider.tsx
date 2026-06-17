import React, { useState, useRef, useEffect } from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface BeforeAfterSliderProps {
  imageUrl: string;
  beforeEffects?: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    warmth: number;
  };
  title?: string;
  heightClass?: string;
  interactiveHint?: boolean;
}

export default function BeforeAfterSlider({
  imageUrl,
  beforeEffects = { brightness: 1.05, contrast: 0.9, saturation: 0.8, blur: 1.0, warmth: -5 },
  title,
  heightClass = "h-[450px] md:h-[550px]",
  interactiveHint = true
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(interactiveHint);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto hide hint after dragging begins
  useEffect(() => {
    if (isDragging) {
      setShowHint(false);
    }
  }, [isDragging]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return; // Support dragging even without strict mousedown if clicked
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Format the filter string for the "Before" state representation
  const filterStyle = `
    brightness(${beforeEffects.brightness})
    contrast(${beforeEffects.contrast})
    saturate(${beforeEffects.saturation})
    blur(${beforeEffects.blur}px)
    hue-rotate(${beforeEffects.warmth}deg)
  `;

  return (
    <div className="flex flex-col w-full group">
      {title && (
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-semibold text-neutral-200 tracking-wide uppercase font-sans flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
            {title}
          </h4>
          <span className="text-xs font-mono text-neutral-400">Drag core handle to inspect detail</span>
        </div>
      )}

      <div
        ref={containerRef}
        className={`relative ${heightClass} w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 select-none cursor-ew-resize`}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* AFTER (RETOUCHED MASTER) IMAGE - FULL CONTAINER */}
        <img
          src={imageUrl}
          alt="Retouched Master After"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />

        {/* AFTER LABEL */}
        <div className="absolute right-4 top-4 z-20 pointer-events-none flex items-center gap-1.5 bg-neutral-950/75 shadow-lg backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-gold/20">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-brand-light font-mono uppercase bg-gradient-to-r from-brand-gold-light to-brand-gold bg-clip-text text-transparent">
            Retouched Master
          </span>
        </div>

        {/* BEFORE (RAW FORMAT COMPOSITE) IMAGE - CLIPPED AREA */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Ensure child image has a fixed width of the parent container to keep correct scale alignment */}
          <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}>
            <img
              src={imageUrl}
              alt="Raw Capture Before"
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{ filter: filterStyle }}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* BEFORE LABEL */}
        <div className="absolute left-4 top-4 z-20 pointer-events-none flex items-center gap-1.5 bg-neutral-950/75 shadow-lg backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800">
          <Eye className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-rose-400 font-mono uppercase">
            Original Camera RAW
          </span>
        </div>

        {/* GOLD CENTER DIVIDER SLIDER LINE */}
        <div
          className="absolute top-0 bottom-0 z-30 w-[2px] bg-brand-gold/80 hover:bg-brand-gold shadow-[0_0_12px_rgba(var(--brand-accent-rgb),0.6)] cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* DRAG HANDLE CIRCLE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-neutral-950 border border-brand-gold shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.4)] flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform duration-150 group-hover:scale-105 active:scale-95 bg-gradient-to-b from-neutral-900 to-neutral-950">
            {/* Visual pulse rings radiating outward */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-brand-gold/60 pointer-events-none"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-brand-gold/40 pointer-events-none"
              animate={{
                scale: [1, 2.4, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{
                duration: 2.5,
                delay: 1.25,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            <div className="flex items-center gap-1 z-10">
              <span className="text-[10px] text-brand-gold font-bold select-none">‹</span>
              <span className="w-[1px] h-3 bg-brand-gold/40 select-none"></span>
              <span className="text-[10px] text-brand-gold font-bold select-none">›</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE FLOATING INSTRUCTIONS HINT */}
        {showHint && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-950/80 border border-brand-gold/30 rounded-xl px-5 py-3 text-center pointer-events-none backdrop-blur-md max-w-xs animate-bounce shadow-xl">
            <p className="text-xs text-brand-gold-light font-medium tracking-wide">
              Slide back and forth
            </p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
              To compare skin & lighting fidelity
            </p>
          </div>
        )}
      </div>

      {/* Elegant, short brief description replacing parameter list */}
      <div className="mt-3.5 bg-neutral-900/40 rounded-xl p-3 border border-neutral-900/60 flex items-center justify-center">
        <p className="text-[11px] md:text-xs text-neutral-400 text-center leading-relaxed">
          Interactive post-production slider comparing the original camera RAW file against the final high-precision, non-destructive master retouch.
        </p>
      </div>
    </div>
  );
}

import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { weddingAudio } from '../utils/audioEngine';
import { Language } from '../types/wedding';

interface ScratchToRevealProps {
  lang: Language;
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({ lang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScratching = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const hasUserScratchedRef = useRef(false);
  const isCanvasInitializedRef = useRef(false);
  const lastCheckTimeRef = useRef<number>(0);

  const [percentScratched, setPercentScratched] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Trigger celebration confetti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 85,
      spread: 72,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F3E5AB', '#996515', '#C0392B', '#E74C3C'],
    });
    weddingAudio.playTempleChime();
  }, []);

  // Initialize Canvas with Royal Gold Texture & Foil Ornaments
  // Only called when uninitialized or when explicitly reset
  const drawGoldScratchLayer = useCallback((force = false) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Never overwrite canvas if user already began scratching unless explicitly reset
    if (!force && hasUserScratchedRef.current) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const width = rect.width;
    const height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Reset compositing mode to default
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B8860B');
    grad.addColorStop(0.25, '#F3E5AB');
    grad.addColorStop(0.5, '#D4AF37');
    grad.addColorStop(0.75, '#AA7C11');
    grad.addColorStop(1, '#E6CA65');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Royal Indian Lattice overlay pattern
    ctx.strokeStyle = 'rgba(120, 75, 10, 0.22)';
    ctx.lineWidth = 1.2;
    const step = 28;

    for (let x = 0; x < width + height; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - height, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - height, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Border inner frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    ctx.strokeStyle = 'rgba(100, 50, 5, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Central instruction on the scratch surface
    ctx.fillStyle = '#2B0810';
    ctx.font = 'bold 15px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text1 = lang === 'en' ? 'SCRATCH TO DISCOVER' : 'आमचा शुभ दिवस शोधण्यासाठी';
    const text2 = lang === 'en' ? 'OUR SPECIAL DAY' : 'येथे स्क्रॅच करा';

    ctx.fillText(text1, width / 2, height / 2 - 12);
    ctx.fillText(text2, width / 2, height / 2 + 14);

    // Subtle coin scratch hint
    ctx.font = 'italic 11px "Montserrat", sans-serif';
    ctx.fillStyle = 'rgba(43, 8, 16, 0.75)';
    ctx.fillText(
      lang === 'en' ? '✧ Use your finger or cursor to scratch ✧' : '✧ बोटाने किंवा माउसने स्क्रॅच करा ✧',
      width / 2,
      height / 2 + 38
    );

    ctx.restore();
    isCanvasInitializedRef.current = true;
  }, [lang]);

  // Initial mount effect
  useEffect(() => {
    if (!isCanvasInitializedRef.current && !isRevealed) {
      drawGoldScratchLayer(true);
    }
  }, [drawGoldScratchLayer, isRevealed]);

  // Resize handler - only recalculates dimensions BEFORE scratching has started
  useEffect(() => {
    const handleResize = () => {
      // If user hasn't scratched yet and not revealed, we can adapt size
      if (!hasUserScratchedRef.current && !isRevealed) {
        drawGoldScratchLayer(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawGoldScratchLayer, isRevealed]);

  // Calculate scratched transparent pixels with throttling
  const checkScratchPercentage = useCallback((forceCheck = false) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const now = Date.now();
    // Throttle checks to once every 220ms unless forceCheck is true (e.g. pointerup)
    if (!forceCheck && now - lastCheckTimeRef.current < 220) {
      return;
    }
    lastCheckTimeRef.current = now;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    try {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      // Sample every 16 pixels for fast, non-blocking calculations
      const sampleGap = 16;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let transparentPixels = 0;
      let totalSampled = 0;

      for (let y = 0; y < h; y += sampleGap) {
        for (let x = 0; x < w; x += sampleGap) {
          const index = (y * w + x) * 4;
          // alpha channel
          if (data[index + 3] < 128) {
            transparentPixels++;
          }
          totalSampled++;
        }
      }

      if (totalSampled > 0) {
        const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
        setPercentScratched(percent);

        // Automatic reveal threshold: 65% - 70% (set to 68%)
        if (percent >= 68 && !isRevealed) {
          setIsRevealed(true);
          setPercentScratched(100);
          triggerConfetti();
        }
      }
    } catch {
      // ignore
    }
  }, [isRevealed, triggerConfetti]);

  // Execute continuous scratch stroke using destination-out
  const scratchStroke = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const currentX = (clientX - rect.left) * dpr;
    const currentY = (clientY - rect.top) * dpr;

    hasUserScratchedRef.current = true;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    if (lastPointRef.current) {
      // Connect previous point to current point with thick smooth line
      ctx.lineWidth = 50 * dpr;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    } else {
      // Initial touch point - draw circular tap dab
      ctx.beginPath();
      ctx.arc(currentX, currentY, 25 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPointRef.current = { x: currentX, y: currentY };
  };

  // Pointer event handlers with pointer capture support
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    isScratching.current = true;
    lastPointRef.current = null;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    scratchStroke(e.clientX, e.clientY);
    checkScratchPercentage(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching.current || isRevealed) return;
    scratchStroke(e.clientX, e.clientY);
    checkScratchPercentage(false);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching.current) return;
    isScratching.current = false;
    lastPointRef.current = null;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    checkScratchPercentage(true);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isScratching.current = false;
    lastPointRef.current = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handleRevealImmediately = () => {
    setIsRevealed(true);
    setPercentScratched(100);
    triggerConfetti();
  };

  const handleReset = () => {
    setIsRevealed(false);
    setPercentScratched(0);
    hasUserScratchedRef.current = false;
    lastPointRef.current = null;
    isScratching.current = false;
    // Re-draw initial scratch card cleanly
    setTimeout(() => {
      drawGoldScratchLayer(true);
    }, 50);
  };

  return (
    <section className="relative py-12 sm:py-16 px-4 bg-gradient-to-b from-[#140306] via-[#1F050A] to-[#140306] overflow-hidden">
      {/* Decorative Traditional Filigree Dividers */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-royal-title text-xs tracking-[0.25em] text-[#D4AF37] uppercase">
              {lang === 'en' ? 'Interactive Discovery' : 'शुभ मुहूर्त दर्शन'}
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h2 className="font-royal-title text-2xl sm:text-3xl md:text-4xl font-bold text-gold-metallic tracking-wide">
            {lang === 'en' ? 'Scratch to Reveal Our Wedding Date' : 'शुभ विवाह दिनांक'}
          </h2>
          <p className="text-xs sm:text-sm text-[#D7C7B2] font-script italic tracking-wider mt-2 max-w-lg mx-auto">
            {lang === 'en'
              ? 'Gently rub the royal gold surface below to unveil the auspicious day and muhurt.'
              : 'खालील सुवर्ण पत्रिकेवर स्पर्श करून आमच्या मंगल परिणयाचा शुभ दिवस पहा.'}
          </p>
        </div>

        {/* Scratch Card Outer Ornate Box */}
        <div className="relative w-full max-w-[420px] sm:max-w-[480px]">
          {/* Card Border & Ambient Glow */}
          <div className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-[#D4AF37] via-[#AA7C11] to-[#3B0912] shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)]">
            <div
              ref={containerRef}
              className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#24050B] select-none touch-none"
            >
              {/* UNDERNEATH: The Auspicious Date Revealed Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#2B0810] via-[#1A0307] to-[#2B0810] border border-[#D4AF37]/40 rounded-xl">
                {/* Traditional Auspicious Crest */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/30" />
                  <span className="font-royal-title text-[11px] sm:text-xs text-[#E8D7B8] tracking-[0.2em]">
                    {lang === 'en' ? 'SHUBH VIVAH' : 'शुभ विवाह'}
                  </span>
                  <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/30" />
                </div>

                {/* The Wedding Date */}
                <div className="my-1">
                  <p className="font-royal-title text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-gold-metallic drop-shadow-md">
                    7 DECEMBER 2026
                  </p>
                  <p className="font-royal-title text-xs sm:text-sm text-[#F3E5AB] tracking-[0.2em] mt-1 font-semibold">
                    {lang === 'en' ? 'MONDAY · दुपार १२:३४ वा. शुभ मुहूर्त' : 'सोमवार · दुपारी १२:३४ वा. शुभ मुहूर्त'}
                  </p>
                </div>

                {/* Venue Quick Tag */}
                <div className="mt-3 pt-3 border-t border-[#D4AF37]/30 w-full max-w-[280px]">
                  <p className="text-[12px] sm:text-xs text-[#FAF7F0] font-medium tracking-wide">
                    Jalaram Lawn · Amgaon Road, Gondia
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#C5A059] italic mt-0.5">
                    {lang === 'en' ? 'Join us in showering your blessings' : 'आपली उपस्थिती प्रार्थनीय आहे'}
                  </p>
                </div>
              </div>

              {/* OVERLAY: HTML5 Canvas with Golden Scratchable Layer */}
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                className={`absolute inset-0 w-full h-full cursor-pointer z-10 touch-none select-none transition-opacity duration-700 ${
                  isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                style={{ touchAction: 'none' }}
              />
            </div>
          </div>

          {/* Action Footer & Scratch Progress Indicator */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#D7C7B2]">
            <div className="flex items-center gap-2">
              {isRevealed ? (
                <span className="flex items-center gap-1.5 text-[#F3E5AB] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#2ECC71]" />
                  {lang === 'en' ? 'Revealed successfully!' : 'शुभ दिन प्रकट झाला!'}
                </span>
              ) : (
                <span className="text-[#C5A059]">
                  {lang === 'en' ? `Scratched: ${percentScratched}%` : `स्क्रॅच: ${percentScratched}%`}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!isRevealed ? (
                <button
                  onClick={handleRevealImmediately}
                  className="text-xs font-semibold text-[#F3E5AB] hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                >
                  {lang === 'en' ? 'Reveal Instantly' : 'त्वरित पहा'}
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-[#D4AF37] hover:text-[#F3E5AB] cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Scratch Again' : 'पुन्हा खेळा'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

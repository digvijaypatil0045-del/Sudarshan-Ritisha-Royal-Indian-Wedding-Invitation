import React, { useState } from 'react';
import { Sparkles, Crown, Music2, VolumeX, Hand } from 'lucide-react';
import { weddingAudio } from '../utils/audioEngine';
import { Language } from '../types/wedding';

interface CinematicDoorEntranceProps {
  onDoorsOpened: () => void;
  lang: Language;
  onToggleLang: () => void;
  isMusicMuted: boolean;
  onToggleMute: () => void;
}

export const CinematicDoorEntrance: React.FC<CinematicDoorEntranceProps> = ({
  onDoorsOpened,
  lang,
  onToggleLang,
  isMusicMuted,
  onToggleMute,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play traditional sacred Shankha + temple bell chime
    weddingAudio.playSacredConch();
    weddingAudio.playTempleChime();

    // Start authentic background wedding music if not muted
    if (!isMusicMuted) {
      weddingAudio.play();
    }

    // After realistic 3D door swing transition (~1800ms), reveal main portal
    setTimeout(() => {
      setIsFullyOpened(true);
      onDoorsOpened();
    }, 1800);
  };

  if (isFullyOpened) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#120407] transition-opacity duration-1000 ${
        isOpening ? 'pointer-events-none opacity-0 delay-1000' : 'opacity-100'
      }`}
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Background Architectural Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <img
          src="/src/assets/images/royal_palace_doors_1794490108295.jpg"
          alt="Royal Palace Gateway"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140306] via-[#140306]/85 to-[#140306]/90" />
      </div>

      {/* Top Utility Controls Bar */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 relative z-30 mb-2">
        {/* Subtle auspicious emblem */}
        <div className="flex items-center gap-1.5 opacity-90">
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[11px] font-royal-title text-[#D4AF37] tracking-[0.2em] uppercase font-semibold">
            ROYAL NIMANTRAN
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#2B0810]/90 border border-[#D4AF37]/60 text-[#F4EDE2] hover:bg-[#3E0C17] hover:border-[#D4AF37] transition-all shadow-md backdrop-blur-md cursor-pointer active:scale-95"
            title="Switch Language"
          >
            {lang === 'en' ? 'मराठी' : 'English'}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 sm:p-2 rounded-full bg-[#2B0810]/90 border border-[#D4AF37]/60 text-[#F4EDE2] hover:bg-[#3E0C17] hover:border-[#D4AF37] transition-all shadow-md backdrop-blur-md cursor-pointer active:scale-95"
            title={isMusicMuted ? 'Unmute' : 'Mute'}
          >
            {isMusicMuted ? (
              <VolumeX className="w-4 h-4 text-[#D4AF37]" />
            ) : (
              <Music2 className="w-4 h-4 text-[#D4AF37]" />
            )}
          </button>
        </div>
      </div>

      {/* Main Palace Gateway Frame & 3D Doors Wrapper */}
      <div className="min-h-[calc(100dvh-5rem)] min-h-[calc(100svh-5rem)] flex flex-col items-center justify-center px-3 sm:px-4 py-2 sm:py-4 relative z-20">
        <div className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] flex flex-col items-center">
          {/* 1. Auspicious Vedic Invocation Header (Guaranteed visible with shrink-0 overflow-hidden) */}
          <div className="shrink-0 overflow-hidden text-center mb-2.5 sm:mb-4 px-2 w-full">
            <p className="font-royal-title text-sm sm:text-base md:text-lg text-gold-metallic tracking-[0.25em] font-bold drop-shadow">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#E6DAC3] font-script italic tracking-wider mt-0.5 sm:mt-1">
              {lang === 'en'
                ? 'Shree Ganeshaya Namah · Royal Vivah Nimantran'
                : 'श्रीगणेशाय नमः · शुभ विवाह निमंत्रण'}
            </p>
          </div>

          {/* 2. Responsive 3D Perspective Palace Gate & Fully Clickable Doors */}
          <div className="relative w-full max-w-[min(90vw,360px)] sm:max-w-[420px] md:max-w-[460px] h-[min(46dvh,340px)] sm:h-[min(50dvh,400px)] md:h-[440px] rounded-t-[120px] sm:rounded-t-[160px] p-1.5 sm:p-2.5 bg-gradient-to-b from-[#4A0A17] via-[#2A050D] to-[#170307] border-2 border-[#D4AF37]/70 shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.25)] perspective-1500 overflow-hidden shrink-0">
            {/* Inner Golden Arch Moldings */}
            <div className="absolute inset-1 sm:inset-1.5 rounded-t-[116px] sm:rounded-t-[156px] border border-[#D4AF37]/45 pointer-events-none z-20" />
            <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#1A0408] border border-[#D4AF37] flex items-center justify-center shadow-md">
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              </div>
            </div>

            {/* Palace Gateway Doors Outer Wrapper with 3D Preservation */}
            <div className="relative w-full h-full rounded-t-[112px] sm:rounded-t-[152px] overflow-hidden flex preserve-3d">
              {/* LEFT DOOR - INDEPENDENTLY CLICKABLE / TAPPABLE */}
              <div
                role="button"
                tabIndex={0}
                onClick={handleOpenInvitation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenInvitation()}
                aria-label="Open invitation left door"
                className={`w-1/2 h-full bg-gradient-to-br from-[#3B0912] via-[#24040A] to-[#120205] border-r border-[#D4AF37]/60 transition-all duration-[1600ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-left flex flex-col justify-between p-2.5 sm:p-3.5 relative preserve-3d cursor-pointer select-none group hover:brightness-110 active:scale-[0.99] ${
                  isOpening
                    ? '-rotate-y-110 shadow-[-20px_10px_35px_rgba(0,0,0,0.8)] opacity-20 pointer-events-none'
                    : 'rotate-y-0'
                }`}
              >
                {/* Decorative Carved Panels */}
                <div className="absolute inset-1.5 sm:inset-2 border border-[#D4AF37]/30 rounded-t-[90px] sm:rounded-t-[120px] pointer-events-none group-hover:border-[#D4AF37]/60 transition-colors" />
                <div className="absolute inset-3 sm:inset-3.5 border border-[#D4AF37]/20 rounded-t-[80px] sm:rounded-t-[110px] pointer-events-none" />

                {/* Top Ornate Brass Filigree */}
                <div className="w-full flex justify-end pr-1 pt-4 sm:pt-6 opacity-75 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" opacity="0.3"/>
                    <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                </div>

                {/* Royal Door Handle / Knocker (Emphasized interactive prompt) */}
                <div className="my-auto self-end mr-1 flex flex-col items-center group-hover:scale-110 transition-transform">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-[#F3E5AB] to-[#996515] p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#3B0912] border border-[#F3E5AB]/70" />
                  </div>
                  <div className="w-4 h-6 sm:h-7 -mt-1 border-2 border-[#D4AF37] rounded-b-full shadow-sm" />
                </div>

                {/* Groom Name Tag on Left Door */}
                <div className="text-right text-[9px] sm:text-[11px] font-royal-title text-[#D4AF37]/80 tracking-widest pb-1 font-semibold">
                  SUDARSHAN
                </div>
              </div>

              {/* RIGHT DOOR - INDEPENDENTLY CLICKABLE / TAPPABLE */}
              <div
                role="button"
                tabIndex={0}
                onClick={handleOpenInvitation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenInvitation()}
                aria-label="Open invitation right door"
                className={`w-1/2 h-full bg-gradient-to-bl from-[#3B0912] via-[#24040A] to-[#120205] border-l border-[#D4AF37]/60 transition-all duration-[1600ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-right flex flex-col justify-between p-2.5 sm:p-3.5 relative preserve-3d cursor-pointer select-none group hover:brightness-110 active:scale-[0.99] ${
                  isOpening
                    ? 'rotate-y-110 shadow-[20px_10px_35px_rgba(0,0,0,0.8)] opacity-20 pointer-events-none'
                    : 'rotate-y-0'
                }`}
              >
                {/* Decorative Carved Panels */}
                <div className="absolute inset-1.5 sm:inset-2 border border-[#D4AF37]/30 rounded-t-[90px] sm:rounded-t-[120px] pointer-events-none group-hover:border-[#D4AF37]/60 transition-colors" />
                <div className="absolute inset-3 sm:inset-3.5 border border-[#D4AF37]/20 rounded-t-[80px] sm:rounded-t-[110px] pointer-events-none" />

                {/* Top Ornate Brass Filigree */}
                <div className="w-full flex justify-start pl-1 pt-4 sm:pt-6 opacity-75 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h2v-2h-2v2zm0-4h2V7h-2v5zm-4 4h2v-2H9v2zm0-4h2V7H9v5z" opacity="0.3"/>
                    <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm0 14c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/>
                  </svg>
                </div>

                {/* Royal Door Handle / Knocker */}
                <div className="my-auto self-start ml-1 flex flex-col items-center group-hover:scale-110 transition-transform">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-[#F3E5AB] to-[#996515] p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#3B0912] border border-[#F3E5AB]/70" />
                  </div>
                  <div className="w-4 h-6 sm:h-7 -mt-1 border-2 border-[#D4AF37] rounded-b-full shadow-sm" />
                </div>

                {/* Bride Name Tag on Right Door */}
                <div className="text-left text-[9px] sm:text-[11px] font-royal-title text-[#D4AF37]/80 tracking-widest pb-1 font-semibold">
                  RITISHA
                </div>
              </div>

              {/* Revealed Palace Court Glow when doors open */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#B38728]/35 via-transparent to-[#D4AF37]/20 pointer-events-none -z-10 flex items-center justify-center">
                <div className="text-center p-4">
                  <Sparkles className="w-8 h-8 text-[#F3E5AB] mx-auto animate-pulse" />
                  <p className="font-royal-title text-xs sm:text-sm text-[#F3E5AB] mt-2 tracking-widest">
                    WELCOME
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Central Couple Names & Action Button */}
          <div className="mt-3 sm:mt-5 text-center w-full flex flex-col items-center shrink-0">
            {/* Couple Names */}
            <div className="mb-2 sm:mb-3">
              <h1 className="font-royal-title text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.16em] text-gold-metallic">
                SUDARSHAN & RITISHA
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm text-[#D4AF37]/90 font-royal-serif tracking-widest mt-0.5 sm:mt-1 font-semibold">
                7 DECEMBER 2026 · GONDIA, MAHARASHTRA
              </p>
            </div>

            {/* Tap Affordance Hint for Doors */}
            <div className="mb-2 flex items-center justify-center gap-1.5 text-[11px] text-[#C5A059] font-medium animate-pulse">
              <Hand className="w-3 h-3 text-[#D4AF37]" />
              <span>
                {lang === 'en'
                  ? 'Touch either door or press button to enter'
                  : 'दारांवर स्पर्श करा किंवा बटण दाबा'}
              </span>
            </div>

            {/* Interactive Button: OPEN YOUR INVITATION */}
            <button
              onClick={handleOpenInvitation}
              disabled={isOpening}
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-royal-serif text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#1A0307] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] hover:from-[#FFF2B8] hover:via-[#F1C40F] hover:to-[#B38728] shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-[#FFF5C0]"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A0A17] animate-spin" style={{ animationDuration: '6s' }} />
              <span>
                {isOpening
                  ? (lang === 'en' ? 'OPENING PALACE GATES...' : 'द्वार उघडत आहेत...')
                  : (lang === 'en' ? 'OPEN YOUR INVITATION' : 'आपले आमंत्रण उघडा')}
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A0A17] animate-spin" style={{ animationDuration: '6s' }} />
            </button>

            {/* Bottom Music Note (Guaranteed visible) */}
            <p className="text-[10px] sm:text-[11px] text-[#A89886] font-medium tracking-wide mt-2 sm:mt-2.5 flex items-center justify-center gap-1.5 max-w-xs sm:max-w-md mx-auto text-center">
              <Music2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Traditional Indian wedding music and celebratory melody'
                  : 'पारंपरिक मंगल वाद्य व सनई-संगीताच्या स्वरांसह'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Language } from '../types/wedding';

interface TopNavProps {
  lang: Language;
  onToggleLang: () => void;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  lang,
  onToggleLang,
  petalsEnabled,
  onTogglePetals,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 bg-[#140306]/90 border-b border-[#D4AF37]/30 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark in display face */}
      <a
        href="#hero"
        className="text-base sm:text-lg font-royal-title font-bold tracking-wider text-gold-metallic whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
      >
        Sudarshan & Ritisha
      </a>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D7C7B2]">
        <a href="#couple" className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0">
          {lang === 'en' ? 'The Couple' : 'वर-वधू'}
        </a>
        <a href="#programme" className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0">
          {lang === 'en' ? 'Programme' : 'कार्यक्रम'}
        </a>
        <a href="#venues" className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0">
          {lang === 'en' ? 'Venues' : 'स्थळ'}
        </a>
        <a href="#wishes" className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0">
          {lang === 'en' ? 'Wishes' : 'शुभेच्छा'}
        </a>
      </nav>

      {/* Zone 3: 1 primary action / utility */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Falling Petals Toggle */}
        <button
          onClick={onTogglePetals}
          className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#D4AF37]/30 text-[#D7C7B2] hover:text-[#FAF7F0] hover:border-[#D4AF37] transition-all whitespace-nowrap shrink-0"
          title="Toggle Rose Petals"
        >
          {petalsEnabled
            ? (lang === 'en' ? 'Petals: On' : 'पुष्पवृष्टी: चालू')
            : (lang === 'en' ? 'Petals: Off' : 'पुष्पवृष्टी: बंद')}
        </button>

        {/* Language Switcher */}
        <button
          onClick={onToggleLang}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-[#2B0810] border border-[#D4AF37] text-[#F3E5AB] hover:bg-[#3D0A16] hover:text-white transition-all whitespace-nowrap shrink-0 shadow-sm"
        >
          {lang === 'en' ? 'मराठी' : 'English'}
        </button>
      </div>
    </header>
  );
};

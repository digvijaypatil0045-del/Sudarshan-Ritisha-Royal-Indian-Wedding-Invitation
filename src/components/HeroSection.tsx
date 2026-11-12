import React from 'react';
import { Sparkles, Calendar, ChevronDown, MapPin } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { Language } from '../types/wedding';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  return (
    <section id="hero" className="relative min-h-[90dvh] min-h-[90svh] sm:min-h-[92dvh] flex items-center justify-center px-4 py-12 sm:py-16 overflow-hidden">
      {/* Background Palace Imagery with Royal Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/royal_palace_doors_1794490108295.jpg"
          alt="Royal Palace"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120407] via-[#140306]/80 to-[#120407]/90" />
      </div>

      {/* Main Hero Container with Royal Ornamental Frame */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Protected Invocation & Headline Container with flex-shrink: 0 and overflow: hidden */}
        <div className="shrink-0 overflow-hidden w-full flex flex-col items-center">
          {/* Divine Invocation */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <p className="font-royal-title text-xs sm:text-sm text-gold-metallic tracking-[0.3em] uppercase font-bold">
              {COUPLE_DATA.invocationShloka}
            </p>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          {/* Formal Invitation Line */}
          <p className="text-xs sm:text-sm text-[#D7C7B2] font-royal-serif tracking-[0.2em] uppercase mb-3 sm:mb-4 font-semibold">
            {lang === 'en'
              ? 'Together with their families, cordially invite you to celebrate the royal wedding of'
              : 'कुटुंबाच्या शुभाशीर्वादाने आयोजित शुभ विवाह सोहळा'}
          </p>

          {/* Large Couple Names in Regal Display Typography */}
          <div className="my-1 sm:my-3">
            <h1 className="font-royal-title text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.1em] text-gold-metallic drop-shadow-xl text-balance">
              {lang === 'en' ? COUPLE_DATA.groom.name : COUPLE_DATA.groom.nameMr}
            </h1>

            <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3">
              <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <span className="font-script text-2xl sm:text-3xl text-[#F3E5AB] italic">
                {lang === 'en' ? 'weds' : 'शुभविवाह'}
              </span>
              <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </div>

            <h1 className="font-royal-title text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.1em] text-gold-metallic drop-shadow-xl text-balance">
              {lang === 'en' ? COUPLE_DATA.bride.name : COUPLE_DATA.bride.nameMr}
            </h1>
          </div>
        </div>

        {/* Date and Location Banner */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-[#24060C]/75 border border-[#D4AF37]/50 backdrop-blur-md max-w-lg w-full shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-royal-serif">
            <div className="flex items-center gap-1.5 text-[#FAF7F0]">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold tracking-wider">
                {lang === 'en' ? 'Monday, 7 December 2026' : 'सोमवार, ७ डिसेंबर २०२६'}
              </span>
            </div>
            <span className="hidden sm:inline text-[#D4AF37]">·</span>
            <div className="flex items-center gap-1.5 text-[#E8D7B8]">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span className="tracking-wide">
                {lang === 'en' ? 'Gondia, Maharashtra' : 'गोंदिया, महाराष्ट्र'}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#C5A059] font-script italic mt-1.5">
            {lang === 'en' ? 'Auspicious Muhurt: 12:34 PM' : 'दुपारी १२:३४ वा. शुभ मुहूर्त'}
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#programme"
            className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-royal-serif font-bold tracking-wider text-[#140306] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] hover:from-[#FFF2B8] hover:via-[#F1C40F] hover:to-[#B38728] shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#140306]" />
            <span>{lang === 'en' ? 'Wedding Programme' : 'कार्यक्रम पत्रिका'}</span>
          </a>

          <a
            href="#wishes"
            className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-royal-serif font-bold tracking-wider text-[#FAF7F0] bg-[#2B0810]/80 border border-[#D4AF37]/60 hover:bg-[#3D0A16] hover:border-[#D4AF37] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
          >
            <span>{lang === 'en' ? 'Send Blessings' : 'शुभेच्छा पाठवा'}</span>
          </a>
        </div>

        {/* Scroll Down Prompt */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center opacity-75 animate-bounce">
          <span className="text-[10px] font-royal-title text-[#C5A059] tracking-widest uppercase">
            {lang === 'en' ? 'Scroll to Explore' : 'खाली पहा'}
          </span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37] mt-1" />
        </div>
      </div>
    </section>
  );
};

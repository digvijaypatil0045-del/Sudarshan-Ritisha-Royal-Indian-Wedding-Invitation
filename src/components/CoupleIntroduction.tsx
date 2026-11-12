import React from 'react';
import { Heart, Crown, Sparkles } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { Language } from '../types/wedding';

interface CoupleIntroductionProps {
  lang: Language;
}

export const CoupleIntroduction: React.FC<CoupleIntroductionProps> = ({ lang }) => {
  return (
    <section id="couple" className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#120407] via-[#1B050B] to-[#140306] overflow-hidden">
      {/* Background Indian Jaali motif watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Sacred Invocation Shloka Banner */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="font-royal-title text-base sm:text-lg text-gold-metallic tracking-[0.25em] font-bold">
            {COUPLE_DATA.invocationShloka}
          </p>
          <p className="font-royal-serif text-xs sm:text-sm text-[#F3E5AB] tracking-widest mt-1 max-w-xl mx-auto italic">
            "{COUPLE_DATA.vedicShloka}"
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3" />
        </div>

        {/* Royal Crest Monogram with Intertwined S & R */}
        <div className="relative mb-8 sm:mb-10 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#3B0912] via-[#24040A] to-[#120205] border-2 border-[#D4AF37] p-2 shadow-[0_0_35px_rgba(212,175,55,0.3)] flex items-center justify-center relative">
            {/* Outer Laurel Garland */}
            <div className="absolute -inset-2 pointer-events-none">
              <svg className="w-full h-full text-[#D4AF37]/50" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="48" strokeWidth="0.8" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Crown on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A0307] px-1.5 rounded-full border border-[#D4AF37]/60">
              <Crown className="w-4 h-4 text-[#F3E5AB]" />
            </div>

            {/* Intertwined Initials */}
            <div className="flex items-center justify-center gap-0.5">
              <span className="font-royal-title text-3xl sm:text-4xl font-extrabold text-gold-metallic">
                S
              </span>
              <span className="font-script text-2xl text-[#D4AF37] mx-0.5 italic">&</span>
              <span className="font-royal-title text-3xl sm:text-4xl font-extrabold text-gold-metallic">
                R
              </span>
            </div>

            {/* Bottom Year Badge */}
            <div className="absolute -bottom-2 bg-[#1A0307] px-2 rounded-full border border-[#D4AF37]/60 text-[10px] text-[#F3E5AB] font-royal-serif tracking-widest">
              2026
            </div>
          </div>
        </div>

        {/* Couple Presentation Card */}
        <div className="w-full max-w-2xl text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#2B0810]/90 via-[#1E050B] to-[#150205] border border-[#D4AF37]/50 shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-royal-title text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
              {lang === 'en' ? 'The Newlyweds-to-be' : 'शुभविवाह वर-वधू'}
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h3 className="font-royal-title text-2xl sm:text-4xl font-extrabold text-gold-metallic tracking-wide mt-2">
            {lang === 'en' ? COUPLE_DATA.groom.name : COUPLE_DATA.groom.nameMr}
            <span className="text-[#F3E5AB] font-script mx-2 font-normal text-2xl sm:text-3xl italic">
              &
            </span>
            {lang === 'en' ? COUPLE_DATA.bride.name : COUPLE_DATA.bride.nameMr}
          </h3>

          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto my-4" />

          {/* Meaningful Union Verse */}
          <div className="max-w-xl mx-auto">
            <Heart className="w-5 h-5 text-[#D4AF37] mx-auto mb-2.5 fill-[#D4AF37]/20" />
            <p className="font-script text-base sm:text-lg md:text-xl text-[#F4EDE2] italic leading-relaxed">
              "{lang === 'en' ? COUPLE_DATA.tagline : COUPLE_DATA.taglineMr}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Users, Heart, Sparkles } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { Language } from '../types/wedding';

interface FamilySectionProps {
  lang: Language;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ lang }) => {
  return (
    <section id="family" className="relative py-14 sm:py-20 px-4 bg-[#140306] border-t border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Users className="w-4 h-4" />
            <span className="font-royal-title text-xs tracking-[0.25em] uppercase">
              {lang === 'en' ? 'Pillars of Blessings' : 'कुटुंब शुभाशीर्वाद'}
            </span>
          </div>

          <h2 className="font-royal-title text-2xl sm:text-3xl md:text-4xl font-bold text-gold-metallic tracking-wide">
            {lang === 'en' ? 'With the Blessings of Our Families' : 'आमची कुटुंबे'}
          </h2>
          <p className="text-xs sm:text-sm text-[#D7C7B2] font-script italic tracking-wider mt-1 max-w-md mx-auto">
            {lang === 'en'
              ? 'United in joy, bound by tradition, celebrating together.'
              : 'दोन प्रतिष्ठित घराण्यांचे पवित्र मिलन.'}
          </p>
        </div>

        {/* 2 Family Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Chauhan Parivar */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#24060C] to-[#170307] border border-[#D4AF37]/40 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-[#3B0912] border border-[#D4AF37] flex items-center justify-center mb-3">
              <span className="font-royal-title text-lg font-bold text-gold-metallic">C</span>
            </div>

            <h3 className="font-royal-title text-xl sm:text-2xl font-bold text-[#F3E5AB]">
              {lang === 'en' ? 'Chauhan Parivar' : 'चौहान परिवार'}
            </h3>
            <p className="text-xs text-[#C5A059] font-royal-serif tracking-widest mt-0.5">
              {lang === 'en' ? 'Groom’s Family' : 'वर पक्ष'}
            </p>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-3" />

            <div className="space-y-2 text-xs sm:text-sm text-[#FAF7F0]">
              <p className="font-semibold text-[#F7E7CE]">
                {lang === 'en' ? 'Parents of the Groom' : 'वराचे माता-पिता'}:
              </p>
              <p className="font-medium text-[#FAF7F0] leading-relaxed">
                {lang === 'en' ? COUPLE_DATA.groom.parents : COUPLE_DATA.groom.parentsMr}
              </p>
              <p className="text-xs text-[#D7C7B2] font-script italic pt-1">
                {lang === 'en' ? COUPLE_DATA.groom.lineageBlessing : COUPLE_DATA.groom.lineageBlessingMr}
              </p>
            </div>

            <p className="text-[11px] text-[#A89886] mt-4 pt-3 border-t border-[#D4AF37]/20 w-full italic">
              {lang === 'en'
                ? 'Cordially invites you to bless the newlyweds.'
                : 'आपल्या शुभाशीर्वादांची नम्र प्रार्थना.'}
            </p>
          </div>

          {/* Pawar Parivar */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#24060C] to-[#170307] border border-[#D4AF37]/40 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-[#3B0912] border border-[#D4AF37] flex items-center justify-center mb-3">
              <span className="font-royal-title text-lg font-bold text-gold-metallic">P</span>
            </div>

            <h3 className="font-royal-title text-xl sm:text-2xl font-bold text-[#F3E5AB]">
              {lang === 'en' ? 'Pawar Parivar' : 'पवार परिवार'}
            </h3>
            <p className="text-xs text-[#C5A059] font-royal-serif tracking-widest mt-0.5">
              {lang === 'en' ? 'Bride’s Family' : 'वधू पक्ष'}
            </p>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-3" />

            <div className="space-y-2 text-xs sm:text-sm text-[#FAF7F0]">
              <p className="font-semibold text-[#F7E7CE]">
                {lang === 'en' ? 'Parents of the Bride' : 'वधूचे माता-पिता'}:
              </p>
              <p className="font-medium text-[#FAF7F0] leading-relaxed">
                {lang === 'en' ? COUPLE_DATA.bride.parents : COUPLE_DATA.bride.parentsMr}
              </p>
              <p className="text-xs text-[#D7C7B2] font-script italic pt-1">
                {lang === 'en' ? COUPLE_DATA.bride.lineageBlessing : COUPLE_DATA.bride.lineageBlessingMr}
              </p>
            </div>

            <p className="text-[11px] text-[#A89886] mt-4 pt-3 border-t border-[#D4AF37]/20 w-full italic">
              {lang === 'en'
                ? 'Warmly welcomes your esteemed presence.'
                : 'आपल्या स्नेहमय उपस्थितीची नम्र विनंती.'}
            </p>
          </div>
        </div>

        {/* Traditional Sanskrit Mangal Blessing quote */}
        <div className="mt-8 text-center text-xs text-[#D4AF37] font-royal-serif tracking-wider flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>मंगलं भगवान विष्णुः मंगलं गरुडध्वजः। मंगलं पुण्डरीकाक्षः मंगलाय तनो हरिः॥</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
};

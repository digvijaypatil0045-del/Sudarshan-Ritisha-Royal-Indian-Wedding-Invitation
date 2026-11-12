import React, { useState } from 'react';
import { Heart, Share2, Copy, Check, DoorOpen, Sparkles } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { Language } from '../types/wedding';

interface BlessingFooterProps {
  lang: Language;
  onReplayDoors: () => void;
}

export const BlessingFooter: React.FC<BlessingFooterProps> = ({ lang, onReplayDoors }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const shareOnWhatsApp = () => {
    const text =
      lang === 'en'
        ? `You are cordially invited to celebrate the Royal Wedding of Sudarshan & Ritisha on 7 December 2026. View the interactive invitation: ${window.location.href}`
        : `सुदर्शन आणि रितिशा यांच्या शुभ विवाह सोहळ्याचे आदरपूर्वक निमंत्रण (७ डिसेंबर २०२६). डिजिटल आमंत्रण पत्रिका पहा: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <footer className="relative py-16 sm:py-20 px-4 bg-[#0E0205] border-t-2 border-[#D4AF37]/30 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Sacred Sanskrit Wedding Blessing Shloka */}
        <div className="mb-8 p-6 rounded-2xl bg-[#1A0307]/70 border border-[#D4AF37]/25 max-w-2xl w-full">
          <p className="font-royal-title text-sm sm:text-base text-gold-metallic font-bold leading-relaxed tracking-wider">
            तदेव लग्नं सुदिनं तदेव, ताराबलं चन्द्रबलं तदेव।<br />
            विद्याबलं दैवबलं तदेव, लक्ष्मीपते तेऽङ्घ्रियुगं स्मरामि॥
          </p>
          <p className="text-xs text-[#D7C7B2] font-script italic mt-2">
            {lang === 'en'
              ? 'That very moment is auspicious, that star is favorable, when one remembers the divine lotus feet of the Supreme Lord.'
              : 'ज्या क्षणी ईश्वराचे स्मरण होते, तोच क्षण आणि तीच वेळ मंगलमय व फलदायी ठरते.'}
          </p>
        </div>

        {/* Closing Warm Gratitude */}
        <div className="space-y-2 mb-8">
          <p className="font-royal-title text-xl sm:text-2xl text-[#F3E5AB] font-bold">
            {COUPLE_DATA.groom.name} & {COUPLE_DATA.bride.name}
          </p>
          <p className="text-xs sm:text-sm text-[#A89886] font-royal-serif tracking-widest uppercase">
            {lang === 'en' ? 'Chauhan & Pawar Parivar with Warm Regards' : 'चौहान व पवार परिवार - सस्नेह निमंत्रण'}
          </p>
          <p className="text-xs text-[#FAF7F0]/80 font-script italic max-w-md mx-auto">
            {lang === 'en'
              ? 'Your prayers, blessings, and joyful presence are the most cherished gifts as we begin our new life together.'
              : 'आपले शुभाशीर्वाद आणि सस्नेह उपस्थिती हीच आमच्यासाठी सर्वात मोठी भेट आहे.'}
          </p>
        </div>

        {/* Share & Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {/* WhatsApp Share */}
          <button
            onClick={shareOnWhatsApp}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Share on WhatsApp' : 'व्हॉट्सॲपवर पाठवा'}</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={copyPageLink}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#24060C] border border-[#D4AF37]/50 text-[#F4EDE2] hover:bg-[#3D0A16] hover:border-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2ECC71]" />
                <span>{lang === 'en' ? 'Link Copied!' : 'लिंक कॉपी झाली!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{lang === 'en' ? 'Copy Invitation Link' : 'आमंत्रण लिंक कॉपी करा'}</span>
              </>
            )}
          </button>

          {/* Replay 3D Palace Entrance */}
          <button
            onClick={onReplayDoors}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#1A0307] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#F3E5AB] hover:border-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Replay Palace Entrance' : 'पुन्हा राजद्वार पहा'}</span>
          </button>
        </div>

        {/* Copyright & Traditional Auspicious Ending */}
        <div className="text-[11px] text-[#786959] border-t border-[#D4AF37]/15 pt-6 w-full">
          <p>© 2026 Sudarshan & Ritisha Royal Wedding Celebration. All Rights Reserved.</p>
          <p className="mt-1 font-royal-serif tracking-widest text-[#996515]">
            ॥ शुभं भवतु ॥
          </p>
        </div>
      </div>
    </footer>
  );
};

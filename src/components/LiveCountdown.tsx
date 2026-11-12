import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Sparkles } from 'lucide-react';
import { WEDDING_DATE_TIME_TARGET } from '../data/weddingData';
import { Language } from '../types/wedding';

interface LiveCountdownProps {
  lang: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const LiveCountdown: React.FC<LiveCountdownProps> = ({ lang }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(WEDDING_DATE_TIME_TARGET).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate Google Calendar Link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Shubh Vivah: Sudarshan Singh & Ritisha'
  )}&dates=20261207T070400Z/20261207T130000Z&details=${encodeURIComponent(
    'Royal Wedding ceremony of Sudarshan Singh Chauhan & Ritisha Pawar at Jalaram Lawn, Gondia, Maharashtra.'
  )}&location=${encodeURIComponent('Jalaram Lawn, Amgaon Road, Gondia, Maharashtra, India')}`;

  return (
    <section className="relative py-12 sm:py-16 px-4 bg-[#120407] border-y border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Clock className="w-4 h-4" />
            <span className="font-royal-title text-xs tracking-[0.25em] uppercase">
              {lang === 'en' ? 'Auspicious Muhurt Countdown' : 'शुभ मुहूर्त गणना'}
            </span>
          </div>

          <h2 className="font-royal-title text-2xl sm:text-3xl md:text-4xl font-bold text-gold-metallic tracking-wide">
            {lang === 'en' ? 'Counting Down to Forever' : 'शुभ लग्नाची घटिका समीप'}
          </h2>
          <p className="text-xs sm:text-sm text-[#D7C7B2] font-script italic tracking-wider mt-1">
            {lang === 'en'
              ? 'Monday, 7 December 2026 · Auspicious Muhurt: 12:34 PM IST'
              : 'सोमवार, ७ डिसेंबर २०२६ · शुभ मुहूर्त दुपारी १२:३४ वाजता'}
          </p>
        </div>

        {timeLeft.isPast ? (
          /* Celebratory message when wedding is underway or completed */
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#2B0810] to-[#1A0307] border border-[#D4AF37] text-center max-w-lg shadow-[0_0_30px_rgba(212,175,55,0.25)]">
            <Sparkles className="w-10 h-10 text-[#F3E5AB] mx-auto mb-3 animate-pulse" />
            <h3 className="font-royal-title text-2xl font-bold text-gold-metallic">
              {lang === 'en' ? 'The Auspicious Union Has Begun!' : 'शुभ विवाह संपन्न होत आहे!'}
            </h3>
            <p className="text-sm text-[#E8D7B8] font-script italic mt-2">
              {lang === 'en'
                ? 'Sudarshan & Ritisha are united in sacred matrimony. Thank you for showering your blessings and prayers.'
                : 'सुदर्शन आणि रितिशा विवाहबद्ध झाले आहेत. आपल्या शुभाशीर्वादांबद्दल मनःपूर्वक धन्यवाद.'}
            </p>
          </div>
        ) : (
          /* Countdown Tiles */
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              {[
                { label: lang === 'en' ? 'DAYS' : 'दिवस', value: timeLeft.days },
                { label: lang === 'en' ? 'HOURS' : 'तास', value: timeLeft.hours },
                { label: lang === 'en' ? 'MINUTES' : 'मिनिटे', value: timeLeft.minutes },
                { label: lang === 'en' ? 'SECONDS' : 'सेकंद', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#28060E] via-[#1B0307] to-[#140205] border border-[#D4AF37]/40 shadow-[0_8px_20px_rgba(0,0,0,0.6)] relative group hover:border-[#D4AF37] transition-all"
                >
                  {/* Subtle inner gold arch embellishment */}
                  <div className="absolute top-1 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                  {/* Digit Display */}
                  <span className="font-royal-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-gold-metallic tabular-nums tracking-tight">
                    {String(item.value).padStart(2, '0')}
                  </span>

                  {/* Label */}
                  <span className="text-[10px] sm:text-xs font-semibold text-[#C5A059] tracking-[0.2em] mt-1 sm:mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Action: Add to Calendar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider bg-[#2B0810] border border-[#D4AF37]/60 text-[#F4EDE2] hover:bg-[#3D0A16] hover:border-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{lang === 'en' ? 'Add to Google Calendar' : 'कॅलेंडरमध्ये जोडा'}</span>
              </a>

              <div className="text-xs text-[#9E8E7C] font-script italic flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{lang === 'en' ? 'Asia/Kolkata (IST) Standard Time' : 'भारतीय मानक वेळ (IST)'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

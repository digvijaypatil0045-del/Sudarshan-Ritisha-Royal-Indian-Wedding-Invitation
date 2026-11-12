import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, MessageSquare, Send, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { INITIAL_GUEST_WISHES } from '../data/weddingData';
import { GuestWish, Language } from '../types/wedding';
import { weddingAudio } from '../utils/audioEngine';

interface GuestWishesSectionProps {
  lang: Language;
}

export const GuestWishesSection: React.FC<GuestWishesSectionProps> = ({ lang }) => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [guestName, setGuestName] = useState('');
  const [relationOrCity, setRelationOrCity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Load saved wishes from localStorage or fall back to authentic initial family blessings
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding_guest_wishes');
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes(INITIAL_GUEST_WISHES);
        localStorage.setItem('wedding_guest_wishes', JSON.stringify(INITIAL_GUEST_WISHES));
      }
    } catch {
      setWishes(INITIAL_GUEST_WISHES);
    }
  }, []);

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const formattedFamily = guestName.trim().toLowerCase().includes('family') ||
      guestName.trim().toLowerCase().includes('parivar')
      ? guestName.trim()
      : `${guestName.trim()} & Family`;

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: guestName.trim(),
      familyOrGroup: formattedFamily,
      relationOrCity: relationOrCity.trim(),
      message: message.trim(),
      timestamp: lang === 'en' ? 'Just now' : 'आत्ताच',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    try {
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Celebratory effect
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.68 },
      colors: ['#D4AF37', '#F3E5AB', '#996515', '#C0392B', '#E74C3C'],
    });
    weddingAudio.playTempleChime();

    setGuestName('');
    setRelationOrCity('');
    setMessage('');
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4500);
  };

  return (
    <section id="wishes" className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#140306] via-[#1B050B] to-[#120407] border-t border-[#D4AF37]/25 overflow-hidden">
      {/* Background Indian jaali texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Heart className="w-4 h-4 fill-[#D4AF37]/40" />
            <span className="font-royal-title text-xs tracking-[0.25em] uppercase font-semibold">
              {lang === 'en' ? 'Auspicious Blessings' : 'शुभ आशीर्वाद'}
            </span>
            <Heart className="w-4 h-4 fill-[#D4AF37]/40" />
          </div>

          <h2 className="font-royal-title text-2xl sm:text-3xl md:text-4xl font-bold text-gold-metallic tracking-wide">
            {lang === 'en' ? 'Guest Wishes & Blessings' : 'आशीर्वाद व शुभेच्छा'}
          </h2>
          <p className="text-xs sm:text-sm text-[#D7C7B2] font-script italic tracking-wider mt-1.5 max-w-lg mx-auto">
            {lang === 'en'
              ? 'Leave your personal congratulatory messages and heartfelt blessings for the newlyweds.'
              : 'नवदाम्पत्यास आपल्या शुभाशीर्वाद व प्रेमपूर्वक शुभेच्छा संदेश पाठवा.'}
          </p>
        </div>

        {/* 2-Column Responsive Layout: Form on Left, Feed on Right */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Wish Submission Form (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#24060C] via-[#1A0307] to-[#120205] border border-[#D4AF37]/45 shadow-[0_12px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4AF37]/25">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-royal-title text-base sm:text-lg font-bold text-[#F3E5AB]">
                    {lang === 'en' ? 'Write a Blessing' : 'शुभेच्छा संदेश लिहा'}
                  </h3>
                </div>
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              </div>

              {submittedSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Your blessing has been posted to the board. Thank you!'
                      : 'आपला शुभेच्छा संदेश प्रकाशित झाला आहे. धन्यवाद!'}
                  </span>
                </div>
              )}

              <form onSubmit={handleWishSubmit} className="space-y-3.5 text-xs sm:text-sm">
                {/* Guest / Family Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#E8D7B8] mb-1">
                    {lang === 'en' ? 'Your Name or Family *' : 'आपले नाव किंवा कुटुंब *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. The Deshmukh Family / Amit Patil' : 'उदा. देशमुख परिवार / अमित पाटील'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#140306] border border-[#D4AF37]/35 text-[#FAF7F0] placeholder-[#786959] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                {/* City or Relation */}
                <div>
                  <label className="block text-xs font-semibold text-[#E8D7B8] mb-1">
                    {lang === 'en' ? 'Hometown or Relation (Optional)' : 'गाव / नातेसंबंध (ऐच्छिक)'}
                  </label>
                  <input
                    type="text"
                    value={relationOrCity}
                    onChange={(e) => setRelationOrCity(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Mumbai / Family Friends' : 'उदा. मुंबई / स्नेही'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#140306] border border-[#D4AF37]/35 text-[#FAF7F0] placeholder-[#786959] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Message / Blessing */}
                <div>
                  <label className="block text-xs font-semibold text-[#E8D7B8] mb-1">
                    {lang === 'en' ? 'Your Congratulatory Message *' : 'शुभेच्छा संदेश *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'Wishing Sudarshan and Ritisha a lifetime of unconditional love, divine peace, and prosperous togetherness...'
                        : 'सुदर्शन आणि रितिशा यांना वैवाहिक जीवनासाठी मनःपूर्वक मंगलमय शुभेच्छा...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#140306] border border-[#D4AF37]/35 text-[#FAF7F0] placeholder-[#786959] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 rounded-full font-royal-serif text-xs sm:text-sm font-bold tracking-wider text-[#140306] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] hover:from-[#FFF2B8] hover:via-[#F1C40F] hover:to-[#B38728] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5 text-[#140306]" />
                  <span>
                    {isSubmitting
                      ? (lang === 'en' ? 'Posting Blessing...' : 'संदेश पाठवत आहे...')
                      : (lang === 'en' ? 'Send Wedding Blessing' : 'शुभेच्छा संदेश पाठवा')}
                  </span>
                </button>
              </form>
            </div>

            <p className="text-[10px] sm:text-[11px] text-[#A89886] italic mt-4 pt-3 border-t border-[#D4AF37]/20 text-center">
              {lang === 'en'
                ? 'Your message will appear with family attribution on the blessings wall.'
                : 'आपला संदेश कुटुंबीयांच्या नावासह शुभेच्छा फलकावर दिसेल.'}
            </p>
          </div>

          {/* RIGHT: Blessings Wall Feed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/25">
              <span className="font-royal-title text-sm sm:text-base font-bold text-[#F3E5AB]">
                {lang === 'en' ? 'Heartfelt Blessings & Wishes' : 'प्राप्त शुभेच्छा व आशीर्वाद'}
              </span>
              <span className="text-xs text-[#C5A059] font-medium">
                {wishes.length} {lang === 'en' ? 'Messages' : 'संदेश'}
              </span>
            </div>

            {/* Scrollable Container with max height */}
            <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#24060C]/90 via-[#1B050B] to-[#140306] border border-[#D4AF37]/35 shadow-md flex flex-col justify-between relative group hover:border-[#D4AF37]/70 transition-all"
                >
                  {/* Subtle corner ornament */}
                  <div className="absolute top-2 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Heart className="w-6 h-6 text-[#D4AF37]" />
                  </div>

                  {/* Personal Attribution Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#3B0912] border border-[#D4AF37]/60 flex items-center justify-center shrink-0 shadow-sm">
                      <UserCheck className="w-4 h-4 text-[#F3E5AB]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-royal-title font-bold text-[#F3E5AB] leading-snug">
                        {lang === 'en'
                          ? `With love and blessings from ${w.familyOrGroup || w.name}`
                          : `${w.familyOrGroup || w.name} यांच्याकडून सस्नेह शुभाशीर्वाद`}
                      </p>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#C5A059]">
                        {w.relationOrCity && (
                          <>
                            <span>{w.relationOrCity}</span>
                            <span>·</span>
                          </>
                        )}
                        <span className="text-[#A89886]">{w.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Congratulatory Message Body */}
                  <div className="pl-11">
                    <p className="text-xs sm:text-sm text-[#FAF7F0] font-script italic leading-relaxed">
                      "{w.message}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

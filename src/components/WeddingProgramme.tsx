import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Download, Check, Shirt } from 'lucide-react';
import { CEREMONY_EVENTS } from '../data/weddingData';
import { CeremonyEvent, Language } from '../types/wedding';

interface WeddingProgrammeProps {
  lang: Language;
}

export const WeddingProgramme: React.FC<WeddingProgrammeProps> = ({ lang }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate downloadable iCalendar (.ics) file for an event
  const downloadIcs = (event: CeremonyEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sudarshan & Ritisha Royal Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - Sudarshan & Ritisha`,
      `DESCRIPTION:${event.description} at ${event.venueName}, ${event.venueAddress}`,
      `LOCATION:${event.venueName}, ${event.venueAddress}`,
      `DTSTART:${event.startDateIso}`,
      `DTEND:${event.endDateIso}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}_sudarshan_ritisha.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="programme" className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#140306] via-[#1B050B] to-[#140306] overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Calendar className="w-4 h-4" />
            <span className="font-royal-title text-xs tracking-[0.25em] uppercase">
              {lang === 'en' ? 'Auspicious Celebrations' : 'मंगल सोहळे'}
            </span>
          </div>

          <h2 className="font-royal-title text-2xl sm:text-3xl md:text-4xl font-bold text-gold-metallic tracking-wide">
            {lang === 'en' ? 'The Wedding Programme' : 'शुभ कार्य पत्रिका'}
          </h2>
          <p className="text-xs sm:text-sm text-[#D7C7B2] font-script italic tracking-wider mt-1 max-w-lg mx-auto">
            {lang === 'en'
              ? 'Join us across each sacred ritual and celebration of our union.'
              : 'प्रत्येक विधी व उत्सवात आपली उपस्थिती आम्हास आनंद देईल.'}
          </p>
        </div>

        {/* Programme Timeline Cards */}
        <div className="w-full space-y-6 sm:space-y-8">
          {CEREMONY_EVENTS.map((event, index) => {
            const isHighlight = event.id === 'vivah';

            return (
              <div
                key={event.id}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                  isHighlight
                    ? 'bg-gradient-to-br from-[#380912] via-[#24040A] to-[#150205] border-2 border-[#D4AF37] shadow-[0_15px_40px_rgba(212,175,55,0.25)]'
                    : 'bg-gradient-to-br from-[#24060C] via-[#1A0307] to-[#120205] border border-[#D4AF37]/40 shadow-lg hover:border-[#D4AF37]/80'
                }`}
              >
                {/* Event Top Badge (Chronological order) */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#1A0307] border border-[#D4AF37] text-xs font-royal-title font-bold text-[#F3E5AB] flex items-center justify-center">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-royal-title tracking-[0.2em] text-[#C5A059] uppercase">
                      {lang === 'en' ? event.day : event.dayMr} · {lang === 'en' ? event.dateStr : event.dateStrMr}
                    </span>
                  </div>

                  {isHighlight && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-royal-title font-bold tracking-wider text-[#140306] bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#140306]" />
                      {lang === 'en' ? 'MAIN WEDDING CEREMONY' : 'मुख्य विवाह मुहूर्त'}
                    </span>
                  )}
                </div>

                {/* Event Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8">
                    {/* Titles */}
                    <h3 className="font-royal-title text-xl sm:text-2xl md:text-3xl font-bold text-gold-metallic">
                      {lang === 'en' ? event.title : event.titleMr}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D7C7B2] font-script italic mt-0.5">
                      {lang === 'en' ? event.subTitle : event.subTitleMr}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#FAF7F0] mt-3 leading-relaxed">
                      {lang === 'en' ? event.description : event.descriptionMr}
                    </p>

                    {/* Dress Code suggestion */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#E8D7B8]">
                      <Shirt className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="font-medium text-[#C5A059]">{lang === 'en' ? 'Attire:' : 'पोशाख:'}</span>
                      <span>{lang === 'en' ? event.dressCode : event.dressCodeMr}</span>
                    </div>
                  </div>

                  {/* Timing & Venue Box */}
                  <div className="lg:col-span-4 p-4 rounded-xl bg-[#140306]/80 border border-[#D4AF37]/30 flex flex-col justify-between h-full space-y-3">
                    <div className="space-y-2">
                      {/* Timing */}
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-[#A89886] uppercase tracking-wider font-semibold">
                            {lang === 'en' ? 'Timing' : 'वेळ'}
                          </p>
                          <p className="text-xs sm:text-sm font-bold text-[#F3E5AB]">
                            {lang === 'en' ? event.timing : event.timingMr}
                          </p>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-[#A89886] uppercase tracking-wider font-semibold">
                            {lang === 'en' ? 'Venue' : 'स्थळ'}
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-[#FAF7F0]">
                            {event.venueName}
                          </p>
                          <p className="text-[11px] text-[#A89886] leading-tight mt-0.5">
                            {event.venueAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action: Add to Calendar */}
                    <button
                      onClick={() => downloadIcs(event)}
                      className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-semibold bg-[#2B0810] hover:bg-[#3D0A16] border border-[#D4AF37]/50 text-[#F4EDE2] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {copiedId === event.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#2ECC71]" />
                          <span>{lang === 'en' ? 'Downloaded .ics!' : 'डाउनलोड झाले!'}</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{lang === 'en' ? 'Save Event to Calendar' : 'कॅलेंडरमध्ये सेव्ह करा'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Train, Plane } from 'lucide-react';
import { VENUES_DATA } from '../data/weddingData';
import { Language } from '../types/wedding';

interface VenuesSectionProps {
  lang: Language;
}

export const VenuesSection: React.FC<VenuesSectionProps> = ({ lang }) => {
  const [copiedVenueId, setCopiedVenueId] = useState<string | null>(null);

  const copyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedVenueId(id);
    setTimeout(() => setCopiedVenueId(null), 2500);
  };

  return (
    <section id="venues" className="relative py-16 sm:py-24 px-4 bg-[#120407] border-t border-[#D4AF37]/20">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 text-[#D4AF37]">
            <MapPin className="w-4 h-4" />
            <span className="font-royal-title text-xs tracking-[0.25em] uppercase">
              {lang === 'en' ? 'Destinations of Celebration' : 'सोहळा स्थळे'}
            </span>
          </div>

          <h2 className="font-royal-title text-2xl sm:text-3xl md:text-4xl font-bold text-gold-metallic tracking-wide">
            {lang === 'en' ? 'Venues & Directions' : 'विवाह स्थळ व मार्ग'}
          </h2>
          <p className="text-xs sm:text-sm text-[#D7C7B2] font-script italic tracking-wider mt-1 max-w-lg mx-auto">
            {lang === 'en'
              ? 'Find detailed addresses, Google Maps navigation, and travel transit information.'
              : 'सोहळा स्थळांचे पत्ते आणि थेट गुगल मॅप्स दिशानिर्देश.'}
          </p>
        </div>

        {/* 2 Marquee Venue Cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {VENUES_DATA.map((venue) => {
            const isMainWedding = venue.id === 'gondia_venue';

            return (
              <div
                key={venue.id}
                className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#24060C] via-[#1A0307] to-[#120205] border border-[#D4AF37]/40 shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-300"
              >
                {/* Venue Visual Image Banner */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#1D0408]">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307] via-transparent to-black/40" />

                  {/* Venue Tag Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full text-[11px] font-royal-title font-bold tracking-wider text-[#140306] bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] shadow-md">
                      {isMainWedding
                        ? (lang === 'en' ? 'MAIN WEDDING VENUE' : 'मुख्य विवाह स्थळ')
                        : (lang === 'en' ? 'WEDDING RECEPTION & WELCOME CEREMONY' : 'स्वागत समारंभ व रिसेप्शन')}
                    </span>
                  </div>
                </div>

                {/* Venue Text Details */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between space-y-6">
                  <div>
                    <h3 className="font-royal-title text-2xl sm:text-3xl font-extrabold text-gold-metallic">
                      {venue.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D4AF37] font-semibold tracking-wider mt-1">
                      {venue.city}
                    </p>

                    <p className="text-xs sm:text-sm text-[#FAF7F0] mt-3 leading-relaxed">
                      {lang === 'en' ? venue.description : venue.descriptionMr}
                    </p>

                    {/* Address Box */}
                    <div className="mt-4 p-3.5 rounded-xl bg-[#140306] border border-[#D4AF37]/25 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 text-xs text-[#FAF7F0]">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-[#A89886] tracking-wider">
                            {lang === 'en' ? 'Address' : 'पत्ता'}
                          </p>
                          <p className="font-medium mt-0.5 leading-snug">{venue.fullAddress}</p>
                        </div>
                      </div>

                      {/* Copy Address Button */}
                      <button
                        onClick={() => copyAddress(venue.id, venue.fullAddress)}
                        className="p-1.5 rounded-lg text-[#C5A059] hover:text-[#FAF7F0] hover:bg-[#2B0810] transition-colors shrink-0"
                        title="Copy address"
                      >
                        {copiedVenueId === venue.id ? (
                          <Check className="w-4 h-4 text-[#2ECC71]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Transit & Travel Details */}
                    <div className="mt-4 space-y-2 text-xs text-[#D7C7B2] pt-2 border-t border-[#D4AF37]/20">
                      <div className="flex items-center gap-2">
                        <Train className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="text-[11px] text-[#A89886] font-semibold">{lang === 'en' ? 'Train:' : 'रेल्वे:'}</span>
                        <span className="text-[11px] text-[#FAF7F0]">{venue.travelInfo.station}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="text-[11px] text-[#A89886] font-semibold">{lang === 'en' ? 'Airport:' : 'विमानतळ:'}</span>
                        <span className="text-[11px] text-[#FAF7F0]">{venue.travelInfo.airport}</span>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Directions Action CTA */}
                  <div className="pt-4 border-t border-[#D4AF37]/20">
                    <a
                      href={venue.gmapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-5 rounded-full text-xs sm:text-sm font-royal-serif font-bold tracking-wider text-[#140306] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] hover:from-[#FFF2B8] hover:via-[#F1C40F] hover:to-[#B38728] shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Navigation className="w-4 h-4 text-[#140306]" />
                      <span>{lang === 'en' ? 'Get Directions on Google Maps' : 'गुगल मॅप्सवर मार्ग मिळवा'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#140306]" />
                    </a>
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

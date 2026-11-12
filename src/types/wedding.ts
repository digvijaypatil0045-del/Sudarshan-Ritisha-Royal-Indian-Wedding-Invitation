export type Language = 'en' | 'mr';

export interface CeremonyEvent {
  id: string;
  title: string;
  titleMr: string;
  subTitle: string;
  subTitleMr: string;
  dateStr: string;
  dateStrMr: string;
  day: string;
  dayMr: string;
  timing: string;
  timingMr: string;
  venueName: string;
  venueCity: string;
  venueAddress: string;
  description: string;
  descriptionMr: string;
  dressCode: string;
  dressCodeMr: string;
  startDateIso: string;
  endDateIso: string;
  gmapsQuery: string;
}

export interface VenueInfo {
  id: string;
  tag: string;
  name: string;
  city: string;
  fullAddress: string;
  phone?: string;
  gmapsUrl: string;
  image: string;
  description: string;
  descriptionMr: string;
  travelInfo: {
    station: string;
    airport: string;
  };
}

export interface GuestWish {
  id: string;
  name: string;
  familyOrGroup?: string;
  relationOrCity?: string;
  message: string;
  timestamp: string;
}

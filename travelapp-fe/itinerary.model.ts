export interface Itinerary {
  destination: string;
  startDate: string; // Format: YYYY-MM-DD
  endDate: string;
  travelers: {
    adults: number;
    elders: number;
    children: number;
    childAges: string[];
  };
  preferences: {
    interests: string[];
    tripStyle: 'Relaxed' | 'Balanced' | 'Packed';
    specialNotes: string;
  };
  currency: {
    localCurrency: string;
    exchangeRateToEUR: number;
    exchangeRateToUSD: number;
    note: string;
  };
  transportationOptions: TransportationOption[];
  days: DayPlan[];
}

export interface TransportationOption {
  type: string; // e.g. "Taxi", "Public Transport"
  provider?: string;
  ticketInfo?: string;
  apps?: string[];
  note?: string;
}

export interface DayPlan {
  date: string; // Format: YYYY-MM-DD
  title: string;
  summary: string;
  weather: {
    forecast: string;
    temperatureHigh: string;
    temperatureLow: string;
    rainChance: string;
  };
  activities: Activity[];
}

export interface Activity {
  time: string;
  type: 'sightseeing' | 'meal' | 'walk' | 'logistics' | 'kid-friendly' | 'shopping' | 'relax';
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  title: string;
  description: string;
  group: ('all' | 'adults' | 'elders' | 'children')[];
  location?: {
    name: string;
    googleMapsUrl: string;
  };
  transportation?: {
    mode: 'walk' | 'taxi' | 'metro' | 'bus' | 'tram' | 'funicular';
    note: string;
  };
}

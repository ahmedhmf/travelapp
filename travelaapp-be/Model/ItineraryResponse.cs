namespace travelaapp_be.Model
{
    public class ItineraryResponse
    {
        public string Destination { get; set; }
        public string StartDate { get; set; }  // YYYY-MM-DD
        public string EndDate { get; set; }
        public Travelers Travelers { get; set; }
        public Preferences Preferences { get; set; }
        public CurrencyInfo Currency { get; set; }
        public List<TransportationOption> TransportationOptions { get; set; }
        public List<DayPlan> Days { get; set; }
    }

    public class Travelers
    {
        public int Adults { get; set; }
        public int Elders { get; set; }
        public int Children { get; set; }
        public List<string> ChildAges { get; set; }
    }

    public class Preferences
    {
        public List<string> Interests { get; set; }
        public string TripStyle { get; set; }  // "Relaxed" | "Balanced" | "Packed"
        public string SpecialNotes { get; set; }
    }

    public class CurrencyInfo
    {
        public string LocalCurrency { get; set; }
        public double ExchangeRateToEUR { get; set; }
        public double ExchangeRateToUSD { get; set; }
        public string Note { get; set; }
    }

    public class TransportationOption
    {
        public string Type { get; set; }
        public string Provider { get; set; }
        public string TicketInfo { get; set; }
        public List<string> Apps { get; set; }
        public string Note { get; set; }
    }

    public class DayPlan
    {
        public string Date { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public Weather Weather { get; set; }
        public List<Activity> Activities { get; set; }
    }

    public class Weather
    {
        public string Forecast { get; set; }
        public string TemperatureHigh { get; set; }
        public string TemperatureLow { get; set; }
        public string RainChance { get; set; }
    }

    public class Activity
    {
        public string Time { get; set; }
        public string Type { get; set; }  // e.g. sightseeing, meal, relax
        public string MealType { get; set; }  // breakfast, lunch, dinner
        public string Title { get; set; }
        public string Description { get; set; }
        public List<string> Group { get; set; }  // all, adults, elders, children
        public Location Location { get; set; }
        public TransportDetail Transportation { get; set; }
    }

    public class Location
    {
        public string Name { get; set; }
        public string GoogleMapsUrl { get; set; }
    }

    public class TransportDetail
    {
        public string Mode { get; set; }  // walk, metro, bus, etc.
        public string Note { get; set; }
    }
}

namespace travelaapp_be.Models
{
    public class TravelPlan
    {
        public string City { get; set; }
        public string Duration { get; set; }
        public List<string> Preferences { get; set; }
        public Dictionary<string, DaySchedule> Itinerary { get; set; }
    }

    public class DaySchedule
    {
        public string Date { get; set; }
        public string Weather { get; set; }
        public List<ScheduleItem> Schedule { get; set; }
    }

    public class ScheduleItem
    {
        public string Time { get; set; }
        public string Activity { get; set; }

        // Optional: if the activity is a place (museum, tour, etc.)
        public PlaceDetails Details { get; set; }

        // Optional: if the activity is a meal
        public MealOptions Options { get; set; }
    }

    public class PlaceDetails
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public string GoogleMapsUrl { get; set; }
        public ReservationRequirement ReservationRequirement { get; set; }
        public string ReservationLink { get; set; }
    }

    public class MealOptions
    {
        public Restaurant Cheap { get; set; }
        public Restaurant Mid { get; set; }
        public Restaurant Expensive { get; set; }
    }

    public class Restaurant : PlaceDetails
    {
        public string MenuLink { get; set; }
        public string PhoneNumber { get; set; }
    }

    public enum ReservationRequirement
    {
        MustReserve,
        Recommended,
        NotRequired
    }
}

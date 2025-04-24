namespace travelaapp_be.Model
{
    public class DailyPlan
    {
        public string Date { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<DailyActivity> Schedule { get; set; } = new();
    }

    public class DailyActivity
    {
        public string Time { get; set; } = string.Empty;
        public string Activity { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string PlaceType { get; set; } = string.Empty;
        public string BookingAdvice { get; set; } = string.Empty;
        public string GoogleMapsLink { get; set; } = string.Empty;
        public string Website { get; set; } = string.Empty;
        public string? MenuLink { get; set; }
        public string? ReservationLink { get; set; }
    }
}

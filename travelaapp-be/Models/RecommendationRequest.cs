namespace travelaapp_be.Models
{
    public class RecommendationRequest
    {
        public string Destination { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public UserPreferences Preferences { get; set; }
    }

    public class UserPreferences
    {
        public List<string> Interests { get; set; }
    }
}

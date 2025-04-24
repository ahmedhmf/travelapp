namespace travelaapp_be.Model
{
    public class TripData
    {
        public string Destination { get; set; }
        public string StartDate { get; set; }  // YYYY-MM-DD
        public string EndDate { get; set; }
        public int Adults { get; set; }
        public int Elders { get; set; }
        public int Children { get; set; }
        public List<int> ChildAges { get; set; }
        public string[] Interests { get; set; }
        public string TripStyle { get; set; }  // "Relaxed" | "Balanced" | "Packed"
        public string Notes { get; set; }

        public string[]? places { get; set; }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using travelaapp_be.Model;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.AccessControl;

namespace travelaapp_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY") ?? "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";

        public RecommendationController()
        {
            _httpClient = new HttpClient();
        }
        [HttpPost]
        public async Task<ActionResult<List<RecommendedPlace>>> GetRecommendations([FromBody] TripData trip)
        {
            var prompt = GeneratePrompt(trip);

            var requestBody = new
                                      {
                                              model = "openai/gpt-3.5-turbo", // or "openai/gpt-3.5-turbo"
                                              messages = new[]
                                                                 {
                                                                         new { role = "user", content = prompt }
                                                                 }
                                      };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://openrouter.ai/api/v1/chat/completions")
                                  {
                                          Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
                                  };

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _openAiKey);
            request.Headers.Add("HTTP-Referer", "https://yourdomain.com"); // Required by OpenRouter

            var response = await _httpClient.SendAsync(request);
            var responseBody = await response.Content.ReadAsStringAsync();

            var responseJson = JsonDocument.Parse(responseBody)
                                           .RootElement.GetProperty("choices")[0]
                                           .GetProperty("message")
                                           .GetProperty("content")
                                           .GetString();

            var places = JsonSerializer.Deserialize<List<RecommendedPlace>>(responseJson!, new JsonSerializerOptions
                                                                                                   {
                                                                                                           PropertyNameCaseInsensitive = true
                                                                                                   });
            if(places == null || !places.Any())
            {
                return new List<RecommendedPlace>();
            }
            var enrichedPlaces = new List<RecommendedPlace>();
            foreach (var place in places)
            {
                var imageUrl = await GetImageUrlFromWikipediaAsync(place.Name) ?? await GetImageUrlFromUnsplashAsync(place.Name);
                enrichedPlaces.Add(new RecommendedPlace { Name = place.Name, ImageUrl = imageUrl ?? "" });
            }

            return enrichedPlaces;

        }

        [HttpPost]
        [Route("plan")]
        public async Task<List<DailyPlan>> GetPlan(TripData trip)
        {
            var prompt = GenerateCustomPlanPrompt(trip);

            var requestBody = new
                                      {
                                              model = "openai/gpt-3.5-turbo",
                                              messages = new[]
                                                                 {
                                                                         new { role = "user", content = prompt }
                                                                 }
                                      };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://openrouter.ai/api/v1/chat/completions")
                                  {
                                          Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
                                  };

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _openAiKey);
            request.Headers.Add("HTTP-Referer", "https://yourdomain.com");

            var response = await _httpClient.SendAsync(request);
            var responseBody = await response.Content.ReadAsStringAsync();

            var responseJson = JsonDocument.Parse(responseBody)
                                           .RootElement.GetProperty("choices")[0]
                                           .GetProperty("message")
                                           .GetProperty("content")
                                           .GetString();

            var plan = JsonSerializer.Deserialize<List<DailyPlan>>(responseJson!, new JsonSerializerOptions
                                                                                          {
                                                                                                  PropertyNameCaseInsensitive = true
                                                                                          });

            return plan ?? new List<DailyPlan>();
        }


        private async Task<string?> GetImageUrlFromWikipediaAsync(string placeName)
        {
            string apiUrl = $"https://en.wikipedia.org/w/api.php?action=query&titles={Uri.EscapeDataString(placeName)}&prop=pageimages&format=json&pithumbsize=500";

            var response = await _httpClient.GetAsync(apiUrl);
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var pages = doc.RootElement.GetProperty("query").GetProperty("pages");

            foreach (var page in pages.EnumerateObject())
            {
                if (page.Value.TryGetProperty("thumbnail", out var thumb))
                    return thumb.GetProperty("source").GetString();
            }

            return null;
        }

        private async Task<string?> GetImageUrlFromUnsplashAsync(string query)
        {
            string apiUrl = $"https://api.unsplash.com/search/photos?page=1&query={Uri.EscapeDataString(query)}&client_id=h4KFG21nmcBkcbfDVgnMe0iAcdzV92NAgrmAoEs9pFU";

            var response = await _httpClient.GetAsync(apiUrl);
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var results = doc.RootElement.GetProperty("results");
            if (results.GetArrayLength() > 0)
            {
                var image = results[0];
                if (image.TryGetProperty("urls", out var urls))
                {
                    return urls.GetProperty("regular").GetString();
                }
            }

            return null;
        }


        private string GenerateCustomPlanPrompt(TripData request)
        {
            var dates = $"{request.StartDate} to {request.EndDate}";
            var places = string.Join(", ", request.places);
            var interests = request.Interests != null ? string.Join(", ", request.Interests) : "Not specified";
            var notes = string.IsNullOrWhiteSpace(request.Notes) ? "None" : request.Notes;
            var childAges = request.ChildAges != null && request.ChildAges.Any() ? string.Join(", ", request.ChildAges) : "Not specified";

            return $@"
You are a travel assistant helping a user build a highly detailed daily itinerary for their trip.

Destination: {request.Destination}
Dates: {dates}
Travel Group:
- Adults: {request.Adults}
- Elders: {request.Elders}
- Children: {request.Children}
- Child Ages: {childAges}
Interests: {interests}
Notes: {notes}
Selected Locations: {places}
Schedule Pace: {request.TripStyle} (Relaxed, Balanced, or Packed)

Please:
- Distribute the selected locations across the trip dates
- Respect the user's trip pace: relaxed (few places), balanced (moderate), or packed (full days)
- Consider weather, accessibility for elders, and age-appropriateness for children
- Allocate realistic travel time between places and avoid over-scheduling
- Include estimated time blocks for each activity (e.g., 10:00–11:30 Visit Buda Castle)
- Include a short description of each activity
- Include breaks for lunch, rest, or free time
- For each location included, add:
  - Whether advance booking is required, recommended, or not needed
  - The place type (e.g., museum, park, restaurant)
  - A Google Maps link
  - A direct website link if available
  - If it's a restaurant, add a menu link and a reservation link if available

Return ONLY a JSON array in the following format:
[
  {{
    ""date"": ""YYYY - MM - DD"",
    ""summary"": ""Short overview of the day"",
    ""schedule"": [
      {{
                {{
                    ""time"": ""09:30–11:00"",
        ""activity"": ""Visit Buda Castle"",
        ""description"": ""Explore the historic castle with panoramic views of the city."",
        ""placeType"": ""Historical site"",
        ""bookingAdvice"": ""Recommended to book ahead"",
        ""googleMapsLink"": ""https://maps.google.com/?q=Buda+Castle"",
        ""website"": ""https://budacastle.hu"",
        ""menuLink"": null,
        ""reservationLink"": null
      }}
            }}
    ]
  }}
    }}
]
";
    }

private string GeneratePrompt(TripData trip)
        {
            return $@"
You are a travel assistant.
The user is planning a trip to {trip.Destination} from {trip.StartDate} to {trip.EndDate}.

Travel group:
- Adults: {trip.Adults}
- Elders: {trip.Elders}
- Children: {trip.Children}
- Children Ages: {(trip.ChildAges != null && trip.ChildAges.Any() ? string.Join(", ", trip.ChildAges) : "Not specified")}

Trip style: {trip.TripStyle}
Interests: {(trip.Interests != null && trip.Interests.Length > 0 ? string.Join(", ", trip.Interests) : "Not specified")}
Notes: {(string.IsNullOrWhiteSpace(trip.Notes) ? "None" : trip.Notes)}

Please recommend 10 interesting places to visit in {trip.Destination}, taking into account trip style and Interests and ages of people in the trip:

Return only a valid JSON array.
Each item must include:
- name: the place name
- imageUrl: a **working direct image URL**, preferably from Google Maps Pictures.
Do not use fake image links or broken URLs.

Example:
[
  {{ ""name"": ""Place Name"", ""imageUrl"": ""https://link.to/image.jpg"" }},
            ...
                    ]

            Use real, publicly hosted images(Wikimedia, Unsplash, etc.). No explanation or extra text.
            ";
}

    }
}

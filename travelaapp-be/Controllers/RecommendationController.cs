using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using travelaapp_be.Model;

namespace travelaapp_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY") ?? "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";
        private readonly string groqKey = "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";
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
            if (places == null || !places.Any())
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
        public async Task<TravelPlan> GetPlanGroq(TripData trip)
        {
            var prompt = GenerateCustomPlanPrompt(trip);

            var requestBody = new
                                      {
                                              model = "meta-llama/llama-4-scout-17b-16e-instruct",
                                              messages = new[]
                                                                 {
                                                                         new { role = "user", content = prompt }
                                                                 },
                                              temperature = 0.7
                                      };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.groq.com/openai/v1/chat/completions")
                                  {
                                          Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
                                  };

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", groqKey);

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(json);
            var content = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
            var pFrom = content.IndexOf("```json") + "```json".Length;
            var pTo = content.LastIndexOf("```");
            var result = content.Substring(pFrom, pTo - pFrom);
            var plan = Newtonsoft.Json.JsonConvert.DeserializeObject<TravelPlan>(result);
            //var plan = JsonSerializer.Deserialize<TravelPlan>(content!, new JsonSerializerOptions
            //                                                                    {
            //                                                                            PropertyNameCaseInsensitive = true
            //                                                                    });
            return plan;
        }

        [HttpPost]
        [Route("plan1")]
        public async Task<TravelPlan> GetPlan(TripData trip)
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

            var plan = JsonSerializer.Deserialize<TravelPlan>(responseJson!, new JsonSerializerOptions
                                                                                           {
                                                                                                   PropertyNameCaseInsensitive = true
                                                                                           });

            return plan ?? new TravelPlan();
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
            var travelers = $"{request.Adults} adults, {request.Elders} elder(s), {request.Children} child(ren)";
            var childAges = request.ChildAges != null && request.ChildAges.Any() ? string.Join(", ", request.ChildAges) : "Not specified";
            return $@"
You are a travel planning assistant. Based on the input details, generate a detailed day-by-day travel itinerary in JSON format.

### INPUT
Destination: {request.Destination}  
Start Date: {request.StartDate}   
End Date: {request.EndDate} 
Travelers: {travelers}  
Trip Style: {request.TripStyle}  
Interests: {interests}  
Notes: The elder prefers shorter walking distances. Kids prefer some games or zoos or something like this

### REQUIREMENTS

Generate a JSON object with the following structure:

{{
  ""city"": ""string"",
  ""duration"": ""e.g. 4 days"",
  ""preferences"": [ ""list of interests"" ],
  ""itinerary"": {{
    ""day_1"": {{
      ""date"": ""YYYY-MM-DD"",
      ""weather"": ""Typical weather for the city during the date (e.g. Sunny, 27°C)"",
      ""schedule"": [
        {{
          ""time"": ""08:30"",
          ""activity"": ""Breakfast"",
          ""options"": {{
            ""cheap"": {{ ...restaurantDetails }},
            ""mid"": {{ ...restaurantDetails }},
            ""expensive"": {{ ...restaurantDetails }}
          }}
        }},
        {{
          ""time"": ""10:00"",
          ""activity"": ""Visit to Colosseum"",
          ""details"": {{
            ""name"": ""Colosseum"",
            ""description"": ""Iconic Roman amphitheater known for gladiator battles."",
            ""website"": ""https://www.coopculture.it/en/colosseo-e-shop.cfm"",
            ""googleMapsUrl"": ""https://maps.google.com/?q=Colosseum+Rome"",
            ""reservationRequirement"": ""MustReserve"",
            ""reservationLink"": ""https://www.coopculture.it/en/ticket_office.cfm""
          }}
        }},
        ...
        {{
          ""time"": ""19:00"",
          ""activity"": ""Dinner"",
          ""options"": {{
            ""cheap"": {{ ...restaurantDetails }},
            ""mid"": {{ ...restaurantDetails }},
            ""expensive"": {{ ...restaurantDetails }}
          }}
        }}
      ]
    }},
    ...
  }}
}}

---

### STRUCTURE DEFINITIONS:

Each restaurant option includes:

```json
{{
  ""name"": ""string"",
  ""description"": ""optional string"",
  ""website"": ""url"",
  ""googleMapsUrl"": ""url"",
  ""reservationRequirement"": ""MustReserve | Recommended | NotRequired"",
  ""reservationLink"": ""url or null"",
  ""menuLink"": ""url"",
  ""phoneNumber"": ""string""
}}

Each activity (non-meal) should include a ""details"" object with:

{{
  ""name"": ""string"",
  ""description"": ""short description"",
  ""website"": ""url"",
  ""googleMapsUrl"": ""url"",
  ""reservationRequirement"": ""MustReserve | Recommended | NotRequired"",
  ""reservationLink"": ""url or null""
}}

LOGIC & CONSIDERATIONS
Use the date range to calculate number of days and assign date to each day.

Match number of activities to the trip style:

""relaxed"" = 2–3 slow-paced activities

""balanced"" = 3–4 activities per day with breaks

""packed"" = 5–6 active items per day

Adjust the itinerary for:

Children: include playful, engaging stops

Elders: avoid long walking, stairs, or standing in queues

Group attractions that are geographically close on the same day

Suggest nearby restaurants for each meal (within walking distance of previous activity)

Simulate realistic travel time and traffic spacing between events

Assume typical weather for that city on those dates

RESPONSE FORMAT
Return only a valid JSON object matching the above schema.
Do not include any explanation, markdown, or additional commentary.

### NOW GENERATE THE ITINERARY
";
//            return $@"
//You are a professional travel planner.

//Please create a detailed day-by-day itinerary for a trip to **{request.Destination}** from **{request.StartDate}** to **{request.EndDate}**.

//---

//### 🧍 Travelers:
//- Adults: {request.Adults}
//- Elders: {request.Elders}
//- Children: {request.Children}
//- Child Ages: {childAges}

//---

//### 🎯 Interests:
//{interests}

//### 📝 Notes from the user:
//{notes}

//### 🗂 Trip Style:
//**{request.TripStyle}**

//- Relaxed → 2–3 slow-paced activities/day  
//- Balanced → 3–5 activities/day  
//- Packed → up to 6–7 structured activities/day

//---

//### 📍 Must-include Locations:
//{places}

//---

//## 📅 Your Task:

//Generate one entry **per day** for **each day from {request.StartDate} to {request.EndDate}**.  
//Do **not group or skip days or skip meals** — one object per date, even if some days are light.

//Each day should include:
//- `date`: The day of the itinerary (YYYY-MM-DD)
//- `summary`: One-sentence summary
//- `schedule`: A list of time blocks (from 09:00 to 20:00)

//---

//### 🕒 Each schedule item must include:

//#### For activities:
//- ""time"": time range
//- ""activity"": short name
//- ""description"": brief explanation
//- ""placeType"": e.g., museum, park, viewpoint
//- ""bookingAdvice"": Required / Recommended / Not needed
//- ""googleMapsLink"": Google Maps link
//- ""website"": official website (if available)
//- ""menuLink"": null
//- ""reservationLink"": null

//#### For meals (Lunch or Dinner):
//- ""time"": time block for lunch or dinner
//- ""activity"": ""Lunch"" or ""Dinner""
//- ""placeType"": ""Meal""
//- ""description"": e.g., ""Choose from these great restaurants""
//- ""options"": an array of 3 restaurant objects, one per price range:
//  - Each object must contain:
//            - ""name""
//            - ""priceLevel"": ""cheap"", ""moderate"", or ""expensive""
//            - ""description"": what kind of food and atmosphere
//            - ""googleMapsLink""
//            - ""website""
//            - ""menuLink""
//            - ""reservationLink""

//        -- -

//### ✅ Output Format (only return JSON!):

//```json
//[
//  {{
//                {{
//                    ""date"": ""2025-04-20"",
//            ""summary"": ""Explore Castle Hill and enjoy traditional Hungarian cuisine."",
//    ""schedule"": [
//      {{
//                {{
//                    {{
//                            ""time"": ""09:30–11:00"",
//        ""activity"": ""Visit Buda Castle"",
//        ""description"": ""Start your day with panoramic views and rich history."",
//        ""placeType"": ""Historical site"",
//        ""bookingAdvice"": ""Recommended"",
//        ""googleMapsLink"": ""https://maps.google.com/?q=Buda+Castle"",
//        ""website"": ""https://budacastle.hu"",
//        ""menuLink"": null,
//        ""reservationLink"": null
//      }}
//                    }},
//      {{
//                        {{
//                            ""time"": ""13:00–14:30"",
//        ""activity"": ""Lunch"",
//        ""description"": ""Choose from these local restaurants for a midday meal."",
//        ""placeType"": ""Meal"",
//        ""bookingAdvice"": ""Recommended"",
//        ""googleMapsLink"": null,
//        ""website"": null,
//        ""menuLink"": null,
//        ""reservationLink"": null,
//        ""options"": [
//          {{
//                                {{
//                                    ""name"": ""Paprika Vendéglő"",
//            ""priceLevel"": ""cheap"",
//            ""description"": ""Classic Hungarian cuisine in a cozy setting."",
//            ""googleMapsLink"": ""https://maps.google.com/?q=Paprika+Vendeglo"",
//            ""website"": ""https://paprikavendeglo.hu"",
//            ""menuLink"": ""https://paprikavendeglo.hu/menu"",
//            ""reservationLink"": null
//          }}
//                            }},
//          {{
//                                {{
//                                    ""name"": ""Menza"",
//            ""priceLevel"": ""moderate"",
//            ""description"": ""Trendy spot serving Hungarian bistro dishes."",
//            ""googleMapsLink"": ""https://maps.google.com/?q=Menza+Budapest"",
//            ""website"": ""https://menzaetterem.hu"",
//            ""menuLink"": ""https://menzaetterem.hu/menu"",
//            ""reservationLink"": ""https://menzaetterem.hu/reservations""
//          }}
//                            }},
//          {{
//                                {{
//                                    ""name"": ""Costes Downtown"",
//            ""priceLevel"": ""expensive"",
//            ""description"": ""Michelin-starred fine dining restaurant with modern flair."",
//            ""googleMapsLink"": ""https://maps.google.com/?q=Costes+Downtown"",
//            ""website"": ""https://costes.hu/downtown"",
//            ""menuLink"": ""https://costes.hu/menu"",
//            ""reservationLink"": ""https://costes.hu/reservations""
//          }}
//                            }}
//        ]
//      }}
//                    }}
//    ]
//  }}
//            }}
//]";
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

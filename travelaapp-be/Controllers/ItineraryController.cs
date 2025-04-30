using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using travelaapp_be.Models;
using Microsoft.AspNetCore.Authorization;

namespace travelaapp_be.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ItineraryController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ItineraryController()
        {
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", "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");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TripRequest request)
        {
            var fullPrompt = $@"
You are a helpful and friendly travel planner AI that creates structured and detailed trip itineraries for families.
Please generate a detailed multi-day travel itinerary **and return it as a raw JSON object**, not a string.
⚠️ Important:
- Do not include any markdown formatting (like ```json)
- Do not wrap the JSON in quotation marks
- Only output a valid JSON object (no extra explanation)

Follow this schema:
{{
  ""destination"": ""string"",
  ""startDate"": ""YYYY-MM-DD"",
  ""endDate"": ""YYYY-MM-DD"",
  ""travelers"": {{
    ""adults"": number,
    ""elders"": number,
    ""children"": number,
    ""childAges"": [""string""]
  }},
  ""preferences"": {{
    ""interests"": [""string""],
    ""tripStyle"": ""Relaxed | Balanced | Packed"",
    ""specialNotes"": ""string""
  }},
  ""currency"": {{
    ""localCurrency"": ""HUF"",
    ""exchangeRateToEUR"": number,
    ""exchangeRateToUSD"": number,
    ""note"": ""string""
  }},
  ""transportationOptions"": [
    {{
      ""type"": ""string"",
      ""provider"": ""string"",
      ""ticketInfo"": ""string"",
      ""apps"": [""string""],
      ""note"": ""string""
    }}
  ],
  ""days"": [
    {{
      ""date"": ""YYYY-MM-DD"",
      ""title"": ""string"",
      ""summary"": ""string"",
      ""weather"": {{
        ""forecast"": ""string"",
        ""temperatureHigh"": ""string"",
        ""temperatureLow"": ""string"",
        ""rainChance"": ""string""
      }},
      ""activities"": [
        {{
          ""time"": ""string"",
          ""type"": ""sightseeing | meal | walk | logistics | kid-friendly | shopping | relax"",
          ""mealType"": ""breakfast | lunch | dinner"",
          ""title"": ""string"",
          ""description"": ""string"",
          ""group"": [""all | elders | adults | children""],
          ""location"": {{
            ""name"": ""string"",
            ""googleMapsUrl"": ""string""
          }},
          ""transportation"": {{
            ""mode"": ""walk | taxi | metro | bus | tram | funicular"",
            ""note"": ""string""
          }}
        }}
      ]
    }}
  ]
}}

Here is the trip request to plan:
Destination: {request.Destination}
Dates: {request.StartDate} to {request.EndDate}
Travelers: {request.Adults} adults, {request.Elders} elders, {request.Children} children ({request.ChildAges})
Interests: {string.Join(", ", request.Interests)}
Trip Style: {request.TripStyle}
Notes: {request.Notes}

Only respond with structured JSON. Do not include any explanation or extra commentary.
";
            var groqBody = new
            {
                model = "meta-llama/llama-4-scout-17b-16e-instruct", // You can also use llama2-70b-4096
                messages = new[]
                {
                    new { role = "system", content = "You are a friendly travel planner who creates detailed itineraries." },
                    new { role = "user", content = fullPrompt }
                }
            };

            var content = new StringContent(JsonSerializer.Serialize(groqBody), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://api.groq.com/openai/v1/chat/completions", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            var responseJson = JsonDocument.Parse(responseBody);
            var contentString = responseJson.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            contentString = contentString?
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            // Parse the JSON string returned from the model
            try
            {
                var unescaped = System.Text.RegularExpressions.Regex.Unescape(contentString);

                // Remove wrapping quotes if needed
                if (unescaped.StartsWith("\"") && unescaped.EndsWith("\""))
                {
                    unescaped = unescaped.Substring(1, unescaped.Length - 2);
                }

                var itinerary = JsonSerializer.Deserialize<ItineraryResponse>(unescaped, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return Ok(itinerary);
            }
            catch (JsonException ex)
            {
                // If this fails, it means the string is double-escaped, so fix it:
                Console.WriteLine("Direct parse failed — trying unescaping.");

                var unescaped = System.Text.RegularExpressions.Regex.Unescape(contentString);

                // Remove extra quotes if present
                if (unescaped.StartsWith("\"") && unescaped.EndsWith("\""))
                {
                    unescaped = unescaped.Substring(1, unescaped.Length - 2);
                }

                var cleanItinerary = JsonSerializer.Deserialize<ItineraryResponse>(unescaped);
                return Ok(cleanItinerary);
            }
        }

        public class TripRequest
        {
            public string Destination { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
            public int Adults { get; set; }
            public int Elders { get; set; }
            public int Children { get; set; }
            public List<string> ChildAges { get; set; }
            public List<string> Interests { get; set; }
            public string TripStyle { get; set; }
            public string Notes { get; set; }
        }
    }
}

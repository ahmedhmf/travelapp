using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

using travelaapp_be.Models;

namespace travelaapp_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IConfiguration config) : ControllerBase
    {
        private readonly HttpClient myHttpClient = new();

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] AuthRequest request)
        {
            var supabaseUrl = config["Supabase:Url"];
            var apiKey = config["Supabase:AnonKey"]; // Add this in appsettings or secrets

            var payload = new
            {
                email = request.Email,
                password = request.Password
            };

            var httpRequest = new HttpRequestMessage(HttpMethod.Post, $"{supabaseUrl}/auth/v1/signup")
            {
                Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
            };

            httpRequest.Headers.Add("apikey", apiKey);
            httpRequest.Headers.Add("Authorization", $"Bearer {apiKey}");

            var response = await myHttpClient.SendAsync(httpRequest);
            var body = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, body);
            // Parse user ID from response JSON
            using var doc = JsonDocument.Parse(body);
            var userId = doc.RootElement.GetProperty("id").GetString();

            // Insert or update full name in profiles
            var connectionString = config.GetConnectionString("SupabaseDb");
            await using var conn = new Npgsql.NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            var cmd = conn.CreateCommand();
            cmd.CommandText = "UPDATE public.profiles SET full_name = @name WHERE id = @id;";
            cmd.Parameters.AddWithValue("name", request.FullName);
            cmd.Parameters.AddWithValue("id", Guid.Parse(userId));
            await cmd.ExecuteNonQueryAsync();

            return Ok(new { message = "Signup successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest request)
        {
            var supabaseUrl = config["Supabase:Url"];
            var apiKey = config["Supabase:AnonKey"];

            var payload = new
            {
                email = request.Email,
                password = request.Password
            };

            var httpRequest = new HttpRequestMessage(
                HttpMethod.Post,
                $"{supabaseUrl}/auth/v1/token?grant_type=password"
            )
            {
                Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
            };

            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await myHttpClient.SendAsync(httpRequest);
            var body = await response.Content.ReadAsStringAsync();

            return StatusCode((int)response.StatusCode, body);
        }
    }
}

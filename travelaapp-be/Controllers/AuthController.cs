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

            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await myHttpClient.SendAsync(httpRequest);
            var body = await response.Content.ReadAsStringAsync();

            return StatusCode((int)response.StatusCode, body);
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

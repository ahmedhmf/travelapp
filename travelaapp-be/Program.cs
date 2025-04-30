using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using travelaapp_be.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services
       .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
       .AddJwtBearer(options =>
           {
               options.Authority = "https://wfhzjktryojlvzfqrcwi.supabase.co/auth/v1";
               options.TokenValidationParameters = new TokenValidationParameters
                                                           {
                                                                   ValidateIssuer = true,
                                                                   ValidIssuer = "https://wfhzjktryojlvzfqrcwi.supabase.co/auth/v1",
                                                                   ValidateAudience = false,
                                                                   ValidateLifetime = true,
                                                                   ValidateIssuerSigningKey = true,
                                                                   IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                                                                       {
                                                                           var client = new HttpClient();
                                                                           var json = client.GetStringAsync("https://wfhzjktryojlvzfqrcwi.supabase.co/auth/v1/keys").Result;
                                                                           var keys = new JsonWebKeySet(json);
                                                                           return keys.Keys;
                                                                       }
                                                           };
           });

builder.Services.AddCors();
builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var supabaseUrl = builder.Configuration["Supabase:Url"];
builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString("SupabaseDb"));
    });

var app = builder.Build();
app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

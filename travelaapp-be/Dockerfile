# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy everything into the build container
COPY . .

# Restore dependencies (optional but recommended)
RUN dotnet restore

# Build and publish the application to the /publish folder
RUN dotnet publish -c Release -o /app/publish

# Use a lighter .NET runtime image for the final container
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Start the application
ENTRYPOINT ["dotnet", "travelaapp-be.dll"]
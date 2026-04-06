using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Device_management.Data;
using Device_management.Models;
using System.Net.Http.Json;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Microsoft.EntityFrameworkCore.InMemory;

namespace Device_management.Tests;

public class DeviceIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public DeviceIntegrationTests(WebApplicationFactory<Program> factory)
    {
        // Setup a test database for every run
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Remove the real SQL Server registration
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<DeviceDbContext>));
                if (descriptor != null) services.Remove(descriptor);

                // Add an In-Memory Database for testing
                services.AddDbContext<DeviceDbContext>(options =>
                {
                    options.UseInMemoryDatabase("TestDatabase");
                });
            });
        });
    }

    [Fact]
    public async Task GetDevices_ReturnsSuccessAndEmptyList_WhenDbIsEmpty()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/devices");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        var devices = await response.Content.ReadFromJsonAsync<List<Device>>();
        Assert.Empty(devices);
    }

    [Fact]
    public async Task PostDevice_AddsDeviceToDatabase()
    {
        // Arrange
        var client = _factory.CreateClient();
        var newDevice = new Device
        {
            Name = "Test Phone",
            Type = "Phone",
            OSVersion = "1.0",
            ManufacturerId = 1, // Assumes seed data exists or IDs match
            OperatingSystemId = 1
        };

        // Act
        var response = await client.PostAsJsonAsync("/api/devices", newDevice);

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.Created, response.StatusCode);

        // Verify it actually exists by calling GET
        var getResponse = await client.GetAsync("/api/devices");
        var devices = await getResponse.Content.ReadFromJsonAsync<List<Device>>();
        Assert.Contains(devices, d => d.Name == "Test Phone");
    }
}
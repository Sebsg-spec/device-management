using System.Text.Json.Nodes;
using Device_management.DTOs;

namespace Device_management.Services;

public class AiService : IAiService
{
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public AiService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string?> GenerateDeviceDescriptionAsync(DeviceSpecsDto specs)
    {
        var apiKey = _configuration["Gemini:ApiKey"];
        if (string.IsNullOrEmpty(apiKey)) throw new Exception("AI is not configured.");

        string prompt = $@"
        You are a technical writer for an IT asset management system.
        Your task is to create a human-readable, concise, and informative description of a device based on its technical specifications.
        Focus on generating clear, relevant, and user-friendly descriptions that enhance the device information.
        Do not just list the specs. Combine them into a natural sentence and infer its general use case or performance level.
        Do not use bullet points or introductory phrases. Output ONLY the final sentence.

        Example Input:
        Name - iPhone 17 Pro, Manufacturer - Apple, OS - iOS, Type - phone, RAM - 12288MB, Processor - A19 Pro
        Example Output:
        A high-performance Apple smartphone running iOS, suitable for daily business use.

        Now, generate the description for this device:
        Input:
        Name - {specs.Name}, Manufacturer - {specs.Manufacturer}, OS - {specs.OperatingSystem}, Type - {specs.Type}, RAM - {specs.Ram}MB, Processor - {specs.Processor}";

        var payload = new { contents = new[] { new { parts = new[] { new { text = prompt } } } } };

        using var httpClient = _httpClientFactory.CreateClient();
        var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}";

        var response = await httpClient.PostAsJsonAsync(url, payload);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"AI API Error: {error}");
        }

        var jsonString = await response.Content.ReadAsStringAsync();
        var jsonNode = JsonNode.Parse(jsonString);
        return jsonNode?["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.ToString()?.Trim();
    }
}
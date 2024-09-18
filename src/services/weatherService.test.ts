import { getWeather } from "./weatherService";
import axios from "../utils/apiClient";
import { jest } from "@jest/globals";

jest.mock("../utils/apiClient");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getWeather", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return correct weather data for valid coordinates", async () => {
    const responseMock = {
      current: {
        weather: [{ main: "Clear" }],
        temp: 20,
      },
      alerts: [],
    };

    mockedAxios.get.mockResolvedValue({ data: responseMock });

    const result = await getWeather(35.6895, 139.6917);

    expect(result).toEqual({
      weatherCondition: "clear",
      temperatureStatus: "moderate",
      alerts: [],
    });
  });

  test("should handle absence of alerts", async () => {
    const responseMock = {
      current: {
        weather: [{ main: "Clouds" }],
        temp: 15,
      },
      alerts: null,
    };

    mockedAxios.get.mockResolvedValue({ data: responseMock });

    const result = await getWeather(51.5074, -0.1278);

    expect(result).toEqual({
      weatherCondition: "clouds",
      temperatureStatus: "moderate",
      alerts: [],
    });
  });

  test("should process alerts correctly", async () => {
    const responseMock = {
      current: {
        weather: [{ main: "Rain" }],
        temp: 30,
      },
      alerts: [{ description: "Heavy rain warning" }],
    };

    mockedAxios.get.mockResolvedValue({ data: responseMock });

    const result = await getWeather(40.7128, -74.006);

    expect(result).toEqual({
      weatherCondition: "rain",
      temperatureStatus: "hot",
      alerts: ["Heavy rain warning"],
    });
  });

  test("should throw an error for invalid coordinates", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Invalid coordinates"));

    await expect(getWeather(999, 999)).rejects.toThrow("Error fetching weather data");
  });

  test("should throw an error if API key is missing", async () => {
    delete process.env.OPENWEATHER_API_KEY;

    await expect(getWeather(34.0522, -118.2437)).rejects.toThrow("Error fetching weather data");
  });

  test("should handle unexpected data structure", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    await expect(getWeather(40.7128, -74.006)).rejects.toThrow("Error fetching weather data");
  });

  test("should handle network errors gracefully", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    await expect(getWeather(34.0522, -118.2437)).rejects.toThrow("Error fetching weather data");
  });
});

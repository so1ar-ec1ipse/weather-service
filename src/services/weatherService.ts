import axios from "../utils/apiClient";
import { WeatherResponse } from "../types/weather";

export async function getWeather(lat: number, lon: number) {
  try {
    const response = await axios.get<WeatherResponse>("/3.0/onecall", {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_API_KEY,
        exclude: "minutely,hourly,daily",
        units: "imperial",
      },
    });

    const {
      current: { weather, temp },
      alerts,
    } = response.data;

    const weatherCondition = weather[0].main.toLowerCase();
    const temperatureStatus = getTemperatureStatus(temp);

    return {
      weatherCondition,
      temperatureStatus,
      alerts: alerts ? alerts.map((alert) => alert.description) : [],
    };
  } catch (error) {
    throw new Error("Error fetching weather data");
  }
}

function getTemperatureStatus(temp: number): string {
  if (temp < 60) return "cold";
  if (temp <= 80) return "moderate";
  return "hot";
}

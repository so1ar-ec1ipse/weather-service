import { Request, Response } from "express";
import { getWeather } from "../services/weatherService";

export async function getWeatherHandler(req: Request, res: Response) {
  const { lat, lon } = req.query;

  if (typeof lat !== "string" || typeof lon !== "string") {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  try {
    const weather = await getWeather(parseFloat(lat), parseFloat(lon));
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

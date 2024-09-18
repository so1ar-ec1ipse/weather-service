import { Router } from "express";
import { getWeatherHandler } from "../controllers/weatherController";

const router = Router();

router.get("/weather", getWeatherHandler);

export default router;

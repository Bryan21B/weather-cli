import dotenv from "dotenv";
import ky from "ky";

dotenv.config();

const baseUrl: string =
  "https://api.tomorrow.io/v4/weather/";
const UNIT: string = "metric";
const apiKey: string | undefined =
  process.env.WEATHER_API_KEY;

const getWeatherNow = async (city: string) => {
  const url = baseUrl + "realtime";
  const JsonResponse = await ky
    .get(url, {
      searchParams: new URLSearchParams({
        apikey: apiKey!,
        units: UNIT,
        location: city,
      }),
    })
    .json();
  return JsonResponse;
};

export const api = {
  getWeatherNow,
  // Add other functions here
};

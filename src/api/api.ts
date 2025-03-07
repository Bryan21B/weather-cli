import dotenv from "dotenv";
import ky from "ky";

dotenv.config();

const baseUrl: string =
  "https://api.tomorrow.io/v4/weather/";
const UNIT: string = "metric";
const apiKey: string | undefined =
  process.env.WEATHER_API_KEY;

interface Location {
  lat: number;
  lon: number;
  name: string;
  type: string;
}

interface WeatherValues {
  cloudBase: number | null;
  cloudCeiling: number | null;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  hailProbability: number;
  hailSize: number;
  humidity: number;
  precipitationProbability: number;
  pressureSeaLevel: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

interface WeatherData {
  time: string;
  values: WeatherValues;
}

interface WeatherResponse {
  data: WeatherData;
  location: Location;
}

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
    .json<WeatherResponse>();
  const temperature: number =
    JsonResponse.data.values.temperature;
  const weatherCode: string =
    JsonResponse.data.values.weatherCode.toString();
  const cityName: string =
    JsonResponse.location.name?.split(",")[0] ??
    "your city";
  const date: Date = new Date(JsonResponse.data.time);

  return {
    temperature,
    weatherCode,
    cityName,
    date,
  };
};

export const api = {
  getWeatherNow,
  // Add other functions here
};

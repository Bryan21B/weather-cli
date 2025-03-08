import dotenv from "dotenv";
import ky from "ky";

dotenv.config();

const baseUrl: string =
  "https://api.tomorrow.io/v4/weather/";
const UNIT: string = "metric";
const apiKey: string | undefined =
  process.env.WEATHER_API_KEY;
const headers: Record<string, string> = {
  accept: "application/json",
  "accept-encoding": "deflate, gzip, br",
};

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

interface DailyValues {
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  humidity: number;
  humidityMax: number;
  humidityMin: number;
  moonriseTime: string;
  moonsetTime: string;
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sunriseTime: string;
  sunsetTime: string;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  uvIndexAvg: number;
  uvIndexMax: number;
  uvIndexMin: number;
  visibilityAvg: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
}

interface DailyForecast {
  time: string;
  values: DailyValues;
}

interface ForecastResponse {
  timelines: {
    daily: DailyForecast[];
  };
  location: Location;
}

const getWeatherNow = async (city: string) => {
  const url: string = baseUrl + "realtime";
  const searchParams = new URLSearchParams({
    apikey: apiKey!,
    units: UNIT,
    location: city,
  });
  const jsonResponse = await ky
    .get(url, {
      searchParams,
      headers,
    })
    .json<WeatherResponse>();
  const temperature: number =
    jsonResponse.data.values.temperature;
  const weatherCode: string =
    jsonResponse.data.values.weatherCode.toString();
  const cityName: string =
    jsonResponse.location.name?.split(",")[0] ??
    "your city";
  const date: Date = new Date(jsonResponse.data.time);

  return {
    temperature,
    weatherCode,
    cityName,
    date,
  };
};

const getWeatherForecast = async (city: string) => {
  const url: string = baseUrl + "forecast";
  const searchParams = new URLSearchParams({
    apikey: apiKey!,
    units: UNIT,
    location: city,
    timesteps: "1d",
  });
  const jsonResponse = await ky
    .get(url, { searchParams, headers })
    .json<ForecastResponse>();
  return jsonResponse;
};

export const api = {
  getWeatherNow,
  getWeatherForecast,
  // Add other functions here
};

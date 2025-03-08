import {
  DailyForecast,
  DailyWeatherData,
  ForecastResponse,
  WeatherResponse,
} from "../types/weather.js";

import dotenv from "dotenv";
import ky from "ky";

dotenv.config();

const baseUrl: string =
  "https://api.tomorrow.io/v4/weather/";

const apiKey: string | undefined =
  process.env.WEATHER_API_KEY;
const headers: Record<string, string> = {
  accept: "application/json",
  "accept-encoding": "deflate, gzip, br",
};

const dailyData: Record<string, DailyWeatherData> = {};

const getWeatherNow = async (
  city: string,
  units: string
) => {
  const url: string = baseUrl + "realtime";
  const searchParams = new URLSearchParams({
    apikey: apiKey!,
    units: units,
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

const getWeatherForecast = async (
  city: string,
  units: string
) => {
  const url: string = baseUrl + "forecast";
  const searchParams = new URLSearchParams({
    apikey: apiKey!,
    units: units,
    location: city,
    timesteps: "1d",
  });
  const jsonResponse = await ky
    .get(url, { searchParams, headers })
    .json<ForecastResponse>();

  // Loop through each day in the timelines.daily array
  jsonResponse.timelines.daily.forEach(
    (day: DailyForecast) => {
      // Extract the date (YYYY-MM-DD) from the time string
      const date: Date = new Date(day.time);
      const dateString: string = date.toISOString() ?? "";

      // Create an object with the desired properties for each day
      dailyData[dateString] = {
        temperatureAvg: day.values.temperatureAvg,
        weatherCodeMin: day.values.weatherCodeMin,
        weatherCodeMax: day.values.weatherCodeMax,
        precipitationProbabilityAvg:
          day.values.precipitationProbabilityAvg,
      };
    }
  );

  return dailyData;
};

const checkCityExistsOnAPI = async (
  city: string
): Promise<string> => {
  const url: string = baseUrl + "realtime";
  const searchParams = new URLSearchParams({
    apikey: apiKey!,
    units: "metric",
    location: city,
  });

  try {
    const response = await ky
      .get(url, {
        searchParams,
        headers,
      })
      .json<WeatherResponse>();
    return response.location.name;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to check city");
  }
};

export const api = {
  getWeatherNow,
  getWeatherForecast,
  checkCityExistsOnAPI,
  // Add other functions here
};

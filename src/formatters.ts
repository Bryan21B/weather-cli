import { ascii } from "./weatherAscii.js";
import chalk from "chalk";
import { formatDistanceToNow } from "date-fns";

interface Weather {
  temperature: number;
  weatherCode: string;
  cityName: string;
  date: Date;
}

interface DailyWeatherData {
  [key: string]: {
    temperatureAvg: number;
    weatherCodeMin: number;
    weatherCodeMax: number;
    precipitationProbabilityAvg: number;
  };
}

const API_WEATHER_CODES = {
  "0": "Unknown",
  "1000": "Clear, Sunny",
  "1100": "Mostly Clear",
  "1101": "Partly Cloudy",
  "1102": "Mostly Cloudy",
  "1001": "Cloudy",
  "2000": "Fog",
  "2100": "Light Fog",
  "4000": "Drizzle",
  "4001": "Rain",
  "4200": "Light Rain",
  "4201": "Heavy Rain",
  "5000": "Snow",
  "5001": "Flurries",
  "5100": "Light Snow",
  "5101": "Heavy Snow",
  "6000": "Freezing Drizzle",
  "6001": "Freezing Rain",
  "6200": "Light Freezing Rain",
  "6201": "Heavy Freezing Rain",
  "7000": "Ice Pellets",
  "7101": "Heavy Ice Pellets",
  "7102": "Light Ice Pellets",
  "8000": "Thunderstorm",
} as const;

/* const API_WEATHER_CODES_FULLDAY = {
  "0": "Unknown",
  "1000": "Clear, Sunny",
  "1100": "Mostly Clear",
  "1101": "Partly Cloudy",
  "1102": "Mostly Cloudy",
  "1001": "Cloudy",
  "1103": "Partly Cloudy and Mostly Clear",
  "2100": "Light Fog",
  "2101": "Mostly Clear and Light Fog",
  "2102": "Partly Cloudy and Light Fog",
  "2103": "Mostly Cloudy and Light Fog",
  "2106": "Mostly Clear and Fog",
  "2107": "Partly Cloudy and Fog",
  "2108": "Mostly Cloudy and Fog",
  "2000": "Fog",
  "4204": "Partly Cloudy and Drizzle",
  "4203": "Mostly Clear and Drizzle",
  "4205": "Mostly Cloudy and Drizzle",
  "4000": "Drizzle",
  "4200": "Light Rain",
  "4213": "Mostly Clear and Light Rain",
  "4214": "Partly Cloudy and Light Rain",
  "4215": "Mostly Cloudy and Light Rain",
  "4209": "Mostly Clear and Rain",
  "4208": "Partly Cloudy and Rain",
  "4210": "Mostly Cloudy and Rain",
  "4001": "Rain",
  "4211": "Mostly Clear and Heavy Rain",
  "4202": "Partly Cloudy and Heavy Rain",
  "4212": "Mostly Cloudy and Heavy Rain",
  "4201": "Heavy Rain",
  "5115": "Mostly Clear and Flurries",
  "5116": "Partly Cloudy and Flurries",
  "5117": "Mostly Cloudy and Flurries",
  "5001": "Flurries",
  "5100": "Light Snow",
  "5102": "Mostly Clear and Light Snow",
  "5103": "Partly Cloudy and Light Snow",
  "5104": "Mostly Cloudy and Light Snow",
  "5122": "Drizzle and Light Snow",
  "5105": "Mostly Clear and Snow",
  "5106": "Partly Cloudy and Snow",
  "5107": "Mostly Cloudy and Snow",
  "5000": "Snow",
  "5101": "Heavy Snow",
  "5119": "Mostly Clear and Heavy Snow",
  "5120": "Partly Cloudy and Heavy Snow",
  "5121": "Mostly Cloudy and Heavy Snow",
  "5110": "Drizzle and Snow",
  "5108": "Rain and Snow",
  "5114": "Snow and Freezing Rain",
  "5112": "Snow and Ice Pellets",
  "6000": "Freezing Drizzle",
  "6003": "Mostly Clear and Freezing drizzle",
  "6002": "Partly Cloudy and Freezing drizzle",
  "6004": "Mostly Cloudy and Freezing drizzle",
  "6204": "Drizzle and Freezing Drizzle",
  "6206": "Light Rain and Freezing Drizzle",
  "6205": "Mostly Clear and Light Freezing Rain",
  "6203": "Partly Cloudy and Light Freezing Rain",
  "6209": "Mostly Cloudy and Light Freezing Rain",
  "6200": "Light Freezing Rain",
  "6213": "Mostly Clear and Freezing Rain",
  "6214": "Partly Cloudy and Freezing Rain",
  "6215": "Mostly Cloudy and Freezing Rain",
  "6001": "Freezing Rain",
  "6212": "Drizzle and Freezing Rain",
  "6220": "Light Rain and Freezing Rain",
  "6222": "Rain and Freezing Rain",
  "6207": "Mostly Clear and Heavy Freezing Rain",
  "6202": "Partly Cloudy and Heavy Freezing Rain",
  "6208": "Mostly Cloudy and Heavy Freezing Rain",
  "6201": "Heavy Freezing Rain",
  "7110": "Mostly Clear and Light Ice Pellets",
  "7111": "Partly Cloudy and Light Ice Pellets",
  "7112": "Mostly Cloudy and Light Ice Pellets",
  "7102": "Light Ice Pellets",
  "7108": "Mostly Clear and Ice Pellets",
  "7107": "Partly Cloudy and Ice Pellets",
  "7109": "Mostly Cloudy and Ice Pellets",
  "7000": "Ice Pellets",
  "7105": "Drizzle and Ice Pellets",
  "7106": "Freezing Rain and Ice Pellets",
  "7115": "Light Rain and Ice Pellets",
  "7117": "Rain and Ice Pellets",
  "7103": "Freezing Rain and Heavy Ice Pellets",
  "7113": "Mostly Clear and Heavy Ice Pellets",
  "7114": "Partly Cloudy and Heavy Ice Pellets",
  "7116": "Mostly Cloudy and Heavy Ice Pellets",
  "7101": "Heavy Ice Pellets",
  "8001": "Mostly Clear and Thunderstorm",
  "8003": "Partly Cloudy and Thunderstorm",
  "8002": "Mostly Cloudy and Thunderstorm",
  "8000": "Thunderstorm",
}; */

/* const APIweatherCodeDay = {
  "0": "Unknown",
  "10000": "Clear, Sunny",
  "11000": "Mostly Clear",
  "11010": "Partly Cloudy",
  "11020": "Mostly Cloudy",
  "10010": "Cloudy",
  "11030": "Partly Cloudy and Mostly Clear",
  "21000": "Light Fog",
  "21010": "Mostly Clear and Light Fog",
  "21020": "Partly Cloudy and Light Fog",
  "21030": "Mostly Cloudy and Light Fog",
  "21060": "Mostly Clear and Fog",
  "21070": "Partly Cloudy and Fog",
  "21080": "Mostly Cloudy and Fog",
  "20000": "Fog",
  "42040": "Partly Cloudy and Drizzle",
  "42030": "Mostly Clear and Drizzle",
  "42050": "Mostly Cloudy and Drizzle",
  "40000": "Drizzle",
  "42000": "Light Rain",
  "42130": "Mostly Clear and Light Rain",
  "42140": "Partly Cloudy and Light Rain",
  "42150": "Mostly Cloudy and Light Rain",
  "42090": "Mostly Clear and Rain",
  "42080": "Partly Cloudy and Rain",
  "42100": "Mostly Cloudy and Rain",
  "40010": "Rain",
  "42110": "Mostly Clear and Heavy Rain",
  "42020": "Partly Cloudy and Heavy Rain",
  "42120": "Mostly Cloudy and Heavy Rain",
  "42010": "Heavy Rain",
  "51150": "Mostly Clear and Flurries",
  "51160": "Partly Cloudy and Flurries",
  "51170": "Mostly Cloudy and Flurries",
  "50010": "Flurries",
  "51000": "Light Snow",
  "51020": "Mostly Clear and Light Snow",
  "51030": "Partly Cloudy and Light Snow",
  "51040": "Mostly Cloudy and Light Snow",
  "51220": "Drizzle and Light Snow",
  "51050": "Mostly Clear and Snow",
  "51060": "Partly Cloudy and Snow",
  "51070": "Mostly Cloudy and Snow",
  "50000": "Snow",
  "51010": "Heavy Snow",
  "51190": "Mostly Clear and Heavy Snow",
  "51200": "Partly Cloudy and Heavy Snow",
  "51210": "Mostly Cloudy and Heavy Snow",
  "51100": "Drizzle and Snow",
  "51080": "Rain and Snow",
  "51140": "Snow and Freezing Rain",
  "51120": "Snow and Ice Pellets",
  "60000": "Freezing Drizzle",
  "60030": "Mostly Clear and Freezing drizzle",
  "60020": "Partly Cloudy and Freezing drizzle",
  "60040": "Mostly Cloudy and Freezing drizzle",
  "62040": "Drizzle and Freezing Drizzle",
  "62060": "Light Rain and Freezing Drizzle",
  "62050": "Mostly Clear and Light Freezing Rain",
  "62030": "Partly Cloudy and Light Freezing Rain",
  "62090": "Mostly Cloudy and Light Freezing Rain",
  "62000": "Light Freezing Rain",
  "62130": "Mostly Clear and Freezing Rain",
  "62140": "Partly Cloudy and Freezing Rain",
  "62150": "Mostly Cloudy and Freezing Rain",
  "60010": "Freezing Rain",
  "62120": "Drizzle and Freezing Rain",
  "62200": "Light Rain and Freezing Rain",
  "62220": "Rain and Freezing Rain",
  "62070": "Mostly Clear and Heavy Freezing Rain",
  "62020": "Partly Cloudy and Heavy Freezing Rain",
  "62080": "Mostly Cloudy and Heavy Freezing Rain",
  "62010": "Heavy Freezing Rain",
  "71100": "Mostly Clear and Light Ice Pellets",
  "71110": "Partly Cloudy and Light Ice Pellets",
  "71120": "Mostly Cloudy and Light Ice Pellets",
  "71020": "Light Ice Pellets",
  "71080": "Mostly Clear and Ice Pellets",
  "71070": "Partly Cloudy and Ice Pellets",
  "71090": "Mostly Cloudy and Ice Pellets",
  "70000": "Ice Pellets",
  "71050": "Drizzle and Ice Pellets",
  "71060": "Freezing Rain and Ice Pellets",
  "71150": "Light Rain and Ice Pellets",
  "71170": "Rain and Ice Pellets",
  "71030": "Freezing Rain and Heavy Ice Pellets",
  "71130": "Mostly Clear and Heavy Ice Pellets",
  "71140": "Partly Cloudy and Heavy Ice Pellets",
  "71160": "Mostly Cloudy and Heavy Ice Pellets",
  "71010": "Heavy Ice Pellets",
  "80010": "Mostly Clear and Thunderstorm",
  "80030": "Partly Cloudy and Thunderstorm",
  "80020": "Mostly Cloudy and Thunderstorm",
  "80000": "Thunderstorm",
}; */

/* const APIweatherCodeNight = {
  "0": "Unknown",
  "10001": "Clear",
  "11001": "Mostly Clear",
  "11011": "Partly Cloudy",
  "11021": "Mostly Cloudy",
  "10011": "Cloudy",
  "11031": "Partly Cloudy and Mostly Clear",
  "21001": "Light Fog",
  "21011": "Mostly Clear and Light Fog",
  "21021": "Partly Cloudy and Light Fog",
  "21031": "Mostly Cloudy and Light Fog",
  "21061": "Mostly Clear and Fog",
  "21071": "Partly Cloudy and Fog",
  "21081": "Mostly Cloudy and Fog",
  "20001": "Fog",
  "42041": "Partly Cloudy and Drizzle",
  "42031": "Mostly Clear and Drizzle",
  "42051": "Mostly Cloudy and Drizzle",
  "40001": "Drizzle",
  "42001": "Light Rain",
  "42131": "Mostly Clear and Light Rain",
  "42141": "Partly Cloudy and Light Rain",
  "42151": "Mostly Cloudy and Light Rain",
  "42091": "Mostly Clear and Rain",
  "42081": "Partly Cloudy and Rain",
  "42101": "Mostly Cloudy and Rain",
  "40011": "Rain",
  "42111": "Mostly Clear and Heavy Rain",
  "42021": "Partly Cloudy and Heavy Rain",
  "42121": "Mostly Cloudy and Heavy Rain",
  "42011": "Heavy Rain",
  "51151": "Mostly Clear and Flurries",
  "51161": "Partly Cloudy and Flurries",
  "51171": "Mostly Cloudy and Flurries",
  "50011": "Flurries",
  "51001": "Light Snow",
  "51021": "Mostly Clear and Light Snow",
  "51031": "Partly Cloudy and Light Snow",
  "51041": "Mostly Cloudy and Light Snow",
  "51221": "Drizzle and Light Snow",
  "51051": "Mostly Clear and Snow",
  "51061": "Partly Cloudy and Snow",
  "51071": "Mostly Cloudy and Snow",
  "50001": "Snow",
  "51011": "Heavy Snow",
  "51191": "Mostly Clear and Heavy Snow",
  "51201": "Partly Cloudy and Heavy Snow",
  "51211": "Mostly Cloudy and Heavy Snow",
  "51101": "Drizzle and Snow",
  "51081": "Rain and Snow",
  "51141": "Snow and Freezing Rain",
  "51121": "Snow and Ice Pellets",
  "60001": "Freezing Drizzle",
  "60031": "Mostly Clear and Freezing drizzle",
  "60021": "Partly Cloudy and Freezing drizzle",
  "60041": "Mostly Cloudy and Freezing drizzle",
  "62041": "Drizzle and Freezing Drizzle",
  "62061": "Light Rain and Freezing Drizzle",
  "62051": "Mostly Clear and Light Freezing Rain",
  "62031": "Partly cloudy and Light Freezing Rain",
  "62091": "Mostly Cloudy and Light Freezing Rain",
  "62001": "Light Freezing Rain",
  "62131": "Mostly Clear and Freezing Rain",
  "62141": "Partly Cloudy and Freezing Rain",
  "62151": "Mostly Cloudy and Freezing Rain",
  "60011": "Freezing Rain",
  "62121": "Drizzle and Freezing Rain",
  "62201": "Light Rain and Freezing Rain",
  "62221": "Rain and Freezing Rain",
  "62071": "Mostly Clear and Heavy Freezing Rain",
  "62021": "Partly Cloudy and Heavy Freezing Rain",
  "62081": "Mostly Cloudy and Heavy Freezing Rain",
  "62011": "Heavy Freezing Rain",
  "71101": "Mostly Clear and Light Ice Pellets",
  "71111": "Partly Cloudy and Light Ice Pellets",
  "71121": "Mostly Cloudy and Light Ice Pellets",
  "71021": "Light Ice Pellets",
  "71081": "Mostly Clear and Ice Pellets",
  "71071": "Partly Cloudy and Ice Pellets",
  "71091": "Mostly Cloudy and Ice Pellets",
  "70001": "Ice Pellets",
  "71051": "Drizzle and Ice Pellets",
  "71061": "Freezing Rain and Ice Pellets",
  "71151": "Light Rain and Ice Pellets",
  "71171": "Rain and Ice Pellets",
  "71031": "Freezing Rain and Heavy Ice Pellets",
  "71131": "Mostly Clear and Heavy Ice Pellets",
  "71141": "Partly Cloudy and Heavy Ice Pellets",
  "71161": "Mostly Cloudy and Heavy Ice Pellets",
  "71011": "Heavy Ice Pellets",
  "80011": "Mostly Clear and Thunderstorm",
  "80031": "Partly Cloudy and Thunderstorm",
  "80021": "Mostly Cloudy and Thunderstorm",
  "80001": "Thunderstorm",
}; */
const WEATHER_CODES_SET = new Set(
  Object.keys(API_WEATHER_CODES)
);

type WeatherCode = keyof typeof API_WEATHER_CODES;

const getWeatherDescriptionFromCode = (
  code: string
): string => {
  return WEATHER_CODES_SET.has(code)
    ? API_WEATHER_CODES[code as WeatherCode]
    : "unknown";
};

const generateASCIIArt = (
  weatherCode: WeatherCode,
  oneLiner: boolean
) => {
  // Rain and storm codes
  if (
    ["4000", "4001", "4200", "4201", "8000"].includes(
      weatherCode
    )
  ) {
    return oneLiner ? chalk.blue("🌧️ | | |") : ascii.rain;
  }
  // Snow and ice codes
  else if (
    [
      "5000",
      "5001",
      "5100",
      "5101",
      "6000",
      "6001",
      "6200",
      "6201",
      "7000",
      "7101",
      "7102",
    ].includes(weatherCode)
  ) {
    return oneLiner ? chalk.cyan("❄️ * * *") : ascii.snow;
  }
  // Cloudy and fog codes
  else if (
    ["1001", "1102", "2000", "2100"].includes(weatherCode)
  ) {
    return oneLiner ? chalk.gray("☁️ ☁️ ☁️") : ascii.cloudy;
  }
  // Clear/Sunny codes
  else if (["1000"].includes(weatherCode)) {
    return oneLiner ? chalk.yellow("☀️ ☀️ ☀️") : ascii.sun;
  }
  // Partly cloudy or other codes
  return oneLiner
    ? chalk.gray("☁️ ☀️ ☁️")
    : ascii.sunBehindClouds;
};

const formatUnits = (units: string) => {
  if (units === "metric") {
    return "°C";
  } else if (units === "imperial") {
    return "°F";
  }
  return new Error("Units not recognised");
};

/**
 * Formats current weather data into a human-readable string
 * @param weather - Object containing current weather data including temperature, weather code, city name and date
 * @param units - The unit system to use ('metric' or 'imperial')
 * @returns A formatted string describing the current weather conditions, or undefined if weather code is unknown
 */
const formatWeather = (weather: Weather, units: string) => {
  const asciiArt = generateASCIIArt(
    weather.weatherCode as WeatherCode,
    false
  );
  const formattedUnits = formatUnits(units);
  let formattedWeather: string =
    asciiArt +
    "\n\n" +
    `Right now in ${weather.cityName} the temperature is ${Math.round(weather.temperature)}${formattedUnits}.`;

  if (
    getWeatherDescriptionFromCode(weather.weatherCode) !==
    "unknown"
  ) {
    const weatherDescription =
      getWeatherDescriptionFromCode(
        weather.weatherCode
      ).toLocaleLowerCase();
    formattedWeather += ` The weather could be described as ${weatherDescription}.`;
  } else {
    return;
  }

  if (weather.date.getHours() >= 20) {
    formattedWeather +=
      " You probably don't realise it because it's night time. Have a good night!";
  } else if (weather.date.getHours() >= 13) {
    formattedWeather += " Have a good afternoon!";
  } else if (weather.date.getHours() >= 6) {
    formattedWeather += "Have a good morning!";
  } else {
    formattedWeather +=
      " You probably don't realise it because it's night time. Sleep tight!";
  }
  return formattedWeather;
};

/**
 * Formats daily weather forecast data into a human-readable string
 * @param dailyForecast - Object containing forecast data for multiple days, keyed by date strings
 * @returns A multi-line string with each line containing the forecast for a future date,
 *          including temperature, weather description and precipitation probability.
 *          Past dates are filtered out. Returns empty string if no future forecasts exist.
 */
const formatForecast = (
  dailyForecast: DailyWeatherData
) => {
  // Get all dates from the forecast data and sort them chronologically
  const dates = Object.keys(dailyForecast).sort();

  return (
    dates
      .map((dateStr) => {
        // Convert the ISO date string to a Date object
        const date = new Date(dateStr);

        // Get the forecast data for this date
        // Type assertion needed because TypeScript doesn't know the string key exists
        const forecast =
          dailyForecast[
            dateStr as keyof typeof dailyForecast
          ];

        // Format the time distance in natural language (e.g., "in 2 days")
        // addSuffix: true adds "in" or "ago" to the output
        const timeDistance = formatDistanceToNow(date, {
          addSuffix: true,
        });

        // Skip dates in the past by checking if the formatted string contains "ago"
        // This handles edge cases like "7 hours ago" on the same calendar day
        if (timeDistance.includes("ago")) {
          return null;
        }

        // Skip if no forecast data exists for this date
        if (!forecast) return null;

        // Convert the weather code to a description and add ASCII art
        const weatherDescription =
          getWeatherDescriptionFromCode(
            forecast.weatherCodeMax.toString()
          ).toLocaleLowerCase();

        const asciiArt = generateASCIIArt(
          forecast.weatherCodeMin.toString() as WeatherCode,
          true
        );

        // Format the forecast into a human-readable string
        // Example: "- in 2 days the temperature will be 20°C and the weather code is 1000. The precipitation probability is 30%."
        return (
          `${asciiArt}     ${timeDistance} the weather will be ${weatherDescription} with a temp of ${Math.round(forecast.temperatureAvg)}°C. ` +
          `There's a ${Math.round(forecast.precipitationProbabilityAvg)}% chance of rain.`
        );
      })
      // Remove null entries (past dates or missing forecasts)
      .filter(Boolean)
      // Join all forecast strings with newlines
      .join("\n")
  );
};

export const formatters = {
  formatWeather,
  formatForecast,
  formatUnits,
};

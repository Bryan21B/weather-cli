import { Command } from "commander";
import { api } from "../services/weather.js";
import { formatters } from "../utils/formatters.js";
import { getUserChoices } from "./utils.js";

export const forecastCommand = new Command()
  .command("forecast")
  .description("Get weather forecast for your location")
  .action(async () => {
    try {
      const { city, units } = getUserChoices();
      const forecast = await api.getWeatherForecast(
        city,
        units
      );
      const formattedForecast =
        formatters.formatForecast(forecast);
      console.log(formattedForecast);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  });

import { Command } from "commander";
import { api } from "../services/weather.js";
import { formatters } from "../utils/formatters.js";
import { getUserChoices } from "./utils.js";

export const currentCommand = new Command()
  .command("now")
  .description("Get current local weather")
  .action(async () => {
    try {
      const { city, units } = getUserChoices();
      const weather = await api.getWeatherNow(city, units);
      console.log(formatters.formatWeather(weather, units));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  });

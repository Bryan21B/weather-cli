#!/usr/bin/env node

import {
  cancel,
  intro,
  isCancel,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";

import { Command } from "commander";
import Conf from "conf";
import { api } from "./api/api.js";
import { formatters } from "./formatters.js";

const config = new Conf({ projectName: "weather-cli" });

// Declare the program
const program = new Command();

program
  .command("init")
  .description("Set up your city and unit system")
  .action(async () => {
    config.clear();
    const s = spinner();
    intro(`weather-cli`);

    const city = await text({
      message: "What's the name of your city?",
      placeholder: "Enter your city",
      initialValue: "",
      validate(value) {
        if (value.length === 0) {
          return `Please enter a city name!`;
        }
      },
    });

    if (isCancel(city)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    s.start("Checking if city is recognised");
    try {
      const validatedCity =
        await api.checkCityExistsOnAPI(city);
      config.set("city", validatedCity);
      s.stop("City is recognised!");
    } catch (error: unknown) {
      cancel(
        `City "${city}" not found. Please check the spelling and try again.`
      );
      process.exit(1);
    }

    const unitSystem = await select({
      message: "Pick a unit system.",
      options: [
        {
          value: "metric",
          label: "°C",
          hint: "The best choice",
        },
        { value: "imperial", label: "°F" },
      ],
    });

    if (isCancel(unitSystem)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    config.set("units", unitSystem);

    outro(
      `You're all set! You can now run weather --help for a list of commands`
    );
  });

// Add actions to the program
program
  .command("now")
  .description("Provide current local weather")
  .action(async () => {
    try {
      const city = config.get("city") as string;
      console.debug(city);
      const units = config.get("units") as string;
      if (!city || !units) {
        console.log(
          "No city or unit system set. Use 'init' to configure one."
        );
        return;
      }
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

program
  .command("forecast")
  .description("Get weather forecast for your location")
  .action(async () => {
    const city = config.get("city") as string;
    const units = config.get("units") as string;
    if (!city || !units) {
      console.log(
        "No city or unit system set. Use 'init' to configure one."
      );
      return;
    }
    const forecast = await api.getWeatherForecast(
      city,
      units
    );
    const formattedForecast =
      formatters.formatForecast(forecast);
    console.log(formattedForecast);
  });
// Run the program
program.parse(process.argv);

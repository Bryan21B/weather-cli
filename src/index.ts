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

const userChoices = (): { city: string; units: string } => {
  const city =
    program.opts().city || (config.get("city") as string);
  const units =
    program.opts().units || (config.get("units") as string);

  if (!city && !units) {
    console.log(
      "No city and units selected. Please set them via 'weather init' or by using options. See --help for more information"
    );
    process.exit(1);
  }

  if (!city) {
    console.log(
      "No city selected. Please set it via 'weather init' or by using --city option. See --help for more information"
    );
    process.exit(1);
  }

  if (!units) {
    console.log(
      "No units selected. Please set them via 'weather init' or by using --units option. See --help for more information"
    );
    process.exit(1);
  }
  return { city, units };
};

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
  .description("Get current local weather")
  .action(async () => {
    try {
      const { city, units } = userChoices();
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
    const { city, units } = userChoices();
    const forecast = await api.getWeatherForecast(
      city,
      units
    );
    const formattedForecast =
      formatters.formatForecast(forecast);
    console.log(formattedForecast);
  });

// Handle options
program
  .option("-c, --city <city-name>", "override default city")
  .option(
    "-u, --units <unit type>",
    "override default units, metric or imperial"
  );

// Run the program
program.parse(process.argv);

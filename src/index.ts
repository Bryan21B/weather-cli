#!/usr/bin/env node

import {
  cancel,
  intro,
  isCancel,
  outro,
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
console.debug("Let's check if a city is set");
const currentCity = config.get("city");
console.debug("City value:", currentCity);
console.debug("City type:", typeof currentCity);

if (!config.get("city")) {
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
  const cityExists = await api.checkCityExistsOnAPI(city);
  if (!cityExists) {
    cancel(
      `City "${city}" not found. Please check the spelling and try again.`
    );
    process.exit(1);
  }
  s.stop("City is recognised!");

  config.set("city", city);

  outro(
    `You're all set! You can now run weather --help for a list of commands`
  );
}

// Add actions to the program
program
  .command("now")
  .description("Provide current local weather")
  .action(async () => {
    const city = config.get("city") as string;
    if (!city) {
      console.log(
        "No city set. Use 'set-city' to configure one."
      );
      return;
    }
    const weather = await api.getWeatherNow(city);
    console.log(formatters.formatWeather(weather));
  });

program
  .command("forecast")
  .description("Get weather forecast for your location")
  .action(async () => {
    const city = config.get("city") as string;
    if (!city) {
      console.log(
        "No city set. Use 'set-city' to configure one."
      );
      return;
    }
    const forecast = await api.getWeatherForecast(city);
    const formattedForecast =
      formatters.formatForecast(forecast);
    console.log(formattedForecast);
  });
// Run the program
program.parse(process.argv);

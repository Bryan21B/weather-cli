#!/usr/bin/env node

import { Command } from "commander";
import Conf from "conf";
import { api } from "./api/api.js";
import { formatters } from "./formatters.js";

const config = new Conf({ projectName: "weather-cli" });

// Declare the program
const program = new Command();

program
  .command("set-city <city>")
  .description("Set your default city")
  .action((city) => {
    config.set("city", city);
    console.log(`Default city set to: ${city}`);
  });

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
    console.log(formatters.humanizeWeatherNow(weather));
  });

program
  .command("forecast")
  .description("Get weather forecast for your location")
  .action(() => {
    console.log("This is the weather forecast");
  });
// Run the program
program.parse(process.argv);

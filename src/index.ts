#!/usr/bin/env node

import { Command } from "commander";
import { api } from "./api/api.js";
import { formatters } from "./formatters.js";

// Declare the program
const program = new Command();

// Add actions to the program
program
  .command("now")
  .description("Provide current local weather")
  .action(async () => {
    const weather = await api.getWeatherNow("Paris");
    console.log(formatters.humanizeWeatherNow(weather));
  });

// Run the program
program.parse(process.argv);

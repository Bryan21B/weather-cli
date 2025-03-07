#!/usr/bin/env node

import { Command } from "commander";
import { api } from "./api/api.js";

// Declare the program
const program = new Command();

// Add actions to the program
program
  .command("now")
  .description("Provide current local weather")
  .action(async () => {
    console.log(await api.getWeatherNow("Paris"));
  });

// Run the program
program.parse(process.argv);

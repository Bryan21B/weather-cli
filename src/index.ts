#!/usr/bin/env node

import {
  currentCommand,
  forecastCommand,
  initCommand,
} from "./commands/index.js";

import { Command } from "commander";

// Declare the program
const program = new Command();

// Add commands
program.addCommand(initCommand);
program.addCommand(currentCommand);
program.addCommand(forecastCommand);

// Handle options
program
  .option("-c, --city <city-name>", "override default city")
  .option(
    "-u, --units <unit type>",
    "override default units, metric or imperial"
  );

// Run the program
program.parse(process.argv);

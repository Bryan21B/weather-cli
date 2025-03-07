#!/usr/bin/env node

import { Command } from "commander";

// Declare the
const program = new Command();

// Add actions to the program
program
  .action(() => {
    console.log("Hello");
  })
  .description("Say hello");

// Run the program
program.parse(process.argv);

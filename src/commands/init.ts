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
import { api } from "../services/weather.js";

const config = new Conf({ projectName: "weather-cli" });

export const initCommand = new Command()
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
    } catch {
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

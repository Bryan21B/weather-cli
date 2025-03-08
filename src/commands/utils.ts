import { Command } from "commander";
import Conf from "conf";

const config = new Conf({ projectName: "weather-cli" });

export const getUserChoices = (): {
  city: string;
  units: string;
} => {
  const program = new Command();
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

import { describe, expect, test } from "vitest";

import chalk from "chalk";
import { formatters } from "../src/formatters.js";

describe("The getWeatherDescriptionFromCode() method", () => {
  test("returns Partly Cloudy for code 1101", () => {
    expect(
      formatters.getWeatherDescriptionFromCode("1101")
    ).toBe("Partly Cloudy");
  });

  test("returns Clear, Sunny for code 1000", () => {
    expect(
      formatters.getWeatherDescriptionFromCode("1000")
    ).toBe("Clear, Sunny");
  });
});

describe("The generateASCIIArt() method", () => {
  test("returns a multi-line rainy cloud when oneLiner is false", () => {
    expect(formatters.generateASCIIArt("4201", false)).toBe(
      chalk.gray(`
      .--.      
   .-(    ).   
  (___.__)__)  
`) +
        chalk.blue(`
  ‘ ‘ ‘ ‘ ‘ ‘  
   ‘ ‘ ‘ ‘ ‘   
`)
    );
  });

  test("returns a snow emoji pattern when oneLiner is true", () => {
    expect(formatters.generateASCIIArt("5100", true)).toBe(
      chalk.cyan("❄️ * * *")
    );
  });
});

describe("The formatUnits() method", () => {
  test("returns °C for metric units", () => {
    expect(formatters.formatUnits("metric")).toBe("°C");
  });

  test("throws an error for invalid unit types", () => {
    expect(() => formatters.formatUnits("dolce")).toThrow();
  });
});

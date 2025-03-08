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

describe("The formatWeather() method", () => {
  test("returns a properly formatted string for snowy afternoon weather", () => {
    const mockWeather = {
      temperature: 2,
      weatherCode: "5000",
      cityName: "Montreal",
      date: new Date("2024-01-15T15:00:00"), // 3 PM
    };

    const result = formatters.formatWeather(
      mockWeather,
      "metric"
    );

    expect(result).toContain(
      "Right now in Montreal the temperature is 2°C"
    );
    expect(result).toContain("snow");
    expect(result).toContain("Have a good afternoon!");
  });

  test("returns a properly formatted string for clear night weather", () => {
    const mockWeather = {
      temperature: 20,
      weatherCode: "1000",
      cityName: "Miami",
      date: new Date("2024-01-15T23:00:00"), // 11 PM
    };

    const result = formatters.formatWeather(
      mockWeather,
      "metric"
    );

    expect(result).toContain(
      "Right now in Miami the temperature is 20°C"
    );
    expect(result).toContain("clear, sunny");
    expect(result).toContain("night time");
  });

  test("returns a properly formatted string for rainy morning weather", () => {
    const mockWeather = {
      temperature: 15,
      weatherCode: "4001",
      cityName: "London",
      date: new Date("2024-01-15T08:00:00"), // 8 AM
    };

    const result = formatters.formatWeather(
      mockWeather,
      "metric"
    );

    expect(result).toContain(
      "Right now in London the temperature is 15°C"
    );
    expect(result).toContain("rain");
    expect(result).toContain("Have a good morning!");
  });

  test("returns a properly formatted string for early morning weather", () => {
    const mockWeather = {
      temperature: 5,
      weatherCode: "2000",
      cityName: "Paris",
      date: new Date("2024-01-15T04:00:00"), // 4 AM
    };

    const result = formatters.formatWeather(
      mockWeather,
      "metric"
    );

    expect(result).toContain(
      "Right now in Paris the temperature is 5°C"
    );
    expect(result).toContain("fog");
    expect(result).toContain("night time");
    expect(result).toContain("Sleep tight!");
  });

  test("handles imperial units correctly", () => {
    const mockWeather = {
      temperature: 75,
      weatherCode: "1000",
      cityName: "New York",
      date: new Date("2024-01-15T12:00:00"), // 12 PM
    };

    const result = formatters.formatWeather(
      mockWeather,
      "imperial"
    );

    expect(result).toContain(
      "Right now in New York the temperature is 75°F"
    );
  });

  test("returns undefined for unknown weather code", () => {
    const mockWeather = {
      temperature: 20,
      weatherCode: "9999", // Invalid code
      cityName: "Tokyo",
      date: new Date("2024-01-15T12:00:00"),
    };

    const result = formatters.formatWeather(
      mockWeather,
      "metric"
    );

    expect(result).toBeUndefined();
  });
});

describe("The formatForecast() method", () => {
  test("formats future forecasts correctly", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(
      dayAfterTomorrow.getDate() + 2
    );

    const mockForecast = {
      [tomorrow.toISOString().split("T")[0]]: {
        temperatureAvg: 25,
        weatherCodeMin: 1000,
        weatherCodeMax: 1101,
        precipitationProbabilityAvg: 20,
      },
      [dayAfterTomorrow.toISOString().split("T")[0]]: {
        temperatureAvg: 18,
        weatherCodeMin: 4000,
        weatherCodeMax: 4201,
        precipitationProbabilityAvg: 80,
      },
    };

    const result = formatters.formatForecast(mockForecast);

    expect(result).toContain("25°C");
    expect(result).toContain("partly cloudy");
    expect(result).toContain("20% chance of rain");
    expect(result).toContain("18°C");
    expect(result).toContain("heavy rain");
    expect(result).toContain("80% chance of rain");
  });

  test("filters out past dates", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const mockForecast = {
      [yesterday.toISOString().split("T")[0]]: {
        temperatureAvg: 20,
        weatherCodeMin: 1000,
        weatherCodeMax: 1000,
        precipitationProbabilityAvg: 0,
      },
      [tomorrow.toISOString().split("T")[0]]: {
        temperatureAvg: 25,
        weatherCodeMin: 1101,
        weatherCodeMax: 1101,
        precipitationProbabilityAvg: 30,
      },
    };

    const result = formatters.formatForecast(mockForecast);

    expect(result).not.toContain("20°C");
    expect(result).toContain("25°C");
    expect(result).toContain("partly cloudy");
  });

  test("returns empty string when no future forecasts exist", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const mockForecast = {
      [yesterday.toISOString().split("T")[0]]: {
        temperatureAvg: 20,
        weatherCodeMin: 1000,
        weatherCodeMax: 1000,
        precipitationProbabilityAvg: 0,
      },
    };

    const result = formatters.formatForecast(mockForecast);

    expect(result).toBe("");
  });
});

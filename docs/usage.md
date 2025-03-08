# Weather CLI Usage Guide

## Installation

```bash
npm install -g weather-cli
```

## Commands

### Initialize Configuration

```bash
weather init
```

This interactive command helps you set up your default city and preferred unit system (metric or imperial).

### Get Current Weather

```bash
weather now
```

Shows the current weather for your configured city.

Options:

- `-c, --city <city-name>`: Override default city
- `-u, --units <unit-type>`: Override default units (metric/imperial)

### Get Weather Forecast

```bash
weather forecast
```

Shows the weather forecast for your configured city.

Options:

- `-c, --city <city-name>`: Override default city
- `-u, --units <unit-type>`: Override default units (metric/imperial)

## Configuration

Your configuration is stored locally and can be modified using the `init` command or overridden using command-line options.

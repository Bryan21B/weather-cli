# Weather CLI

A beautiful command-line interface for checking weather conditions and forecasts using Tomorrow.io's Weather API.

## Features

- 🌡️ Get current weather conditions
- 🔮 View weather forecasts
- 🎨 Beautiful ASCII art weather representations
- 🌍 Support for both metric (°C) and imperial (°F) units
- 💾 Save your preferences for city and units

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Tomorrow.io API key ([Get one here](https://www.tomorrow.io/weather-api/))

## Installation

1. Clone this repository:

```bash
git clone <your-repo-url>
cd weather-cli
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Tomorrow.io API key:

```bash
WEATHER_API_KEY=your_api_key_here
```

4. Build the project:

```bash
npm run build
```

5. Link the CLI globally:

```bash
npm link
```

## Usage

### Initial Setup

Before first use, configure your default city and preferred unit system:

```bash
weather init
```

This will prompt you to:

1. Enter your city name
2. Choose your preferred unit system (metric or imperial)

### Check Current Weather

To get current weather conditions:

```bash
weather now
```

### Get Weather Forecast

To see the weather forecast:

```bash
weather forecast
```

### Override Default Settings

You can temporarily override your default settings using command options:

```bash
weather now --city "London" --units metric
weather forecast --city "New York" --units imperial
```

### Help

For help with any command:

```bash
weather --help
weather now --help
weather forecast --help
```

## Environment Variables

- `WEATHER_API_KEY`: Your Tomorrow.io API key (required)

## License

MIT

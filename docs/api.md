# Weather CLI API Documentation

## Weather Service

The weather service provides the following methods:

### `getWeatherNow(city: string, units: string)`

Gets the current weather for a specified city.

Parameters:

- `city`: Name of the city
- `units`: Unit system ('metric' or 'imperial')

Returns: Current weather data including temperature, conditions, etc.

### `getWeatherForecast(city: string, units: string)`

Gets the weather forecast for a specified city.

Parameters:

- `city`: Name of the city
- `units`: Unit system ('metric' or 'imperial')

Returns: Forecast data including daily predictions.

### `checkCityExistsOnAPI(city: string)`

Validates if a city exists in the weather service.

Parameters:

- `city`: Name of the city to validate

Returns: Validated city name or throws an error if city is not found.

## Configuration

The CLI uses [conf](https://github.com/sindresorhus/conf) for managing persistent configuration:

- `city`: Stored default city
- `units`: Stored unit system preference ('metric' or 'imperial')

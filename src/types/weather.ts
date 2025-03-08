export interface Location {
  lat: number;
  lon: number;
  name: string;
  type: string;
}

export interface WeatherValues {
  cloudBase: number | null;
  cloudCeiling: number | null;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  hailProbability: number;
  hailSize: number;
  humidity: number;
  precipitationProbability: number;
  pressureSeaLevel: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

export interface WeatherData {
  time: string;
  values: WeatherValues;
}

export interface WeatherResponse {
  data: WeatherData;
  location: Location;
}

export interface DailyValues {
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  humidity: number;
  humidityMax: number;
  humidityMin: number;
  moonriseTime: string;
  moonsetTime: string;
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sunriseTime: string;
  sunsetTime: string;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  uvIndexAvg: number;
  uvIndexMax: number;
  uvIndexMin: number;
  visibilityAvg: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
}

export interface DailyForecast {
  time: string;
  values: DailyValues;
}

export interface ForecastResponse {
  timelines: {
    daily: DailyForecast[];
  };
  location: Location;
}

export interface DailyWeatherData {
  temperatureAvg: number;
  weatherCodeMin: number;
  weatherCodeMax: number;
  precipitationProbabilityAvg: number;
}

import { api as weatherApi } from "../api/api.js";

export const api = {
  getWeatherNow: async (city: string, units: string) => {
    return await weatherApi.getWeatherNow(city, units);
  },

  getWeatherForecast: async (
    city: string,
    units: string
  ) => {
    return await weatherApi.getWeatherForecast(city, units);
  },

  checkCityExistsOnAPI: async (city: string) => {
    return await weatherApi.checkCityExistsOnAPI(city);
  },
};

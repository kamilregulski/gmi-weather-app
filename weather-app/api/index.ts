import axios from 'axios';

import { apiServer } from '../constants';

interface ApiQuery {
  cityName: string;
}

const locationsEndpoint = ({ cityName }: ApiQuery) => `${apiServer}/search/${cityName}`;

const forecastEndpoint = ({ cityName }: ApiQuery) => `${apiServer}/forecast/${cityName}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchLocations = (params: ApiQuery) => {
  const locationsUrl = locationsEndpoint(params);
  return apiCall(locationsUrl);
};

export const fetchWeatherForecast = (params: ApiQuery) => {
  const forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

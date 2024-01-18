import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Get('search/:cityName')
  searchBy(@Param('cityName') cityName: string) {
    return this.apiService.searchBy(cityName);
  }

  @Get('forecast/:cityName')
  forecastBy(@Param('cityName') cityName: string) {
    return this.apiService.forecastBy(cityName);
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Get('search/:cityName')
  @UseGuards(AuthGuard('api-key'))
  searchBy(@Param('cityName') cityName: string) {
    return this.apiService.searchBy(cityName);
  }

  @Get('forecast/:cityName')
  @UseGuards(AuthGuard('api-key'))
  forecastBy(@Param('cityName') cityName: string) {
    return this.apiService.forecastBy(cityName);
  }
}

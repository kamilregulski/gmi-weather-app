import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';
import { apiUrl, apiKey } from './constants';

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async searchBy(cityName: string) {
    return this.http
      .get(`${apiUrl}/search.json?key=${apiKey}&q=${cityName}`)
      .pipe(
        map((res) => res.data),
        map((res) => {
          return res;
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async forecastBy(cityName: string) {
    return this.http
      .get(`${apiUrl}/forecast.json?key=${apiKey}&q=${cityName}`)
      .pipe(
        map((res) => res.data),
        map((res) => {
          return res;
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }
}

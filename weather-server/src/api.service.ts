import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';
import { apiUrl, apiKey } from './constants';

export enum ApiResourceType {
  search = 'search',
  forecast = 'forecast',
}

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findBy(apiResource: ApiResourceType, cityName: string) {
    return this.http
      .get(`${apiUrl}/${apiResource}.json?key=${apiKey}&q=${cityName}`)
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

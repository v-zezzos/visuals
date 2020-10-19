import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getDatas() {
    return this.http.get('http://localhost:4242/api/v1/quable/cache', { headers: { 'x-apikey' : 'apikey' }});
  }
}

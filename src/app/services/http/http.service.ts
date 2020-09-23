import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getAll(url = 'https://pokeapi.co/api/v2/pokemon/') {
    return this.http.get(url);
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + id);
  }
}

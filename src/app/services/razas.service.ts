import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  constructor( private http: HttpClient ) { }

  getListaRazas() {
    return this.http.get('https://dog.ceo/api/breeds/list');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY = 'AIzaSyAd8aj7HRTGZH3EG8Eg65Biv2itvO4cj8w';

  userToken: string;

  // Crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {
    // inicialiar el token para saber si existe el token o no
    this.leerToken();
  }

  // Metodo que realiza la destruccion del token para realizar el logOut de la aplicacion.
  logOut() {
    localStorage.removeItem('token');
  }

  // Metodo para realizaer el logIn de un usuario
  logIn( usuario: UsuarioModel ) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }

    // Llamado del servicio login Firebase
    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.API_KEY }`, authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  // Metodo para registrar un nuevo usuario
  registrarNuevoUsuario( usuario: UsuarioModel ) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    // Llamado del servicio crear Firebase
    return this.http.post(
      `${ this.url }signUp?key=${ this.API_KEY }`, authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }


  // Metodo que se encarga de guardar el  token y almacenarlo en localStorage
  private guardarToken( idToken: string ) {
    this.userToken = idToken;
    // metodo para guardar el token
    localStorage.setItem('token', idToken);

  }

  // Metodo que se encarga de leer el token almacenado el localStorage.
  leerToken() {

    // Para validar si existe el token
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
     } else {
       this.userToken = '';
     }
    return this.userToken;
  }

  // Metodo que se encarga de proteger las rutas si no está autenticado
  isAuthenticated(): boolean {
    return this.userToken.length > 2;
  }
}

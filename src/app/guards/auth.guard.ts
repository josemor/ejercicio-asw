import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService,
               private route: Router) {}

  // Metedo que se encarga de validar si el usuario esta uatenticado para navegar.
  canActivate(): boolean {
    if( this.auth.isAuthenticated() ) {
      return true;
    } else {
      this.route.navigateByUrl('/login');
      return false;
    }
  }
}

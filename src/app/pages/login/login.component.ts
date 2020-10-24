import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: UsuarioModel = new UsuarioModel();

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
  }

  login( form: NgForm ) {

    let  mensajeError: string;
    if ( form.invalid ) { return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();


    this.auth.logIn( this.usuario ).subscribe( resp => {
      console.log(resp);
      Swal.close();
      this.router.navigateByUrl('/home');

    }, (err) => {
      if (err.error.error.message === 'EMAIL_NOT_FOUND' || err.error.error.message === 'INVALID_PASSWORD') {
        mensajeError = 'Datos de usuario y/o contraseña inválidos';
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: mensajeError
        });
      }
    });

  }

}

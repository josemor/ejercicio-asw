import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // instacia de la clase Usuario Model

  usuario: UsuarioModel;

  /**
   * Se inyecta el servicio creado auth
   *
   */
  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    // inicializar la instancia
    this.usuario = new UsuarioModel();
  }

  onSubmit( form: NgForm ) {
   let  mensajeError: string;
   if (form.invalid) {
      return;
    }
   Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
   this.auth.registrarNuevoUsuario( this.usuario ).subscribe( resp => {
     console.log(resp);
     Swal.close();
     this.router.navigateByUrl('/home');
   }, (err) => {

    if (err.error.error.message === 'EMAIL_EXISTS') {
      mensajeError = 'EL CORREO ELECTRONICO YA EXISTE';
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error al autenticar',
        text: mensajeError
      });
    }
   });
  }


}

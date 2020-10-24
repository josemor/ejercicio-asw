import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RazasService } from '../../services/razas.service';
import { map } from 'rxjs/operators';

interface RazasResponse {
  status: string
  message: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiposRazas: string [];
  constructor( private  auth: AuthService,
               private router: Router) {

}

  ngOnInit() {
  }




  salir() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

}

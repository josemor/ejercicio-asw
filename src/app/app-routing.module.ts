import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login'   , component: LoginComponent },
  // Se especifica que rutas van a tener la auteticacion, con el canActivate[AuthGuard]
  { path: 'home'    , component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

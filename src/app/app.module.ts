import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// importacion libreria forms
import { FormsModule } from '@angular/forms';

//  importacion cliente httpClientModule
import { HttpClientModule } from '@angular/common/http';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ListaPerrosComponent } from './pages/lista-perros/lista-perros.component';
import { RazasService } from './services/razas.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    ListaPerrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RazasService],
  bootstrap: [AppComponent]
})
export class AppModule { }

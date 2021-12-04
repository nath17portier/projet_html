import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AventureMenuComponent } from './aventure-menu/aventure-menu.component';
import { ConnexionMenuComponent } from './connexion-menu/connexion-menu.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { InscriptionMenuComponent } from './inscription-menu/inscription-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MultijoueurMenuComponent } from './multijoueur-menu/multijoueur-menu.component';


//Chemins d'accès connus par le routeur Angular

const appRoutes: Routes = [
  {path: 'main' , component: MainMenuComponent},
  {path: 'not-found' , component: FourOhFourComponent},
  {path: 'aventure' , component: AventureMenuComponent},
  {path: 'connexion' , component: ConnexionMenuComponent},
  {path: 'inscription' , component: InscriptionMenuComponent},
  {path: 'multijoueur' , component: MultijoueurMenuComponent},
  {path: '' , component: MainMenuComponent},
  {path: '**' , redirectTo: '/not-found'}
]

const socketConfig: SocketIoConfig = { url: 'http://localhost:3080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AventureMenuComponent,
    ConnexionMenuComponent,
    FourOhFourComponent,
    InscriptionMenuComponent,
    MainMenuComponent,
    MultijoueurMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(socketConfig),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

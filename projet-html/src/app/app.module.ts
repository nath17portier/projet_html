import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


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
import { LobbyMultijoueurComponent } from './lobby-multijoueur/lobby-multijoueur.component';
import { JeuMultiUnComponent } from './jeu-multi-un/jeu-multi-un.component';
import { PicrossComponent } from './picross/picross.component';
import { AuthGuardService } from './services/authGuard.service';
import { PicrossGuardService } from './services/picrossGuard.service';
import { RushHourGuardService } from './services/RushHourGuard.service';
import { MastermindComponent } from './jeux-solo/mastermind/mastermind.component';
import { RushHourComponent } from './rush-hour/rush-hour.component';
import { DemoComponent } from './demo/demo.component';


//Chemins d'accès connus par le routeur Angular

const appRoutes: Routes = [
  {path: 'main' , canActivate: [AuthGuardService] , component: MainMenuComponent},
  {path: 'not-found' , component: FourOhFourComponent},
  {path: 'aventure' , canActivate: [AuthGuardService] , component: AventureMenuComponent},
  {path: 'aventure/picross' , canActivate: [AuthGuardService, PicrossGuardService] , component: PicrossComponent},
  {path: 'aventure/mastermind', canActivate: [AuthGuardService] , component: MastermindComponent},
  {path: 'aventure/rush-hour', canActivate: [AuthGuardService, RushHourGuardService] , component: RushHourComponent},
  {path: 'connexion' , component: ConnexionMenuComponent},
  {path: 'inscription' , component: InscriptionMenuComponent},
  {path: 'multijoueur' , canActivate: [AuthGuardService] , component: MultijoueurMenuComponent},
  {path: 'multijoueur-lobby' , canActivate: [AuthGuardService] , component: LobbyMultijoueurComponent},
  {path: 'multijeu1' , canActivate: [AuthGuardService] , component: JeuMultiUnComponent},
  {path: 'demo' , component: DemoComponent},
  {path: '' , component: ConnexionMenuComponent},
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
    MultijoueurMenuComponent,
    LobbyMultijoueurComponent,
    JeuMultiUnComponent,
    PicrossComponent,
    MastermindComponent,
    RushHourComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(socketConfig),
    ReactiveFormsModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

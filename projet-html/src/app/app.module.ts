import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ConnexionMenuComponent } from './connexion-menu/connexion-menu.component';
import { InscriptionMenuComponent } from './inscription-menu/inscription-menu.component';
import { MultijoueurMenuComponent } from './multijoueur-menu/multijoueur-menu.component';
import { AventureMenuComponent } from './aventure-menu/aventure-menu.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    ConnexionMenuComponent,
    InscriptionMenuComponent,
    MultijoueurMenuComponent,
    AventureMenuComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
  selector: 'app-aventure-menu',
  templateUrl: './aventure-menu.component.html',
  styleUrls: ['./aventure-menu.component.css']
})
export class AventureMenuComponent implements OnInit {

  constructor(private localStorageService : LocalStorageService) { }

  public lvl = this.localStorageService.get("lvlGeneral");

  ngOnInit(): void {
  }

}

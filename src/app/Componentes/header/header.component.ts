import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {Usuario} from '../../Clases/Usuario.model';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logat = false;
  usuariLogat : Usuario | null;

  constructor(protected serveiUsuaris: ServeiUsuarisService) {
    this.usuariLogat = this.serveiUsuaris.usuari_logat
  }
  ngOnInit() {
    console.log(this.serveiUsuaris.usuari_logat)
    if (this.serveiUsuaris.usuari_logat) {
      this.logat = true
    }
    console.log("usuario logeado? " + this.logat)

  }

  logout() {
    this.serveiUsuaris.usuari_logat = null
    window.location.reload();
  }

}


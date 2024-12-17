import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/Usuario.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServeiUsuarisService } from '../../Servicios/servei-usuaris.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuaris: Usuario[] = [];
  usuari = '';
  correu = '';
  contrasenya = '';
  logat = false;
  usuari_notrobat = '';
  usuari_logat = '';

  constructor(private serveiUsuaris: ServeiUsuarisService) {}

  ngOnInit() {
    this.logat = localStorage.getItem('logat') === 'true';
    this.usuari_logat = localStorage.getItem('usuari') || '';
    const usuari = this.serveiUsuaris.getUsuariLogat();
    if (usuari) {
      this.usuari_logat = usuari.usuario;
    }
    this.usuaris = this.serveiUsuaris.getUsuarios();
  }

  login(event: Event) {
    event.preventDefault();
    for (let i = 0; i < this.usuaris.length; i++) {
      if (
        (this.usuaris[i].correo === this.correu && this.usuaris[i].contrasena === this.contrasenya) ||
        (this.usuaris[i].usuario === this.usuari && this.usuaris[i].contrasena === this.contrasenya)
      ) {
        this.logat = true;
        this.serveiUsuaris.setUsuariLogat(this.usuaris[i].usuario);
      }
    }
    if (this.logat) {
      localStorage.setItem('logat', 'true');
      localStorage.setItem('usuari', this.usuari);
      console.log('Estas logat');
      window.location.reload();
    } else {
      this.usuari_notrobat = "L'usuari o la contrasenya no es correcta";
    }
  }

}

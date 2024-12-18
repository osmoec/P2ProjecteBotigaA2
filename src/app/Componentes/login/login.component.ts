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

  //Datos de usuario
  usuari = '';

  usuari_logat = '';
  correu = '';
  contrasenya = '';
  adreca = '';
  dni = ''
  nom = ''
  cognom = ''



  logat = false;
  usuari_notrobat = '';

  constructor(private serveiUsuaris: ServeiUsuarisService) {}

  ngOnInit() {
    this.logat = localStorage.getItem('logat') === 'true';
    this.usuari_logat = localStorage.getItem('usuari') || '';
    if (this.logat) {
      this.datosUsuario()
    }
    this.usuaris = this.serveiUsuaris.getUsuarios();
  }

  datosUsuario(){
    var usuarioRegistrado = this.serveiUsuaris.getUsuariLogat(localStorage.getItem('usuari')!)
    if (usuarioRegistrado){
      const usuari = usuarioRegistrado
      this.usuari_logat = usuari.usuario;
      this.adreca = usuari.direccion
      this.dni = usuari.DNI
      this.correu = usuari.correo
      this.nom = usuari.nombre
      this.cognom = usuari.apellido
    }

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

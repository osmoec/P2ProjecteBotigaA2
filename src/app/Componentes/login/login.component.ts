import {Component, OnInit, viewChild} from '@angular/core';
import { Usuario } from '../../Clases/Usuario.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { ServeiUsuarisService } from '../../Servicios/servei-usuaris.service';
import {routes} from '../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuaris: Usuario[];

  //Datos de usuario
  usuari = '';

  usuari_logat : Usuario | null = null;
  correu = '';
  contrasenya = '';
  adreca = '';
  dni = ''
  nom = ''
  cognom = ''
  recordar : boolean = false;




  logat = false;
  usuari_notrobat = '';

  constructor(private serveiUsuaris: ServeiUsuarisService) {
    this.usuaris = this.serveiUsuaris.usuaris
  }

  ngOnInit() {
    const usuariId = localStorage.getItem('usuari');
    if (usuariId) {
      this.serveiUsuaris.cargarDatos(usuariId);
    }
    this.usuari_logat = this.serveiUsuaris.usuari_logat;
    if (this.usuari_logat) {
      this.logat = true;
      this.datosUsuario();
    }
    this.usuaris = this.serveiUsuaris.getUsuarios();
  }

  datosUsuario() {
    if (this.usuari_logat) {
      this.usuari = this.usuari_logat.usuario;
      this.adreca = this.usuari_logat.direccion;
      this.dni = this.usuari_logat.DNI;
      this.correu = this.usuari_logat.correo;
      this.nom = this.usuari_logat.nombre;
      this.cognom = this.usuari_logat.apellido;
    }

  }
  //Este evento se activa al pulsar el boton de inicio de sesion
  login(event: Event) {
    event.preventDefault();
    console.log(this.usuaris)
    for (let i = 0; i < this.usuaris.length; i++) {
      console.log(this.usuaris[i].usuario + "   " + this.usuaris[i].contrasena)
      console.log(this.usuari + "   " + this.contrasenya)
      if (
        (this.usuaris[i].correo === this.correu && this.usuaris[i].contrasena === this.contrasenya) ||
        (this.usuaris[i].usuario === this.usuari && this.usuaris[i].contrasena === this.contrasenya)
      ) {
        this.serveiUsuaris.usuari_logat = this.usuaris[i]
        this.logat = true
      }
    }
    if (this.recordar) {
      this.serveiUsuaris.recordarUsuario()
    }
    console.log(this.recordar)
    console.log(localStorage.getItem('usuariRecordat'))
    if (this.logat) {
      localStorage.setItem('usuari', this.usuari);
      this.datosUsuario()
      this.serveiUsuaris.actualizarEstadoSesion()


    } else {
      this.usuari_notrobat = "L'usuari o la contrasenya no es correcta";
    }
  }

}

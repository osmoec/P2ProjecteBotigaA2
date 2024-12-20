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



  logat = false;
  usuari_notrobat = '';

  constructor(private router: Router, private serveiUsuaris: ServeiUsuarisService) {
    this.usuaris = this.serveiUsuaris.usuaris
  }

  ngOnInit() {
    if (this.serveiUsuaris.usuari_logat) {
      this.logat = true
    }
    this.usuari_logat = this.serveiUsuaris.usuari_logat;
    if (this.logat) {
      this.datosUsuario()
    }
    this.usuaris = this.serveiUsuaris.getUsuarios();
  }

  datosUsuario(){
    var usuarioRegistrado = this.serveiUsuaris.getUsuariLogat(localStorage.getItem('usuari')!)
    if (usuarioRegistrado){
      this.usuari = usuarioRegistrado.usuario;
      this.adreca = usuarioRegistrado.direccion
      this.dni = usuarioRegistrado.DNI
      this.correu = usuarioRegistrado.correo
      this.nom = usuarioRegistrado.nombre
      this.cognom = usuarioRegistrado.apellido
    }

  }

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
    if (this.logat) {
      localStorage.setItem('usuari', this.usuari);
      this.datosUsuario()
      this.serveiUsuaris.actualizarEstadoSesion()
      this.router.navigate(['/login']);
    } else {
      this.usuari_notrobat = "L'usuari o la contrasenya no es correcta";
    }
  }

}

import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private serveiUsuaris: ServeiUsuarisService) {}

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
    console.log(usuarioRegistrado)
    console.log(localStorage.getItem('usuari'))
    console.log(this.serveiUsuaris.usuaris)
    if (usuarioRegistrado){
      this.usuari_logat = usuarioRegistrado.usuario;
      this.adreca = usuarioRegistrado.direccion
      this.dni = usuarioRegistrado.DNI
      this.correu = usuarioRegistrado.correo
      this.nom = usuarioRegistrado.nombre
      this.cognom = usuarioRegistrado.apellido
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
      this.datosUsuario()
      this.router.navigate(['/login']);
    } else {
      this.usuari_notrobat = "L'usuari o la contrasenya no es correcta";
    }
  }

}

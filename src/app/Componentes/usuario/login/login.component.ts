import {Component, OnInit, viewChild} from '@angular/core';
import { Usuario } from '../../../Clases/Usuario.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { ServeiUsuarisService } from '../../../Servicios/servei-usuaris.service';
import {routes} from '../../app.routes';
import {HttpClient} from '@angular/common/http';
import {MetamaskService} from '../../../Servicios/metamask.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //Datos de usuario
  usuari = '';
  correu = '';
  contrasenya =  '';
  adreca = '';
  dni = ''
  nom = ''
  cognom = ''
  recordar : boolean = false;

  usuari_notrobat = '';


  constructor(private router: Router,protected serveiUsuaris: ServeiUsuarisService, public metamask: MetamaskService) {

  }

  datosUsuario() {
    if (this.serveiUsuaris.usuari_logat) {
      this.usuari = this.serveiUsuaris.usuari_logat.usuario;
      this.adreca = this.serveiUsuaris.usuari_logat.direccion;
      this.dni = this.serveiUsuaris.usuari_logat.DNI;
      this.correu = this.serveiUsuaris.usuari_logat.correo;
      this.nom = this.serveiUsuaris.usuari_logat.nombre;
      this.cognom = this.serveiUsuaris.usuari_logat.apellido;
    }

  }
  //Este evento se activa al pulsar el boton de inicio de sesion
  async login(event: Event) {
    event.preventDefault();

    const resultado = await this.serveiUsuaris.cargarDatos(this.usuari, this.contrasenya, this.recordar);

    if (resultado) {
      this.datosUsuario();
      this.serveiUsuaris.actualizarEstadoSesion();
      this.metamask.iniciDeSessio()
      console.log(await this.metamask.preuBTC())
      console.log(await this.metamask.preuBNB())
    } else {
      this.usuari_notrobat = "L'usuari no valid o no comfirmat";
    }
  }
  modificarDades() {

    this.router.navigate(['/modificarDades']);
  }

}

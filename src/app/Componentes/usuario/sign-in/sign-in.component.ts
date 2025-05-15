import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../Clases/Usuario.model';
import { ServeiUsuarisService } from '../../../Servicios/servei-usuaris.service';
import { NgIf } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {RecaptchaModule} from 'ng-recaptcha';
import {MetamaskService} from '../../../Servicios/metamask.service';
import {direction} from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgIf, RecaptchaModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @ViewChild('miInput') miInputRef!: ElementRef;

  nom: string = '';
  cognom: string = '';
  correu: string = '';
  usuari: string = '';
  DNI: string = '';
  aniversari: Date = new Date();
  telefon: string = '';
  contrasena: string = '';
  confContrasena: string = '';
  adreca: string = '';
  usuari_ja_registrat = '';
  captchaCompletado: boolean = false;

  constructor(private router: Router, private serveiUsuaris: ServeiUsuarisService, public http: HttpClient, public metamask: MetamaskService) {}


  public validarDatos(): boolean {
    // Validaciones para los campos del formulario
    if (!this.nom) { alert('Si us plau, completa el teu nom'); return false; }
    if (!this.cognom) { alert('Si us plau, completa el teu cognom'); return false; }
    if (!this.usuari) { alert('Si us plau, completa el teu nom d\'usuari'); return false; }
    if (!this.DNI) { alert('Si us plau, completa el teu DNI'); return false; }
    if (this.DNI.length !== 9 || isNaN(Number(this.DNI.slice(0, 8))) || this.DNI[8] !== this.DNI[8].toUpperCase()) {
      alert('El DNI ha de ser 8 números seguits d\'una lletra majúscula');
      return false;
    }
    if (!this.aniversari) { alert('Si us plau, completa la teva data de naixement'); return false; }
    if (!this.telefon || this.telefon.length != 9) {
      alert('Si us plau, completa el numero de telefon amb el format XXXXXXXXX');
      return false;
    }
    if (!this.contrasena) { alert('Si us plau, completa la contrasenya'); return false; }
    if (this.contrasena !== this.confContrasena) { alert('Les contrasenyes no coincideixen'); return false; }
    if (!this.adreca) { alert('Si us plau, completa la teva adreça'); return false; }
    return true;
  }

  public async registro() {
    if (!this.captchaCompletado) {
      alert('Si us plau, completa el captcha abans de registrar-te.');
      return;
    }

    // Validación de datos del formulario
    if (this.validarDatos()) {
      this.serveiUsuaris.addUsuario(new Usuario(this.nom, this.cognom, this.correu, this.usuari, this.DNI, this.aniversari, this.telefon, this.contrasena, this.adreca))
      alert(`Benvingut/da, ${this.nom}!`);
      // Redirigir a la página de login
      this.router.navigate(['/login']);
    }
  }

}

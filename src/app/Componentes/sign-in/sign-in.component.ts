import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Clases/Usuario.model';
import { ServeiUsuarisService } from '../../Servicios/servei-usuaris.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
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

  constructor(private router: Router, private serveiUsuaris: ServeiUsuarisService) {}

  public validarDatos(): boolean {
    if (!this.nom) {alert('Si us plau, completa el teu nom');return false;}
    if (!this.cognom) {alert('Si us plau, completa el teu cognom');return false;}
    if (!this.usuari) {alert('Si us plau, completa el teu nom d\'usuari');return false;}
    if (!this.DNI) {alert('Si us plau, completa el teu DNI');return false;}
    if (this.DNI.length !== 9 || isNaN(Number(this.DNI.slice(0, 8))) || this.DNI[8] !== this.DNI[8].toUpperCase()) {
      alert('El DNI ha de ser 8 números seguits d\'una lletra majúscula');
      return false;
    }
    if (!this.aniversari) {alert('Si us plau, completa la teva data de naixement');return false}
    if (!this.telefon || this.telefon.length != 9) {
      alert('Si us plau, completa el numero de telefon amb el format XXXXXXXXX');
      return false;
    }
    if (!this.contrasena) {alert('Si us plau, completa la contrasenya');return false;}
    if (this.contrasena !== this.confContrasena) {alert('Les contrasenyes no coincideixen');return false;}
    if (!this.adreca) {alert('Si us plau, completa la teva adreça');return false;}
    return true;
  }

  public registro() {
    if (this.validarDatos()) {
      const nouUsuari = {usuari: this.usuari, dades: {nombre :this.nom, apellido: this.cognom ,correo: this.correu, usuario: this.usuari, DNI: this.DNI, fechaNacimiento: this.aniversari, telefono: this.telefon, contrasena: this.contrasena, direccion: this.adreca, comandas: [], titularTarjeta: null, numeroTarjeta: null, fechaTarjeta: null, CVVTarjeta: null}}
      /*for (let user of this.serveiUsuaris.getUsuarios()) {
        if (user.usuario === this.usuari || user.correo === this.correu) {
          this.usuari_ja_registrat = "Aquest usuari ja esta registrat.";
          return;
        }
      }*/
      this.serveiUsuaris.addUsuario(nouUsuari);

      // Mostrar mensaje de bienvenida con el nombre capturado
      alert(`Benvingut/da, ${this.miInputRef.nativeElement.value}!`);
      this.serveiUsuaris.guardarDatos();
      this.router.navigate(['/login']);
    }
  }
}

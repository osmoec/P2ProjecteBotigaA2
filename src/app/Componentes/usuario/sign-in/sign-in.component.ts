import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../Clases/Usuario.model';
import { ServeiUsuarisService } from '../../../Servicios/servei-usuaris.service';
import { NgIf } from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';


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

  constructor(private router: Router, private serveiUsuaris: ServeiUsuarisService, public http: HttpClient) {}

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

  public async noCoincidencies(){
    let promesa = new Promise(async (resolve, reject) => {
      let req = new HttpParams().set("usuari", this.usuari)
      let res = this.http.get<any>('http://localhost:3080/usuari/conicidencies', {params: req}).subscribe((res)=>{
        if (res.coin) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })

    return promesa;
  }

  public async registro() {
  let coinc
    await this.noCoincidencies().then(
    (res)=>{
      coinc = res
    }
  )
    if (this.validarDatos() && coinc) {
      let temp = ""
      for (let i = 1; i < 11; i++){
        if ((i % 2) === 0){
          temp = temp + String.fromCharCode(Math.floor((Math.random()*26)+65))
        }
        else{
          temp = temp + (Math.floor(Math.random()*26)+65)
        }

      }

      console.log(temp)

      const nouUsuari = new Usuario(
        this.nom,
        this.cognom,
        this.correu,
        this.usuari, // ID del usuario
        this.DNI,
        this.aniversari,
        this.telefon,
        this.contrasena,
        this.adreca,
        temp,
      )

      // Llamar a la función asincrónica y esperar la respuesta
      this.serveiUsuaris.addUsuario(nouUsuari).then((success) => {
        if (success) {
          // ✅ Si el usuario se creó correctamente, continuar con el flujo
          alert(`Benvingut/da, ${this.nom}!`);



          this.http.post('http://localhost:3080/usuaris/mailconfusr',{usuariid: this.usuari}).subscribe()
          this.serveiUsuaris.guardarDatos(nouUsuari);
          this.router.navigate(['/login']);
        } else {
          // ❌ Si hubo un error, mostrar un mensaje
          alert("Error en el registro. Inténtalo de nuevo.");
        }
      });
    }
    else{
      alert("no es poden inserir usuaris ja creats")
    }
  }

}

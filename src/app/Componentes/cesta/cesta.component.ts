import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';
import {filter} from 'rxjs';
import {Comanda} from '../../Clases/comanda.model';
import {Usuario} from '../../Clases/Usuario.model';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit {
  cestaActual: any
  totalSenseTaxes: number = 0
  totalAmbTaxes: number = 0
  metode: string = ""
  titular: string = ""
  numCompte: number = 0
  dataExpiracio: string = ""
  cvv: string = ""


  ngOnInit(): void {

    this.calcularTotals()
  }

  constructor(protected serveiUsuari: ServeiUsuarisService) {
    this.cestaActual = this.serveiUsuari.usuari_logat?.cesta
    console.log(this.serveiUsuari.usuari_logat?.cesta)
  }

  guardarCesta() {
    this.serveiUsuari.usuari_logat?.cesta
  }

  eliminarcesta(idC: number) {
    // @ts-ignore
    var temp = this.cestaActual.filter(arr => arr.coche.id !== idC)
    this.cestaActual = temp
    var id = "coche" + idC
    // @ts-ignore
    document.getElementById(id).innerHTML = ""

    this.calcularTotals()
  }

  calcularTotals() {

    this.totalSenseTaxes = 0

    this.totalAmbTaxes = 0

    for (var preu of this.cestaActual) {
      this.totalSenseTaxes += preu.coche.price * preu.quantity
    }

    this.totalAmbTaxes = (this.totalSenseTaxes * 0.21) + this.totalSenseTaxes
  }

  crearComanda(totalComandaC: number, cochesComandaC: any[]) {
    let numeroComanda = Math.floor(Math.random() * 999999) + 1;

    if (!this.serveiUsuari.usuari_logat) {
      throw new Error('No hay usuario logado.');
    }

    console.log("Usuario logado:", this.serveiUsuari.usuari_logat);

    // @ts-ignore
    let comandaNova = new Comanda(numeroComanda, this.serveiUsuari.usuari_logat.usuario, cochesComandaC, totalComandaC);
    let diferent = false;

    if (this.serveiUsuari.usuari_logat.comandas) {
      while (!diferent) {
        if (this.serveiUsuari.usuaris.some(u => u.comandas?.some(c => c.numComanda === numeroComanda))) {
          console.log("Número de comanda duplicado:", numeroComanda);
          numeroComanda = Math.floor(Math.random() * 999999) + 1;
          comandaNova.numComanda = numeroComanda;
        } else {
          diferent = true;
        }
      }
    }

    console.log("Comanda creada:", comandaNova);
    return comandaNova;
  }



  guardarComanda(comanda: Comanda) {

    if (this.serveiUsuari.usuari_logat) {
      console.log("Usuario logado antes de agregar comanda:", this.serveiUsuari.usuari_logat);
      this.serveiUsuari.agregarComanda(comanda.numComanda!, this.serveiUsuari.usuari_logat.usuario, comanda.cochesComanda!, comanda.totalComanda!);
      console.log("Comanda agregada al usuario logado:", this.serveiUsuari.usuari_logat);
    }

    this.cestaActual = undefined;

    // @ts-ignore
    document.getElementById('cistellacont').innerHTML = '';

    console.log("comanda guardada:", comanda);
  }
  guardarYCrearComanda() {
    let comanda = this.crearComanda(this.totalAmbTaxes, this.cestaActual);
    this.guardarComanda(comanda);
  }
}

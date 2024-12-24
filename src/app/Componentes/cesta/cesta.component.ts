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

    let numeroComanda = Math.floor(Math.random() * 999999) + 1

    // @ts-ignore
    let comandaNova = new Comanda(numeroComanda, this.serveiUsuari.usuari_logat?.usuario, cochesComandaC, totalComandaC)

    let diferent = false;

    while (!diferent) {
      // @ts-ignore
      if (this.serveiUsuari.usuari_logat.usuaris.some(comandaNova => comandaNova.numComanda === usuario.comandas.numClient)) {
        comandaNova.numComanda = Math.floor(Math.random() * 999999) + 1
      } else {
        diferent = true
      }
    }

    return comandaNova

  }

  guardarComanda() {
    let temp = this.crearComanda(this.totalAmbTaxes, this.cestaActual)

    this.serveiUsuari.usuari_logat?.comandas?.push(temp)

    this.cestaActual = undefined

    // @ts-ignore
    document.getElementById("cistellacont").innerHTML = ""

    console.log(temp)

  }
}

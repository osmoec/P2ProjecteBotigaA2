import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';
import {Comanda} from '../../Clases/comanda.model';
import {Router} from '@angular/router';
import {ConnectorBDService} from '../../Servicios/connector-bd.service';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit {
  totalSenseTaxes: number = 0
  totalAmbTaxes: number = 0
  metode: string = ""
  titular: string = ""
  numCompte: string = ""
  dataExpiracio: string = ""
  cvv: string = ""
  recordarTarjeta : boolean = true


  ngOnInit(): void {
    this.calcularTotals()
    this.rellenarDatosTargeta()
  }

  constructor(protected serveiUsuari: ServeiUsuarisService, private router: Router,protected serveiConnector:ConnectorBDService) {
  }

  guardarCesta() {
    this.serveiUsuari.usuari_logat?.cesta
  }

  //Elimina un item de la cesta
  eliminarcesta(idC: number) {
    // @ts-ignore
    var temp = this.serveiUsuari.usuari_logat!.cesta.filter(arr => arr.coche.id !== idC)
    this.serveiUsuari.usuari_logat!.cesta = temp

    this.calcularTotals()
    this.serveiUsuari.guardarDatos(this.serveiUsuari.usuari_logat!)
    this.router.navigate(['/cesta']);
  }

  calcularTotals() {
    if ((this.serveiUsuari.usuari_logat && this.serveiUsuari.usuari_logat.cesta.length != 0) && this.serveiUsuari.usuari_logat_bool) {
      this.totalSenseTaxes = 0

      this.totalAmbTaxes = 0

      for (var preu of this.serveiUsuari.usuari_logat!.cesta) {
        this.totalSenseTaxes += preu.coche.price * preu.quantity
      }

      this.totalAmbTaxes = (this.totalSenseTaxes * 0.21) + this.totalSenseTaxes
    }
  }

  guardarComanda(totalComandaC: number, cochesComandaC: any[],metodePagament: string) {
    var comanda
    if (!this.serveiUsuari.usuari_logat) {
      throw new Error('No hay usuario logado.');
    }
    else {
      comanda = new Comanda(this.serveiUsuari.usuari_logat.usuario, cochesComandaC, totalComandaC,metodePagament);

    }

    if (this.serveiUsuari.usuari_logat) {
      this.serveiUsuari.agregarComanda(comanda);
      console.log("Comanda agregada al usuario logado:", this.serveiUsuari.usuari_logat);
    }

    this.serveiUsuari.usuari_logat!.cesta = [];

    // @ts-ignore
    document.getElementById('cistellacont').innerHTML = '';

  }

  guardarYCrearComanda() {
    if ((this.serveiUsuari.usuari_logat && this.serveiUsuari.usuari_logat.cesta.length != 0) && this.serveiUsuari.usuari_logat_bool){
      if (this.metode != ""){
      this.guardarComanda(this.totalAmbTaxes, this.serveiUsuari.usuari_logat!.cesta,this.metode);

      if (this.recordarTarjeta) {
        this.serveiUsuari.usuari_logat?.guardarDatosTarjeta(this.titular, this.numCompte, this.dataExpiracio, this.cvv)
      }
      this.serveiUsuari.guardarDatos(this.serveiUsuari.usuari_logat!)
        this.totalSenseTaxes = 0
        this.totalAmbTaxes = 0
        this.metode = ""
        this.titular = ""
        this.numCompte = ""
        this.dataExpiracio = ""
        this.cvv = ""
        this.recordarTarjeta  = false
      }
      else{
        alert("Selecciona metode de pagament")
      }
    }
    else{
      alert("Ho sento, no es poden comprar productes amb el carro buit o sense haver iniciat sessio")
    }
  this.guardarProducte();

  }
  guardarProducte(){
    const usuari = this.serveiUsuari.usuari_logat;

    if (!usuari || !usuari.cesta || usuari.cesta.length === 0) {
      console.error("No hi ha cap usuari o la cistella esta buida");
      return;
    }

    const factura = {
      client_id:this.serveiUsuari.usuari_logat,
      data_creacio: Date.now(),
      total_comanda: this.calcularTotals(),
      metode_pagament: this.metode
    }
    const factura_detalls = usuari.cesta.map(coche => ({
      id_factura: this.serveiUsuari.usuari_logat,
      id_cotxe: coche.coche.id,
      quantitat: coche.quantity
    }));

    console.log("Factura:", factura);
    console.log("Factura Detalls:", factura_detalls);

    const dadesFactura = {
      ...factura,
      cotxes: factura_detalls
    };
    this.serveiConnector.registrarFactura(dadesFactura).subscribe(
      (response) => {
        console.log('Factura registrada correctament', response);
      },
      (error) => {
        console.error('Error al registrar la factura', error);
      }
    );

  }

  rellenarDatosTargeta() {
    this.titular = this.serveiUsuari.usuari_logat?.titularTarjeta || ""
    this.numCompte = this.serveiUsuari.usuari_logat?.numeroTarjeta || ""
    this.dataExpiracio = this.serveiUsuari.usuari_logat?.fechaTarjeta ||""
    this.cvv = this.serveiUsuari.usuari_logat?.CVVTarjeta || ""
  }

  targeta(metode:string){
    this.metode  = metode;
  }
}

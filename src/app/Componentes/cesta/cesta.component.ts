import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';
import {Comanda} from '../../Clases/comanda.model';
import {Router} from '@angular/router';

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

  constructor(protected serveiUsuari: ServeiUsuarisService, private router: Router) {
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
    this.serveiUsuari.guardarDatos()
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

  crearComanda(totalComandaC: number, cochesComandaC: any[],metodePagament: string) {
    let numeroComanda = Math.floor(Math.random() * 999999) + 1;

    if (!this.serveiUsuari.usuari_logat) {
      throw new Error('No hay usuario logado.');
    }

    console.log("Usuario logado:", this.serveiUsuari.usuari_logat);

    // @ts-ignore
    let comandaNova = new Comanda(numeroComanda, this.serveiUsuari.usuari_logat.usuario, cochesComandaC, totalComandaC,metodePagament);
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
      this.serveiUsuari.agregarComanda(comanda.numComanda!, this.serveiUsuari.usuari_logat.usuario, comanda.cochesComanda!, comanda.totalComanda!,this.metode);
      console.log("Comanda agregada al usuario logado:", this.serveiUsuari.usuari_logat);
    }

    this.serveiUsuari.usuari_logat!.cesta = [];

    // @ts-ignore
    document.getElementById('cistellacont').innerHTML = '';

    console.log("comanda guardada:", comanda);
  }
  guardarYCrearComanda() {
    if ((this.serveiUsuari.usuari_logat && this.serveiUsuari.usuari_logat.cesta.length != 0) && this.serveiUsuari.usuari_logat_bool){
      if (this.metode != ""){
      let comanda = this.crearComanda(this.totalAmbTaxes, this.serveiUsuari.usuari_logat!.cesta,this.metode);
      this.guardarComanda(comanda);
      console.log(this.recordarTarjeta)
      if (this.recordarTarjeta) {
        this.serveiUsuari.usuari_logat?.guardarDatosTarjeta(this.titular, this.numCompte, this.dataExpiracio, this.cvv)
      }
      this.serveiUsuari.guardarDatos()
      }
      else{
        alert("Selecciona metode de pagament")
      }
    }
    else{
      alert("Ho sento, no es poden comprar productes amb el carro buit o sense haver iniciat sessio")
    }

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

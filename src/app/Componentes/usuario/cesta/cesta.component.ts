import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ServeiUsuarisService} from '../../../Servicios/servei-usuaris.service';
import {Comanda} from '../../../Clases/comanda.model';
import {Router} from '@angular/router';
import {ConnectorBDService} from '../../../Servicios/connector-bd.service'
import {NgIf} from "@angular/common";
import {MetamaskService} from '../../../Servicios/metamask.service';

@Component({
  selector: 'app-cesta',
  standalone: true,
    imports: [FormsModule, NgIf],
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
  preus: any[] = []
  preuPreparat: boolean = false;
  totalAmbTaxesBNB: number = 0
  totalSenseTaxesBNB: number = 0
  totalAmbTaxesBTC: number = 0
  totalSenseTaxesBTC: number = 0
  hashTransac: any = ""

  async ngOnInit(): Promise<void> {
    this.calcularTotals()
    this.rellenarDatosTargeta()
    await this.obtenirPreus()

    setInterval(() => {
        this.actualitzarPreus()},
      62000)
  }

  constructor(protected serveiUsuari: ServeiUsuarisService, private router: Router,protected serveiConnector:ConnectorBDService, public metamask: MetamaskService) {
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

  calcularTotals():number {
    if ((this.serveiUsuari.usuari_logat && this.serveiUsuari.usuari_logat.cesta.length != 0) && this.serveiUsuari.usuari_logat_bool) {
      this.totalSenseTaxes = 0

      this.totalAmbTaxes = 0

      for (var preu of this.serveiUsuari.usuari_logat!.cesta) {
        this.totalSenseTaxes += preu.coche.price * preu.quantity
      }

      this.totalAmbTaxes = (this.totalSenseTaxes * 0.21) + this.totalSenseTaxes

      if (this.preuPreparat){
        this.totalSenseTaxesBNB = Number((this.totalAmbTaxes/this.preus[0]).toFixed(2))
        this.totalAmbTaxesBNB = Number((this.totalAmbTaxes/this.preus[0]).toFixed(2))
        this.totalAmbTaxesBTC= Number((this.totalSenseTaxes/this.preus[1]).toFixed(2))
        this.totalSenseTaxesBTC = Number((this.totalSenseTaxes/this.preus[1]).toFixed(2))
      }

      return parseFloat(this.totalAmbTaxes.toFixed(10));
    }
    return 0;
  }

  guardarComanda(totalComandaC: number, cochesComandaC: any[], metodePagament: string) {
    const maxInt = 2147483647;

    if (totalComandaC > maxInt) {
      alert("El total de la comanda excedeix el límit permès.");

      let reduccioPossible = cochesComandaC.some(item => item.quantity > 1);

      while (totalComandaC > maxInt && reduccioPossible) {
        for (let item of cochesComandaC) {
          if (item.quantity > 1) {
            item.quantity--;
            break;
          }
        }

        totalComandaC = cochesComandaC.reduce((acc, item) => acc + item.coche.price * item.quantity, 0);
        reduccioPossible = cochesComandaC.some(item => item.quantity > 1);
      }

      if (totalComandaC > maxInt) {
        alert("No es pot ajustar la comanda sense eliminar productes.");
        return;
      }

      alert("La comanda s'ha ajustat automàticament per no superar el límit permès.");
    }

    if (!this.serveiUsuari.usuari_logat) {
      throw new Error('No hi ha usuari logat.');
    }

    console.log(totalComandaC)
    const comanda = new Comanda(this.serveiUsuari.usuari_logat.usuario, cochesComandaC, totalComandaC, metodePagament);

    this.serveiUsuari.agregarComanda(comanda);
    console.log("Comanda agregada:", this.serveiUsuari.usuari_logat);

    this.serveiUsuari.usuari_logat!.cesta = [];

    document.getElementById('cistellacont')!.innerHTML = '';
  }



  guardarYCrearComanda() {
    if ((this.serveiUsuari.usuari_logat && this.serveiUsuari.usuari_logat.cesta.length != 0) && this.serveiUsuari.usuari_logat_bool){
      if (this.metode != ""){
        const cistellaTemporal = [...this.serveiUsuari.usuari_logat!.cesta];

        let totalCom = 0

        if (this.metode === 'BNB' || this.metode === 'BTC') {
          if (this.metode === 'BNB'){
            totalCom = this.totalAmbTaxesBNB
          }
          else if (this.metode === 'BTC'){
            totalCom = this.totalAmbTaxesBTC
          }
        }
        else{
          totalCom = this.totalAmbTaxes
        }


        // @ts-ignore
        this.guardarComanda(totalCom, this.serveiUsuari.usuari_logat!.cesta,this.metode);
        console.log(cistellaTemporal)
        this.guardarProducte(cistellaTemporal);

        if (this.recordarTarjeta) {
          this.serveiUsuari.usuari_logat?.guardarDatosTarjeta(this.titular, this.numCompte, this.dataExpiracio, this.cvv)
        }
        this.serveiUsuari.guardarDatos(this.serveiUsuari.usuari_logat!)
        this.totalSenseTaxes = 0
        this.totalAmbTaxes = 0
        this.totalAmbTaxesBTC = 0
        this.totalSenseTaxesBTC = 0
        this.totalAmbTaxesBNB = 0
        this.totalSenseTaxesBNB = 0
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

  }
  guardarProducte(cistella: any[]) {
    const usuari = this.serveiUsuari.usuari_logat;

    let errors = []

    if (!cistella || cistella.length === 0) {
      errors.push("No pots fer una compra amb la cistella buida.");
    }

    if (!this.metode) {
      errors.push("Si us plau, selecciona un mètode de pagament.");
    }

    if (this.metode === "tarjeta") {
      if (!this.titular) errors.push("El camp 'Titular' és obligatori.");
      if (!this.numCompte) errors.push("El camp 'Número de compte' és obligatori.");
      if (!this.dataExpiracio) errors.push("El camp 'Data d'expiració' és obligatori.");
      if (!this.cvv) errors.push("El camp 'CVV' és obligatori.");
    }

    if (errors.length > 0) {
      console.error("Errors detectats:", errors);
      alert(errors.join("\n"));
      return;
    }

    const cotxes = cistella.map(coche => ({
      id_cotxe: coche.coche.id,
      quantitat: coche.quantity
    }));

    let totalFacturaA = 0
    let moneda = ""

    if (this.metode === 'BNB' || this.metode === 'BTC') {
      if (this.metode === 'BNB'){
        totalFacturaA = this.totalAmbTaxesBNB
        moneda = "BNB"
      }
      else if (this.metode === 'BTC'){
        totalFacturaA = this.totalAmbTaxesBTC
        moneda = "BTC"
      }
    }
    else{
      totalFacturaA = this.totalAmbTaxes
      this.hashTransac = "no"
      moneda = "EUR"
    }

    console.log(this.hashTransac)

    const factura = {
      client_id: usuari!.nombre,
      data_creacio: new Date().toISOString().slice(0, 19).replace('T', ' '),
      total_comanda: totalFacturaA,
      moneda: moneda,
      hash_transacio: this.hashTransac,
      metode_pagament: this.metode,
      cotxes: cotxes
    };



    console.log("Factura creada correctament:", factura);

    this.serveiConnector.registrarFactura(factura).subscribe(
      (response: any) => {
        console.log('Factura registrada correctament', response);
      },
      (error: any) => {
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
    console.log(this.metode)
  }

  async obtenirPreus() {
    var bnb = await this.metamask.preuBNB()
    var btc = await this.metamask.preuBTC()
    this.preus[0] = bnb.preu
    this.preus[1] = btc.preu

    console.log(this.preus)

    this.preuPreparat = true;

    this.preus = [...this.preus]

    this.totalSenseTaxesBNB = 0
    this.totalAmbTaxesBNB = 0
    this.totalSenseTaxesBTC = 0
    this.totalAmbTaxesBTC = 0

    this.totalSenseTaxesBNB = Number((this.totalSenseTaxes / this.preus[0]).toFixed(2))
    this.totalAmbTaxesBNB = Number((this.totalAmbTaxes / this.preus[0]).toFixed(2))
    this.totalAmbTaxesBTC = Number((this.totalAmbTaxes / this.preus[1]).toFixed(2))
    this.totalSenseTaxesBTC = Number((this.totalSenseTaxes / this.preus[1]).toFixed(2))
    console.log(this.totalSenseTaxesBNB)
    console.log(this.totalAmbTaxesBNB)
  }

  protected readonly Number = Number;

  async transacio(){
      if (this.metode === 'BNB'){
        try {
          let hash = await this.metamask.enviarTransacioBNB()
          this.hashTransac = hash!.transactionHash
          if (this.hashTransac){
            this.guardarYCrearComanda()
          }
          else{
            console.log('error al pagament')
          }
        }
        catch (e){
          console.log('erroni')
        }
      }
      else if(this.metode === 'BTC'){
        try {
          let hash = await this.metamask.enviarTransacioBTCB()
          this.hashTransac = hash!.transactionHash
          if (this.hashTransac){
            this.guardarYCrearComanda()
          }
          else{
            console.log('error al pagament')
          }
        }
        catch (e){
          console.log('erroni')
        }
      }
  }

  async actualitzarPreus(){
    await this.obtenirPreus()
    if (this.preuPreparat){
      for (let cotxeactual of this.serveiUsuari.usuari_logat!.cesta){
        document.getElementById(cotxeactual.coche.name+"-BNB")!.innerText = ""
        document.getElementById(cotxeactual.coche.name+"-BNB")!.innerText = ((Number(cotxeactual.coche.price) * (1 - cotxeactual.coche.oferta))/this.preus[0]).toLocaleString('es-ES')+" BNB"
        document.getElementById(cotxeactual.coche.name+"-BTC")!.innerText = ""
        document.getElementById(cotxeactual.coche.name+"-BTC")!.innerText = ((Number(cotxeactual.coche.price) * (1 - cotxeactual.coche.oferta))/this.preus[1]).toLocaleString('es-ES')+" BTC"
      }
    }
  }
}

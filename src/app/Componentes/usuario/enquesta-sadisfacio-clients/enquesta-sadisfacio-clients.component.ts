import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ServeiUsuarisService} from '../../../Servicios/servei-usuaris.service';
import {ConnectorBDService} from '../../../Servicios/connector-bd.service';

@Component({
  selector: 'app-enquesta-sadisfacio-clients',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './enquesta-sadisfacio-clients.component.html',
  styleUrl: './enquesta-sadisfacio-clients.component.css'
})
export class EnquestaSadisfacioClientsComponent {

  grauSadisfacioProducte: number = 0;

  grauSadisfacioServei: number = 0;

  notaRecomenacio: number = 0;

  comentari: string = "";

  inici: number = 0;

  final: number = 0;

  constructor(public http: HttpClient, public serveiUsuai: ServeiUsuarisService, public conectordb: ConnectorBDService) {}

  ngOnInit(): void {
    if (!this.serveiUsuai.usuari_logat_bool){
      this.serveiUsuai.noAdmin()
    }
    this.començarContador()
    console.log(this.inici)
  }

  enviarEnquesta(){

    this.final = Date.now()

    let tempsDins = this.final - this.inici

    console.log(tempsDins-1000)

    let tempsDef = ""

    if ((tempsDins / 3600000) >= 1 ){
      tempsDef = (tempsDins / 3600000) + ' h'
    }
    if ((tempsDins / 600000) >= 1){
      tempsDef = (tempsDins / 600000) + ' m'
    }
    else{
      tempsDef = (tempsDins / 1000) + ' s'
    }

    console.log(tempsDef)

    let enquesta = {
      usuari: this.serveiUsuai.usuari_logat?.usuario,
      nom: this.serveiUsuai.usuari_logat?.nombre,
      cognom: this.serveiUsuai.usuari_logat?.apellido,
      correu: this.serveiUsuai.usuari_logat?.correo,
      telefon: this.serveiUsuai.usuari_logat?.telefono,
      grauSadisfacio: this.grauSadisfacioProducte,
      grauSadisfacioServei: this.grauSadisfacioServei,
      notaRecomenacio: this.notaRecomenacio,
      comentari: this.comentari,
      tempsDins: tempsDef
    }

    this.conectordb.enviarFormulari(enquesta)

  }

  començarContador() {
    this.inici = Date.now()


  }
}

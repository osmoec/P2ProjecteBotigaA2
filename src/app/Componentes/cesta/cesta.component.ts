import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit {
  cestaActual: any
  ngOnInit(): void {
  }

  constructor(protected serveiUsuari: ServeiUsuarisService) {
    this.cestaActual = this.serveiUsuari.usuari_logat?.cesta
    console.log(this.serveiUsuari.usuari_logat?.cesta)
  }

  guardarCesta() {
    this.serveiUsuari.usuari_logat?.cesta
  }

  eliminarcesta(idC: number){
    // @ts-ignore
    var temp = this.cestaActual.filter(arr => arr.coche.id !== idC)
    this.cestaActual = temp
    var id = "coche"+idC
    // @ts-ignore
    document.getElementById(id).innerHTML = ""
  }

}

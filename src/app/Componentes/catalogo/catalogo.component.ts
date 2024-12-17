import { Component } from '@angular/core';
import {ServicioPrincipalService} from '../../Servicios/servicio-principal.service';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {filter, first} from 'rxjs';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    NgbCarousel,
    NgbSlide,
    Carousel,
    PrimeTemplate,
    FormsModule
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  textbuscar: string = ""
  // @ts-ignore
  coches: any
  cochesT: any
  // @ts-ignore
  cochesA: any

  constructor(private prinserv: ServicioPrincipalService) {
    this.coches = this.prinserv.coches
    this.cochesA = this.coches
  }

  filtrarPorTag(tagD:string) {
    // @ts-ignore
    this.cochesT = this.coches.filter(cocheB => cocheB.tags.includes(tagD))

    console.log(this.cochesT)

    this.cochesA = this.cochesT

  }

  sinFiltrar(){
    this.cochesA = this.coches
  }

  buscarSimilar(textbus: string){
    textbus = textbus.toLowerCase()
    // @ts-ignore
    this.cochesT = this.coches.filter(textsimilar => textsimilar.name.toLowerCase().includes(textbus))

    this.cochesA = this.cochesT
  }

  protected readonly first = first;
}

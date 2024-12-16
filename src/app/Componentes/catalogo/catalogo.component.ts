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
  cochesA: any = this.coches

  constructor(private prinserv: ServicioPrincipalService) {
    this.coches = this.prinserv.coches
  }

  buscar(tagD:string) {
    // @ts-ignore
    this.cochesT = this.coches.filter(cocheB => cocheB.tags.includes(tagD));

    console.log(this.cochesT);

    this.cochesA = this.cochesT

  }

  protected readonly first = first;
}

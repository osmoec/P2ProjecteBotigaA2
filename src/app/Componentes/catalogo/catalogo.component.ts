import { Component } from '@angular/core';
import {ServicioPrincipalService} from '../../Servicios/servicio-principal.service';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    NgbCarousel,
    NgbSlide,
    Carousel,
    PrimeTemplate
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  // @ts-ignore
  coches: any

  constructor(private prinserv: ServicioPrincipalService) {
    this.coches = this.prinserv.coches
  }

  protected readonly first = first;
}

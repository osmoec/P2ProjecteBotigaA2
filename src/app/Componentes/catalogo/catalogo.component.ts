import { Component } from '@angular/core';
import {ServicioPrincipalService} from '../../Servicios/servicio-principal.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  // @ts-ignore
  coches: any

  constructor(private prinserv: ServicioPrincipalService) {
    this.coches = this.prinserv.coches
  }

}

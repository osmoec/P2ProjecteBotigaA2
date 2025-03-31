import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- IMPORTANTE
import { FormsModule } from '@angular/forms';
import { ConnectorBDService } from '../../../Servicios/connector-bd.service';
import { Oferta } from '../../../Clases/Oferta.model';
import {ListaVehiculosService} from '../../../Servicios/lista-vehiculos.service';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {
  ofertas: Oferta[];

  constructor(conectorBD: ConnectorBDService, protected listaVehiculos: ListaVehiculosService) {
    this.ofertas = conectorBD.getOfertas();
  }
}

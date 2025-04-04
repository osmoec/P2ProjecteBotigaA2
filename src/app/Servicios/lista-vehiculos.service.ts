import { Injectable } from '@angular/core';
import {Coche} from '../Clases/Coche.model';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../Clases/Usuario.model';
import {Comanda} from '../Clases/comanda.model';
import {ConnectorBDService} from './connector-bd.service';

@Injectable({
  providedIn: 'root'
})
export class ListaVehiculosService {

  coches: Coche[] = [];
  constructor(private http: HttpClient, public conectordb: ConnectorBDService) {
    console.log("Se reseteo el servicio coches")
    this.conectordb.rebreCotxes(this.coches)
    console.log(this.coches)
  }
  getCocheById(id_coche: number): Coche | undefined {
    return this.coches.find(coche => coche.id === id_coche);
  }
}

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
  getMarcasDestacadas() {
    return this.http.get<any>('/api/cotxes');
  }
}

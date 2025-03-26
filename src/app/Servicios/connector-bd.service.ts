import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectorBDService {

  constructor(private http:HttpClient) {}

  registrarFactura(factura:any):Observable<any> {
    return this.http.post('http://localhost:3080/historial/afegir-factura-detall', factura);
  }
}

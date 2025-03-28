import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnectorBDService {

  constructor( public http: HttpClient) { }

  rebreCategories(){
   return this.http.get<any>('http://localhost:3080/db/categories')
  }

  desarCotxe(formulari: FormData){
    this.http.post('http://localhost:3080/db/pujaproducte', formulari).subscribe();
  }
  registrarFactura(factura:any):Observable<any> {
    return this.http.post('http://localhost:3080/historial/afegir-factura-detall', factura);
  }
}

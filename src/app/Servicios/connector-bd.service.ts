import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coche} from '../Clases/Coche.model';
import {Oferta} from '../Clases/Oferta.model';
@Injectable({
  providedIn: 'root'
})
export class ConnectorBDService {
  url = 'http://localhost:3080'

  constructor( public http: HttpClient) { }

  rebreCategories(){
   return this.http.get<any>(`${this.url}/db/categories`)
  }

  desarCotxe(formulari: FormData): Observable<any>{
    return this.http.post<any>(`${this.url}/db/pujaproducte`, formulari)
  }

  registrarFactura(factura:any):Observable<any> {
    return this.http.post(`${this.url}/historial/afegir-factura-detall`, factura);
  }

  getOfertas() {
    let listaOfertas : Oferta[] = []
    this.http.get<any>(`${this.url}/db/ofertas`)
      .subscribe(
        (response) => {
          response.forEach((oferta : any)=> {
            const ofertas = new Oferta(oferta.ID_OFERTA, oferta.ID_COCHE, oferta.OFERTA, oferta.INICIO_OFERTA, oferta.FINAL_OFERTA)
              listaOfertas.push(ofertas)
          });
        },
        (error) => {
          console.error('❌ Error en la petición:', error);
        }
      );
    return listaOfertas
  }

  delOferta (id : number){
    return this.http.delete<any>(`${this.url}/db/del/ofertas/${id}`)
  }

  updateOferta(oferta: Oferta) : Observable<any>{
    return this.http.put<any>(`${this.url}/db/update/ofertas/${oferta.id_oferta}`, {
      ofert: oferta.oferta,
      inicio_oferta: oferta.inicio_oferta,
      final_oferta: oferta.final_oferta
    })
  }

  crearOferta(oferta: any) {
    return this.http.post<any>(`${this.url}/db/insert/ofertas/`, oferta);
  }
  consultarHistorial():Observable<any> {
    return this.http.get(`${this.url}/obtenir-historial`)
  }

  enviarFormulari(formuari:any): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/srv/enviarformularisadisfacio`,formuari)
  }

  rebreCotxes(cotx:any[]): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get<any>(`${this.url}/db/cotxes`)
        .subscribe(
          (response) => {
            response.forEach((car : any)=> {
              const coche = new Coche(
                car.id,
                car.name,
                car.price,
                car.tags,
                car.offertext,
                car.imgC,
                car.oferta
              )
                cotx.push(coche)
            });

            resolve(true);
          },
          (error) => {
            console.error('❌ Error en la petición:', error);
            resolve(false);
          }
        );
    });
  }

  cotxeExisteix(nomC:string):Observable<any>{
    const params = new HttpParams().set('nomCotx', nomC);
   return this.http.get<any>(`${this.url}/db/existeixcotxe`,{params})
  }
}

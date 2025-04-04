import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coche} from '../Clases/Coche.model';
import {Oferta} from '../Clases/Oferta.model';
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

  getOfertas() {
    let listaOfertas : Oferta[] = []
    this.http.get<any>(`http://localhost:3080/db/ofertas`)
      .subscribe(
        (response) => {
          response.forEach((oferta : any)=> {
            const ofertas = new Oferta(
              oferta.ID_OFERTA,
              oferta.ID_COCHE,
              oferta.OFERTA,
              oferta.INICIO_OFERTA,
              oferta.FINAL_OFERTA
            )
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
    return this.http.delete<any>(`http://localhost:3080/db/del/ofertas/${id}`)
  }

  updateOferta(oferta: Oferta) : Observable<any>{
    return this.http.put<any>(`http://localhost:3080/db/update/ofertas/${oferta.id_oferta}`, {
      ofert: oferta.oferta,
      inicio_oferta: oferta.inicio_oferta,
      final_oferta: oferta.final_oferta
    })
  }

  crearOferta(oferta: any) {
    return this.http.post<any>(`http://localhost:3080/db/insert/ofertas/`, oferta);
  }
  consultarHistorial():Observable<any> {
    return this.http.get('http://localhost:3080/obtenir-historial')
  }

  enviarFormulari(formuari:any) {
    this.http.post('http://localhost:3080/srv/enviarformularisadisfacio',formuari).subscribe()
  }

  rebreCotxes(cotx:any[]): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get<any>(`http://localhost:3080/db/cotxes`)
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
}

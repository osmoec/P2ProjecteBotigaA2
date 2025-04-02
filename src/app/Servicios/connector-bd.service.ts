import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coche} from '../Clases/Coche.model';
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

import { Injectable } from '@angular/core';
import {Coche} from '../Clases/Coche.model';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../Clases/Usuario.model';
import {Comanda} from '../Clases/comanda.model';

@Injectable({
  providedIn: 'root'
})
export class ListaVehiculosService {

  coches: Coche[] = [];
  constructor(private http: HttpClient) {
    console.log("Se reseteo el servicio coches")
    this.cargarDatos()
  }
  getMarcasDestacadas() {
    return this.http.get<any>('/api/cotxes');
  }

  cargarDatos(): Promise<boolean> {
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
                car.imgC
              )
              this.coches.push(coche)
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

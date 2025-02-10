import { Injectable } from '@angular/core';
import {Coche} from '../Clases/Coche.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListaVehiculosService {

  coches: Coche[] = [];
  constructor(private http: HttpClient) {
    this.leerCochesDesdeArchivo()
  }

  leerCochesDesdeArchivo() {
    this.http.get<Coche[]>('/json/cochesCatalogo.json')
      .subscribe({
        next: (data) => {
          this.coches = data.map(obj => new Coche(
            obj.id, obj.name, obj.price, obj.tags, obj.offertext, obj.imgC
          ));
          console.log("coche añadido")
          console.log(this.coches)
        },
        error: (err) => console.error('Error cargando el archivo JSON', err)
      });
  }
}

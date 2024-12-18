import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { HttpClient } from '@angular/common/http';
import { filter, first } from 'rxjs';
import { Carousel } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Coche } from '../../Clases/Coche.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [Carousel, PrimeTemplate, FormsModule, HttpClientModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {

  cesta: { coche: Coche, quantity: number }[] = [];

  textbuscar: string = "";
  coches: Coche[] = [];
  cochesT: Coche[] = [];
  cochesA: Coche[] = [];

  constructor(private http: HttpClient) {
    this.leerCochesDesdeArchivo();
  }

  leerCochesDesdeArchivo(): void {
    this.http.get<Coche[]>('/json/cochesCatalogo.json')
      .subscribe({
        next: (data) => {
          this.coches = data.map(obj => new Coche(
            obj.id, obj.name, obj.price, obj.tags, obj.offertext, obj.imgC
          ));
          this.cochesA = this.coches;
        },
        error: (err) => console.error('Error cargando el archivo JSON', err)
      });
  }

  addToCart(coche: Coche, quantity: number): void {
    // Añadir coche a la cesta si no existe, o actualizar cantidad si ya está en la cesta
    const existingItem = this.cesta.find(item => item.coche.id === coche.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cesta.push({ coche, quantity });
    }
    alert("Articulo añadido con exito")
  }

  filtrarPorTag(tagD: string): void {
    if (this.coches && this.coches.length > 0) {
      this.cochesT = this.coches.filter(cocheB => cocheB.tags.includes(tagD));
      this.cochesA = this.cochesT;
    }
  }

  sinFiltrar(): void {
    this.cochesA = this.coches;
  }

  buscarSimilar(textbus: string): void {
    textbus = textbus.toLowerCase();
    if (this.coches && this.coches.length > 0) {
      this.cochesT = this.coches.filter(textsimilar => textsimilar.name.toLowerCase().includes(textbus));
      this.cochesA = this.cochesT;
    }
  }

  protected readonly first = first;
}

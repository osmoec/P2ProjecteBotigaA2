import {Component, ViewChild, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { HttpClient } from '@angular/common/http';
import { filter, first } from 'rxjs';
import { Carousel } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Coche } from '../../../Clases/Coche.model';
import { ServeiUsuarisService } from '../../../Servicios/servei-usuaris.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ListaVehiculosService} from '../../../Servicios/lista-vehiculos.service';
import {MetamaskService} from '../../../Servicios/metamask.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [Carousel, PrimeTemplate, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit,AfterViewInit {

  @ViewChild('refrescat') refrescat: ElementRef | undefined;

  textbuscar: string = "";
  coches: Coche[] = [];
  cochesT: Coche[] = [];
  cochesA: Coche[] = [];
  filtre: string = "";
  filtreA: boolean = false;
  preus: any[] = []
  preuPreparat: boolean = false;
  marcasDestacadas: any[] = [];

  constructor(private router: Router, private serveiUsuari: ServeiUsuarisService, private listaCoches: ListaVehiculosService, private http: HttpClient, public metamask: MetamaskService) {
    this.cochesA = this.listaCoches.coches
  }
  async ngOnInit(): Promise<void> {
    this.getMarcasDestacadas();
    await this.obtenirPreus()

    setInterval(() => {
      this.obtenirPreus(),
        61000
    })
  }

  getMarcasDestacadas(): void {
    this.http.get<any>('http://localhost:3080/api/cotxes').subscribe({
      next: (data) => {
        if (data?.Makes) {
          this.marcasDestacadas = this.getRandomMarcas(data.Makes, 5);
        } else {
          console.error("Datos inválidos recibidos:", data);
        }
      },
      error: (err) => console.error('Error al obtener marcas destacadas', err)
    });
  }



  getRandomMarcas(marcas: any[], count: number): any[] {
    const shuffled = marcas.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  ngAfterViewInit(): void {

    if (this.filtreA) {
      // @ts-ignore
      this.refrescat.nativeElement.innerText = this.filtre;
    }
  }



  addToCart(coche: Coche, quantity: number) {
    if (!this.serveiUsuari.usuari_logat_bool) {
      alert("Antes de continuar, inicia sesión");
      this.router.navigate(['/login']);
      return;
    }

    const existingItem = this.serveiUsuari.usuari_logat?.cesta.find(item => item.coche.id === coche.id);if (existingItem) {
      const quantitatTotal = existingItem.quantity + quantity;

      if (quantitatTotal <= 99) {
        existingItem.quantity = quantitatTotal;
      } else {
        existingItem.quantity = 99;
        alert("La quantitat màxima per a aquest cotxe és 99.");
      }
    } else {
      if (quantity <= 99) {
        this.serveiUsuari.usuari_logat?.cesta.push({ coche, quantity });
      } else {
        this.serveiUsuari.usuari_logat?.cesta.push({ coche, quantity: 99 });
        alert("La quantitat màxima per a aquest cotxe és 99.");
      }
    }
    alert("Articulo añadido con éxito");
    this.serveiUsuari.guardarDatos(this.serveiUsuari.usuari_logat!);
  }

  filtrarPorTag(tagD: string) {
    if (this.coches && this.coches.length > 0) {
      this.cochesT = this.coches.filter(cocheB => cocheB.tags.includes(tagD));
      this.cochesA = this.cochesT;
    }
    var temp = tagD.charAt(0).toUpperCase() + tagD.substring(1)
    this.filtre = temp;
    this.filtreA = true;
  }

  sinFiltrar(): void {
    this.cochesA = this.coches;
    this.filtre = "Tot"
  }

  buscarSimilar(textbus: string): void {
    this.filtre = textbus;
    this.filtreA = true;

    textbus = textbus.toLowerCase();
    if (this.coches && this.coches.length > 0) {
      this.cochesT = this.coches.filter(textsimilar => textsimilar.name.toLowerCase().includes(textbus));
      this.cochesA = this.cochesT;
    }


  }
  protected readonly first = first;

  async obtenirPreus() {
    var bnb = await this.metamask.preuBNB()
    var busd = await this.metamask.preuBUSD()
    this.preus[0] = bnb.preu
    this.preus[1] = busd.preu

    console.log(this.preus)

    this.preuPreparat = true;

    this.preus = [...this.preus]

  }
}

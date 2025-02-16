import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { HttpClient } from '@angular/common/http';
import { filter, first } from 'rxjs';
import { Carousel } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Coche } from '../../Clases/Coche.model';
import { ServeiUsuarisService } from '../../Servicios/servei-usuaris.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ListaVehiculosService} from '../../Servicios/lista-vehiculos.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [Carousel, PrimeTemplate, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements AfterViewInit {

  @ViewChild('refrescat') refrescat: ElementRef | undefined;

  textbuscar: string = "";
  coches: Coche[] = [];
  cochesT: Coche[] = [];
  cochesA: Coche[] = [];
  filtre: string = "";
  filtreA: boolean = false;

  constructor(private router: Router, private serveiUsuari: ServeiUsuarisService, private listaCoches : ListaVehiculosService) {
    this.cochesA = this.listaCoches.coches
  }

  ngOnInit() {
    this.apiPublicaMarcas()
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

    const existingItem = this.serveiUsuari.usuari_logat?.cesta.find(item => item.coche.id === coche.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.serveiUsuari.usuari_logat?.cesta.push({ coche, quantity });
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

  apiPublicaMarcas() {
    fetch('http://localhost:3080/api/cotxes')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  }


  protected readonly first = first;
}

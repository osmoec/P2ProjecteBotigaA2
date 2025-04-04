import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';
import {RouterLink} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConnectorBDService } from '../../Servicios/connector-bd.service';
import { Chart, ChartDataset } from 'chart.js/auto';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    DatePipe,
    NgClass,
    NgxPaginationModule
  ],
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {

  esAdmin: boolean | undefined = false;
  historial: any = [];
  graficaProductes: any;
  graficaOferta: any;
  paginaActual: number = 1;
  elementsPerPagina: number = 10;

  ngOnInit(): void {
    this.serveiUsuaris.noAdmin();
    this.esAdmin = this.serveiUsuaris.usuari_logat?.getAdmin();
    if (this.esAdmin) {
      this.serveiConnector.consultarHistorial().subscribe(
        (data) => {
          this.historial = data.historial;
          this.renderitzarGraficaProductes();
          this.renderitzarGraficaOferta();
        },
        (error) => {
          console.error('Error en obtenir historial:', error);
        }
      );
    }
  }

  constructor(public serveiUsuaris: ServeiUsuarisService, public serveiConnector: ConnectorBDService) {}

  renderitzarGraficaProductes() {
    const dadesProductes: { [clau: string]: { [clau: string]: number } } = {};

    this.historial.forEach((venta: any) => {
      const dia = venta.DATA_CREACIO.split('T')[0];
      if (!dadesProductes[dia]) {
        dadesProductes[dia] = {};
      }
      if (!dadesProductes[dia][venta.COTXE_NOM]) {
        dadesProductes[dia][venta.COTXE_NOM] = 0;
      }
      dadesProductes[dia][venta.COTXE_NOM] += venta.QUANTITAT;
    });

    const etiquetes = Object.keys(dadesProductes);
    const conjuntsDades: ChartDataset[] = [];

    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      '#8B0000', '#008080', '#800080', '#FFD700', '#00FA9A', '#FF4500',
      '#1E90FF', '#ADFF2F', '#DC143C', '#8A2BE2', '#00CED1', '#FF69B4',
      '#32CD32'
    ];
    let indexColor = 0;

    const nomsProductes = new Set<string>();
    etiquetes.forEach(dia => Object.keys(dadesProductes[dia]).forEach(producte => nomsProductes.add(producte)));

    nomsProductes.forEach(producte => {
      conjuntsDades.push({
        label: producte,
        data: etiquetes.map(dia => dadesProductes[dia][producte] || 0),
        backgroundColor: colors[indexColor % colors.length],
        borderColor: colors[indexColor % colors.length],
        borderWidth: 1
      });
      indexColor++;
    });

    this.graficaProductes = new Chart('graficaProductes', {
      type: 'bar',
      data: { labels: etiquetes, datasets: conjuntsDades },
      options: {
        responsive: true,
        scales: {
          x: { type: 'category' },
          y: { beginAtZero: true }
        }
      }
    });
  }

  renderitzarGraficaOferta() {
    const dadesVendes: { [clau: string]: { ambOferta: number, senseOferta: number } } = {};

    this.historial.forEach((venta: any) => {
      const dia = venta.DATA_CREACIO.split('T')[0];
      if (!dadesVendes[dia]) {
        dadesVendes[dia] = { ambOferta: 0, senseOferta: 0 };
      }
      if (venta.EN_OFERTA === 'Sí') {
        dadesVendes[dia].ambOferta += venta.QUANTITAT;
      } else {
        dadesVendes[dia].senseOferta += venta.QUANTITAT;
      }
    });

    const etiquetes = Object.keys(dadesVendes);
    const dadesAmbOferta = etiquetes.map(dia => dadesVendes[dia].ambOferta);
    const dadesSenseOferta = etiquetes.map(dia => dadesVendes[dia].senseOferta);

    this.graficaOferta = new Chart('graficaOferta', {
      type: 'line',
      data: {
        labels: etiquetes,
        datasets: [
          {
            label: 'Vendes amb oferta',
            data: dadesAmbOferta,
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true
          },
          {
            label: 'Vendes sense oferta',
            data: dadesSenseOferta,
            borderColor: '#FFCE56',
            backgroundColor: 'rgb(243,200,113)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { type: 'category' },
          y: { beginAtZero: true }
        }
      }
    });
  }

}

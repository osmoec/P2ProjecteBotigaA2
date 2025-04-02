import {Component, OnInit} from '@angular/core';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';
import {ConnectorBDService} from '../../Servicios/connector-bd.service';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit {

  esAdmin: boolean | undefined = false
  historial: any = [];

  constructor(public serveiUsuaris: ServeiUsuarisService,public serveiConnector:ConnectorBDService) {

  }

  ngOnInit() {
    this.serveiUsuaris.noAdmin()
    this.esAdmin = this.serveiUsuaris.usuari_logat?.getAdmin()
    if (this.esAdmin) {
      this.serveiConnector.consultarHistorial().subscribe(
        (data) => {
          console.log(data)
          this.historial = data;
        },
        (error) => {
          console.error('Error en obtenir hhistorial:', error);
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServeiUsuarisService } from '../../Servicios/servei-usuaris.service';
import { Usuario } from '../../Clases/Usuario.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modificar-dades',
  templateUrl: './modificar-dades.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./modificar-dades.component.css']
})
export class ModificarDadesComponent implements OnInit {
  usuariLogat: Usuario = new Usuario('', '', '', '', '', new Date(), '', '', '');

  constructor(private serveiUsuaris: ServeiUsuarisService, private router: Router) {}

  ngOnInit() {
    if (this.serveiUsuaris.usuari_logat) {
      this.usuariLogat = this.serveiUsuaris.usuari_logat;
      this.usuariLogat.cumpleanos = this.parseDate(this.usuariLogat.cumpleanos); // Parsear la fecha
    } else {
      this.router.navigate(['/login']);
    }
  }

  parseDate(date: any): Date {
    if (typeof date === 'string' || Object.prototype.toString.call(date) === '[object String]') {
      return new Date(date);
    } else {
      return new Date(date);
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  modificarDatos() {
    if (this.usuariLogat) {
      this.serveiUsuaris.guardarDatos(this.usuariLogat);
      alert('Datos actualizados correctamente.');
    } else {
      alert('No se pudo actualizar los datos.');
    }
    window.location.reload();
  }

}

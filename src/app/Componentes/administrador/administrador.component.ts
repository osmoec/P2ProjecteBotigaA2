import { Component } from '@angular/core';
import {ServeiUsuarisService} from '../../Servicios/servei-usuaris.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

  esAdmin: boolean | undefined = false

  constructor(public serveiUsuaris: ServeiUsuarisService) {

  }

  ngOnInit() {
    this.serveiUsuaris.noAdmin()
    this.esAdmin = this.serveiUsuaris.usuari_logat?.getAdmin()
  }
}

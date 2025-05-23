import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './usuario/header/header.component';
import {ServeiUsuarisService} from '../Servicios/servei-usuaris.service';
import {NgIf} from '@angular/common';
import {Usuario} from '../Clases/Usuario.model';
import {ListaVehiculosService} from '../Servicios/lista-vehiculos.service';
import {ChatComponent} from './usuario/chat/chat.component';
import {CamaraEspiaComponent} from './camara-espia/camara-espia.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, NgIf, ChatComponent, CamaraEspiaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2ProjecteBotigaA2';
  logat = false;
  usuariLogat : Usuario | null;

  constructor(protected serveiUsuaris: ServeiUsuarisService, protected listaCoches : ListaVehiculosService) {
    this.usuariLogat = this.serveiUsuaris.usuari_logat
  }

    logout() {
    this.serveiUsuaris.usuari_logat = null
    this.serveiUsuaris.olvidarUsuario()
    window.location.reload();
  }
}

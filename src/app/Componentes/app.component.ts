import {Component, viewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {ServeiUsuarisService} from '../Servicios/servei-usuaris.service';
import {NgIf} from '@angular/common';
import {Usuario} from '../Clases/Usuario.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // @ts-ignore
  @ViewChild('nomusuari') nomusuari: any;

  ngAfterViewInit() {
    if(this.serveiUsuaris.usuari_logat){
      this.nomusuari.nativeElement.innerText = this.serveiUsuaris.usuari_logat.usuario
    }
  }
  logat = false;
  usuariLogat : Usuario | null;

  constructor(protected serveiUsuaris: ServeiUsuarisService) {
    this.usuariLogat = this.serveiUsuaris.usuari_logat
  }
  ngOnInit() {
    console.log(this.serveiUsuaris.usuari_logat)
    if (this.serveiUsuaris.usuari_logat) {
      this.logat = true
    }
    console.log("usuario logeado? " + this.logat)

  }

  logout() {
    this.serveiUsuaris.usuari_logat = null
    window.location.reload();
  }
}

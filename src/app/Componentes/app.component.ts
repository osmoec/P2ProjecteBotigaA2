import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CondicionesComponent} from './condiciones/condiciones.component';
import {ContactoComponent} from './contacto/contacto.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from "./login/login.component";
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CondicionesComponent, ContactoComponent, SignInComponent, RouterLink, HeaderComponent, LoginComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'P2ProjecteBotigaA2';
  logat = false;
  usuariLogat = '';

  ngOnInit() {
    this.logat = localStorage.getItem('logat') === 'true';
    this.usuariLogat = localStorage.getItem('usuari') || '';
  }

  logout() {
    localStorage.removeItem('logat');
    localStorage.removeItem('usuari');
    this.logat = false;
    this.usuariLogat = '';
    window.location.reload();
  }
}

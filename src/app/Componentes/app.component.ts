import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {ServeiUsuarisService} from '../Servicios/servei-usuaris.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2ProjecteBotigaA2';
  constructor(private serveiUsuaris: ServeiUsuarisService) {
  }
}

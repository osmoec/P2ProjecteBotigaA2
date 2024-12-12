import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CondicionesComponent} from './condiciones/condiciones.component';
import {ContactoComponent} from './contacto/contacto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CondicionesComponent, ContactoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2ProjecteBotigaA2';
}

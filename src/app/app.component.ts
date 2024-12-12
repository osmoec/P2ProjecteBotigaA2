import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SobrenosotrosComponent} from './sobrenosotros/sobrenosotros.component';
import {CestaComponent} from './cesta/cesta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SobrenosotrosComponent, CestaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2ProjecteBotigaA2';
}

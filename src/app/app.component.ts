import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {IndiceComponent} from './indice/indice.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,IndiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2ProjecteBotigaA2';
}

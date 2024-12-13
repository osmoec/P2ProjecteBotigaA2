import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CondicionesComponent} from './condiciones/condiciones.component';
import {ContactoComponent} from './contacto/contacto.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CondicionesComponent, ContactoComponent, SignInComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2ProjecteBotigaA2';
}

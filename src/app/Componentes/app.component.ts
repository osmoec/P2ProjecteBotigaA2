import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CondicionesComponent } from './condiciones/condiciones.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CondicionesComponent, ContactoComponent, SignInComponent, RouterLink, HeaderComponent, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2ProjecteBotigaA2';
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Clases/Usuario.model';
import { ServeiUsuarisService } from '../../Servicios/servei-usuaris.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  nom: string = '';
  cognom: string = '';
  correu: string = '';
  usuari: string = '';
  DNI: string = '';
  aniversari: Date = new Date();
  telefon: string = '';
  contrasena: string = '';
  confContrasena: string = '';
  adreca: string = '';

  constructor(private router: Router, private serveiUsuaris: ServeiUsuarisService) {}

  public validarDatos(): boolean {
    if (!this.nom) { alert('Por favor, Complete su nombre'); return false; }
    if (!this.cognom) { alert('Por favor, Complete su apellido'); return false; }
    if (!this.usuari) { alert('Por favor, Complete su nombre de usuario'); return false; }
    if (!this.DNI) { alert('Por favor, Complete su DNI'); return false; }
    if (!this.aniversari) { alert('Por favor, Complete su fecha de nacimiento'); return false; }
    if (!this.telefon || this.telefon.length != 9) { alert('Por favor, Complete el numero de telefono con formato XXXXXXXXX'); return false; }
    if (!this.contrasena) { alert('Por favor, Complete la contraseña'); return false; }
    if (this.contrasena !== this.confContrasena) { alert('Las contraseñas no coinciden'); return false; }
    if (!this.adreca) { alert('Por favor, Complete con su direccion'); return false; }
    return true;
  }

  public registro() {
    if (this.validarDatos()) {
      const nouUsuari = new Usuario(
        this.nom, this.cognom, this.correu, this.usuari, this.DNI,
        this.aniversari, this.telefon, this.contrasena, this.adreca
      );
      this.serveiUsuaris.addUsuario(nouUsuari);

      alert('Registre completat amb èxit!');
      this.router.navigate(['/login']);
    }
  }
}



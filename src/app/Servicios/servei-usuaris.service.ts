import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  public usuaris: Usuario[] = [];
  usuari_logat = '';

  constructor() {
    console.log("Se reseteo el servicio de usuario")
    this.cargarDatos()
    console.log("Datos de usuario:")
    console.log(this.usuaris)

  }

  addUsuario(usuari: Usuario): void {
    this.usuaris.push(usuari);
  }

  getUsuariLogat(usuari_logat : string): Usuario | null {
    const usuari = this.usuaris.find(u => u.usuario === usuari_logat);
    return usuari || null;
  }

  setUsuariLogat(usuari: string): void {
    this.usuari_logat = usuari;
  }

  getUsuarios(): Usuario[] {
    return this.usuaris;
  }

  guardarDatos(): void {
    localStorage.setItem('usuaris', JSON.stringify(this.usuaris));
  }

  cargarDatos() {
    const usuarisGuardats = localStorage.getItem('usuaris');
    if (usuarisGuardats) {
      const datos = JSON.parse(usuarisGuardats); // Parsear JSON desde localStorage
      this.usuaris = datos.map((data: any) =>
        new Usuario(
          data.nombre,
          data.apellido,
          data.correo,
          data.usuario,
          data.DNI,
          new Date(data.cumpleaños), // Convertir cumpleaños a Date
          data.telefono,
          data.contrasena,
          data.direccion
        )
      );
      console.log(this.usuaris)

    }
  }
}

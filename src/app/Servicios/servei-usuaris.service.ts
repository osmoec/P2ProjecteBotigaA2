import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  public usuaris: Usuario[] = [];
  public usuari_logat : Usuario | null = null;

  public usuari_logat_bool : boolean = false

  constructor() {
    console.log("Se reseteo el servicio de usuario")
    this.cargarDatos()
  }

  actualizarEstadoSesion () {
    if (this.usuari_logat) {
      this.usuari_logat_bool = true
    }
    else {
      this.usuari_logat_bool = false
    }
  }
  addUsuario(usuari: Usuario): void {
    this.usuaris.push(usuari);
  }

  getUsuariLogat(usuari_logat : string): Usuario | null {
    const usuari = this.usuaris.find(u => u.usuario === usuari_logat);
    return usuari || null;
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
    }
  }
}

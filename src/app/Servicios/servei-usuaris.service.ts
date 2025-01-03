import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';
import { Comanda } from '../Clases/comanda.model';

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
      const datos = JSON.parse(usuarisGuardats);
      this.usuaris = datos.map((data: any) =>
        new Usuario(
          data.nombre,
          data.apellido,
          data.correo,
          data.usuario,
          data.DNI,
          new Date(data.cumpleaños),
          data.telefono,
          data.contrasena,
          data.direccion
        )
      );
    }

    this.usuaris.forEach(usuario => {
      if (!usuario.comandas) {
        usuario.comandas = [];
      }
    });
  }

  agregarComanda(numComanda: number, usuariC: string, cochesComanda: any[], totalComanda: number) {
    const usuario = this.usuaris.find(u => u.usuario === usuariC);
    if (usuario) {
      const nuevaComanda = new Comanda(numComanda, usuariC, cochesComanda, totalComanda);
      usuario.comandas?.push(nuevaComanda);
      this.guardarDatos();
    }
  }
}

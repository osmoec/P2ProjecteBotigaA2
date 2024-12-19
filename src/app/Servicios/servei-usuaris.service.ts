import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  private usuaris: Usuario[] = [];
  usuari_logat = '';

  constructor() {}

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
}

import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  private usuaris: Usuario[] = [];
  usuari_logat = ''
  constructor() {
    const usuarisGuardats = localStorage.getItem('usuaris');
    if (usuarisGuardats) {
      this.usuaris = JSON.parse(usuarisGuardats);
    }
  }
  addUsuario(usuari: Usuario): void {
    this.usuaris.push(usuari);
    localStorage.setItem('usuaris', JSON.stringify(this.usuaris));
  }
  getUsuariLogat(): Usuario | null {
    const usuari = this.usuaris.find(u => u.usuario === this.usuari_logat);
    return usuari || null;
  }
  setUsuariLogat(usuari: string): void {
    this.usuari_logat = usuari;
    localStorage.setItem('usuari_logat', usuari);
  }
  getUsuarios(): Usuario[] {
    return this.usuaris;
  }
}


import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  private usuaris: Usuario[] = [];

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


  getUsuarios(): Usuario[] {
    return this.usuaris;
  }
}


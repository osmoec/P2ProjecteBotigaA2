import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';
import { Comanda } from '../Clases/comanda.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  public usuaris: Usuario[] = [];
  public usuari_logat : Usuario | null = null;

  public usuari_logat_bool : boolean = false

  constructor(public http: HttpClient) {
    console.log("Se reseteo el servicio de usuario");
    const usuariId = localStorage.getItem('usuari');
    if (usuariId) {
      this.cargarDatos(usuariId);
    }
    if (localStorage.getItem('usuariRecordat') !== null) {
      this.usuari_logat = this.usuaris.find(u => u.usuario === localStorage.getItem('usuariRecordat')) || null;
      this.usuari_logat_bool = true;
    }
  }

  actualizarEstadoSesion () {
    this.usuari_logat? this.usuari_logat_bool = true : this.usuari_logat_bool = false

  }
  addUsuario(usuari: any): void {
    this.http.post('http://localhost:3080/usuaris/push',usuari).subscribe()
  }

  getUsuariLogat(usuari_logat : string): Usuario | null {
    const usuari = this.usuaris.find(u => u.usuario === usuari_logat);
    return usuari || null;
  }

  getUsuarios(): Usuario[] {
    return this.usuaris;
  }

  guardarDatos(usuari: Usuario): void {
    this.http.put('http://localhost:3080/usuaris/informaciopersonal', usuari).subscribe(
      response => {
        console.log('Datos actualizados:', response);
      });
  }


  cargarDatos(usuariId: string) {
    this.http.get<Usuario>('http://localhost:3080/usuaris/informaciopersonal', { params: { usuariId } }).subscribe(
      (data: Usuario) => {
        this.usuari_logat = data;
        console.log('Datos cargados:', data);
      });
  }



  agregarComanda(numComanda: number, usuariC: string, cochesComanda: any[], totalComanda: number,metodePagament: string) {
    const usuario = this.usuaris.find(u => u.usuario === usuariC);
    if (usuario) {
      const nuevaComanda = new Comanda(numComanda, usuariC, cochesComanda, totalComanda,metodePagament);
      usuario.comandas?.push(nuevaComanda);
      this.guardarDatos(usuario);
    }
  }

  recordarUsuario(){
    localStorage.setItem('usuariRecordat', this.usuari_logat!.usuario);
  }

  olvidarUsuario() {
    localStorage.removeItem('usuariRecordat')
  }
}

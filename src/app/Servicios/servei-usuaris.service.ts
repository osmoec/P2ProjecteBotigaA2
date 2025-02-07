import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';
import { Comanda } from '../Clases/comanda.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  public usuari_logat : Usuario | null = null;

  public usuari_logat_bool : boolean = false

  constructor(public http: HttpClient) {
    console.log("Se reseteo el servicio de usuario");
    const usuariId = localStorage.getItem('usuario');
    const contrasena = localStorage.getItem('contrasena');
    console.log(usuariId, contrasena)
    if (usuariId && contrasena) {
      this.cargarDatos(usuariId, contrasena, false);
    }
  }

  actualizarEstadoSesion () {
    this.usuari_logat? this.usuari_logat_bool = true : this.usuari_logat_bool = false

  }
  addUsuario(usuari: any): void {
    this.http.post('http://localhost:3080/usuaris/push',usuari).subscribe()
  }

  guardarDatos(usuari: Usuario): void {
    this.http.put('http://localhost:3080/usuaris/informaciopersonal', usuari.usuario).subscribe(
      response => {
        console.log('Datos actualizados:', response);
      });
  }


  cargarDatos(usuariId: string, contrasena: string, recordar: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get<any>(`http://localhost:3080/usuaris/informaciopersonal/${usuariId}/${contrasena}`)
        .subscribe(
          (response) => {
            if (response.success) {
              console.log(response.user)
              var usuario = new Usuario(
                response.user.nombre,
                response.user.apellido,
                response.user.correo,
                usuariId,
                response.user.DNI,
                new Date(response.user.fechaNacimiento),
                response.user.telefono,
                contrasena,
                response.user.direccion,
                response.user.cesta,
                response.user.titularTarjeta,
                response.user.numeroTarjeta,
                response.user.fechaTarjeta,
                response.user.CVVTarjeta)
              this.usuari_logat = usuario;
              console.log('✅ Datos cargados correctamente:', this.usuari_logat);

              if (recordar) {
                this.recordarUsuario(usuariId, contrasena);
              }

              resolve(true); // Devuelve true si todo fue exitoso
            } else {
              console.warn('⚠️ Error en la carga de datos:', response.message);
              resolve(false); // Devuelve false si el backend devuelve error
            }
          },
          (error) => {
            console.error('❌ Error en la petición:', error);
            resolve(false); // Devuelve false si hay un error en la petición
          }
        );
    });
  }





  agregarComanda(comanda : Comanda) {
    if (this.usuari_logat) {
      this.usuari_logat.comandas?.push(comanda);
      this.guardarDatos(this.usuari_logat);
    }
  }

  recordarUsuario(usuario : string, contrasena : string){
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('contrasena', contrasena);
    localStorage.setItem('recordar', 'true');
  }

  olvidarUsuario() {
    localStorage.removeItem('usuario')
    localStorage.removeItem('contrasena')
    localStorage.removeItem('recordar')
  }
}

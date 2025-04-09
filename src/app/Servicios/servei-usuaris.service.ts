import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario.model';
import { Comanda } from '../Clases/comanda.model';
import {HttpClient} from '@angular/common/http';
import {ListaVehiculosService} from './lista-vehiculos.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServeiUsuarisService {
  public usuari_logat : Usuario | null = null;

  usuari_logat_bool : boolean = false

  url = 'http://localhost:3080'


  constructor(public http: HttpClient, private listaCoches : ListaVehiculosService, public router: Router){
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

  addUsuario(usuari: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.put<any>(`${this.url}/usuaris/push`, usuari).subscribe(
          (response) => {
            if (response.success) {
              console.log('✅ Usuario registrado correctamente:', response.message);
              resolve(true);
            } else {
              console.warn('⚠️ Error en la respuesta:', response.message);
              resolve(false);
            }
          },
          (error) => {
            console.error('❌ Error en la petición:', error);
            resolve(false);
          }
      );
    });
  }


  guardarDatos(usuari: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.put<any>(`${this.url}/usuaris/push`, usuari).subscribe(
          (response) => {
            if (response.success) {
              console.log('✅ Datos actualizados:', response.message);
              resolve(true);
            } else {
              console.warn('⚠️ Error al actualizar datos:', response.message);
              resolve(false);
            }
          },
          (error) => {
            console.error('❌ Error en la petición:', error);
            resolve(false);
          }
      );
    });
  }


  cargarDatos(usuariId: string, contrasena: string, recordar: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get<any>(`${this.url}/usuaris/informaciopersonal/${usuariId}/${contrasena}`)
          .subscribe(
              (response) => {
                if (response.success && response.user) {
                  console.log('✅ Respuesta del servidor:', response.user);

                  // Convertir fecha de nacimiento a un objeto Date válido
                  let fechaNacimiento: Date | null = null;
                  if (response.user.cumpleaños) {
                    const fechaParseada = new Date(response.user.cumpleaños);
                    fechaNacimiento = isNaN(fechaParseada.getTime()) ? null : fechaParseada;
                  }

                  // Crear el objeto usuario con validación de datos opcionales
                  console.log(response)
                  const usuario = new Usuario(
                      response.user.nombre || '',
                      response.user.apellido || '',
                      response.user.correo || '',
                      usuariId,
                      response.user.DNI || '',
                      new Date(response.user.cumpleanos) || new Date(),
                      response.user.telefono || '',
                      contrasena,
                      response.user.direccion || '',
                      response.user.clauUnica,
                      response.user.usuariConfirmat,
                    response.user.cesta
                      ? response.user.cesta.map((item: any) => {
                        const cocheEncontrado = this.listaCoches.coches.find(coche => coche.id === item.coche.id) || null;
                        return {
                          coche: cocheEncontrado,  // Guarda el objeto completo de Coche
                          quantity: item.quantity  // Guarda la cantidad
                        };
                      })
                      : [],
                    response.user.titularTarjeta || undefined,
                    response.user.numeroTarjeta || undefined,
                    response.user.fechaTarjeta || undefined,
                    response.user.CVVTarjeta || undefined,
                  );

                  usuario.setAdmin(response.user.esAdmin);

                  if (usuario.getUsuariConfirmat() === true) {
                    this.usuari_logat = usuario;
                    console.log('✅ Datos cargados correctamente:', this.usuari_logat);
                    this.actualizarEstadoSesion();

                    if (recordar) {
                      this.recordarUsuario(usuariId, contrasena);
                    }


                    resolve(true); // Devuelve true si todo fue exitoso
                  } else {
                    console.warn('⚠️ Usuario no verificado:', response.message);
                    resolve(false); // Devuelve false si el usuario no ha sido confirmado
                  }
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

  esAdmin(){
    return this.usuari_logat?.getAdmin()
  }

  noAdmin(){
    if (!this.usuari_logat_bool && !this.usuari_logat?.esAdmin) {
      this.router.navigate(['home']);
    }
  }
}

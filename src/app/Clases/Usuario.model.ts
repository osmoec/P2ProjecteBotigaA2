import { Coche } from './Coche.model';
import { Comanda } from './comanda.model';

export class Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  DNI: string;
  cumpleanos: Date;
  telefono: string;
  contrasena: string;
  direccion: string;
  titularTarjeta?: string;
  numeroTarjeta?: string;
  fechaTarjeta?: string;
  CVVTarjeta?: string;

  cesta: { coche: Coche, quantity: number }[] = [];
  comandas: Comanda[] = [];

  constructor(
    nombre: string, apellido: string, correo: string, usuario: string, DNI: string,
    cumpleanos: Date, telefono: string, contrasena: string, direccion: string,
    cesta?: { coche: Coche, quantity: number }[],
    titularTarjeta?: string, numeroTarjeta?: string, fechaTarjeta?: string, CVVTarjeta?: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.usuario = usuario;
    this.DNI = DNI;
    this.cumpleanos = cumpleanos;
    this.telefono = telefono;
    this.contrasena = contrasena;
    this.direccion = direccion;
    this.cesta = cesta || []
    this.titularTarjeta = titularTarjeta || undefined
    this.numeroTarjeta = numeroTarjeta || undefined
    this.fechaTarjeta = fechaTarjeta || undefined
    this.CVVTarjeta = CVVTarjeta || undefined
  }

  public guardarDatosTarjeta(titular: string, numero: string, fecha: string, CVV: string) {
    this.titularTarjeta = titular;
    this.numeroTarjeta = numero;
    this.fechaTarjeta = fecha;
    this.CVVTarjeta = CVV;
  }

  public guardarDatosCesta(cesta: { coche: Coche, quantity: number }[]) {
    this.cesta = cesta;
  }
}


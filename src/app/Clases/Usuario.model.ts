export class Usuario {

  nombre : string;
  apellido : string;
  correo : string;
  usuario : string;
  DNI : string;
  cumpleaños : Date;
  telefono : string;
  contrasena : string;
  direccion : string;

  //Datos de la tarjeta
  titularTarjeta : string | undefined;
  numeroTarjeta : string | undefined;
  fechaTarjeta : string | undefined;
  CVVTarjeta : string | undefined;

  constructor(nombre : string, apellido : string, correo : string, usuario : string, DNI : string, cumpleaños : Date, telefono : string, contraseña : string, direccion : string) {
    this.nombre = nombre
    this.apellido = apellido
    this.correo = correo
    this.usuario = usuario
    this.DNI = DNI
    this.cumpleaños = cumpleaños
    this.telefono = telefono
    this.contrasena = contraseña
    this.direccion = direccion
  }

  public guardarDatosTarjeta(titular: string, numero : string, fecha : string, CVV : string) {
    this.titularTarjeta = titular
    this.numeroTarjeta = numero
    this. fechaTarjeta = fecha
    this.CVVTarjeta = CVV
  }
}

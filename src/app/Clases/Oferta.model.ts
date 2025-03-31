export class Oferta {
  id_oferta : number
  id_coche : number
  oferta : number
  inicio_oferta : Date
  final_oferta : Date

  constructor(id_oferta : number, id_coche : number, oferta : number, inicio_oferta : Date, final_oferta : Date) {
    this.id_oferta = id_oferta
    this.id_coche = id_coche
    this.oferta = oferta
    this.inicio_oferta = inicio_oferta
    this.final_oferta = final_oferta
  }
}

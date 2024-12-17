import {Usuario} from './Usuario.model';
import any = jasmine.any;

export class Comanda {
  numComanda: number | undefined
  dataCreacio: number
  numClient: number
  cochesComanda: any[] | undefined
  totalComanda: number | undefined

  constructor(numComanda: number, numClient: number,cochesComanda: any[],totalComanda: number) {
    this.numComanda = undefined
    this.numClient = numClient
    this.dataCreacio = Date.now()
    this.cochesComanda = undefined
    this.totalComanda = undefined
  }

  crearComanda(usuarioC: Usuario,totalComandaC: number){

    let numeroComanda = Math.floor(Math.random() * 999999) + 1

    let comandaNova = new Comanda(numeroComanda,numeroComanda,usuarioC.cochesCesta,totalComandaC)

    let diferent = false;

    while (!diferent) {
      // @ts-ignore
      if (this.usuaris.some(comandaNova => comandaNova.numComanda === usuario.comandas.numClient)) {
        comandaNova.numComanda = Math.floor(Math.random() * 999999) + 1
      }
      else{
        diferent = true
      }
    }

    return comandaNova

  }



}

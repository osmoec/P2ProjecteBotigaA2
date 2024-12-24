import {Usuario} from './Usuario.model';

export class Comanda {
  numComanda: number | undefined
  dataCreacio: number
  usuariClient: string | undefined
  cochesComanda: any[] | undefined
  totalComanda: number | undefined

  constructor(numComanda: number, usuariC: string,cochesComanda: any[],totalComanda: number) {
    this.numComanda = undefined
    this.usuariClient = usuariC
    this.dataCreacio = Date.now()
    this.cochesComanda = undefined
    this.totalComanda = undefined
  }

}

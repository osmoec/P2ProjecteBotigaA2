import {Usuario} from './Usuario.model';
export class Comanda {
  numComanda: number;
  dataCreacio: number;
  usuariClient: string;
  cochesComanda: any[];
  totalComanda: number;
  metodePagament: string;

  constructor(numComanda: number, usuariC: string, cochesComanda: any[], totalComanda: number,metodePagament: string) {
    this.numComanda = numComanda;
    this.usuariClient = usuariC;
    this.dataCreacio = Date.now();
    this.cochesComanda = cochesComanda;
    this.totalComanda = totalComanda;
    this.metodePagament = metodePagament
  }

}

import {Usuario} from './Usuario.model';
export class Comanda {
  dataCreacio: number;
  usuariClient: string;
  cochesComanda: any[];
  totalComanda: number;
  metodePagament: string;

  constructor(usuariC: string, cochesComanda: any[], totalComanda: number,metodePagament: string) {
    this.usuariClient = usuariC;
    this.dataCreacio = Date.now();
    this.cochesComanda = cochesComanda;
    this.totalComanda = totalComanda;
    this.metodePagament = metodePagament
  }

}

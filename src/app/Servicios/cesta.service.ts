import { Injectable } from '@angular/core';
import {Usuario} from '../Clases/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  usuarioA: Usuario

  cochesCesta: any[]

  constructor() {
    // @ts-ignore

    this.usuarioA = getUsuariLogat()

    this.cochesCesta = this.usuarioA.cochesCesta

  }



}

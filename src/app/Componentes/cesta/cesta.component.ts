import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CestaService} from '../../Servicios/cesta.service';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit {
  cestaActual: any
  ngOnInit(): void {
  }

  constructor(private serveiCataleg: CestaService) {
    this.cestaActual = this.serveiCataleg.cestaActual
  }

  eliminarcesta(){

  }

}

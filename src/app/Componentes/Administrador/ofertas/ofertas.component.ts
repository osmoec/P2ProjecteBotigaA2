import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectorBDService } from '../../../Servicios/connector-bd.service';
import { Oferta } from '../../../Clases/Oferta.model';
import {ListaVehiculosService} from '../../../Servicios/lista-vehiculos.service';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent  implements OnInit{
  ofertas: Oferta[];

  constructor(protected conectorBD: ConnectorBDService, protected listaVehiculos: ListaVehiculosService) {
    this.ofertas = conectorBD.getOfertas();
  }

  ngOnInit(): void {
    this.ofertas = this.conectorBD.getOfertas();
  }

  delRegistro(id: number) {
    this.conectorBD.delOferta(id).subscribe({
      next: () => {
        console.log(`✅ Oferta con ID ${id} eliminada`);
        this.ofertas = this.conectorBD.getOfertas();
      },
      error: (error) => console.error("❌ Error al eliminar la oferta:", error),
    });
  }

  updateOferta(oferta: Oferta) {
    console.log(oferta)
    this.conectorBD.updateOferta(oferta).subscribe({
      next : response => {
        if (response.success) {
          console.log("✅ Oferta actualizada correctamente:", response.message)
          oferta.isEditable = false
          alert("Oferta actualizada con exito")
        }
        else{
          alert("Error al actualizar: " + response.message)
        }

      },
      error: error => {
        console.log(error)
      }
    });
  }

  toggleEdit(oferta : Oferta) {
    oferta.isEditable = !oferta.isEditable
  }

  nuevaOferta = {
    ofert: null,
    inicio_oferta: '',
    final_oferta: '',
    id_coche: null
  };

  crearOferta() {
    // Validaciones básicas
    if (!this.nuevaOferta.ofert || !this.nuevaOferta.inicio_oferta || !this.nuevaOferta.final_oferta || !this.nuevaOferta.id_coche) {
      alert('⚠️ Completa todos los campos');
      return;
    }

    // Llama a tu servicio para crear la oferta
    this.conectorBD.crearOferta(this.nuevaOferta).subscribe(res => {
      if (res.success) {
        alert('✅ Oferta creada');
        this.ofertas.push(new Oferta (res.oferta.ID_OFERTA, res.oferta.ID_COCHE, res.oferta.OFERTA, this.nuevaOferta.inicio_oferta, this.nuevaOferta.final_oferta));
        this.nuevaOferta = { ofert: null, inicio_oferta: '', final_oferta: '', id_coche: null };
      } else {
        alert('❌ Error al crear oferta');
      }
    });
  }


}

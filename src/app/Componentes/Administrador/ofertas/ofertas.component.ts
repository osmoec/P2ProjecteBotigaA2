import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectorBDService } from '../../../Servicios/connector-bd.service';
import { Oferta } from '../../../Clases/Oferta.model';
import {ListaVehiculosService} from '../../../Servicios/lista-vehiculos.service';
import {ServeiUsuarisService} from '../../../Servicios/servei-usuaris.service';
import {Router} from '@angular/router';

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
  esAdmin = false;

  constructor(private router: Router, protected conectorBD: ConnectorBDService, protected listaVehiculos: ListaVehiculosService, protected serveiUsuaris : ServeiUsuarisService) {
    this.ofertas = conectorBD.getOfertas();
  }

  ngOnInit() {
    this.serveiUsuaris.noAdmin();
    this.esAdmin = this.serveiUsuaris.usuari_logat?.getAdmin()!;
    if (this.esAdmin) {
      this.ofertas = this.conectorBD.getOfertas();
    }
    else{
      this.router.navigate(['/home']);
    }

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
    id_coche: 0
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
        this.ofertas.push(new Oferta (res.oferta.ID_OFERTA, this.nuevaOferta.id_coche, res.oferta.OFERTA, this.nuevaOferta.inicio_oferta, this.nuevaOferta.final_oferta));
        this.nuevaOferta = { ofert: null, inicio_oferta: '', final_oferta: '', id_coche: 0 };
        this.ngOnInit()
      } else {
        alert('❌ Error al crear oferta');
      }
    });
  }


  protected readonly name = name;
}

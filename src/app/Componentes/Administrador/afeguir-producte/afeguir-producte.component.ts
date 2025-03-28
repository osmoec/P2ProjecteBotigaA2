import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConnectorBDService} from '../../../Servicios/connector-bd.service';

@Component({
  selector: 'app-afeguir-producte',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './afeguir-producte.component.html',
  styleUrl: './afeguir-producte.component.css'
})
export class AfeguirProducteComponent {

  nom: string = ""

  preu: number = 0

  categories: string[] = []

  categoriesEscollides: string[] = []

  textoferta: string = ""

  arxius: File[] = []

  constructor(public http: HttpClient, public connectorbd: ConnectorBDService) {
  }

  ngOnInit() {
    this.connectorbd.rebreCategories().subscribe(res=>{
      this.categories = res;
    })
  }

  enviarbd(){

    const arxs = this.arxius;

    let arxAt: File[] = []

    let ver = 1

    if (this.nom === ""){
      console.info('no hi ha nom')
    }
    else{
      if (this.textoferta === ""){
        console.info('no hi ha textoferta')
      }
      else{
        if (this.preu === 0){
          console.info('no hi ha preu')
        }
        else{
          if (this.categoriesEscollides.length === 0 || this.categoriesEscollides.length < 3){
            console.info('no hi han categories')
            this.categoriesEscollides.length = 0
          }
          else{
            if (this.arxius.length === 0){
              console.info('no hi ha arxius')
            }
            else{
              arxs.forEach(ar=>{
                let nouArx = new File([ar],this.nom + 'v' + ver + '.png' , {type: ar.type});

                arxAt.push(nouArx)

                ver++
              })

              console.log(arxAt)

              let formulari = new FormData()

              formulari.append('nom', this.nom);
              formulari.append('preu',this.preu.toString());

              formulari.append('categories',JSON.stringify(this.categoriesEscollides))

              formulari.append('textoferta', this.textoferta)

              arxAt.forEach((arxius)=>{
                formulari.append('imatges', arxius)
              })

              this.connectorbd.desarCotxe(formulari)
            }
          }
        }
      }
    }
  }

  afeguirCategoria(categoria:string){

    console.log(this.categoriesEscollides)

    let check = document.getElementById(categoria) as HTMLInputElement;

    if (check.checked == true){
      if (this.categoriesEscollides.length < 3){
        check.checked = true
        this.categoriesEscollides.push(categoria);
        console.log(this.categoriesEscollides);
        console.log(this.categoriesEscollides.length)
      }
      else{
        check.checked = false
        this.categoriesEscollides = this.categoriesEscollides.filter(res=> res !== categoria)
      }
    }
    else{
      check.checked = false
      this.categoriesEscollides = this.categoriesEscollides.filter(res=> res !== categoria)
      console.log(this.categoriesEscollides.length)

    }
  }

  onFileChange(event: any): void {
    this.arxius = Array.from(event.target.files);

    if (this.arxius.length == 3) {
      document.getElementById('imgfaltants')!.innerText = 'arxius correctes';
    }
    else if (this.arxius.length < 3){
      document.getElementById('imgfaltants')!.innerText = 'falten ' + (3 - this.arxius.length) + ' arxius, insereix-los correctament un altre cop';
      this.arxius.length = 0
    }
    else if (this.arxius.length > 3){
      document.getElementById('imgfaltants')!.innerText = 'has d introduir nomes 3 imatges, introdueixles de nou correctament';
      this.arxius.length = 0
    }


  }

  onPreuChange(){
    let cadena = this.preu.toString().slice(0,9)
    console.log(Number(cadena))
    if (this.preu.toString().length > 10){
      this.preu = Number(cadena)
    }
  }


}

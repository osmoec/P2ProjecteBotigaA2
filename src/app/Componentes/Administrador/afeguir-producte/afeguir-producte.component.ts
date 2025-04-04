import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConnectorBDService} from '../../../Servicios/connector-bd.service';
import {ServeiUsuarisService} from '../../../Servicios/servei-usuaris.service';

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

  exit: undefined | number

  nom: string = ""

  preu: number = 0

  categories: string[] = []

  categoriesEscollides: string[] = []

  textoferta: string = ""

  arxius: File[] = []

  esAdmin: boolean | undefined = false

  cotxeExistent: boolean = false

  constructor(public http: HttpClient, public connectorbd: ConnectorBDService, public serveiUsuari: ServeiUsuarisService) {
  }

  ngOnInit() {
    this.serveiUsuari.noAdmin()

    this.connectorbd.rebreCategories().subscribe(res=>{
      this.categories = res;
    })
  }

  enviarbd(){

    const arxs = this.arxius;

    let arxAt: File[] = []

    let ver = 1

    if (this.nom === ""){
      this.exit = 1
      console.info('no hi ha nom')
    }
    else{
      this.connectorbd.cotxeExisteix(this.nom).subscribe(res=>{
        this.cotxeExistent = res
        console.log(res)
      })
      if (this.cotxeExistent){
      if (this.textoferta === ""){
        this.exit = 2
        console.info('no hi ha textoferta')
      }
      else{
        if (this.preu === 0){
          this.exit = 3
          console.info('no hi ha preu')
        }
        else{
          if (this.categoriesEscollides.length === 0 || this.categoriesEscollides.length < 3){
            console.info('no hi han categories')
            this.categoriesEscollides.length = 0
            this.categories.forEach(c => {
              let check = document.getElementById(c) as HTMLInputElement;
              check.checked = false
            })
            this.exit = 4
          }
          else{
            if (this.arxius.length === 0){
              this.exit = 5
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

              this.categoriesEscollides.length = 0
              this.arxius = []
              this.textoferta = ""
              this.nom = ""
              this.preu = 0
              this.categories.forEach(c => {
                let check = document.getElementById(c) as HTMLInputElement;
                check.checked = false
              })

              this.connectorbd.desarCotxe(formulari).subscribe(res=>{
                console.log(res.estate)
                this.exit = res.estate
              })

            }
          }
        }
      }
      }
      else{
        this.exit = 8
      }
    }
  }

  afeguirCategoria(categoria:string){

    console.log(this.categoriesEscollides)

    let check = document.getElementById(categoria) as HTMLInputElement;

    if (check.checked){
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
    if (this.preu === null){
      this.preu = 0
    }
    let numb = document.getElementById('preucotxe') as HTMLInputElement
    // @ts-ignore
    numb.value = Number(this.preu.toString().replaceAll(/\D/g, ''));
    let cadena1 = this.preu.toString().slice(0,9)
    let cadena2 = Number(this.preu.toString().slice(0,0))
    console.log(Number(cadena1))
    console.log(Number(this.preu.toString().slice(0,0)) === 0)
    if (this.preu.toString().length > 10){
      this.preu = Number(cadena1)
      let numb = document.getElementById('preucotxe') as HTMLInputElement
      // @ts-ignore
      numb.value = Number(this.preu.toString().replaceAll(/\D/g, ''));
    }
    else if(cadena2 === 0){
      let cad = this.preu.toString().split('')
      let nZ = 0
      let mesZ = true
      for (let i = 0; i < cadena1.length; i++) {
        if (Number(cad[i]) === 0 && !(Number(cad[i+1]) !== 0)){
          nZ++
          mesZ = false
        }
        if (Number(cad[i]) === 0 && mesZ){
          nZ++
        }
      }
      console.log(nZ)
      this.preu = Number(this.preu.toString().slice(nZ))
      console.log(this.preu)
    }
  }


}

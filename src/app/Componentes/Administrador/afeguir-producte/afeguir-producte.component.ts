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

  enviarbd() {
    const arxs = this.arxius;
    let arxAt: File[] = [];
    let ver = 1;

    if (this.nom === "") {
      this.exit = 1;
    } else {
      this.connectorbd.cotxeExisteix(this.nom).subscribe(res => {
        this.cotxeExistent = res;

        if (this.cotxeExistent) {
          this.exit = 8;
        } else {
          if (this.textoferta === "") {
            this.exit = 2;
          } else {
            if (this.preu === 0) {
              this.exit = 3;
            } else {
              if (this.categoriesEscollides.length === 0 || this.categoriesEscollides.length < 3) {
                this.categoriesEscollides.length = 0;
                this.categories.forEach(c => {
                  let check = document.getElementById(c) as HTMLInputElement;
                  check.checked = false;
                });
                this.exit = 4;
              } else {
                if (this.arxius.length === 0) {
                  this.exit = 5;
                } else {
                  arxs.forEach(ar => {
                    let nouArx = new File([ar], this.nom + 'v' + ver + '.png', { type: ar.type });
                    arxAt.push(nouArx);
                    ver++;
                  });

                  let formulari = new FormData();
                  formulari.append('nom', this.nom);
                  formulari.append('preu', this.preu.toString());
                  formulari.append('categories', JSON.stringify(this.categoriesEscollides));
                  formulari.append('textoferta', this.textoferta);

                  arxAt.forEach((arxius) => {
                    formulari.append('imatges', arxius);
                  });

                  this.categoriesEscollides.length = 0;
                  this.arxius = [];
                  this.textoferta = "";
                  this.nom = "";
                  this.preu = 0;
                  this.categories.forEach(c => {
                    let check = document.getElementById(c) as HTMLInputElement;
                    check.checked = false;
                  });

                  this.connectorbd.desarCotxe(formulari).subscribe(res => {
                    this.exit = res.estate;
                  });
                  window.location.reload();
                }
              }
            }
          }
        }
      });
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

  onPreuChange() {
    if (this.preu === null || this.preu === undefined) {
      this.preu = 0;
    }

    let preuStr = this.preu.toString().replace(/\D/g, '');

    if (preuStr.length > 10) {
      preuStr = preuStr.slice(0, 10);
    }

    if (/^0+\d+/.test(preuStr)) {
      preuStr = preuStr.replace(/^0+/, '');
    }
    const maxPreu = 2147483647;
    this.preu = preuStr === '' ? 0 : Math.min(Number(preuStr), maxPreu);

    const numb = document.getElementById('preucotxe') as HTMLInputElement;
    if (numb) numb.value = preuStr;
  }


}

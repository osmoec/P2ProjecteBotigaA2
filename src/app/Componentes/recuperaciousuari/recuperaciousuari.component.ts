import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {routes} from '../app.routes';
import {Router, RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-recuperaciousuari',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './recuperaciousuari.component.html',
  styleUrl: './recuperaciousuari.component.css'
})
export class RecuperaciousuariComponent {

  usuari: string = ""
  clau: string = ""
  clauR: string = ""

  constructor(public http: HttpClient, private router: Router) {}

  async autentificacio(){
    let temp = new HttpParams().set("usuari", this.usuari).set("clau", this.clau)

    let promise = new Promise<boolean>((resolve, reject) => {
      this.http.get<any>("http://localhost:3080/usuaris/recuperacio", {params: temp}).subscribe({
        next: (res) => {
          this.clauR = res;
          if (this.clau === this.clauR) {
            resolve(true)
          }
          else{
            reject(false)
          }
        },

        error: (err) => {
          console.log(err)
          reject(false)
        }
      })
    })

    return promise
  }

  async potRecuperar(){
    let res = await this.autentificacio()

    console.log("Resulstat tramesa: "+res)
    if (res){
      this.router.navigate(['3z03u2Yn',this.usuari])
      this.usuari = ""
      this.clau = ""
      this.clauR = ""
    }
    else{
      console.log("No valido")
      this.usuari = ""
      this.clau = ""
      this.clauR = ""
    }
  }
}

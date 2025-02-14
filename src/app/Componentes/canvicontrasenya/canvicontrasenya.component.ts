import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-canvicontrasenya',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './canvicontrasenya.component.html',
  styleUrl: './canvicontrasenya.component.css'
})
export class CanvicontrasenyaComponent {

  usuari: string  = ""
  contrasena: string = ""
  confContrasena: string = ""


  constructor(public http: HttpClient, private arouter: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.arouter.paramMap.subscribe(params => {
      // @ts-ignore
      this.usuari = params.get('usuari')
      console.log(this.usuari);
    })
  }

  actualitzarCont(){
    if (this.contrasena === this.confContrasena){
      let novaClau = ""
      for (let i = 1; i < 11; i++){
        if ((i % 2) === 0){
          novaClau = novaClau + String.fromCharCode(Math.floor((Math.random()*26)+65))
        }
        else{
          novaClau = novaClau + (Math.floor(Math.random()*26)+65)
        }

      }

      let temp = {usuari: this.arouter.snapshot.paramMap.get('usuari'), contrasena: this.contrasena, clauUnica: novaClau}
      console.log(temp)
      this.http.post("http://localhost:3080/usuaris/recuperaciocont",temp).subscribe()
      this.contrasena = ""
      this.confContrasena = ""
      this.router.navigate(['/home']);

    }
    else{
      console.log("no son iguals")
      this.contrasena = ""
      this.confContrasena = ""
    }
  }

}

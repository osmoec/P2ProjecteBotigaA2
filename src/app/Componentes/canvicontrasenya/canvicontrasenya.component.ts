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


  constructor(public http: HttpClient, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      // @ts-ignore
      this.usuari = params.get('usuari')
      console.log(this.usuari);
    })
  }

  actualitzarCont(){
    if (this.contrasena === this.confContrasena){
      let temp = {usuari: this.router.snapshot.paramMap.get('usuari'), contrasena: this.contrasena}
      console.log(temp)
    this.http.post("http://localhost:3080/usuaris/recuperaciocont",temp).subscribe()
    }
    else{
      console.log("no son iguals")
    }
  }

}

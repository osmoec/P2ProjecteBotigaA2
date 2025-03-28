import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-confirmar-compte',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './confirmar-compte.component.html',
  styleUrl: './confirmar-compte.component.css'
})
export class ConfirmarCompteComponent {

  usuari: string  = ""

  constructor(public http: HttpClient, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params=>{
      this.usuari = params['usuari']
    })
    console.log(this.usuari);
    this.verificarCompte()
  }

  verificarCompte(){
    this.http.put('http://localhost:3080/usuaris/confirmarusuari',{usuari:this.usuari}).subscribe()
    console.log("usuari verificat")
  }

}

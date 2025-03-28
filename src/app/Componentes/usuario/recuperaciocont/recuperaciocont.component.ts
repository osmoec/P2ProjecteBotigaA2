import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-recuperaciocont',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './recuperaciocont.component.html',
  styleUrl: './recuperaciocont.component.css'
})
export class RecuperaciocontComponent {

  usuari: string = ""

  constructor(public http: HttpClient) {
  }

  enviaCorreu() {


    console.log(this.usuari);
    this.http.post("http://localhost:3080/mail", { usuariid: this.usuari}).subscribe();

    this.usuari = ""
  }

}

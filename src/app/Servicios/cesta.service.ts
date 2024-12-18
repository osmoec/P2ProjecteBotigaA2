import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CestaService implements OnInit{

  cestaActual: any = []

  constructor() { }

  ngOnInit(): void {
  }



}

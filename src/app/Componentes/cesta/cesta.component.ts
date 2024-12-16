import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit {
  ngOnInit(): void {
  }


}

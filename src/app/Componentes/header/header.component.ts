import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logat = false;
  usuariLogat = '';

  ngOnInit() {
    this.logat = localStorage.getItem('logat') === 'true';
    this.usuariLogat = localStorage.getItem('usuari') || '';
  }

  logout() {
    localStorage.removeItem('logat');
    localStorage.removeItem('usuari');
    this.logat = false;
    this.usuariLogat = '';
    window.location.reload();
  }
}


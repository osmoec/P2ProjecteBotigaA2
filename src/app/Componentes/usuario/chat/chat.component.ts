import { Component } from '@angular/core';
import { ChatService } from '../../../Servicios/chat.service'
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [FormsModule, NgIf],
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  pregunta = '';
  resposta = '';
  carregant = false;
  errorMissatge: string = '';
  mostrarXat = false;



  constructor(private chatService: ChatService) {}

  enviarPregunta() {
    this.errorMissatge = '';
    if (!this.pregunta.trim()) {
      this.errorMissatge = 'Si us plau, introdueix una pregunta.';
      return;
    }

    this.carregant = true;
    this.resposta = '';

    this.chatService.ferPregunta(this.pregunta).subscribe({
      next: (res) => {
        this.resposta = res.resposta;
        this.carregant = false;
      },
      error: (err) => {
        console.error('Error en la petició:', err);
        this.resposta = 'Hi ha hagut un error al servidor.';
        this.carregant = false;
      }
    });
  }
}


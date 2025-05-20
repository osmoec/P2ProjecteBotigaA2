import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http: HttpClient) { }

  ferPregunta(pregunta: string) {
    return this.http.post<{resposta: string}>('http://localhost:3080/chat',{pregunta});
  }
}

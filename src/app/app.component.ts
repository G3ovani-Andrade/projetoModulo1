import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetoModulo1';
  titulo ="Estatisticas e Informacoes"
  pegarTitulo(event:string){
    this.titulo = event;
    console.log(event);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {
  @Output() onClick = new EventEmitter<any>();
  valorBusca:string = "";
  enviarValorBusca(){
    this.onClick.emit(this.valorBusca);
  }
}

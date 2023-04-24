import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'projetoModulo1';
  titulo =""
  constructor(private route: Router) {

  }
  ngOnInit(): void {
    this.route.events.subscribe((event)=>{
      if(event  instanceof NavigationEnd){
        var atual=[];
        this.titulo = event.url
        this.titulo = this.titulo.split('/',2)[1];
      }
    })
  }
  pegarTitulo(event:string){
    this.titulo = event;
    console.log(event);
  }

}

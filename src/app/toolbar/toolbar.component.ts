import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  usuarioLogado:any = {};
  login = false;
  @Input() titulo = ''
  nomeUsuario:string = '';
  constructor(private serviceLogin:StorageService,private route:Router,private rotaAtive:ActivatedRoute) {
  }
  ngOnInit(): void {
      this.login = false
      this.route.events.subscribe((event)=>{
        if(event  instanceof NavigationEnd){
          if(event.url == "/login" || event.url =="/"){
            this.login = true;
          }else{
            this.usuarioLogado = this.serviceLogin.getUsuarioLogado('USUARIO_LOGADO');
            if(this.usuarioLogado.email != undefined)this.nomeUsuario = this.usuarioLogado.email.split('@',1)
            this.login = false;
          }
        }
      })

  }


}

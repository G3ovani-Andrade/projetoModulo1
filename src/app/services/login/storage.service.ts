import { Injectable } from '@angular/core';
import { Usuario } from '../../User/User';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getLocalStorage(chave: string) {
    let obj: Array<Usuario> = [];
    let objJson = localStorage.getItem(chave);
    obj = objJson ? JSON.parse(objJson) : [];
    return obj;
  }

  setLocalStorage(chave: string, obj: Array<Usuario>) {
    localStorage.setItem(chave, JSON.stringify(obj))
  }

  setUsuarioLogado(chave: string, obj: any) {
    localStorage.setItem(chave, JSON.stringify(obj))
  }
  getUsuarioLogado(chave: string) {
    let obj: any = {};
    let objJson = localStorage.getItem(chave);
    obj = objJson ? JSON.parse(objJson) : {};
    return obj;
  }
  sair(){
    localStorage.removeItem('USUARIO_LOGADO');
  }
  retornarUsuarioLogado() {
    let usuarioLogado = localStorage.getItem('USUARIO_LOGADO');
    console.log(usuarioLogado);
    if (usuarioLogado == null) {
      return false;
    } else {
       return true;
    }

  }
}

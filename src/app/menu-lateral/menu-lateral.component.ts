import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  constructor(private storageService: StorageService){};
  deslogar(){
    this.storageService.sair()
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceCepService {

  constructor(private http: HttpClient) {

  }

  getEndereco(cep: string) {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }


}


import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoragePacienteService{
  id: number = 0;
  constructor() {
    this.atualizarId();
  }


  setPacientes(chave: string, paciente: any) {
    let pacientes = this.getPacientes(chave);
    if (paciente.id == null || paciente.id== undefined) {
      this.atualizarId();
      paciente.id = this.id;
    }else{
      pacientes.forEach((element: any, index: number) => {
        if (element.id == paciente.id) {
          pacientes[index] = paciente;
        }
      });
      localStorage.setItem(chave, JSON.stringify(pacientes));
      return;
    }
    pacientes.push(paciente);
    localStorage.setItem(chave, JSON.stringify(pacientes));
  }

  getPacientes(chave: string) {
    let pacientesJson = localStorage.getItem(chave)
    let pacientes = pacientesJson ? JSON.parse(pacientesJson) : [];
    return pacientes;
  }
  atualizarId() {
    var pacientes = this.getPacientes('PACIENTES');
    if(pacientes.length != 0){
      this.id = pacientes[pacientes.length - 1].id + 1
    }
  }

  deletarPaciente(chave: string, paciente: any) {
    let pacientes = this.getPacientes(chave);
    pacientes.forEach((element: any, index: number) => {
      if (paciente.id == element.id) {
        pacientes.splice(index, 1);
      }
    });
    localStorage.setItem(chave, JSON.stringify(pacientes));
    this.atualizarId();
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoragePacienteService {
  id:number = 0;
  constructor() {
    this.id = (this.getPacientes('PACIENTES')).length;
  }

  setPacientes(chave: string, paciente: any) {
    let pacientes = this.getPacientes(chave);
    let checarPaciente;

      if(paciente.id == null){
        paciente.id = this.id;
        this.atualizarId();
      }
      pacientes.push(paciente);
      localStorage.setItem(chave, JSON.stringify(pacientes));


    }

  getPacientes(chave: string) {
    let pacientesJson = localStorage.getItem(chave)
    let pacientes = pacientesJson ? JSON.parse(pacientesJson) : [];
    return pacientes;
  }
  atualizarId(){
    this.id = (this.getPacientes('PACIENTES')).length;
  }

  deletarPaciente(chave:string,paciente: any) {
    let pacientes = this.getPacientes(chave);
    pacientes.forEach((element:any,index:number) => {
      if(paciente.id == element.id){
        pacientes.splice(index,1);
      }
    });
    localStorage.setItem(chave, JSON.stringify(pacientes));
    this.atualizarId();
  }

  editarPaciente(chave: string,paciente: any){
    console.log(paciente.id);
    let pacientes = this.getPacientes(chave);
    console.log(pacientes);

    pacientes.forEach((element:any,index:number)=> {
      if(element.id==paciente.id){
        pacientes[index]=paciente;
      }
    });
    console.log(pacientes);
    localStorage.setItem(chave, JSON.stringify(pacientes));
  }

}

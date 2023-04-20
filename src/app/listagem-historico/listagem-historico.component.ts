import { Component } from '@angular/core';
import { StoragePacienteService } from '../services/paciente/storage-paciente.service';

@Component({
  selector: 'app-listagem-historico',
  templateUrl: './listagem-historico.component.html',
  styleUrls: ['./listagem-historico.component.css']
})
export class ListagemHistoricoComponent {
  mensagemBusca:string='';
  pacientesLocal: any[] = [];
  constructor(private storagePacientes:StoragePacienteService){}
  carregarPacientes() {
    this.pacientesLocal = this.storagePacientes.getPacientes('PACIENTES');
    return this.pacientesLocal
  }
  pesquisa(nome: string){
    this.limparMensagem()
    if (nome == "") {
      this.mensagemBusca = "Valor inválido"
      this.pacientesLocal = [];
      return;
    }
    this.pacientesLocal = this.buscaPacientes(nome);
    if (this.pacientesLocal.length == 0) {
      this.mensagemBusca = "Nenhum Paciente Encontrado"
    }
  }

  buscaPacientes(valorBuscar: string) {
    let pacientesBusca = this.carregarPacientes();
    pacientesBusca = this.pacientesLocal.filter((paciente: any) => {
      if (paciente.nome.toLowerCase().includes(valorBuscar.toLowerCase())) {
        return true;
      }
      return false;
    });
    return pacientesBusca;
  }
  limparMensagem() {
    setTimeout(() => {
      this.mensagemBusca = '';
    }, 2000);
  }
}

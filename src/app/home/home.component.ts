import { Component } from '@angular/core';
import { StoragePacienteService } from '../services/paciente/storage-paciente.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pacientesLocal: any[] = [];
  totalPacientes = 0;
  constructor(private storagePacientes: StoragePacienteService) {
    this.carregarPacientes();
  }
  carregarPacientes() {
    this.pacientesLocal = this.storagePacientes.getPacientes('PACIENTES');
    this.totalPacientes = this.pacientesLocal.length
  }
  buscar(valorBuscar: string) {
    this.carregarPacientes();

    this.pacientesLocal = this.pacientesLocal.filter((paciente: any) => {
      if (paciente.nome.toLowerCase().includes(valorBuscar.toLowerCase())) {
        return true;
      }
      return false;
    });
  }
  calcularAniversario(data:string){
    let dia = data.slice(0, 2);
    let mes = data.slice(2, 4);
    let ano = data.slice(4, 8);
    let idade = 0;
    let dataAtual = new Date().toLocaleDateString();
    let diaAtual = dataAtual.slice(0, 2);
    let mesAtual = dataAtual.slice(3, 5);
    let anoAtual = dataAtual.slice(6, 10);

    idade = (parseInt(anoAtual) - parseInt(ano));

    if(mesAtual<mes && diaAtual<dia){
      idade--;
    }
    return idade

  }
}

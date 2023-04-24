import { Component, OnInit } from '@angular/core';
import { StoragePacienteService } from '../services/paciente/storage-paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-historico-medicacao',
  templateUrl: './historico-medicacao.component.html',
  styleUrls: ['./historico-medicacao.component.css']
})
export class HistoricoMedicacaoComponent implements OnInit{
  pacienteCarregado:any={}
  id:string = "";
  nomeMedicamento:string = "";
  constructor(private storagePacientes:StoragePacienteService,private rotaAtiva:ActivatedRoute){

  }
  ngOnInit(): void {
    this.atualizarUrl();
    this.carregasPacientes();
  }

  atualizarUrl(){
    this.rotaAtiva.params.subscribe(params => {
      this.id = params['id'];
      this.nomeMedicamento = params['nomeMedicamento'];
    })
  }
  carregasPacientes(){
    let pacientes= this.storagePacientes.getPacientes('PACIENTES');
    this.pacienteCarregado = pacientes.find((paciente: any) =>{
      if(paciente.id == this.id){
        return true;
      }
      return false
    })
  }




}

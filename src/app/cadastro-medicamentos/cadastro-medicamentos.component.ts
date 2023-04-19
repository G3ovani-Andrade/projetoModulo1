import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { StoragePacienteService } from '../services/paciente/storage-paciente.service';

@Component({
  selector: 'app-cadastro-medicamentos',
  templateUrl: './cadastro-medicamentos.component.html',
  styleUrls: ['./cadastro-medicamentos.component.css']
})
export class CadastroMedicamentosComponent implements OnInit {
  mensagemBusca: string = ""
  pacientesLocal: any[] = [];
  pacienteSelecionado: any;
  mensagemCadastro:string="";
  @ViewChild('formCadMed')
  formCadMed!: NgForm;

  constructor(private fb: FormBuilder, private storagePacientes: StoragePacienteService) { }
  ngOnInit(): void {
    this.atualizarData();
  }

  formMedicamento = this.fb.group({
    id: [null],
    nomeMedicamento: ['', { validators: [Validators.required, Validators.maxLength(80), Validators.minLength(8)] }],
    data: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    hora: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    tipo: ['', { validators: [Validators.required,] }],
    quantidade: ['', { validators: [Validators.required,Validators.minLength(1)] }],
    unidade: ['', { validators: [Validators.required] }],
    observacoes: ['', { validators: [Validators.required, Validators.maxLength(8000), Validators.minLength(8)] }],
  });

  carregarPacientes() {
    this.pacientesLocal = this.storagePacientes.getPacientes('PACIENTES');
    return this.pacientesLocal;
  }
  atualizarData() {
    let dataAtual = new Date().toLocaleDateString();
    let diaAtual = dataAtual.slice(0, 2);
    let mesAtual = dataAtual.slice(3, 5);
    let anoAtual = dataAtual.slice(6, 10);
    let horaAtual = new Date();
    let hora = horaAtual.getHours();
    let minutos = horaAtual.getMinutes();
    let segundos = horaAtual.getSeconds();
    this.formMedicamento.patchValue({ data: (`${diaAtual}/${mesAtual}/${anoAtual}`) });
    this.formMedicamento.get('hora')?.patchValue(`${hora}${minutos}${segundos}`);
  }
  cadastrar() {
    this.limparMensagem()
    if (this.pacienteSelecionado == null) {
      this.mensagemBusca = "Selecione um paciente"
    } else {
      if(this.pacienteSelecionado.medicamentos == undefined){
        this.pacienteSelecionado.medicamentos = [];
      }
      this.pacienteSelecionado.medicamentos.push(this.formMedicamento.value);
      console.log(this.pacienteSelecionado.medicamentos);
      this.storagePacientes.setPacientes('PACIENTES', this.pacienteSelecionado);
      this.mensagemCadastro = "Cadastrado com sucesso"
      this.formCadMed.resetForm();
      this.atualizarData()
    }
  }
  deletar() {

  }
  selecionarPaciente(paciente: any) {
    this.pacienteSelecionado = paciente
    console.log(this.pacienteSelecionado);
  }
  editar() { }
  limparMensagem() {
    setTimeout(() => {
      this.mensagemBusca = '';
      this.mensagemCadastro = '';
    }, 2000);
  }
  buscaPacientes(valorBuscar: string) {
    let pacientesBusca = this.carregarPacientes();
    this.pacienteSelecionado = {}
    console.log(pacientesBusca);

    pacientesBusca = this.pacientesLocal.filter((paciente: any) => {
      if (paciente.nome.toLowerCase().includes(valorBuscar.toLowerCase())) {
        return true;
      }
      return false;
    });
    return pacientesBusca;
  }

  pesquisa(valorBuscar: string) {
    this.limparMensagem()
    if (valorBuscar == "") {
      this.mensagemBusca = "Valor inválido"
      this.pacientesLocal = [];
      return;
    }
    this.pacientesLocal = this.buscaPacientes(valorBuscar);
    if (this.pacientesLocal.length == 0) {
      this.mensagemBusca = "Nenhum Paciente Encontrado"
    }
  }
}

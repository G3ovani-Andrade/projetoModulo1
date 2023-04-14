import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StoragePacienteService } from '../services/paciente/storage-paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  constructor(private fb: FormBuilder, private storagePacientes: StoragePacienteService) {

    this.form.setValue(this.paciente2);
  }
  @ViewChild('formPaciente')
  formDir!: NgForm;
  ngOnInit(): void {

    //this.form.setValue(this.paciente2);
    //this.paciente2 = this.storagePacientes.getPacientes('PACIENTES')
  }

  paciente: any = {}
  paciente2: any = {
    id: 9,
    nome: 'geovani',
    genero: 'masculino',
    data: '1010',
    cpf: '555555',
    rg: '101015',
    estadoCivil: 'solteiro',
    telefone: '1616549646',
    email: 'geovane@gmail.com',
    naturalidade: 'florida',
    emergencia: '4165654654',
    convenio: "sus",
    carteira: 101525,
    validade: 'asasas',
    cep: '88045397',
    cidade: 'florida',
    estado: 'sc',
    logradouro: 'servidao andrade',
    numero: '27',
    complemento: 'casa',
    bairro: 'saco dos limoes',
    referencia: 'ponto final',
  }

  form = this.fb.group({
    id: [null],
    nome: ['', { validators: [Validators.required, Validators.maxLength(80), Validators.minLength(4)] }],
    genero: ['', { validators: [Validators.required] }],
    data: ['', { validators: [Validators.required] }],
    cpf: ['', { validators: [Validators.required] }],
    rg: ['', { validators: [Validators.required, Validators.maxLength(20)] }],
    estadoCivil: ['', { validators: [Validators.required] }],
    telefone: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.email] }],
    naturalidade: ['', { validators: [Validators.required, Validators.maxLength(100), Validators.minLength(5)] }],
    emergencia: ['', { validators: [Validators.required] }],
    convenio: ['Sem convênio'],
    carteira: [''],
    validade: [''],
    cep: ['', { validators: [Validators.required] }],
    cidade: ['', { validators: [Validators.required] }],
    estado: ['', { validators: [Validators.required] }],
    logradouro: ['', { validators: [Validators.required] }],
    numero: ['', { validators: [Validators.required] }],
    complemento: ['', { validators: [Validators.required] }],
    bairro: ['', { validators: [Validators.required] }],
    referencia: ['', { validators: [Validators.required] }],
  });


  cadastrar() {
    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    let checarPaciente = pacientes.find((pac: any) => JSON.stringify(pac.cpf) === JSON.stringify(this.form.value.cpf));
    if (checarPaciente) {
      console.log('usuario ja existe');
    } else {
      console.log('salvo');
      this.storagePacientes.setPacientes('PACIENTES', this.form.value);
      this.formDir.resetForm();
    }
  }

  deletar() {
    this.storagePacientes.deletarPaciente('PACIENTES', this.form.value);
    this.formDir.resetForm();
  }
  editar() {
    this.storagePacientes.editarPaciente('PACIENTES', this.form.value);
    this.formDir.resetForm();
  }
}

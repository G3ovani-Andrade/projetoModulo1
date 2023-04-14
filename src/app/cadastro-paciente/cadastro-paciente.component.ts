import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StoragePacienteService } from '../services/paciente/storage-paciente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  id: string = ''
  pacienteUrl: any = {};
  endereco = {
        cep: '88045300',
        cidade: 'floripa',
        estado: 'sc',
        logradouro: 'servidao andrade',
        numero: '27',
        complemento: 'cada',
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
      endereco: this.fb.group({
        cep: ['', { validators: [Validators.required] }],
        cidade: ['', { validators: [Validators.required] }],
        estado: ['', { validators: [Validators.required] }],
        logradouro: ['', { validators: [Validators.required] }],
        numero: ['', { validators: [Validators.required] }],
        complemento: ['', { validators: [Validators.required] }],
        bairro: ['', { validators: [Validators.required] }],
        referencia: ['', { validators: [Validators.required] }],
      })
    });





  constructor(private fb: FormBuilder, private storagePacientes: StoragePacienteService, private rota: ActivatedRoute) {
    this.atualizaIdUrl()

  }
  @ViewChild('formPaciente')
  formLogin!: NgForm;
  ngOnInit(): void {

  }

  atualizaIdUrl() {
    this.rota.queryParams.subscribe(params => {
      this.id = params['id'];
    })
    if(this.id){
      this.form.get('cpf')?.disable()
    }
    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    pacientes.find((paciente: any) => {
      if (paciente.id == this.id) {
        this.form.setValue(paciente)
        console.log(this.form);

        //this.form.setValue(this.endereco);
      }
    })
  }

  // paciente2: any = {
  //   id: 10,
  //   nome: 'geovani',
  //   genero: 'masculino',
  //   data: '1010',
  //   cpf: '555555',
  //   rg: '101015',
  //   estadoCivil: 'solteiro',
  //   telefone: '1616549646',
  //   email: 'geovane@gmail.com',
  //   naturalidade: 'florida',
  //   emergencia: '4165654654',
  //   convenio: "sus",
  //   carteira: 101525,
  //   validade: 'asasas',
  //   cep: '88045397',
  //   cidade: 'florida',
  //   estado: 'sc',
  //   logradouro: 'servidao andrade',
  //   numero: '27',
  //   complemento: 'casa',
  //   bairro: 'saco dos limoes',
  //   referencia: 'ponto final',
  // }




  cadastrar() {
    if (this.formLogin.invalid) {
      return;
    }
    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    let checarPaciente = pacientes.find((pac: any) => pac.cpf === this.form.value.cpf);
    if (checarPaciente) {
      console.log('cpf ja cadastrado');
    } else {
      console.log('salvo');
      this.storagePacientes.setPacientes('PACIENTES', this.form.value);
      this.formLogin.resetForm();
    }
  }

  deletar() {
    this.storagePacientes.deletarPaciente('PACIENTES', this.form.value);
    this.formLogin.resetForm();
  }
  editar() {
    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    let checarPaciente = pacientes.find((pac: any) => pac.cpf === this.form.value.cpf && pac.id === this.form.value.id);
    let checarIgualdade = pacientes.find((pac: any) => JSON.stringify(pac) === JSON.stringify(this.form.value));
    if (checarIgualdade) {
      console.log('nenhum campo alterado');
      return;
    }
    if (checarPaciente) {
      this.storagePacientes.editarPaciente('PACIENTES', this.form.value);
      //this.formLogin.resetForm();
    } else {
      console.log('cpf ja cadastrado');
    }
  }
}



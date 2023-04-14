import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StoragePacienteService } from '../services/paciente/storage-paciente.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceCepService } from '../services/cep/service-cep.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  id: string = ''
  pacienteUrl: any = {};
  erroCep = false;
  mensagem: string = '';

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
    localidade: ['', { validators: [Validators.required] }],
    uf: ['', { validators: [Validators.required] }],
    logradouro: ['', { validators: [Validators.required] }],
    numero: ['', { validators: [Validators.required] }],
    complemento: ['',],
    bairro: ['', { validators: [Validators.required] }],
    referencia: ['', ],
  });





  constructor(private fb: FormBuilder, private storagePacientes: StoragePacienteService, private rota: ActivatedRoute, private api: ServiceCepService) {
    this.atualizaIdUrl();
  }
  @ViewChild('formPaciente')
  formPaciente!: NgForm;
  ngOnInit(): void {

  }

  atualizaIdUrl() {
    this.rota.queryParams.subscribe(params => {
      this.id = params['id'];
    })
    if(this.id){
      this.form.disable();
    }
    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    pacientes.find((paciente: any) => {
      if (paciente.id == this.id) {
        this.form.patchValue(paciente)
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


  pegarCep() {
    if (this.form.value.cep!.length >= 8) {
      this.api.getEndereco(this.form.value.cep!).subscribe((e) => {
        console.log(e);
        if (!e.erro) {
          this.form.patchValue(e)
        } else {
          this.erroCep = true
          this.limparMensagens()
        }
      });
    }
    console.log(this.form.value);
  }
  limparMensagens() {
    setTimeout(() => {
      this.erroCep = false
      this.mensagem = '';
    }, 2000);
  }
  cadastrar() {
    this.limparMensagens()
    if (this.formPaciente.invalid) {
      console.log('invalid');
      return;
    }
    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    let checarPaciente = pacientes.find((pac: any) => pac.cpf === this.form.value.cpf);
    console.log(this.form.value.id);
    if(this.form.value.id != null && this.formPaciente.disabled == false){
      let checarIgualdade = pacientes.find((pac: any) => JSON.stringify(pac) === JSON.stringify(this.form.value));
      if(checarIgualdade){
        this.mensagem = 'Nenhum campo alterado'
      }else{
        this.storagePacientes.setPacientes('PACIENTES', this.form.value);
        this.mensagem = 'Editado com sucesso';
      }
      return;
    }
    if (checarPaciente && this.formPaciente.disabled == false) {
      this.mensagem = 'CPF já cadastrado';
    } else if(this.formPaciente.disabled == false) {
      this.mensagem = 'Cadastrado com sucesso';
      this.storagePacientes.setPacientes('PACIENTES', this.form.value);
      this.formPaciente.resetForm();
    }
  }

  deletar() {
    this.storagePacientes.deletarPaciente('PACIENTES', this.form.value);
    this.formPaciente.resetForm();
    this.mensagem = 'Paciente excluido';
    this.limparMensagens();
  }
  editar() {
    // this.limparMensagens();
    // let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    // let checarIgualdade = pacientes.find((pac: any) => JSON.stringify(pac) === JSON.stringify(this.form.value));
    // if (checarIgualdade) {
    //   this.mensagem = 'Nenhum campo alterado';
    //   this.storagePacientes.editarPaciente('PACIENTES', this.form.value);
    //   return;
    // }
    //this.formLogin.resetForm();
    this.form.enable();
  }
}



import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, AbstractControl, NgForm, Validators, FormArray } from '@angular/forms';
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
  botao: string = 'Cadastrar'
  @ViewChild('formPaciente')
  formPaciente!: NgForm;


  form = this.fb.group({
    id: [null],
    nome: ['', { validators: [Validators.required, Validators.maxLength(80), Validators.minLength(4)] }],
    genero: ['', { validators: [Validators.required] }],
    data: ['', Validators.compose([Validators.required, this.validarData])],
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
    referencia: ['',],
    alergias: this.fb.array([]),
    cuidados: this.fb.array([])
  });
  // Alergias
  get alergias(){
    return this.form.controls["alergias"] as FormArray;
  }
  adicionarAlergias(){
    let alergiaForm = this.fb.group({
      tipo: [''],
    });
    this.alergias.push(alergiaForm);
  }
  excluirAlergia(index:number){
    this.alergias.removeAt(index);
  }
// Cudidados
  get cuidados(){
    return this.form.controls["cuidados"] as FormArray;
  }
  adicionarCuidado(){
    let cuidadoForm = this.fb.group({
      tipo: [''],
    });
    this.cuidados.push(cuidadoForm);
  }
  excluirCuidado(index:number){
    this.cuidados.removeAt(index);
  }


  validarData(controle: AbstractControl) {
    let data = controle.value;
    if (data) {
      if (controle.value.length <= 8) {
        let dia = data.slice(0, 2);
        let mes = data.slice(2, 4);
        let ano = data.slice(4, 8)
        if (dia <= 0 || dia > 31) {
          return { invalido: true }
        } else if (mes <= 0 || mes > 12) {
          return { invalido: true }
        } else if (ano == 0 || ano > 2023 || ano.length < 4) {
          return { invalido: true }
        }
        if((mes == 4 || mes ==6 || mes == 9 || mes == 11) && dia>30){
          return { invalido: true }
        }else if(mes==2 && dia>28){
          return { invalido: true }
        }
      }
    }


    return null;

  }



  constructor(private fb: FormBuilder, private storagePacientes: StoragePacienteService, private rota: ActivatedRoute, private api: ServiceCepService) {
    this.atualizaIdUrl();
  }

  ngOnInit(): void {

  }

  atualizaIdUrl() {
    this.rota.params.subscribe(params => {
      this.id = params['id'];
    })

    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    pacientes.find((paciente: any) => {
      if (paciente.id == this.id) {
        this.form.patchValue(paciente);
        paciente.alergias.forEach((alergia:any) => {
          let alergiaForm = this.fb.group({
            tipo: [alergia.tipo],
          });
          this.alergias.push(alergiaForm);
        });
        paciente.cuidados.forEach((cuidado:any) => {
          let cuidadosForm = this.fb.group({
            tipo: [cuidado.tipo],
          });
          this.cuidados.push(cuidadosForm);
        });
      }
    })
    if(this.id) {
      this.form.disable();
    }

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
  }
  limparMensagens() {
    setTimeout(() => {
      this.erroCep = false
      this.mensagem = '';
    }, 2000);
  }
  cadastrar() {
    console.log(this.form.value);
    this.limparMensagens()
    if (this.formPaciente.invalid) {
      console.log('invalid');
      return;
    }
    let pacientes = this.storagePacientes.getPacientes('PACIENTES');
    let checarPaciente = pacientes.find((pac: any) => pac.cpf === this.form.value.cpf);
    console.log(this.form.value.id);
    if (this.form.value.id != null && this.formPaciente.disabled == false) {
      let checarIgualdade = pacientes.find((pac: any) => JSON.stringify(pac) === JSON.stringify(this.form.value));
      if (checarIgualdade) {
        this.mensagem = 'Nenhum campo alterado'
      } else {
        this.storagePacientes.setPacientes('PACIENTES', this.form.value);
        this.mensagem = 'Editado com sucesso';
      }
      return;
    }
    if (checarPaciente && this.formPaciente.disabled == false) {
      this.mensagem = 'CPF já cadastrado';
    } else if (this.formPaciente.disabled == false) {
      this.mensagem = 'Cadastrado com sucesso';
      this.storagePacientes.setPacientes('PACIENTES', this.form.value);
      this.formPaciente.resetForm();
    }
  }

  deletar() {
    this.storagePacientes.deletarPaciente('PACIENTES', this.form.value);
    this.formPaciente.resetForm();
    this.mensagem = 'Paciente excluido';
    this.formPaciente.disabled;
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



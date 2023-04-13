import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit{
  constructor(private fb : FormBuilder){
    this.form.setValue(this.paciente2);
  }
  ngOnInit(): void {
    //this.form.setValue(this.paciente2);
  }
  paciente:any = {}
  paciente2:any={
    nome : 'geovani',
    genero : 'masculino',
    data : '1010',
    cpf : '555555',
    rg : '101015',
    estadoCivil : 'solteiro',
    telefone : '1616549646',
    email : 'geovane@gmail.com',
    naturalidade : 'florida',
    emergencia : '4165654654',
    convenio : "sus",
    carteira : 101525,
    validade : 'asasas',
    cep : '88045397',
    cidade : 'florida',
    estado : 'sc',
    logradouro : 'servidao andrade',
    numero : '27',
    complemento : 'casa',
    bairro : 'saco dos limoes',
    referencia : 'ponto final',
  }


  form = this.fb.group({
    nome : ['',{validators: [Validators.required,Validators.maxLength(80),Validators.minLength(4)]}],
    genero : ['',{validators: [Validators.required]}],
    data : ['',{validators: [Validators.required]}],
    cpf : ['',{validators: [Validators.required]}],
    rg : ['',{validators: [Validators.required,Validators.maxLength(20)]}],
    estadoCivil : ['',{validators: [Validators.required]}],
    telefone : ['',{validators: [Validators.required]}],
    email : ['',{validators: [Validators.email]}],
    naturalidade : ['',{validators: [Validators.required,Validators.maxLength(100),Validators.minLength(5)]}],
    emergencia : ['',{validators: [Validators.required]}],
    convenio : ['Sem convênio'],
    carteira : [''],
    validade : [''],
    cep : ['',{validators: [Validators.required]}],
    cidade : ['',{validators: [Validators.required]}],
    estado : ['',{validators: [Validators.required]}],
    logradouro : ['',{validators: [Validators.required]}],
    numero : ['',{validators: [Validators.required]}],
    complemento : ['',{validators: [Validators.required]}],
    bairro : ['',{validators: [Validators.required]}],
    referencia : ['',{validators: [Validators.required]}],
  });


  cadastrar(){
    this.paciente = this.form.value;
    console.log(this.paciente);
    console.log(this.form.value);


  }
}

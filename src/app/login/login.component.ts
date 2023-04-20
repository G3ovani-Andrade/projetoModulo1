import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../User/User';
import { StorageService } from '../services/login/storage.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl, NgForm, FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: any = [];
  mensagemCadastro:string="";
  usuarioLogado:any={};
  mensagem: string = '';
  @ViewChild('loginForm')
  formLog!: NgForm;
  @ViewChild('CadastroForm')
  formCad!: NgForm;
  formularioLogin:any = FormGroup;
  formulariocadastro:any = FormGroup;

  constructor(private storage: StorageService,private rotas : Router,private fb: FormBuilder) {

  }
  ngOnInit() {
    this.checarUsuarioLogado()
    this.criarFormLogin();
    this.criarFormCadastro();
  }
  checarUsuarioLogado(){
    if(this.storage.retornarUsuarioLogado()){
      this.rotas.navigate(['/home']);
    }
  }
  criarFormLogin() {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  criarFormCadastro() {
    this.formulariocadastro = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(10)]],
      confirmar: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  login() {
    this.limparMensagem();
    if(this.formularioLogin.invalid){
      return
    }

    this.usuarios = this.storage.getLocalStorage('USUARIOS');
    if (this.checarUsuario(this.usuarios,this.formularioLogin.value,'login')) {
      this.mensagem = 'Usuário ou senha inválido'
    } else {
      this.storage.setUsuarioLogado('USUARIO_LOGADO',this.formularioLogin.value);
      this.rotas.navigate(['/home']);
    }
  }

  checarUsuario(usuarios: Usuario[],objBusca:Usuario,tipo:string) {
    let novoArray;
    if(tipo == 'login'){
      novoArray = usuarios.find((usuario) => JSON.stringify(usuario) === JSON.stringify(objBusca));
    }else{
      novoArray = usuarios.find((usuario) => JSON.stringify(usuario.email) === JSON.stringify(objBusca.email));
    }

    if (novoArray) {
      console.log('false');

      return false;
    } else {
      console.log('treu');
      return true;
    }
  }
  limparMensagem() {
    setTimeout(() => {
      this.mensagem = "";
      this.mensagemCadastro = "";
    }, 3000);
  }
  cadastroUsuario(){
    this.limparMensagem();
    if(this.formulariocadastro.invalid){
      console.log('invalid');
      return
    }
    if(this.formulariocadastro.get('senha').value === this.formulariocadastro.get('confirmar').value){
        this.usuarios = this.storage.getLocalStorage('USUARIOS');
        if(this.checarUsuario(this.usuarios,this.formulariocadastro.value,'')){
          this.usuarios.push({email:this.formulariocadastro.get('email').value,senha:this.formulariocadastro.get('senha').value});
          this.storage.setLocalStorage('USUARIOS',this.usuarios);
          this.criarFormCadastro();
          this.mensagemCadastro = "Cadastro realizado com sucesso"
          this.formCad.resetForm();
        }else{
          this.mensagemCadastro = "Email já Cadastrado"
        }
    }else{
      this.mensagemCadastro = "As senhas devem ser iguais"
    }
  }

}

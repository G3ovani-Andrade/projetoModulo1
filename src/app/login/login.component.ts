import { Component, OnInit } from '@angular/core';
import { Usuario } from '../User/User';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  numero: boolean = false;
  minuscula: boolean = false;
  maiuscula: boolean = false;
  especial: boolean = false;
  usuarios: any = [];
  confirmarSenha:string ="";
  mensagemCadastro:string="";
  usuarioLogado:any={};
  constructor(private storage: StorageService,private rotas : Router) {
    this.usuarioLogado = this.storage.getUsuarioLogado('USUARIO_LOGADO');
  }

  mensagem: string = ''
  loginFormModel: Usuario = {
    email: '',
    senha: ''
  }
  cadastroFormModel: Usuario = {
    email: '',
    senha: ''
  }
  ngOnInit() {
    this.checarUsuarioLogado()
    this.criarFormLogin();
    this.criarFormCadastro();
  }
  checarUsuarioLogado(){
    if(this.usuarioLogado.email != undefined){
      console.log(this.usuarioLogado.email);
      this.rotas.navigate(['/home']);
    }

  }
  criarFormLogin() {
    this.loginFormModel = {
      email: "",
      senha: "",
    }
  }
  criarFormCadastro() {
    this.cadastroFormModel = {
      email: "",
      senha: "",
    }
  }
  login() {
    this.limparMensagem();
    if(!this.verificarEmail(this.loginFormModel.email)){
      return
    }else if(this.loginFormModel.senha.length<10){
      return
    }


    this.usuarios = this.storage.getLocalStorage('USUARIOS');
    if (this.checarUsuario(this.usuarios,this.loginFormModel,'login')) {
      this.mensagem = 'Usuário ou senha inválido'
    } else {
      this.storage.setUsuarioLogado('USUARIO_LOGADO', this.loginFormModel);
      this.rotas.navigate(['/home']);
    }
  }

  verificarEmail(email: string){
    let emailRegex = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}([.]?){1}([a-z]?){2,}$/i;
    return emailRegex.test(email);
  }

  checarUsuario(usuarios: Usuario[],objBusca:Usuario,tipo:string) {
    let novoArray;
    if(tipo == 'login'){
      novoArray = usuarios.find((usuario) => JSON.stringify(usuario) === JSON.stringify(objBusca));
    }else{
      novoArray = usuarios.find((usuario) => JSON.stringify(usuario.email) === JSON.stringify(objBusca.email));
    }

    if (novoArray) {
      return false;
    } else {
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
    if(this.cadastroFormModel.senha == this.confirmarSenha){
      if(this.cadastroFormModel.senha.length<10){
        return
      }else{
        this.usuarios = this.storage.getLocalStorage('USUARIOS');
        if(this.checarUsuario(this.usuarios,this.cadastroFormModel,'')){
          this.usuarios.push(this.cadastroFormModel);
          this.storage.setLocalStorage('USUARIOS',this.usuarios);
          this.criarFormCadastro();
          this.confirmarSenha='';
          this.mensagemCadastro = "cadastro realizado com sucesso"
        }else{
          this.mensagemCadastro = "Email já Cadastrado"
        }
      }
    }else{
      this.mensagemCadastro = "As senhas devem ser iguais"
    }



  }

//   formulario!: FormGroup;
//   ngOnInit(): void {
//     this.formulario = new FormGroup({
//       email: new FormControl('',[Validators.required, Validators.email]),
//       senha: new FormControl('',[Validators.required, Validators.minLength(10)]),
//       confirmarSenha: new FormControl ('',[Validators.required, Validators.minLength(10)])
//     });
//   }

//  get email(){
//   return this.formulario.get('email')!;
//  }
//  enviar(){
//   console.log(this.formulario.value.email);

//  }

}

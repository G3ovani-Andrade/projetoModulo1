import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { CadastroMedicamentosComponent } from './cadastro-medicamentos/cadastro-medicamentos.component';
import { GuardaLoginGuard } from './guards/guardaLogin/guarda-login.guard';
import { ListagemHistoricoComponent } from './listagem-historico/listagem-historico.component';
import { HistoricoMedicacaoComponent } from './historico-medicacao/historico-medicacao.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent,canActivate:[GuardaLoginGuard]},
  {path: 'cadastroPaciente', component:CadastroPacienteComponent,canActivate:[GuardaLoginGuard]},
  {path: 'cadastroPaciente/:id', component:CadastroPacienteComponent,canActivate:[GuardaLoginGuard]},
  {path: 'cadastroMedicamento', component:CadastroMedicamentosComponent,canActivate:[GuardaLoginGuard]},
  {path: 'cadastroMedicamento/:id/:medicamento', component:CadastroMedicamentosComponent,canActivate:[GuardaLoginGuard]},
  {path: 'listagemMedicamento', component:ListagemHistoricoComponent,canActivate:[GuardaLoginGuard]},
  {path: 'historicoMedicacao/:id', component:HistoricoMedicacaoComponent,canActivate:[GuardaLoginGuard]},
  {path: '**', component:HomeComponent,canActivate:[GuardaLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

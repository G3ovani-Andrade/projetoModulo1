import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { CadastroMedicamentosComponent } from './cadastro-medicamentos/cadastro-medicamentos.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'cadastroPaciente', component:CadastroPacienteComponent},
  {path: 'cadastroPaciente/:id', component:CadastroPacienteComponent},
  {path: 'cadastroMedicamento', component:CadastroMedicamentosComponent},
  {path: '**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

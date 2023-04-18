import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { provideEnvironmentNgxMask,NgxMaskDirective } from 'ngx-mask';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { CadastroMedicamentosComponent } from './cadastro-medicamentos/cadastro-medicamentos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastroPacienteComponent,
    PesquisaComponent,
    ToolbarComponent,
    MenuLateralComponent,
    CadastroMedicamentosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
  ],
  providers: [
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

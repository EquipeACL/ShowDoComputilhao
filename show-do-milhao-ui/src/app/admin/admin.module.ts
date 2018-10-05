import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, FormCadastroComponent],
  exports: [LoginComponent, FormCadastroComponent]
})
export class AdminModule { }

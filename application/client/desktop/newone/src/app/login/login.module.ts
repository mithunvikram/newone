import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18NextModule } from 'angular-i18next';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
CommonModule,
FormsModule,
RouterModule,
I18NextModule.forRoot()
],
  declarations: [
LoginComponent
]
  
  
})
export class LoginModule { }
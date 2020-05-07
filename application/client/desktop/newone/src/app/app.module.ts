import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TranslatorModule } from './translator/translator.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { TemplateModule } from './template/template.module';
import { FooterModule } from './footer/footer.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
  HttpClientModule,
UserModule,
HomeModule,
SignupModule,
LoginModule,
BrowserModule,
AppRoutingModule,
TranslatorModule,
HeaderModule,
TemplateModule,
  FooterModule,
AdminModule
],
  providers: [
  ],
  bootstrap: [
    AppComponent
]
})
export class AppModule { }
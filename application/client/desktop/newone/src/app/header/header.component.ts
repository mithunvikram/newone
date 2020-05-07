import { Component, OnInit, Inject } from '@angular/core';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { LoginService } from '../login/login.service';
import { BroadcastService } from '../auth/broadcast.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

public isAdminUser = false;
public userId: string;
public currentLanguage: String;
public confirmLangChangeModal: String = 'none';
public language = 'en';
public languages = ['en', 'ta', 'es']
  constructor(
@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
private router: Router,
private loginService: LoginService,
public broadcastService: BroadcastService

) {
	this.broadcastService.currentUserName.subscribe(headerPermission => {
			if (headerPermission && headerPermission.Project && headerPermission.Project.Fields && headerPermission.Project.Fields.config === 'true') {
			 this.isAdminUser = true;
			 } else {
				 this.isAdminUser = false;
			 }
	});
}

  ngOnInit() {
    this.userId = sessionStorage.getItem('Id');;
  }

     

private updateState(lang: string) {
		this.language = lang;
		}
changeLanguage(lang) {
		if (lang !== this.i18NextService.language) {
		this.i18NextService.changeLanguage(lang).then(x => {
		this.updateState(lang);
		});
		}
		this.userId = sessionStorage.getItem('Id');
		if (this.userId !== null) {
		this.logout();
		} else {
		document.location.reload();
		}
		}
onCloseHandled() {
		this.confirmLangChangeModal = 'none';
		}
confirmLangChange() {
		this.changeLanguage(this.currentLanguage);
		this.onCloseHandled();
		}
confirmLangModel(lang) {
		this.userId= sessionStorage.getItem('Id');
		if (this.userId !== null) {
		this.confirmLangChangeModal = 'block';
		this.currentLanguage = lang;
		} else {
		this.changeLanguage(lang);
		this.onCloseHandled();
		}
		}
 logout() {
		const temp = {
			 id: sessionStorage.getItem('Id')
		};
		this.loginService.Logout(temp).subscribe(data => {
			sessionStorage.clear();
		this.userId = sessionStorage.getItem('Id');
		this.router.navigate(['']);
		}, error => {
			console.error('error:', error);
		});
		}
}

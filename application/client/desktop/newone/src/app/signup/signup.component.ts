import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  public show: boolean;


  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.show = false;

  }

  ngOnInit() {
  }

  signup(user) {
    this.loginService.signup(user).subscribe(data => {
      this.router.navigate(['login']);
    });
  }

  hideEye() {
    this.show = !this.show;
  }

}

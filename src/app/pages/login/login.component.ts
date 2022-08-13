import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  disable: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  async loginEmail(f: NgForm) {
    console.log(f.value);

    this.disable = true;
    try {

      if (f.value.email == "") {
        return;
      }
      if (f.value.password == "") {
        return;
      }

      await this.auth.loginWithEmail(f.value.email, f.value.password);
      f.resetForm();

    } catch (error) {
      console.log(error);

    }
    this.disable = false
  }
  async loginGoogle(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await this.auth.loginWithGoogle();
  }
  async loginGithub(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await this.auth.loginWithGithub();
  }

}

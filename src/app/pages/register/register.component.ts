import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  disable: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  async registerEmail(f: NgForm) {
    console.log(f.value);

    this.disable = true;
    try {

      if (f.value.email == "") {
        return;
      }
      if (f.value.password == "") {
        return;
      }
      if (f.value.password !== f.value.confirmPassword) {
        return;
      }

      await this.auth.registerWithEmail(f.value.email, f.value.password, f.value.name);
      f.resetForm();
    } catch (error) {
      console.log(error);

    }
    this.disable = false
  }
  async signUpGoogle(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await this.auth.loginWithGoogle();
  }
  async signUpGithub(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await this.auth.loginWithGithub();
  }

}

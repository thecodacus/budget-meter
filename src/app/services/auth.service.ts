import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { StoreService } from './store.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private store: StoreService, private router: Router) {
    this.auth.currentUser.then(user => {
      console.log(user);

      if (user) this.store.setStore(user.uid)
    })

  }
  async loginWithEmail(email: string, password: string) {
    try {
      let resp = await this.auth.signInWithEmailAndPassword(email, password)
      localStorage.setItem('token', 'true');
      localStorage.setItem('creds', JSON.stringify(resp))
      this.router.navigate(['/dashboard']);
      this.store.setStore(resp.user.uid);
    } catch (error) {
      console.log(error);
      this.router.navigate(["/login"]);
    }
  }
  async registerWithEmail(email: string, password: string, name: string | null) {
    try {
      let resp = await this.auth.createUserWithEmailAndPassword(email, password)
      resp.user.updateProfile({ displayName: name })
      localStorage.setItem('token', 'true');
      localStorage.setItem('creds', JSON.stringify(resp))
      this.router.navigate(['/dashboard']);
      this.store.setStore(resp.user.uid);
      return resp;
    } catch (error) {
      console.log(error);
      this.router.navigate(["/register"]);
    }
  }
  async updateDisplayName(name: string) {
    let user = await this.auth.currentUser;
    await user.updateProfile({
      displayName: name
    });
  }
  async getCurrentUser() {
    return await this.auth.currentUser
  }

  async logout() {
    await this.auth.signOut();
    localStorage.removeItem('token')
    localStorage.removeItem('creds')
    this.router.navigate(["/login"]);
  }
}

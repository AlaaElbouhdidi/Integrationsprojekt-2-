import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private auth: AngularFireAuth,
  ) { }

  async register(email: string, password: string): Promise<void> {
      try {
          const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
          if (userCredential.user) {
              await userCredential.user.sendEmailVerification();
          }
      } catch (e) {
          throw e;
      }
  }

}

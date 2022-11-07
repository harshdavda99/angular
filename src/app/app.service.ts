import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private Fireservice: AngularFireAuth, private FireDatabase: AngularFirestore) { }

  async FireRegister(Email: string, password: string) {
    return await this.Fireservice.createUserWithEmailAndPassword(Email, password);
  }

  async AdduserDetaials(data: string) {
    return await this.FireDatabase.collection('Users').add(data);
  }

  async LoginUser(Email: string, password: string) {
    return await this.Fireservice.signInWithEmailAndPassword(Email, password);
  }

  async getUser(Email: string) {
    return await this.FireDatabase.firestore.collection('Users').where('Email', ('!='), Email).get();
  }
}

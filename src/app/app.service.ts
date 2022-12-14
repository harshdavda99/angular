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

  async AdduserDetaials(data: any) {
    return await this.FireDatabase.collection('Users').add(data);
  }

  async AdduserDetaialsMessages(data: any) {
    return await this.FireDatabase.collection('message').add(data);
  }

  async LoginUser(Email: string, password: string) {
    return await this.Fireservice.signInWithEmailAndPassword(Email, password);
  }

  async getUsers(Email: string) {
    return await this.FireDatabase.firestore.collection('Users').where('Email', ('!='), Email).get()
  }

  async getUser(Email: string) {
    return await this.FireDatabase.firestore.collection('Users').where('Email', ('=='), Email).get()
  }

  async getreceiverprofile(uid:string) {
    return await this.FireDatabase.firestore.collection('Users').where('uid', ('=='), uid).get()
  }

  async getchatlist(sender_uid:string, receiver_uid: string) {
    return await this.FireDatabase.firestore.collection('message').where('receiver_uid', ('=='), receiver_uid).where('sender_uid', ('=='), sender_uid).get()
  }

}

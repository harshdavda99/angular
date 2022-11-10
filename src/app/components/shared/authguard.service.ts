import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  
  public accessToken: BehaviorSubject<any>;
  // public firstaccessToken: BehaviorSubject<any>;
  public accessTokenSubject$: Observable<any>;

  constructor() { 
    // this.firstaccessToken = new BehaviorSubject<boolean>(false)
    this.accessToken = new BehaviorSubject<any>(
    (sessionStorage.getItem('accessToken') || '')
    );
    this.accessTokenSubject$ = this.accessToken.asObservable();
  }

  public acesstokenset(a:any) {
    sessionStorage.setItem('accessToken',a)
    this.accessToken.next(a)
  }


}

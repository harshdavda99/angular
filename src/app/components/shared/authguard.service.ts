import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  
  public accessToken: BehaviorSubject<any>;
  public accessTokenSubject$: Observable<any>;

  constructor() { 

    this.accessToken = new BehaviorSubject<any>(
    (sessionStorage.getItem('accessToken') || '')
    );
    this.accessTokenSubject$ = this.accessToken.asObservable();
  }


}

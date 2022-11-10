import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from './authguard.service'; 
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  public token: any;
  constructor(private authgaurdservice: AuthguardService, private  route : Router  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authgaurdservice.accessTokenSubject$.subscribe((res:any) => {
        this.token = res;
      });
      if(this.token !== '' && this.token.length > 0) {
            return true
      } else {
        this.route.navigateByUrl('login')
        return false;
      }
  }


}

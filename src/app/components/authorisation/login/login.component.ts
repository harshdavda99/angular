import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { AppService} from '../../../app.service'
import { Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup ;
  constructor(private fb: FormBuilder, private App_service: AppService, private route: Router) {
    this.myForm = this.fb.group({
      Email:'',
      Password:'',
    });
  }
  get formData(){
    return this.myForm.controls
  }
  ngOnInit(): void {
  }
  onSubmit(){
    this.App_service.LoginUser(this.myForm.controls['Email'].value, this.myForm.controls['Password'].value).then((logres: any) => {
      if(logres?.user?.multiFactor?.user){
        sessionStorage.setItem('accessToken', logres?.user?.multiFactor?.user?.accessToken);
        this.App_service.getUser(logres?.user?.multiFactor?.user?.email).then((querySnapshot: any) => {
          const tempDoc = querySnapshot.docs.map((doc: any) => {
            return { id: doc.id, ...doc.data() }
          })
          if(tempDoc[0]){
            sessionStorage.setItem("userDetails", JSON.stringify(tempDoc[0]));
            this.route.navigateByUrl('/dashboard');
          }
        });
      }
    });
  }
}

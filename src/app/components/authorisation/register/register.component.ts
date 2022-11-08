import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { AppService} from '../../../app.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup ;
  constructor(private fb: FormBuilder, private App_service: AppService) {
    this.myForm = this.fb.group({
      Email:'',
      Password:'',
      FirstName:'',
      LastName:'',
    });
  }
  get formData(){
    return this.myForm.controls
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.App_service.FireRegister(this.myForm.controls['Email'].value, this.myForm.controls['Password'].value).then((res) =>{
      console.log('res', res.user?.multiFactor);
    });
  }

}

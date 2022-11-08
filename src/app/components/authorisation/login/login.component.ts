import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  collapseShow: any;
  myForm: FormGroup ;
  constructor(private fb: FormBuilder) { 
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
  toggleCollapseShow(id: any){
    console.log(id)
    this.collapseShow = id
  }

  onSubmit(){

  }
}

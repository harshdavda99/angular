import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';
import { AppService} from '../../../app.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup ;
  constructor(private fb: FormBuilder, private App_service: AppService, private route: Router,  private socketService: WebsocketService) {
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
    this.App_service.FireRegister(this.myForm.controls['Email'].value, this.myForm.controls['Password'].value).then((res: any) =>{
      if(res.user?.multiFactor){
        let values =  {
          uid: res.user?.multiFactor?.user.uid,
          Email: res.user?.multiFactor?.user.email,
          LastName: this.myForm.controls['LastName'].value,
          FirstName: this.myForm.controls['FirstName'].value,
        }
        this.App_service.AdduserDetaials(values).then((add_message: any) => {
          if(add_message){
            let messagess = {
              message:[],
              Email: res.user?.multiFactor?.user.email,
              uid:  res.user?.multiFactor?.user.uid,
            }
            this.App_service.AdduserDetaialsMessages(messagess).then((msg_added: any) => {
              if(msg_added){
                this.myForm.reset();
                this.socketService.sendMessage(values);
                this.route.navigateByUrl('/login')
              }
            })
          }
        })
      }
    });
  }

}

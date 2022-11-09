import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  params: any;
  myForm: FormGroup ;
  userid: any;
  messagelist: any [];

  constructor(private App_service: AppService, private fb:FormBuilder,  private route : Router, private active: ActivatedRoute) {
    this.myForm = this.fb.group({
      message:'',
      time_stamp: '',
      sender_uid:'',
      receiver_uid:''
    });
      this.params = this.active.snapshot.params;
      this.messagelist = []
      let data = JSON.parse(`${sessionStorage.getItem("userDetails")}`)
      this.userid = data?.uid;
      console.log(' this.userid',  this.userid)
  }
  get formData(){
    return this.myForm.controls
  }
  ngOnInit(): void {
      this.senderData();
      this.receiverData();
      setTimeout(() =>{
        console.log("messagelist", this.messagelist );
      }, 3000);
  }

senderData(){
  this.App_service.getchatlist(this.userid, this.params.id ).then((res: any) => {
    let tempDoc = res.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() }
    })
    if(tempDoc.length){
       this.messagelist.push(tempDoc);
        }
  });
}

receiverData(){
  this.App_service.getchatlist( this.params.id,this.userid ).then((res: any) => {
    let tempDoc = res.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() }
    })
    if(tempDoc.length){
   this.messagelist.push(tempDoc);
    }
  });
}
  onSubmit(){
    let date = new Date()
    let messagedata = {
      sender_uid: this.userid,
      receiver_uid: this.params?.id,
      time_stamp: date.getTime(),
      message: this.myForm.controls['message'].value,
    }
    this.App_service.AdduserDetaialsMessages(messagedata).then((msg_added: any) => {
      if(msg_added){
        this.myForm.reset();
      }
    })
  }

}

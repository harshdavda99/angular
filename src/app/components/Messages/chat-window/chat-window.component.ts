import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { WebsocketService } from 'src/app/websocket.service'

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
  receiverProfile: any;

  constructor(private App_service: AppService, private fb:FormBuilder,  private route : Router, private active: ActivatedRoute, private socketService: WebsocketService) {
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
  }
  get formData(){
    return this.myForm.controls
  }
  ngOnInit(): void {
    this.getreceiverprofile();

      this.senderData();
      this.receiverData();
      this.socketService.getNewMessage().subscribe((data: any) => this.messagelist.push(data));

      setTimeout(() =>{
        let arraylist = [].concat.apply([],this.messagelist)
        this.messagelist = arraylist.sort((a:any,b:any) => a.time_stamp - b.time_stamp);

      }, 2000);
  }


  getreceiverprofile(){
    this.App_service.getreceiverprofile(this.params.id ).then((res: any) => {
      let tempDoc = res.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() }
      })
      if(tempDoc.length){
         this.receiverProfile = tempDoc[0];
          }
    });
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
        this.messagelist.push(messagedata);
        this.socketService.sendMessage(messagedata);
      }
    })
  }

}

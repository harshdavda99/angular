import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  userslist: any;
  ProfileData: any;

  constructor(private App_service: AppService, private route: Router ) {
    this.getUserList();
    let data = JSON.parse(`${sessionStorage.getItem("userDetails")}`)
    this.ProfileData = data
  }

  ngOnInit(): void {
    this.getUserList();
    console.log(this.ProfileData)
  }

  getUserList(){
    this.App_service.getUsers('harshdavda99@gmail.com').then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() }
      })
      this.userslist = tempDoc;
    });
  }

  chatbox(data :any){
    console.log('data', data);
    if(data?.uid){
        this.route.navigateByUrl(`/chatbox/${data?.uid}`);
    }
  }

}

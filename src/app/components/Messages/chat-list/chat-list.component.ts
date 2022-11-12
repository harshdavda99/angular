import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  userslist: any;
  ProfileData: any;

  constructor(private App_service: AppService, private route: Router,  private socketService: WebsocketService ) {
    let data = JSON.parse(`${sessionStorage.getItem("userDetails")}`)
    this.ProfileData = data
    this.getUserList();
  }

  ngOnInit(): void {
    this.getUserList();
    this.socketService.getRegisteredUser().subscribe((data: any) => {
      if(data){
        this.userslist.push(data);
      }
    });
  }

  getUserList(){
    this.App_service.getUsers(this.ProfileData?.Email).then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() }
      })
      this.userslist = tempDoc;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  userslist: any;
  ProfileData: any;

  constructor(private App_service: AppService) {
    this.getUserList();
    let data = sessionStorage.getItem('userDetails');
    this.ProfileData = JSON.parse(JSON.stringify(data))

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

}

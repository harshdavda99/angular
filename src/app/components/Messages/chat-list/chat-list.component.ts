import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  userslist: any;

  constructor(private App_service: AppService) { 
    this.getUserList();

  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.App_service.getUser('harshdavda99@gmail.com').then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      this.userslist = tempDoc;
      console.log('list',this.userslist )
    });
  }

}

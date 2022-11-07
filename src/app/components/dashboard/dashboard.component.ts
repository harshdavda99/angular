import { Component, OnInit } from '@angular/core';
import {AppService } from '../../app.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userslist: any;

  constructor(private App_service :AppService) { }

  ngOnInit(): void {
    this.App_service.getUser('harshdavda99@gmail.com').then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      this.userslist = tempDoc;
      console.log('list',this.userslist )
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {AppService } from '../../app.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userslist?: any;
  todaysDate?: Date

  constructor(private App_service :AppService, private route: Router) { }

  ngOnInit(): void {
    this.todaysDate = new Date()
  }

  Logout(){
    sessionStorage.clear();
    console.log('helllod')
    this.route.navigateByUrl('login')
  }
}

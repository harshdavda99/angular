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
  }

}

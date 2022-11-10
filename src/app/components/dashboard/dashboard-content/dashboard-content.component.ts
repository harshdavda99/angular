import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  ProfileData: any;

  constructor() { 
    let data = JSON.parse(`${sessionStorage.getItem("userDetails")}`)
    this.ProfileData = data

  }

  ngOnInit(): void {
  }

}

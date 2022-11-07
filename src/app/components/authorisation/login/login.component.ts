import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  collapseShow: any;

  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapseShow(id: any){
    console.log(id)
    this.collapseShow = id
  }
}

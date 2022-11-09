import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup } from '@angular/forms';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  params: any;
  myForm: FormGroup ;

  constructor(private fb:FormBuilder,  private route : Router, private active: ActivatedRoute) { 
    this.myForm = this.fb.group({
      message:[],
      Email:'',
      uid:''
    });
      this.params = this.active.snapshot.params;
  }
  get formData(){
    return this.myForm.controls
  }
  ngOnInit(): void {
    // console.log('??????????', this.route)
    console.log('????????????',  this.params.id)
  }

}

import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  params: any;
  myForm: FormGroup ;

  constructor(private App_service: AppService, private fb:FormBuilder,  private route : Router, private active: ActivatedRoute) { 
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
    this.App_service.getchatdata( this.params.id).then((res: any) => {
      const tempDoc = res.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() }
      })        
      console.log('tempDoc', tempDoc)
    });
  }

}

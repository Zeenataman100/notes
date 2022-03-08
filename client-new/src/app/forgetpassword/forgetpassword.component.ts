import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
  }

  doForgot(dataforgot:any){
    this.service.doForgot(dataforgot.value)
    console.log(dataforgot.value);
    }
}

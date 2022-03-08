import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
  }

  doLogin(datalogin:any){
  // console.log(datalogin.value);
  this.service.doLogin(datalogin.value)
  console.log(datalogin.value);
  }

}

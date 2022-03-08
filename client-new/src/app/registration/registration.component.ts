import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
  }

  doRegister(datareg:any){
    this.service.doRegister(datareg.value)
    console.log(datareg.value);
    }
  }

import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'google-keep-clone-two';

  constructor(private services: AppServiceService) {

  }

  ngOnInit(): void {
this.getDataFromAPI();
  }

  getDataFromAPI() {
    this.services.getData().subscribe((response) => {
      console.log('Responce from API is ', response);
    },(error) => {
    console.log('Error is', error);
    
    })
  }
}

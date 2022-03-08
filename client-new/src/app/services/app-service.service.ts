import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('http://localhost:3001/getData')
  }
  doLogin(data:any){
    console.log(data,"call in service");
    return this.http.post('http://localhost:3001/login', data).subscribe((data)=>{
      console.log(data);
    })
  }
  doRegister(data:any){
    console.log(data,"call in service");
    return this.http.post('http://localhost:3001/register', data).subscribe((data)=>{
      console.log(data);
    })
  }
  doForgot(data:any){
    console.log(data,"call in service");
    return this.http.post('http://localhost:3001/forgot', data).subscribe((data)=>{
      console.log(data);
    })
  }
}
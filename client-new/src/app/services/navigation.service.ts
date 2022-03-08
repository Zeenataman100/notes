import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public navTabs : Object[]= []
  

  constructor() { }
  setNavtab(tab:any){
    return this.navTabs.push(tab)
  }
  getNavTab(){
    return this.navTabs
  }
  deleteNavTab (tab:any){
  const x =   this.navTabs.findIndex(()=>this.navTabs.find(()=>tab))
  delete this.navTabs[x]
  console.log(this.navTabs);
  
    
    // delete this.navTabs[tab]
  }


}

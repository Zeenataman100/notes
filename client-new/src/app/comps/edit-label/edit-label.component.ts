import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  editlab : boolean = true
  localArray: String[] = [];
  constructor(public navservice:NavigationService) { }

  ngOnInit(): void {
  }

  AddDialog(dial: NgForm){
    this.localArray.push(dial.value.edit)
    this.navservice.setNavtab({label:dial.value.edit,path:''})
    dial.resetForm()  
    // console.log(this.localArray);
  }
  editLabel(){
this.editlab = false
  }
  deleteThis(a:any){
    console.log(a,this.localArray.indexOf(a));
    // this.localArray.indexOf(a)
    delete this.localArray[this.localArray.indexOf(a)]
    this.navservice.deleteNavTab(a)
    console.log(delete this.localArray[this.localArray.indexOf(a)]);
    
  }
}

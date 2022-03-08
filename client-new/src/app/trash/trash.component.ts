import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  getbin:any
  constructor(public service: NoteService) { }

  ngOnInit(): void {
    this.getbin = this.service.getBin()
  }

  DelForver(dl:any){
  console.log(dl);
  
  }
  Restore(res:any){
console.log(res);

  }
}

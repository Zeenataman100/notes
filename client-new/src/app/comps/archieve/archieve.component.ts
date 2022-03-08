import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.scss']
})
export class ArchieveComponent implements OnInit {
  getarcdata:any
  constructor(public service: NoteService) { }

  ngOnInit(): void {
  this.getarcdata = this.service.getArcheive()
  }

  Trash(tr:any){
    console.log(tr);
    
      }
      UnArchieve(ua:any){
    console.log(ua);
    
      }
      Pin(pn:any){
    console.log(pn);
    
      }
}

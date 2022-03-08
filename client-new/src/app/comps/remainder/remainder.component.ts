import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {
  getrem:any
  constructor(public service: NoteService) { }

  ngOnInit(): void {
    this.getrem = this.service.getRemainder()
  }
  Trash(tr:any){
console.log(tr);

  }
  Remind(ua:any){
console.log(ua);

  }
  Pin(pn:any){
console.log(pn);

  }

}

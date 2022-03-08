import { findLast } from '@angular/compiler/src/directive_resolver';
import { Component, DoCheck,OnInit} from '@angular/core';
// import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit,DoCheck {

  notes: any;
 
  constructor(private noteService: NoteService) { }
  ngOnInit(): void {
    this.noteService.getNotes().subscribe(response => {
      if (response.status=="Success") {
        this.notes = response.data;
        console.log(this.notes);
        
      }});
  }

  ngDoCheck(){
  // this.noteService.getNotes().subscribe(response => {
  //     this.notes = response
  //   console.log("docheck");
    
  //   })
  }
  BinNotes(bnote:any){
    this.noteService.setBin(bnote)
  }
  RemaindNote(rnote:any){
this.noteService.setRemainder(rnote)
  }
  ArchNote(response :any){
        this.noteService.setArcheive(response)
        delete this.notes[this.notes.indexOf(response)]
  }
}

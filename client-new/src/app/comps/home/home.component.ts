import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public errMessage: string = '';

  public note: Note = new Note();
  public myNote = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('')
  });
  // public noteList!: Array<Note>;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }
  addNote() {
    if (!this.note.text || !this.note.title) {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }
    console.log(this.note, "hey ");
    

    this.noteService.addNote(this.note).subscribe(response => {
      if (response) {
        // this.noteList.push(this.note);
        this.note = new Note();
      } else {
        this.errMessage = 'We are unable to add the selected note.';
      }
    },error => {
      this.errMessage = 'Http failure response for http://localhost:3001/notes: 404 Not Found';
    }
    );
  }
}

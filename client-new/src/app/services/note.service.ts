import { Injectable } from '@angular/core';
// import { Note } from './note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public Archeive : Object[]= []
  public Bin : Object[]= []
  public Remainder : Object[]= []
  note = new Note();

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/notes');
  }
  addNote(note: Note): Observable<Note> {
    
    return this.http.post<Note>('http://localhost:3001/notes',note);
  }
  deleteNotes(noteid: number){
  return this.http.delete(`http://localhost:3000/notes/${noteid}`)

  }
  setArcheive(a:any){
    return this.Archeive.push(a)
  }
  getArcheive(){
    return this.Archeive
  }

  setBin(b:any){
    return this.Bin.push(b)
  }
  getBin(){
    return this.Bin
  }

  setRemainder(r:any){
    return this.Remainder.push(r)
  }
  getRemainder(){
    return this.Remainder
  }
}

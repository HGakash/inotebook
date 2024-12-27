import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import addNote from './addNote';
function Notes() {
const context = useContext(NoteContext);
const {notes,addNote} = context
  return (
    <>
    <addNote/>
    <div className="row my-3">
    <h2>Your Notes</h2>
    {notes.map((note, index) => (
      <div className="col-md-3" key={index}>
        <NoteItem note={note} />
      </div>
      
    ))}
  </div>
  </>
  )
}

export default Notes

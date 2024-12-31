import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

function NoteItem(props) {
  //using the context api to change the state of the things
   const context = useContext(NoteContext);
   const {deleteNote} = context
   const {note,updateNote} =props;
  return (
    <div className="card my-3">
    <div className="card-body">
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
      <p className="card-text"><b>{note.tag}</b></p>
      <br/>
      <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
        props.showAlert("Deleted sucessfully","success");
      }}></i>
      <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}} ></i>
    </div>
  </div>
  )
}

export default NoteItem

        
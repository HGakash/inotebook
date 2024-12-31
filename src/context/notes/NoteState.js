import { useState } from "react";
import NoteContext from "./NoteContext";

//passing the state to all the childrens who import this function
const NoteState = (props) => {
  const host = 'http://localhost:5000'
    const noteInitial = []

const [notes, setNotes] = useState(noteInitial)

//Get all Notes
const getNote = async () => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
   });
  const json = await response.json();
  setNotes(json)
  console.log(json);
}

//Add a note
const addNote = async (title,description,tag) => {
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})
   });
  //To fetch all notes with newly added note
  getNote();
}

//Delete a note
const deleteNote = async (id) => {

  //TODO API CALL
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
   });

  const json = response.json();
  console.log(json);

  console.log("deleting the note with the id" + id);
  const newNote = notes.filter((note)=>{return note._id!==id})
  setNotes(newNote);
    // for(let i=0;i<=notes.length;i++){
    //   if(notes[i]._id===id){
    //     setNotes(notes.splice(++i))
    //   }
    // }
  }

//Edit a note
const editNote = async (id,title,description,tag) => {
  //TO DO: API CALL
   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})
   });
const json = response.json();
  //Logic to edit in client
  //React detects changes in state and schedules a re-render of the affected components.
  const updateNotes = notes.map(note=>note._id == id?{...note,title,description,tag}:note);
  setNotes(updateNotes);

    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if(element._id === id){
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag
    //   }
    // }
}

 return (
  <>
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
        {props.children}
    </NoteContext.Provider>
    </>
 )
     
}

export default NoteState;

import { useState } from "react";
import NoteContext from "./NoteContext";

//passing the state to all the childrens who import this function
const NoteState = (props) => {
    const noteInitial = [
        {
          "_id": "676c7298fc62bb794b590933",
          "user": "676bef7eb482c221f2a0e636",
          "title": "my note",
          "description": "testing the addnote end point and this is added to the first",
          "tag": "note1",
          "date": "2024-12-25T21:01:12.858Z",
          "__v": 0
        },
        {
          "_id": "676c75fefc62bb794b590936",
          "user": "676bef7eb482c221f2a0e636",
          "title": "second note",
          "description": "testing the addnote end point one more time",
          "tag": "note2",
          "date": "2024-12-25T21:15:42.224Z",
          "__v": 0
        },
        {
          "_id": "676c75fefc62bb794b590936",
          "user": "676bef7eb482c221f2a0e636",
          "title": "second note",
          "description": "testing the addnote end point one more time",
          "tag": "note2",
          "date": "2024-12-25T21:15:42.224Z",
          "__v": 0
        },
        {
          "_id": "676c75fefc62bb794b590936",
          "user": "676bef7eb482c221f2a0e636",
          "title": "second note",
          "description": "testing the addnote end point one more time",
          "tag": "note2",
          "date": "2024-12-25T21:15:42.224Z",
          "__v": 0
        },
        {
          "_id": "676c75fefc62bb794b590936",
          "user": "676bef7eb482c221f2a0e636",
          "title": "second note",
          "description": "testing the addnote end point one more time",
          "tag": "note2",
          "date": "2024-12-25T21:15:42.224Z",
          "__v": 0
        },
        {
          "_id": "676c75fefc62bb794b590936",
          "user": "676bef7eb482c221f2a0e636",
          "title": "second note",
          "description": "testing the addnote end point one more time",
          "tag": "note2",
          "date": "2024-12-25T21:15:42.224Z",
          "__v": 0
        },
        {
          "_id": "676c75fefc62bb794b590936",
          "user": "676bef7eb482c221f2a0e636",
          "title": "second note",
          "description": "testing the addnote end point one more time",
          "tag": "note2",
          "date": "2024-12-25T21:15:42.224Z",
          "__v": 0
        },
        {
          "_id": "676c75fefc62bb794b590936",
          "user": "676bef7eb482c221f2a0e636",
          "title": "second note",
          "description": "testing the addnote end point one more time",
          "tag": "note2",
          "date": "2024-12-25T21:15:42.224Z",
          "__v": 0
        }
      ]

const [notes, setNotes] = useState(noteInitial)

//Add a note
const addNote = (title,description,tag) =>{
   //TO DO API CALL
   note =  {
    "_id": "676c75fefc62bb794b590936",
    "user": "676bef7eb482c221f2a0e636",
    "title": "this is added",
    "description": "testing the addnote end point one more time",
    "tag": "note2",
    "date": "2024-12-25T21:15:42.224Z",
    "__v": 0
  }; 
   setNotes(notes.push(note))
}

//Delete a note
const deleteNote = () => {

}

//Edit a note
const editnote = () => {

}


 return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editnote}}>
        {props.children}
    </NoteContext.Provider>
 )
     
}

export default NoteState;

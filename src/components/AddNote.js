import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

function AddNote(props) {
const context = useContext(NoteContext);
const {addNote} = context
//first we track the chages in the input field , first the state is set to empty("") and "default" for tag
//then using onchange handler by using spread operator to destrcuture the object and targeting the specific
//value and updating it's state this ensures that only the specific filed is updating and not the entire note 
//set into one single value 
const [note, setNote] = useState({title:"", description: "", tag:""})
const handleClik = async (e) => {
     console.log(note);
     e.preventDefault()
     addNote(note.title,note.description,note.tag);
     setNote({title:"", description: "", tag:""})
     props.showAlert("Note added successfully","success");
}


//when particular field like title,description,tag changes the values are recorded and used to update the state of note
//defined in this component not the original "notes" used for sending data to backend 
const onChange = (e) => {
     setNote({...note, [e.target.name]: e.target.value})
}
  return (
    <div className="container my-3">
    <h2>Add a Note</h2>
  <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" name='title' id="title" aria-describedby="Title"  onChange={onChange} value={note.title}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name='description' id="description" onChange={onChange} value={note.description}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" name='tag' id="tag" onChange={onChange} value={note.tag}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClik}>Add Note</button>
</form>
  </div>
  )
}

export default AddNote

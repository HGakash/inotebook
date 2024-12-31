import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;
  const [enote, esetNote] = useState({title:"", description: "", tag:""})
  const [eid, setEid] = useState(null);
  const navigate = useNavigate();
   
  const handleClik = async (e) => {
    console.log({id:eid.id,title:enote.title,description:enote.description,tag:enote.tag})
    await editNote(eid.id,enote.title,enote.description,enote.tag);
    setIsModalOpen(false);
    props.showAlert("updated successfully","success");
    e.preventDefault()
  }
  
  const onChange = (e) => {
    esetNote({...enote, [e.target.name]: e.target.value})
  }

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }else{
      navigate('/login');
    }
  }, []);
  
  const updateNote = (CurrentNote) => {
    setEid({id:CurrentNote._id})
    esetNote({
      title: CurrentNote.title,
      description: CurrentNote.description,
      tag: CurrentNote.tag,
    });
    setIsModalOpen(true); // Open modal when a note is being updated
  }

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button"  className="close position-absolute top-0 end-0" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="title" className="col-form-label">Title</label>
            <input type="text" name='title' className="form-control" id="title"  onChange={onChange} value={enote.title}/>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="col-form-label">Description</label>
            <textarea className="form-control" name='description' id="description"  onChange={onChange} value={enote.description}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tag" className="col-form-label">Tag</label>
            <input type="text"  name='tag' className="form-control"  id="tag"  onChange={onChange} value={enote.tag}/>
          </div>
        </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button onClick={handleClik} type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        <h4>{notes.length===0 && 'No notes to display'}</h4>
        </div>
        {notes.map((note, index) => (
          <div className="col-md-3" key={index}>
            <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default Notes;

import React from 'react'

function NoteItem(props) {
    const {note} = props
  return (
    <div className="card my-3">
    <div className="card-body">
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description} 
      <br/>
      <i className="fa-solid fa-trash mx-2"></i>
      <i className="fa-solid fa-pen-to-square mx-3"></i>
      </p>
    </div>
  </div>
  )
}

export default NoteItem

        
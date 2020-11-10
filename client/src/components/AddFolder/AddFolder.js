import React from 'react'
import './AddFolder.css'

const addFolder = (props) => {
  return (
    <div className="addFolder-menu">
      <form onSubmit={props.handleSubmit}>
        <button
          className="AddFolder-button"
          type="submit">Add Folder
            </button>
        <input
          type="text"
          placeholder="new Folder name"
          value={props.inputValue}
          onChange={props.handleChange}
        >
        </input>
      </form>
    </div>
  )
}

export default addFolder

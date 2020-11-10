import React, { Component } from 'react'
import AddFolder from '../../AddFolder/AddFolder'
import FolderList from '../../FolderList/folderList'
import './folders.css'

class Folders extends Component {
  state = {
    input: '',
    folders: [
      'My Folder',
      'new folder'
    ]
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = () => {
    if (this.state.input === '') return
    this.setState(state => ({
      folders: state.folders.concat(state.input)
    }))
    this.setState({
      input: ''
    })
  }

  render() {
    return (
        <section className="folders-section page">
          <AddFolder
            addFolderClick={this.addFolderClick}
            inputValue={this.state.input}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}

          />
          <FolderList foldersList={this.state.folders}/>
        </section>
    )
  }
}

export default Folders

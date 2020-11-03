import React, {Component} from 'react';
import AddFolder from '../../AddFolder/AddFolder'

import './folders.css';

class Home extends Component {
  state = {
      input: '',
      folders: [
        'My Folder',
        'new folder'
      ]
  }

  handleChange = (event) => {
    
  }
  handleSubmit = () => {
    
  }
  
  render() {
    return (
        <section className="home-section page">
          <AddLink 
          />
          
        </section>
    )
  }
}

export default Folders
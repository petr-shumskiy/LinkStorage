import React, {Component} from 'react';
import {HomeIcon, LikeIcon, PriceIcon, FolderIcon, PlusIcon, } from '../../icons';
import './Aside.css'

class Aside extends Component {
  state = {
      
  }

  handleChange = (event) => {
    
  }
  handleSubmit = () => {
    
  }
  
  render() {
    return (
      <aside className="aside-container">
          <ul className="aside-inner">
            <li className="aside-links">
              <HomeIcon />
              <h3 className="aside-menu">Home</h3>
            </li>
            <li className="aside-links">
              <LikeIcon />
              <h3 className="aside-menu">Like</h3>
            </li>
            <li className="aside-links">
              <PriceIcon />
              <h3 className="aside-menu">Tags</h3>
            </li>
            <li className="aside-links">
              <FolderIcon />
              <h3 className="aside-menu">Folder</h3>
            </li>
          </ul>
      </aside>
    )
  }
}

export default Aside
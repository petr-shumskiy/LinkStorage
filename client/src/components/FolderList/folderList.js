import React from 'react'
import { FolderIcon } from '../../icons'

import './folderList.css'

const folderList = (props) => {
  return (
    <div>
      <ul className="folderList">
        {props.foldersList.map((item, i) => {
          return (
            <li key={i}>
              <FolderIcon />
              <a href="#">{item}</a>
            </li>)
        })}
      </ul>
    </div>
  )
}

export default folderList

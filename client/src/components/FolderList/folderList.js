import React from 'react'
import { NavLink } from 'react-router-dom'
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
              <NavLink to="#">{item}</NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default folderList

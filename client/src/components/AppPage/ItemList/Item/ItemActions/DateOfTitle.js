import { Typography } from '@material-ui/core'
import React from 'react'

export function DateOfTitle({ isActive, isItemLiked, wasAdded }) {
  const marginLeft = isActive && !isItemLiked ? 11 : 0
  return (
    <div
      style={{
        display: [isActive ? 'inline-block' : 'none'],
        marginLeft
      }}
    >
      <Typography variant='subtitle1'>
        {`${new Date(wasAdded).toLocaleDateString()}  ${new Date(
          wasAdded
        ).toLocaleTimeString()}`}
      </Typography>
    </div>
  )
}

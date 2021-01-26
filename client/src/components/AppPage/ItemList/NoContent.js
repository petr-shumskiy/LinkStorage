import { Box, Divider, styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledTypograhy = styled(Typography)({
  opacity: 0.7
})

export function NoContent({ label }) {
  return (
    <>
      <Box
        minHeight={label ? 152 : 'calc(128px - 1rem)'}
        display='flex'
        alignItems='center'
        direction='column'
        justifyContent='center'
      >
        <StyledTypograhy variant='body1'>
          {label
            ? `You have no ${label} items.`
            : 'No articles in this folder.'}
        </StyledTypograhy>
      </Box>
      <Divider />
    </>
  )
}

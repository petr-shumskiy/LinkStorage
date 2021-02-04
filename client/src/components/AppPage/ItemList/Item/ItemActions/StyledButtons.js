import { Button, IconButton, styled } from '@material-ui/core'
import { theme } from '../../../../../theme'
const buttonStyles = {
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent'
  },
  backgroundColor: 'transparent',
  boxShadow: 'none',
  fontSize: '1.2rem',
  color: '#656565',
  width: '40px',
  height: '40px'
}

export const StyledIconButton = styled(IconButton)(buttonStyles)

export const StyledButton = styled(Button)(buttonStyles)

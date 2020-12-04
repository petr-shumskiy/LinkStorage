import { makeStyles } from '@material-ui/core/styles'
export const authStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: 'white',
    outline: 0
  },
  paper: {
    position: 'relative',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '400px',
    minHeight: '180px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  avatarSuccess: {
    margin: theme.spacing(1),
    backgroundColor: 'green'
  },
  successForm: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(4.3, 0, 2)
  },
  additionalMessage: {
    width: '100%',
    padding: 5,
    border: '1px solid red',
    borderRadius: '5px',
    position: 'relative'
  },
  closeAdditionalMessageIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px'
  }
}))

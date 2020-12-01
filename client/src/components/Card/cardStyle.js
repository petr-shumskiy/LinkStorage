import { makeStyles } from '@material-ui/core/styles'

const cardStyle = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 96px)',
    maxWidth: '100%'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'justify'
  },
  text: {
    wordBreak: 'break-all'
  },
  cover: {
    alignSelf: 'center',
    width: '80px',
    height: '80px',
    marginRight: '16px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}))

export default cardStyle

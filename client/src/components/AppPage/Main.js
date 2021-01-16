import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Hidden,
  Menu,
  MenuItem,
  SwipeableDrawer,
  withWidth
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { fetchItemsThunk } from '../../redux/userReducer.ts'
import { Redirect } from 'react-router-dom'
import { ItemsList } from './ItemList'
import { NavPanel } from './NavPanel'
import { Aside } from './Aside'

const drawerWidth = 260
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

function App({ width }) {
  const classes = useStyles()

  const dispatch = useDispatch()
  // const items = useSelector(({ user }) => user.items)
  const token = useSelector(({ auth }) => auth.token)

  useEffect(() => {
    dispatch(fetchItemsThunk())
  }, [dispatch, token])

  const [isDrawerOpen, setDrawerState] = useState(false)

  const closeDrawer = () => {
    setDrawerState(false)
  }
  const openDrawer = () => {
    setDrawerState(true)
  }

  const small = ['xs', 'sm']
  return (
    <div className='App'>
      <Container maxWidth='lg'>
        <Grid container spacing={small.includes(width) ? 4 : 10}>
          <Grid
            item
            container
            xs={12}
            color='black'
            style={{
              color: 'black'
            }}
          >
            <NavPanel openDrawer={openDrawer} />
          </Grid>
          <Grid item xs={false} md={1} style={{ marginRight: '7rem' }}>
            <Hidden only={['xs', 'sm']}>
              <Aside />
            </Hidden>
            {small.includes(width) ? (
              <SwipeableDrawer
                anchor={'left'}
                disableBackdropTransition
                onClose={closeDrawer}
                onOpen={openDrawer}
                variant='temporary'
                ModalProps={{ keepMounted: true }}
                classes={{
                  paper: classes.drawerPaper
                }}
                open={isDrawerOpen}
              >
                <Aside />
              </SwipeableDrawer>
            ) : null}
          </Grid>
          <Grid item xs={12} md={9}>
            <Main />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

function Main() {
  // if (!token) {
  //   return <Redirect to='/auth' />
  // }

  return (
    <Grid container direction='column'>
      <Grid item xs={12} md={12}>
        <ItemsList />
      </Grid>
    </Grid>
  )
}

export default withWidth()(App)

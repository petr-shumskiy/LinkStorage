import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Hidden,
  SwipeableDrawer,
  withWidth
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsThunk } from '../../redux/userReducer.ts'
import { ItemsList } from './ItemList/ItemList'
import { NavPanel } from './NavPanel/NavPanel'
import { AsideNav } from './AsideNav/AsideNav'
import { fetchFoldersThunk } from '../../redux/userReducer'
import { Redirect, useHistory } from 'react-router-dom'

const drawerWidth = 220
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  noContentWrapper: {
    minHeight: '160px'
  },

  MainContent: {
    marginLeft: 220,
    marginTop: theme.spacing(9),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  GridContainer: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  mainContainer: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  }
}))

function App({ width }) {
  const { location } = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const items = useSelector(({ user }) => user.items)
  const possiblePathes = useSelector(({ user }) =>
    user.folders.map((folder) => folder.name).concat(user.categories)
  )

  useEffect(() => {
    dispatch(fetchFoldersThunk())
    dispatch(fetchItemsThunk())
  }, [dispatch])

  const [isDrawerOpen, setDrawerState] = useState(false)

  const closeDrawer = () => {
    setDrawerState(false)
  }
  const openDrawer = () => {
    setDrawerState(true)
  }

  const small = ['xs', 'sm']

  const main = (
    <Grid container direction='column'>
      <Grid item xs={12} md={12}>
        <ItemsList items={items} />
      </Grid>
    </Grid>
  )
  // FIXME redirect from folder to /home on refresh
  if (!possiblePathes.includes(location.pathname.split('/')[1])) {
    return <Redirect to='/home' />
  }

  return (
    <div className='App'>
      <Container maxWidth='lg' className={classes.mainContainer}>
        <Grid container className={classes.GridContainer}>
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
          <Hidden only={['xs', 'sm']}>
            <AsideNav swipeable={false} />
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
              <AsideNav swipeable={true} />
            </SwipeableDrawer>
          ) : null}
          <Grid item xs={12} md={8} className={classes.MainContent}>
            {main}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default withWidth()(App)

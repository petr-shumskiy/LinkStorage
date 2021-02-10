import React, { useEffect, useState } from 'react'
import { Container, Grid, Hidden, SwipeableDrawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsThunk } from '../../redux/userReducer.ts'
import { ItemsList } from './ItemList/ItemList'
import { NavPanel } from './NavPanel/NavPanel'
import { AsideNav } from './AsideNav/AsideNav'
import {
  fetchFoldersThunk,
  getItems,
  getPossiblePathes,
  getTheme
} from '../../redux/userReducer'
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
    maxWidth: 920,
    paddingRight: 80,
    marginLeft: 220,
    marginTop: theme.spacing(9),
    [theme.breakpoints.down('md')]: {},
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
    height: '100%',
    [theme.breakpoints.down('md')]: {
      paddingRight: 0
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  }
}))

function App() {
  const { location } = useHistory()
  const theme = useSelector(getTheme)
  const classes = useStyles()
  const dispatch = useDispatch()
  const items = useSelector(getItems)
  const possiblePathes = useSelector(getPossiblePathes)

  useEffect(() => {
    dispatch(fetchFoldersThunk())
    dispatch(fetchItemsThunk())
  }, [dispatch])

  const [isDrawerOpen, setDrawerState] = useState(false)

  if (!possiblePathes.includes(location.pathname.split('/')[1])) {
    return <Redirect to='/home' />
  }

  const closeDrawer = () => {
    setDrawerState(false)
  }
  const openDrawer = () => {
    setDrawerState(true)
  }

  const main = (
    <Grid container direction='column'>
      <Grid item xs={12} md={12}>
        <ItemsList items={items} />
      </Grid>
    </Grid>
  )
  return (
    <Container maxWidth='lg' className={classes.mainContainer}>
      <Grid container className={classes.GridContainer}>
        <NavPanel openDrawer={openDrawer} />
        <Hidden smDown>
          <AsideNav swipeable={false} />
        </Hidden>
        <Hidden mdUp>
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
        </Hidden>
        <Grid
          item
          xs={12}
          md={12}
          className={classes.MainContent}
          style={{
            backgroundColor: theme === 'dark' ? '#212121' : '#ffffff'
          }}
        >
          {main}
        </Grid>
      </Grid>
    </Container>
  )
}

export default App

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { fetchItemsThunk } from '../../../redux/userReducer'
import Cards from '../../Card/Cards'
import mainStyle from './mainStyle'

const getItems = (items, linkType) => items.filter((item) => item[linkType])

const Items = ({ items, linkType }) => {
  const itemsData = useSelector((state) => getItems(items, linkType))
  return itemsData.map(({ _id, url }) => <Cards key={_id} id={_id} url={url} />)
}

const LinksContent = ({ items }) => {
  // const token = useSelector(({ auth }) => auth.token)
  // const items = useSelector(({ user }) => user.items)
  // console.log(items, token)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchItemsThunk(token))
  // }, [dispatch, token])

  const classes = mainStyle()
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route path='/home' exact render={() => <Items items={items} linkType='home' />} />
        <Route path='/liked' exact render={() => <Items items={items} linkType='liked' />} />
        <Route path='/archived' exact render={() => <Items items={items} linkType='archived' />} />
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </main>
  )
}

export default LinksContent

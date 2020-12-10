import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Cards from '../../Card/Cards'
import mainStyle from './mainStyle'

const getItems = ({ user }, linkType) => user.itemsData.filter((item) => item[linkType])

const Items = ({ linkType }) => {
  const itemsData = useSelector((state) => getItems(state, linkType))
  return itemsData.map(({ id, url }) => <Cards key={id} id={id} url={url} />)
}

const LinksContent = () => {
  const classes = mainStyle()
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route path='/home' exact render={() => <Items linkType='home' />} />
        <Route path='/liked' exact render={() => <Items linkType='liked' />} />
        <Route path='/archived' exact render={() => <Items linkType='archived' />} />
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </main>
  )
}

export default LinksContent

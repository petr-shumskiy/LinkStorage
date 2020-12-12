import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Card from '../../Card/Card'
import mainStyle from './mainStyle'

const getItems = (items, linkType) => items.filter((item) => item[linkType])

const Items = ({ items, linkType }) => {
  const itemsData = useSelector((state) => getItems(items, linkType))
  return itemsData.map((itemProps) => <Card key={itemProps._id} {...itemProps} />)
}

const LinksContent = ({ items }) => {
  const classes = mainStyle()
  console.log(items)
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route key={1} path='/home' exact render={() => <Items items={items} linkType='home' />} />
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

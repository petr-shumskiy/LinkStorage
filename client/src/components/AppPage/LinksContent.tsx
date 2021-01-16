import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Item, State } from '../../redux/userReducer'
import Card from './Card'
import mainStyle from './mainStyle'

type LinkType = 'home' | 'liked' | 'archived'

const getItems = (items: Array<Item>, linkType: LinkType) => {
  return items.filter((item) => item[linkType])
}

const getItemsOfFolder = (
  items: Array<Item>,
  folderName: string
): Array<Item> => {
  return items.filter((item) => item.folders.includes(folderName))
}

const Items: Function = ({
  items,
  linkType
}: {
  items: Array<Item>
  linkType: LinkType
}) => {
  const itemsData: Array<Item> = getItems(items, linkType)
  return itemsData.map((itemProps) => (
    <Card key={itemProps._id} {...itemProps} />
  ))
}

const ItemsOfFolder: Function = ({
  items,
  folderName
}: {
  items: Array<Item>
  folderName: string
}) => {
  const folderItems: Array<Item> = getItemsOfFolder(items, folderName)
  return folderItems.map((itemProps) => (
    <Card key={itemProps._id} {...itemProps} />
  ))
}

const LinksContent = ({ items }: { items: Array<Item> }) => {
  const classes = mainStyle()
  const userFoldersData = useSelector(
    ({ user }: { user: State }) => user.MenuItems
  )

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route
          key={1}
          path='/home'
          exact
          render={() => <Items items={items} linkType='home' />}
        />
        <Route
          path='/liked'
          exact
          render={() => <Items items={items} linkType='liked' />}
        />
        <Route
          path='/archive'
          exact
          render={() => <Items items={items} linkType='archived' />}
        />
        {userFoldersData.map((item) => {
          return (
            <Route
              key={item.name}
              path={item.link}
              exact
              render={() => (
                <ItemsOfFolder items={items} folderName={item.name} />
              )}
            />
          )
        })}
        <Route path='/'>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </main>
  )
}

export default LinksContent

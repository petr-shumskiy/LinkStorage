import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FolderTitle } from './FolderTitle'
import { NoContent } from './NoContent'
import { Item } from './Item/Item'
import { addItemThunk, setPreloadItem } from '../../../redux/userReducer'
import { Box, Divider, Grid, Hidden, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

export function ItemsList({ items }) {
  // const token = useSelector(({ auth }) => auth.token)
  // const { url, isLoaded, hasErrorOnLoading } = useSelector(
  // ({ user }) => user.preloadingItem
  // )
  const isLoading = useSelector(({ user }) => user.isLoading)

  const category = useLocation().pathname.split('/')[1]
  const categories = useSelector(({ user }) => user.categories)

  const folders = useSelector(({ user }) => user.folders)
  const folder = folders.filter((folder) => folder.name === category)[0]

  const currentCategoryItems = items
    .filter((item) => item[category])
    .map((item) => <Item key={item._id} item={item} category={category} />)

  const previewLink = (
    <Box>
      <Grid
        container
        spacing={2}
        item
        xs={12}
        md={12}
        style={{ color: 'black' }}
      >
        <Grid container item md={10} sm={10} xs={12} direction='column'>
          <Grid item>
            <Typography variant='h2'>
              <Skeleton />
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant='subtitle1'>
              <Skeleton />
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant='body2'>
              <Skeleton />
            </Typography>
          </Grid>
        </Grid>
        <Hidden only={['xs']}>
          <Grid
            item
            container
            md={2}
            sm={2}
            xs={false}
            justify='center'
            alignItems='center'
          >
            <Box
              width={'100%'}
              height={'100%'}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Skeleton variant='rect' width={'110%'} height={'110%'} />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
      <Divider style={{ marginBottom: 16, marginTop: 16 }} />
    </Box>
  )

  // if (url && !isLoaded && category === 'home') {
  if (isLoading) {
    currentCategoryItems.unshift(previewLink)
  }

  const likedItemsInFolders = []
  for (const folder of folders) {
    for (const item of folder.items) {
      if (item.liked) {
        likedItemsInFolders.push(
          <Item key={item._id} item={item} category={category} />
        )
      }
    }
  }

  if (category === 'liked') {
    if (currentCategoryItems.length || likedItemsInFolders.length) {
      return [...currentCategoryItems, likedItemsInFolders]
    }
    return <NoContent label={category} />
  }

  const currentFolderItems =
    folder && folder.items.length ? (
      <>
        <FolderTitle id={folder._id} label={folder.name} />
        {folder.items.map((item) => {
          return <Item key={item._id} item={item} category={folder.name} />
        })}
      </>
    ) : null

  if (!currentCategoryItems.length && categories.includes(category)) {
    return <NoContent label={category} />
  }

  if (folder && !folder.items.length) {
    return (
      <>
        <FolderTitle id={folder._id} label={folder.name} />
        <NoContent label='' />
      </>
    )
  }

  return categories.includes(category)
    ? currentCategoryItems
    : currentFolderItems
}

import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  getCategories,
  getCurrentFolder,
  getAllLikedItems,
  getCurrentCategoryItems,
  getCurrentFolderItems
} from '../../../redux/userReducer'

import { FolderTitle } from './FolderTitle'
import { NoContent } from './NoContent'
import { Item } from './Item/Item'
import { Box, Divider, Grid, Hidden, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

export function ItemsList({ items }) {
  const currentCategory = useLocation().pathname.split('/')[1]
  const isLoading = useSelector(({ user }) => user.isLoading)
  const categories = useSelector(getCategories)
  const currentFolder = useSelector((state) => getCurrentFolder(currentCategory, state))
  const isCategoryDefault = categories.includes(currentCategory)

  let currentCategoryItems = useSelector((state) => {
    return getCurrentCategoryItems(currentCategory, state)
  })

  let currentFolderItems = useSelector((state) => {
    return getCurrentFolderItems(currentCategory, state)
  })
  console.log(currentFolderItems)

  const likedItems = useSelector(getAllLikedItems).map((item) => (
    <Item key={item._id} item={item} category='liked' />
  ))

  if (isCategoryDefault) {
    currentCategoryItems = currentCategoryItems.map((item) => (
      <Item key={item._id} item={item} category={currentCategory} />
    ))

    if (isLoading && currentCategory === 'home') {
      currentCategoryItems.unshift(<PreviewLink key='preview-link-item' />)
    }

    if (currentCategory === 'liked') {
      return likedItems.length ? likedItems : <NoContent label={currentCategory} />
    }

    if (isCategoryDefault && !currentCategoryItems.length) {
      return <NoContent label={currentCategory} />
    }
    return currentCategoryItems
  } else {
    if (!currentFolderItems.length) {
      return (
        <>
          <FolderTitle id={currentFolder._id} label={currentFolder.name} />
          <NoContent label='' />
        </>
      )
    }
    currentFolderItems = currentFolderItems.map((item) => (
      <Item key={item._id} item={item} category={currentCategory} />
    ))
    return (
      <>
        <FolderTitle id={currentFolder._id} label={currentFolder.name} />
        {currentFolderItems}
      </>
    )
  }
}

function PreviewLink() {
  return (
    <Box>
      <Grid container spacing={2} item xs={12} md={12} style={{ color: 'black' }}>
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
}

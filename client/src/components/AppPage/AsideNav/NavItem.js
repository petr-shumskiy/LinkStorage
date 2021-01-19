import React from 'react'
import {
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        opacity: 1 + '!important'
      }
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold
    },
    listText: {
      textTransform: 'capitalize',
      color: 'inherit',
      fontWeight: 'inherit'
    },
    resetLinkStyle: {
      textDecoration: 'none',
      color: 'inherit'
    }
  })
)

export function NavItem({ text, Icon, to }) {
  const classes = useStyles()

  const match = useRouteMatch({
    path: to
  })

  const optionalActiveClass = match ? classes.active : null

  return (
    <Link to={to} className={classes.resetLinkStyle}>
      <ListItem
        button
        classes={{ root: classes.root }}
        className={optionalActiveClass}
      >
        <ListItemIcon
          className={optionalActiveClass}
          style={{
            color: 'inherit',
            minWidth: 0,
            marginRight: '1rem',
            opacity: [match ? 1 : 0.65]
          }}
        >
          <Icon className={optionalActiveClass} />
        </ListItemIcon>
        <ListItemText
          className={optionalActiveClass}
          variant='body1'
          classes={{
            primary: classes.listText
          }}
          primary={text}
        />
      </ListItem>
    </Link>
  )
}

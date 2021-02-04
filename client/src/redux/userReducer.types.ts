import { SvgIconTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

export type Category = 'liked' | 'home' | 'archived'

export type Item = {
  _id: string
  home: boolean
  liked: boolean
  archived: boolean
  url: string
  title: string
  description: string
  imageUrl: string
  folders: Array<Folder>
  currentFolder: string | null
  wasAdded: string
}

export type AsideMenuItem = {
  _id: number
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  name: string
  link: string
  isSelected: boolean
  handleClickItem?: any
}

export type AppError = {
  name: string
  message: string
  isActive: boolean
}

export interface State {
  themeType: string
  errors: AppError[]
  isLoading: boolean
  items: Item[]
  categories: string[]
  folders: Folder[]
}

export type UpdateObjectType = {
  id: string
  liked?: boolean
  archived?: boolean
  folderId?: string
}

export type Folder = {
  _id: string
  name: string
}

export type ContentType = {
  title: string
  url: string
  description: string
}

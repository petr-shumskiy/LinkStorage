import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'

import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import API from '../API/API'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core'

export type Item = {
  _id: string
  home: boolean
  liked: boolean
  archived: boolean
  url: string
  header: string
  description: string
  imageUrl: string
  folders: Array<string>
}

type ServerItem = {
  _id: string
  home: boolean
  liked: boolean
  archived: boolean
  url: string
}

export type AsideMenuItem = {
  _id: number
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  name: string
  link: string
  isSelected: boolean
  handleClickItem?: any
}
export interface State {
  isOpenedAddLinkModal: boolean
  items: Array<Item>
  MenuItems: Array<AsideMenuItem>
}

type URL = {
  url: string
}
export type UpdateObjectType = {
  id: string
  liked?: boolean
  archived?: boolean
}

const findIndexById = (arr: any, id: string | number) =>
  arr.findIndex((item: any) => item._id === id)

const convertServerToUiItems = (items: any): Array<Item> => {
  return items.map(
    (item: any): Item => {
      item.folders = []
      item.header = ''
      item.description = ''
      item.imageUrl = ''
      return item
    }
  )
}

const initialState: State = {
  isOpenedAddLinkModal: false,
  items: [],
  MenuItems: [
    {
      _id: 0,
      Icon: HomeOutlinedIcon,
      name: 'Home',
      link: '/home',
      isSelected: true
    },
    {
      _id: 1,
      Icon: FavoriteBorderOutlinedIcon,
      name: 'Liked',
      link: '/liked',
      isSelected: false
    },
    {
      _id: 2,
      Icon: ArchiveOutlinedIcon,
      name: 'Archive',
      link: '/archive',
      isSelected: false
    },
    {
      _id: 3,
      Icon: FolderOpenIcon,
      name: 'Folder1',
      link: '/folder1',
      isSelected: false
    },
    {
      _id: 4,
      Icon: FolderOpenIcon,
      name: 'Folder2',
      link: '/folder2',
      isSelected: false
    }
  ]
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setItems(state: State, action: PayloadAction<Array<ServerItem>>) {
      // state.items = action.payload
      const items = convertServerToUiItems(action.payload)
      state.items = items
    },

    addItem(state: State, action: PayloadAction<URL>) {
      const item: Item = {
        _id: state.items.length.toString(),
        home: true,
        liked: false,
        archived: false,
        url: action.payload.url,
        description: '',
        header: '',
        imageUrl: '',
        folders: []
      }
      state.items.push(item)
    },

    deleteItem(state: State, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload)
    },

    toggleAddLinkModal(state: State) {
      state.isOpenedAddLinkModal = !state.isOpenedAddLinkModal
    },

    updateItem(state: State, action: PayloadAction<UpdateObjectType>) {
      const { payload } = action
      const idx = findIndexById(state.items, payload.id)
      const item = state.items[idx]

      if (payload.liked !== undefined) {
        item.liked = payload.liked
      }

      if (payload.archived !== undefined) {
        item.archived = payload.archived
        item.home = !item.home
      }
    },

    setItemActive(state: State, action: PayloadAction<number>) {
      const activeNow = state.MenuItems.findIndex(
        (item) => item.isSelected === true
      )
      state.MenuItems[activeNow].isSelected = false

      const id: number = action.payload
      state.MenuItems[id].isSelected = true
    }
  }
})

export const fetchItemsThunk = () => async (dispatch: Dispatch) => {
  try {
    const res = await API.fetchAllItems() // TODO catch
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addItemThunk = (url: URL) => async (dispatch: Dispatch) => {
  try {
    await API.addItem(url)
    dispatch(addItem(url))
    dispatch(toggleAddLinkModal())
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteItemThunk = (id: string) => async (dispatch: Dispatch) => {
  try {
    await API.deleteItem(id)
    dispatch(deleteItem(id))
  } catch (error) {
    // TODO logic for catch
    console.log(error.message)
  }
}

export const updateItemThunk = (
  id: string,
  payload: UpdateObjectType
) => async (dispatch: Dispatch) => {
  try {
    await API.updateItem(id, payload)
    dispatch(updateItem(payload))
  } catch (error) {
    console.log(error)
  }
}

export const {
  toggleAddLinkModal,
  setItems,
  addItem,
  deleteItem,
  updateItem,
  setItemActive
} = userReducer.actions

export default userReducer

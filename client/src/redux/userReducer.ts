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
  title: string
  description: string
  imageUrl: string
  folders: Array<string>
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
  items: Item[]
  categories: string[]
  folders: Folder[]
}

export type UpdateObjectType = {
  id: string
  liked?: boolean
  archived?: boolean
}

export type Folder = {
  _id: string
  name: string
}

const findIndexById = (arr: any, id: string | number) =>
  arr.findIndex((item: any) => item._id === id)

const initialState: State = {
  items: [],
  categories: [
    'home',
    'liked',
    'archived'
  ],
  folders: []
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setItems(state: State, action: PayloadAction<Item[]>) {
      state.items = action.payload
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
    setListOfFolders(state: State, action: PayloadAction<Folder[]>) {
      const { payload } = action
      state.folders = payload
    }
  }
})

export const fetchFoldersThunk = () => async (dispatch: Dispatch) => {
  try {
    const res = await API.fetchFolders()
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchItemsThunk = (token: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.fetchAllItems(token) // TODO catch
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addItemThunk = (item: Item) => async (dispatch: Dispatch) => {
  try {
    const res = await API.addItem(item)
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteItemThunk = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.deleteItem(id)
    dispatch(setItems(res.data))
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

export const addFolderThunk = (name: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.addFolder(name)
    console.log(res.data)
    dispatch(setListOfFolders(res.data.folders))
  } catch (error) {
    console.log(error)
  }
}

export const {
  setItems,
  updateItem,
  setListOfFolders
} = userReducer.actions

export default userReducer

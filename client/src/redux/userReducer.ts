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
  folderId?: string
}

export type Folder = {
  _id: string
  name: string
  items: Item[]
}

export type ContentType = {
  title: string
  url: string
  description: string
}

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

    setListOfFolders(state: State, action: PayloadAction<Folder[]>) {
      const { payload } = action
      state.folders = payload
    }
  }
})

export const fetchFoldersThunk = (token: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.fetchFolders(token)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const renameFolderThunk = (token: string, folderId: string, folderName: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.updateFolder(token, folderId, folderName)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addFolderThunk = (token: string, name: string) => async (dispatch: Dispatch) => {
  try {
    console.log(token)
    const res = await API.addFolder(token, name)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteFolderThunk = (token: string, folderId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.deleteFolder(token, folderId)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchItemsThunk = (token: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.fetchAllItems(token)
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addItemThunk = (token: string, item: Item) => async (dispatch: Dispatch) => {
  try {
    console.log(token)
    const res = await API.addItem(token, item)
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteItemThunk = (token: string, id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.deleteItem(token, id)
    dispatch(setItems(res.data))

    const foldersRes = await API.fetchFolders(token)
    dispatch(setListOfFolders(foldersRes.data))
  } catch (error) {
    console.log(error.message)
  }
}

export const updateItemStatusThunk = (
  token: string,
  id: string,
  payload: UpdateObjectType
) => async (dispatch: Dispatch) => {
  try {
    const res = await API.updateItemStatus(token, id, payload)
    dispatch(setItems(res.data))
    const foldersRes = await API.fetchFolders(token)
    dispatch(setListOfFolders(foldersRes.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateItemContentThunk = (token: string, id: string, content: ContentType) => async (dispatch: Dispatch) => {
  try {
    const res = await API.updateItemContent(token, id, content)
    dispatch(setItems(res.data))
    const foldersRes = await API.fetchFolders(token)
    dispatch(setListOfFolders(foldersRes.data))
  } catch (error) {
    console.log(error)
  }
}

export const {
  setItems,
  setListOfFolders
} = userReducer.actions

export default userReducer

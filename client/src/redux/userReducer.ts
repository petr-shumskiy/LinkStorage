import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import API from '../API/API'

export type Item = {
  _id: string
  home: boolean
  liked: boolean
  archived: boolean
  url: string
  folders: Array<string>
}
export interface State {
  isOpenedAddLinkModal: boolean
  items: Array<Item>
  folders: Array<string>
}

type URL = {
  url: string
}
type UpdateObjectType = {
  id: string
  liked?: boolean
  archived?: boolean
}

const findIndexById = (arr: Array<Item>, id: string) =>
  arr.findIndex((item) => item._id === id)

const initialState: State = {
  isOpenedAddLinkModal: false,
  items: [],
  folders: ['Folder1', 'Folder2']
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setItems(state: State, action: PayloadAction<Array<Item>>) {
      state.items = action.payload
    },

    addItem(state: State, action: PayloadAction<URL>) {
      const item: Item = {
        _id: state.items.length.toString(),
        home: true,
        liked: false,
        archived: false,
        url: action.payload.url,
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
    dispatch(updateItem({ ...payload, id }))
  } catch (error) {
    console.log(error)
  }
}

export const {
  toggleAddLinkModal,
  setItems,
  addItem,
  deleteItem,
  updateItem
} = userReducer.actions

export default userReducer

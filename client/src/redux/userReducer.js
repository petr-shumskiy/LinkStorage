import { createSlice } from '@reduxjs/toolkit'
import API from '../API/API'

const findIndexById = (arr, id) => arr.findIndex((item) => item._id === id)

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isOpenedAddLinkModal: false,
    items: [],
    folders: ['Folder1', 'Folder2']
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
    addItem(state, { payload }) {
      const link = {
        id: state.items.length,
        home: true,
        liked: false,
        archived: false,
        header: '',
        description: '',
        url: payload.url,
        type: '',
        img: ''
      }
      state.items.push(link)
    },
    deleteItem(state, { payload }) {
      state.items = state.items.filter((item) => item._id !== payload)
    },
    toggleAddLinkModal(state, action) {
      state.isOpenedAddLinkModal = !state.isOpenedAddLinkModal
    },
    updateItem(state, { payload }) {
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

export const fetchItemsThunk = () => async (dispatch) => {
  try {
    const res = await API.fetchAllItems() // TODO catch
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addItemThunk = (url) => async (dispatch) => {
  try {
    await API.addItem(url)
    dispatch(addItem(url))
    dispatch(toggleAddLinkModal())
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteItemThunk = (id) => async (dispatch) => {
  try {
    await API.deleteItem(id)
    dispatch(deleteItem(id))
  } catch (error) {
    // TODO logic for catch
    console.log(error.message)
  }
}

export const updateItemThunk = (id, payload) => async (dispatch) => {
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

import { createSlice } from '@reduxjs/toolkit'
import API from '../API/API'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isOpenedAddLinkModal: false,
    items: [],
    folders: ['Folder1', 'Folder2']
  },
  reducers: {
    setCurrentLinkType(state, action) {
      state.linkType = action.payload.linkType
    },
    setItems(state, action) {
      state.items = action.payload
    },
    addItem(state, { payload }) {
      const link = {
        id: state.items.length,
        home: true,
        liked: false,
        archived: false,
        title: '',
        text: '',
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
    }
  }
})

export const fetchItemsThunk = (token) => async (dispatch) => {
  try {
    const res = await API.fetchAllItems(token) // TODO catch
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addItemThunk = (url, token) => async (dispatch) => {
  try {
    await API.addItem(url, token)
    dispatch(addItem(url))
    dispatch(toggleAddLinkModal())
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteItemThunk = (id, token) => async (dispatch) => {
  try {
    await API.deleteItem(id, token)
    dispatch(deleteItem(id))
  } catch (error) {
    // TODO logic for catch
    console.log(error.message)
  }
}

export const {
  setCurrentLinkType,
  logOut,
  setItems,
  addLinkInState,
  addItem,
  deleteItem,
  toggleAddLinkModal
} = userReducer.actions

export default userReducer

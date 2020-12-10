import { createSlice } from '@reduxjs/toolkit'
import API from '../API/API'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isOpenedAddLinkModal: false,
    itemsData: [
      {
        id: 0,
        url: 'https://github.com/',
        home: true,
        liked: false,
        archived: false
      },
      {
        id: 1,
        url: 'https://reactjs.org/',
        home: true,
        liked: true,
        archived: false
      },
      {
        id: 2,
        url: 'https://nodejs.org/en/',
        home: true,
        liked: true,
        archived: false
      },
      {
        id: 3,
        url: 'https://www.npmjs.com/package/react-tiny-link',
        home: true,
        liked: false,
        archived: false
      },
      {
        id: 4,
        url: 'https://www.youtube.com/watch?v=DWcJFNfaw9c&ab_channel=ChilledCow',
        home: true,
        liked: false,
        archived: false
      }
    ],
    folders: ['Folder1', 'Folder2']
  },
  reducers: {
    setCurrentLinkType(state, action) {
      state.linkType = action.payload.linkType
    },
    loadLinkData(state, action) {
      state.itemsData = action.payload.Data
    },
    addItem(state, { payload }) {
      const link = {
        id: state.itemsData.length,
        home: true,
        liked: false,
        archived: false,
        title: '',
        text: '',
        url: payload.url,
        type: '',
        img: ''
      }
      state.itemsData.push(link)
    },
    deleteItem(state, { payload }) {
      state.itemsData = state.itemsData.filter((item) => item.id !== payload)
    },
    toggleAddLinkModal(state, action) {
      state.isOpenedAddLinkModal = !state.isOpenedAddLinkModal
    }
  }
})

export const takeLinkData = () => async (dispatch) => {
  const res = await API.takeLinkData() // TODO catch
  dispatch(loadLinkData(res))
}

export const addItemThunk = (url, token) => async (dispatch) => {
  try {
    dispatch(addItem(url))
    await API.addItem(url, token)
    dispatch(toggleAddLinkModal())
  } catch (error) {
    console.log(error.message)
    dispatch(addItem(url))
    dispatch(toggleAddLinkModal())
  }
}

export const deleteItemThunk = (id, token) => async (dispatch) => {
  try {
    await API.deleteItem(id, token)
    dispatch(deleteItem(id))
  } catch (error) {
    // TODO logic for catch
    console.log(error.message)
    dispatch(deleteItem(id))
  }
}

export const {
  setCurrentLinkType,
  logOut,
  loadLinkData,
  addLinkInState,
  addItem,
  deleteItem,
  toggleAddLinkModal
} = userReducer.actions

export default userReducer

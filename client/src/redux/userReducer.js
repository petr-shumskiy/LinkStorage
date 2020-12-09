import { createSlice } from '@reduxjs/toolkit'
import API from '../API/API'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    isOpenedAddLinkModal: false,
    linksData: [
      {
        id: 0,
        url: 'https://github.com/'
      },
      {
        id: 1,
        url: 'https://reactjs.org/'
      },
      {
        id: 2,
        url: 'https://nodejs.org/en/'
      },
      {
        id: 3,
        url: 'https://www.npmjs.com/package/react-tiny-link'
      },
      {
        id: 4,
        url: 'https://www.youtube.com/watch?v=DWcJFNfaw9c&ab_channel=ChilledCow'
      }
    ],
    folders: ['Folder1', 'Folder2']
  },
  reducers: {
    setCurrentLinkType(state, action) {
      state.linkType = action.payload.linkType
    },
    logOut(state, action) {
      state.token = null
    },
    loadLinkData(state, action) {
      state.linksData = action.payload.Data
    },
    addLinkInState(state, { payload }) {
      const link = {
        id: state.linksData.length,
        title: '',
        text: '',
        url: payload.url,
        type: '',
        img: ''
      }
      state.linksData.push(link)
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

export const sendNewLink = (data) => async (dispatch) => {
  const res = await API.sendNewLink(data)
  return res
}

export const addLink = (data) => (dispatch) => {
  dispatch(addLinkInState(data))
  dispatch(toggleAddLinkModal())
}

export const {
  setCurrentLinkType,
  logOut,
  loadLinkData,
  addLinkInState,
  toggleAddLinkModal
} = userReducer.actions

export default userReducer

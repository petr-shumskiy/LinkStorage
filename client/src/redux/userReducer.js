import { createSlice } from '@reduxjs/toolkit'
import API from '../API/API'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    linksData: [],
    linkType: ''
  },
  reducers: {
    setCurrentLinkType(state, action) {
      state.linkType = action.payload.linkType
    },
    logOut(state, action) {
      state.token = null
    },
    loadLinkData(state, action) {
      state.linksDtata = action.payload.Data
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

export const { setCurrentLinkType, logOut, loadLinkData } = userReducer.actions

export default userReducer

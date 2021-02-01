import { createSelector, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { UserAPI } from '../API/UserAPI'
import { State, Item, Folder, UpdateObjectType, ContentType, Category } from './userReducer.types'

const initialState: State = {
  isLoading: false,
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
      state.items = action.payload.reverse()
    },

    setListOfFolders(state: State, action: PayloadAction<Folder[]>) {
      state.folders = action.payload
    },
    setLoader(state: State, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    }
  }
})

export const fetchFoldersThunk = () => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().fetchFolders()
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const renameFolderThunk = (folderId: string, folderName: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().updateFolder(folderId, folderName)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addFolderThunk = (name: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().addFolder(name)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteFolderThunk = (folderId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().deleteFolder(folderId)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchItemsThunk = () => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().fetchAllItems()
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addItemThunk = (url: string) => async (dispatch: Dispatch) => {
  try {
    console.log(url)
    dispatch(setLoader(true))
    const res = await new UserAPI().addItem(url)
    dispatch(setItems(res.data))
    dispatch(setLoader(false))
  } catch (error) {
    console.log(error.message)
    console.log(error)
    dispatch(setLoader(false))
  }
}

export const deleteItemThunk = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().deleteItem(id)
    dispatch(setItems(res.data))

    const foldersRes = await new UserAPI().fetchFolders()
    dispatch(setListOfFolders(foldersRes.data))
  } catch (error) {
    console.log(error.message)
  }
}

export const updateItemStatusThunk = (id: string, payload: UpdateObjectType) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await new UserAPI().updateItemStatus(id, payload)
    dispatch(setItems(res.data))
    const foldersRes = await new UserAPI().fetchFolders()
    dispatch(setListOfFolders(foldersRes.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateItemContentThunk = (id: string, content: ContentType) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await new UserAPI().updateItemContent(id, content)
    dispatch(setItems(res.data))
    const foldersRes = await new UserAPI().fetchFolders()
    dispatch(setListOfFolders(foldersRes.data))
  } catch (error) {
    console.log(error)
  }
}

export const searchItemsThunk = (searchPattern: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().searchItems(searchPattern)
    dispatch(setItems(res.data))
  } catch (error) {
    console.log(error)
  }
}

// selectors
export const getDefaultItems = ({ user }: { user: State }) => user.items
export const getFolders = ({ user }: { user: State }) => user.folders
export const getCategories = ({ user }: { user: State }) => user.categories
export const getCurrentFolder = (category: string, { user }: { user: State }) => {
  return user.folders.filter(folder => folder.name === category)[0]
}

export const getCurrentCategoryItems = (category: Category, { user }: { user: State }) => {
  if (user.categories.includes(category)) {
    return user.items.filter(item => item[category])
  }
  return null
}

export const getAllItems = createSelector(
  getDefaultItems,
  getFolders,
  (items, folders: Folder[]) => folders
    .flatMap(folder => folder.items)
    .concat(items)
    .map(item => item.url)
)
export const getAllLikedItems = createSelector(
  getDefaultItems,
  getFolders,
  (items, folders) => {
    const foldersItems = folders
      .flatMap(folder => folder.items)
      .filter(item => item.liked)
    const defalutItems = items.filter(item => item.liked)
    return defalutItems.concat(foldersItems)
  })

export const getFolderNames = createSelector(
  getFolders,
  folders => folders.map(folder => folder.name)
)

export const {
  setItems,
  setListOfFolders,
  setLoader
} = userReducer.actions

export default userReducer

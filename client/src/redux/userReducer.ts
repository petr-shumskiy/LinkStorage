import { createSelector, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { UserAPI } from '../API/UserAPI'
import { State, Item, Folder, UpdateObjectType, ContentType, Category } from './userReducer.types'
import { handleError } from './errorService'
import AxiosError from 'axios-error'

const initialState: State = {
  errors: [
    { name: 'network', message: 'check your internet connection', isActive: false },
    { name: 'url', message: 'url is invalid', isActive: false },
    { name: 'server', message: 'internal error on server', isActive: false },
    { name: 'unknown', message: 'url is invalid', isActive: false }
  ],
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
    },
    resetState(state: State) {
      state.items = []
      state.folders = []
      state.isLoading = false
    },
    setError(state: State, action: PayloadAction<{ name: string, isActve: boolean }>) {
      const error = state.errors.filter(error => error.name === action.payload.name)[0]
      if (error) {
        error.isActive = action.payload.isActve
      }
    },
    resetErrors(state: State) {
      state.errors.forEach(error => { error.isActive = false })
    }
  }
})

// Folder Thunks
export const fetchFoldersThunk = () => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().fetchFolders()
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    handleError(error, dispatch)
  }
}
export const renameFolderThunk = (folderId: string, folderName: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await new UserAPI().updateFolder(folderId, folderName)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    handleError(error, dispatch)
  }
}

export const addFolderThunk = (name: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().addFolder(name)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    handleError(error, dispatch)
  }
}

export const deleteFolderThunk = (folderId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().deleteFolder(folderId)
    dispatch(setListOfFolders(res.data))
  } catch (error) {
    handleError(error, dispatch)
  }
}

// Item Thunks
export const fetchItemsThunk = () => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().fetchAllItems()
    dispatch(setItems(res.data))
  } catch (error) {
    handleError(error, dispatch)
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
    if (new AxiosError(error).status === 400) {
      dispatch(setError({ name: 'url', isActve: true }))
      return
    }
    handleError(error, dispatch)
  } finally {
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
    handleError(error, dispatch)
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
    handleError(error, dispatch)
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
    handleError(error, dispatch)
  }
}

export const searchItemsThunk = (searchPattern: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await new UserAPI().searchItems(searchPattern)
    dispatch(setItems(res.data))
  } catch (error) {
    handleError(error, dispatch)
  }
}

// Selectors
export const getDefaultItems = ({ user }: { user: State }) => user.items
export const getFolders = ({ user }: { user: State }) => user.folders
export const getCategories = ({ user }: { user: State }) => user.categories
export const getCurrentFolder = (category: string, { user }: { user: State }) => {
  return user.folders.filter(folder => folder.name === category)[0]
}
export const getFoldersExceptCurrent = (category: string, { user }: { user: State }) => {
  return user.folders.filter(folder => folder.name !== category)
}
export const getErrors = ({ user }: { user: State }) => user.errors

export const getCurrentCategoryItems = (
  category: Category,
  { user }: { user: State }
) => {
  if (user.categories.includes(category)) {
    return user.items.filter(item => item[category])
  }
  return null
}

export const checkErrors = createSelector(
  [getErrors],
  (errors) => {
    for (const error of errors) {
      if (error.isActive) {
        return [true, error.message]
      }
    }
    return [false, null]
  })

export const getAllItems = createSelector(
  [getDefaultItems, getFolders],
  (items, folders: Folder[]) => folders
    .flatMap(folder => folder.items)
    .concat(items)
    .map(item => item.url)
)
export const getAllLikedItems = createSelector(
  [getDefaultItems, getFolders],
  (items, folders) => {
    const foldersItems = folders
      .flatMap(folder => folder.items)
      .filter(item => item.liked)
    const defalutItems = items.filter(item => item.liked)
    return defalutItems.concat(foldersItems)
  })

export const getFolderNames = createSelector(
  [getFolders],
  folders => folders.map(folder => folder.name)
)

export const getPossiblePathes = createSelector(
  [getFolderNames, getCategories],
  (folderNames, categroies) => folderNames.concat(categroies)
)

export const {
  setItems,
  setListOfFolders,
  setLoader,
  setError,
  resetErrors,
  resetState
} = userReducer.actions

export default userReducer

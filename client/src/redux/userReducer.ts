import { createSelector, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { UserAPI } from '../API/UserAPI'
import { State, Item, Folder, UpdateObjectType, ContentType, Category } from './userReducer.types'
import { handleError } from './errorService'

const initialState: State = {
  themeType: localStorage.getItem('theme') || 'light',
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
    changeTheme(state: State, action: PayloadAction<string>) {
      state.themeType = action.payload
      localStorage.setItem('theme', action.payload)
    },
    setItems(state: State, action: PayloadAction<Item[]>) {
      state.items = action.payload.reverse()
    },

    deleteItem(state: State, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload)
    },
    updateItemStatus(state: State, action: PayloadAction<UpdateObjectType>) {
      const { payload } = action
      const currentItemIndex = state.items.findIndex(item => item._id === payload.id)
      if (payload.liked !== undefined) {
        state.items[currentItemIndex].liked = !state.items[currentItemIndex].liked
      } else if (payload.archived !== undefined) {
        state.items[currentItemIndex].archived = payload.archived
        state.items[currentItemIndex].home = !payload.archived
        state.items[currentItemIndex].currentFolder = null
      } else if (payload.folderId !== undefined) {
        if (payload.folderId === 'home') {
          state.items[currentItemIndex].home = true
          state.items[currentItemIndex].archived = false
          state.items[currentItemIndex].currentFolder = null
        } else {
          const currentFolder = state.folders.find(folder => folder._id === payload.folderId)
          if (currentFolder) {
            state.items[currentItemIndex].home = false
            state.items[currentItemIndex].archived = false
            state.items[currentItemIndex].currentFolder = currentFolder.name
          }
        }
      }
    },
    updateItemContent(state: State, action: PayloadAction<{ id: string, content: ContentType }>) {
      const { content } = action.payload
      const itemIdx = state.items.findIndex(item => item._id === action.payload.id)
      state.items[itemIdx] = {
        ...state.items[itemIdx],
        title: content.title,
        url: content.url,
        description: content.description
      }
    },
    setListOfFolders(state: State, action: PayloadAction<Folder[]>) {
      state.folders = action.payload
    },
    addFolder(state: State, action: PayloadAction<Folder>) {
      state.folders.push(action.payload)
    },
    deleteFolder(state: State, action: PayloadAction<string>) {
      const folderName = state.folders.find(folder => folder._id === action.payload)?.name
      state.folders = state.folders.filter(folder => folder._id !== action.payload)
      state.items = state.items.filter(item => item.currentFolder !== folderName)
    },
    renameFolder(state: State, action: PayloadAction<{ id: string, name: string }>) {
      const folderIdx = state.folders.findIndex(folder => folder._id === action.payload.id)
      const currentFolderName = state.folders[folderIdx].name
      state.folders[folderIdx].name = action.payload.name
      state.items = state.items.map(item => {
        if (item.currentFolder === currentFolderName) {
          item.currentFolder = action.payload.name
        }
        return item
      })
    },
    setLoader(state: State, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    resetState(state: State) {
      state.items = []
      state.folders = []
      state.isLoading = false
      state.themeType = 'light'
    },
    setError(state: State, action: PayloadAction<{ name: string, isActve: boolean }>) {
      const error = state.errors.find(error => error.name === action.payload.name)
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
    await new UserAPI().updateFolder(folderId, folderName)
    dispatch(renameFolder({ id: folderId, name: folderName }))
  } catch (error) {
    handleError(error, dispatch)
  }
}

export const addFolderThunk = (name: string) => async (dispatch: Dispatch) => {
  try {
    const res = await new UserAPI().addFolder(name)
    dispatch(addFolder(res.data))
  } catch (error) {
    handleError(error, dispatch)
  }
}

export const deleteFolderThunk = (folderId: string) => async (dispatch: Dispatch) => {
  try {
    await new UserAPI().deleteFolder(folderId)
    dispatch(deleteFolder(folderId))
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
    dispatch(setLoader(true))
    const res = await new UserAPI().addItem(url)
    dispatch(setItems(res.data))
    dispatch(setLoader(false))
  } catch (error) {
    handleError(error, dispatch)
    dispatch(setLoader(false))
  }
}

export const deleteItemThunk = (id: string) => async (dispatch: Dispatch) => {
  try {
    await new UserAPI().deleteItem(id)
    dispatch(deleteItem(id))
  } catch (error) {
    handleError(error, dispatch)
  }
}

export const updateItemStatusThunk = (payload: UpdateObjectType) => async (
  dispatch: Dispatch
) => {
  try {
    await new UserAPI().updateItemStatus(payload)
    dispatch(updateItemStatus(payload))
  } catch (error) {
    handleError(error, dispatch)
  }
}

export const updateItemContentThunk = (id: string, content: ContentType) => async (
  dispatch: Dispatch
) => {
  try {
    await new UserAPI().updateItemContent(id, content)
    dispatch(updateItemContent({ id, content }))
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
export const getTheme = ({ user }: { user: State }) => user.themeType
export const getItems = ({ user }: { user: State }) => user.items
export const getFolders = ({ user }: { user: State }) => user.folders
export const getCategories = ({ user }: { user: State }) => user.categories
export const getCurrentFolder = (category: string, { user }: { user: State }) => {
  return user.folders.find(folder => folder.name === category)
}
export const getFoldersExceptCurrent = (category: string, { user }: { user: State }) => (
  user.folders.filter(folder => folder.name !== category)
)

export const getCurrentFolderItems = (category: string, state: any) => (
  getItems(state).filter(item => item.currentFolder === category)
)

export const getCurrentCategoryItems = (
  category: Category,
  { user }: { user: State }
) => {
  if (user.categories.includes(category)) {
    return user.items.filter(item => item[category])
  }
  return null
}

export const getErrors = ({ user }: { user: State }) => user.errors

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

export const getAllItemsUrls = createSelector(
  [getItems],
  (items) => items.map(item => item.url)
)
export const getAllLikedItems = createSelector(
  [getItems],
  (items) => items.filter(item => item.liked)
)

export const getFolderNames = createSelector(
  [getFolders],
  folders => folders.map(folder => folder.name)
)

export const getPossiblePathes = createSelector(
  [getFolderNames, getCategories],
  (folderNames, categroies) => folderNames.concat(categroies)
)

export const {
  changeTheme,
  setItems,
  setListOfFolders,
  addFolder,
  deleteFolder,
  renameFolder,
  deleteItem,
  updateItemStatus,
  updateItemContent,
  setLoader,
  setError,
  resetErrors,
  resetState
} = userReducer.actions

export default userReducer

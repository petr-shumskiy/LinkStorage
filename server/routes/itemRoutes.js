const express = require('express')
const router = express.Router()
const { ItemController } = require('../controllers/ItemController')
const { ItemLogic } = require('../logic/ItemLogic')
const { hasAuth } = require('../middlewares')

// function createFolderController(req, res) {
//   const logic = new FolderLogic()
//   const controller = new FolderController(logic)
//   controller.setRequest(req)
//   controller.setResponse(res)
//   return controller
// }

// router.post('/user/:id/folder', (req, res) => {
//   return createFolderController(req, res).createFolder(req.params.id, req.body.folderName)
// })

// router.get('/user/:id/folder', (req, res) => {
//   return createFolderController(req, res).getFolders(req.params.id)
// })

// router.post('/user/:id/folder/:folderId', (req, res) => {
//   return createFolderController(req, res).updateFolder(req.params.id, req.params.folderId, req.body.folderName)
// })

// router.delete('/user/:id/folder/:folderId', (req, res) => {
//   return createFolderController(req, res).deleteFolder(req.params.id, req.params.folderId)
// })

// ниже роуты для линков

function createItemController(req, res) {
  const logic = new ItemLogic()
  const controller = new ItemController(logic)
  controller.setRequest(req)
  controller.setResponse(res)
  return controller
}

router.post('/link', hasAuth, (req, res) => {
  // console.log(req.user)
  // console.log(req.body)
  return createItemController(req, res).addItem(req.user.email, req.body.itemUrl)
 
})

router.get('/link', hasAuth, (req, res) => {
  return createItemController(req, res).getItems(req.params.email)
})

router.delete('/link/:itemId', hasAuth, (req, res) => {
  return createItemController(req, res).deleteItem(req.user.email, req.params.itemId)
})

module.exports = router

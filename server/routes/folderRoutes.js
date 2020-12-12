const express = require('express')
const router = express.Router()
const { FolderController } = require('../controllers/folderController')
const { FolderLogic } = require('../logic/folderLogic')

function createFolderController(req, res) {
  const logic = new FolderLogic()
  const controller = new FolderController(logic)
  controller.setRequest(req)
  controller.setResponse(res)
  return controller
}

router.post('/folder', (req, res) => {
  return createFolderController(req, res).createFolder(req.user.email, req.body.name)
})

router.get('/folder', (req, res) => {
  return createFolderController(req, res).getFolders(req.user.email)
})

router.post('/folder/:folderId', (req, res) => {
  return createFolderController(req, res).updateFolder(req.user.email, req.body.id, req.body.name)
})

router.delete('/folder/:folderId', (req, res) => {
  return createFolderController(req, res).deleteFolder(req.user.email, req.body.id)
})

module.exports = router

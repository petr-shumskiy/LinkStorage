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

router.post('/user/:id/folder', (req, res) => {
  return createFolderController(req, res).createFolder(req.params.id, req.body.folderName)
})

router.get('/user/:id/folder', (req, res) => {
  return createFolderController(req, res).getFolders(req.params.id)
})

router.post('/user/:id/folder/:folderId', (req, res) => {
  return createFolderController(req, res).updateFolder(req.params.id, req.params.folderId, req.body.folderName)
})

router.delete('/user/:id/folder/:folderId', (req, res) => {
  return createFolderController(req, res).deleteFolder(req.params.id, req.params.folderId)
})
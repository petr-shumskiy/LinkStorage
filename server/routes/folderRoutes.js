const express = require('express')
const router = express.Router()
const { FolderController } = require('../controllers/folderController')
const { FolderLogic } = require('../logic/folderLogic')
const { hasAuth } = require('../middlewares')

function createFolderController(req, res) {
  const logic = new FolderLogic()
  const controller = new FolderController(logic)
  controller.setRequest(req)
  controller.setResponse(res)
  return controller
}

router.post('/folder', hasAuth, (req, res) => {
  return createFolderController(req, res).createFolder(
    req.user.email,
    req.body.name
  )
})

router.get('/folder', hasAuth, (req, res) => {
  return createFolderController(req, res).getFolders(req.user.email)
})

router.post('/folder/:folderId', hasAuth, (req, res) => {
  return createFolderController(req, res).updateFolder(
    req.user.email,
    req.params.folderId,
    req.body.name
  )
})

router.delete('/folder/:folderId', hasAuth, (req, res) => {
  return createFolderController(req, res).deleteFolder(
    req.user.email,
    req.params.folderId
  )
})

module.exports = router

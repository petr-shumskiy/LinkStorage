const express = require('express')
const router = express.Router()
const { ItemController } = require('../controllers/itemController')
const { ItemLogic } = require('../logic/itemLogic')
const { hasAuth } = require('../middlewares')

function createItemController(req, res) {
  const logic = new ItemLogic()
  const controller = new ItemController(logic)
  controller.setRequest(req)
  controller.setResponse(res)
  return controller
}

router.post('/link', hasAuth, (req, res) => {
  return createItemController(req, res).addItem(req.user.email, req.body.url)
})

router.get('/link', hasAuth, (req, res) => {
  return createItemController(req, res).getItems(req.user.email)
})

router.delete('/link/:itemId', hasAuth, (req, res) => {
  return createItemController(req, res).deleteItem(
    req.user.email,
    req.params.itemId
  )
})

router.patch('/link/:itemId', hasAuth, (req, res) => {
  return createItemController(req, res).updateItemStatus(
    req.user.email,
    req.body
  )
})

router.put('/link/:itemId', hasAuth, (req, res) => {
  return createItemController(req, res).updateItemContent(
    req.user.email,
    req.params.itemId,
    req.body
  )
})

router.get('/items/', hasAuth, (req, res) => {
  return createItemController(req, res).searchItems(
    req.user.email,
    req.query.search
  )
})

module.exports = router

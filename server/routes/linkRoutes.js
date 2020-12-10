const express = require('express')
const router = express.Router()
const { hasAuth } = require('../middlewares')
const linkController = require('../controllers/linkController')

router.get('/link', hasAuth, linkController.getItems)
router.delete('/link/:linkId', hasAuth, linkController.deleteItem)
router.post('/link', hasAuth, linkController.addItem)

module.exports = router

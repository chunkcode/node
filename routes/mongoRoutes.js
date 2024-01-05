const express = require('express')
const controller = require('../controllers/mongoController')
const router = express.Router()

router.route('/').get(controller.getData).post(controller.postData)




module.exports = router
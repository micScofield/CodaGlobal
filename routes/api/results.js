const express = require('express')

const ResultsController = require('../../controllers/results')

const router = express.Router()

//post create a new team @access=public
router.post('/', ResultsController.Result)

module.exports = router
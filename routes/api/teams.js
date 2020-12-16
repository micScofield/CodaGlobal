const express = require('express')
const { check } = require('express-validator')

const TeamsController = require('../../controllers/teams')

const router = express.Router()

//post create a new team @access=public
router.post('/', TeamsController.AddTeam)
router.get('/', TeamsController.LoadTeams)

module.exports = router
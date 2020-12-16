const HttpError = require('../models/http-error')
const Team = require('../models/Team')

const addTeam = async (req, res, next) => {

    let team
    const teamData = {
        team_name: req.body.team_name
    }
    try {
        team = new Team(teamData)
        await team.save()

        return res.json({ team: team })

    } catch (error) {
        return next(new HttpError('Error while setting up team'), 500)
    }
}

const loadTeams = async (req, res, next) => {

    let teams
    try {
        teams = await Team.find()
        return res.json({ teams: teams })

    } catch (error) {
        return next(new HttpError('Error while fetching teams'), 500)
    }
}

exports.AddTeam = addTeam
exports.LoadTeams = loadTeams

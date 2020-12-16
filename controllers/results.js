const HttpError = require('../models/http-error')
const Team = require('../models/Team')

const result = async (req, res, next) => {

    const { result, teamA, teamB } = req.body

    let team1, team2
    try {

        //fetching both teams first
        team1 = await Team.findOne({ team_name: teamA })
        team2 = await Team.findOne({ team_name: teamB })

        //setting up new fields based on result A wins, B wins, Tie
        let team1Fields, team2Fields

        if (result === 'A wins') {
            team1Fields = {
                team_name: team1.team_name,
                wins: team1.wins + 1,
                losses: team1.losses,
                ties: team1.ties,
                score: team1.score + 3
            }

            team2Fields = {
                team_name: team2.team_name,
                wins: team2.wins,
                losses: team2.losses + 1,
                ties: team2.ties,
                score: team2.score
            }
        } else if (result === 'B wins') {
            team1Fields = {
                team_name: team1.team_name,
                wins: team1.wins,
                losses: team1.losses + 1,
                ties: team1.ties,
                score: team1.score
            } 
    
            team2Fields = {
                team_name: team2.team_name,
                wins: team2.wins + 1,
                losses: team2.losses,
                ties: team2.ties,
                score: team2.score + 3
            }
        } else {
            team1Fields = {
                team_name: team1.team_name,
                wins: team1.wins,
                losses: team1.losses,
                ties: team1.ties + 1,
                score: team1.score + 1
            } 
    
            team2Fields = {
                team_name: team2.team_name,
                wins: team2.wins,
                losses: team2.losses,
                ties: team2.ties + 1,
                score: team2.score + 1
            }
        }

        //updating document for team A
        if (team1) {
            team1 = await Team.findOneAndUpdate(
                { team_name: teamA },
                { $set: team1Fields },
                { new: true }
            )
        }

        //updating document for team B
        if (team2) {
            team2 = await Team.findOneAndUpdate(
                { team_name: teamB },
                { $set: team2Fields },
                { new: true }
            )
        }

        return res.json({ msg: 'Result successfully updated', team1: team1, team2: team2 })

    } catch (error) {
        console.log('Server Error || 500')
        return next(new HttpError('Error while setting up profile'), 500)
    }
}

exports.Result = result

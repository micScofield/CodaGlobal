const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    team_name: {type: String},
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    ties: {type: Number, default: 0},
    score: {type: Number, default: 0}
})

module.exports = mongoose.model('Team', teamSchema)
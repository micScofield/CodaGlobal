import axios from 'axios'

import * as actionTypes from './types'
// import { setAlert } from './alert'

const teamStart = () => { return { type: actionTypes.TEAM_START } }
const teamError = (errorMsg) => { return { type: actionTypes.TEAM_ERROR, errorMsg: errorMsg } }
const loadTeamsSuccess = (teams) => { return { type: actionTypes.LOAD_TEAMS, teams: teams } }
const addTeamSuccess = (team) => { return { type: actionTypes.ADD_TEAM_SUCCESS, team: team } }

export const addTeam = (team_name) => async dispatch => {
    dispatch(teamStart())

    try {
        let res = await axios.post(
            'http://localhost:5000/api/teams',
            JSON.stringify({ team_name }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (res.status === 200) dispatch(setAlert('success', 'Team added successfully'))
        dispatch(loadTeams())
        dispatch(addTeamSuccess(res.data.team))
    } catch (error) {
        dispatch(teamError(error))
        dispatch(setAlert('danger', 'Some error occurred, please try again !'))
        console.log('some unknown error occurred !')
    }
}

export const loadTeams = () => async dispatch => {
    dispatch(teamStart())

    try {
        let res = await axios.get('http://localhost:5000/api/teams')

        res.data.teams.sort(function (a, b) {
            return b.score - a.score
        })
        dispatch(loadTeamsSuccess(res.data.teams))

    } catch (error) {
        dispatch(teamError(error))
        console.log(error)
        dispatch(setAlert('danger', 'Some error occurred, please try again !'))
        console.log('some unknown error occurred !')
    }
}


//alerts
const removeAlert = () => {
    return {
        type: actionTypes.REMOVE_ALERT
    }
}

export const setAlert = (type, msg) => dispatch => {
    dispatch({
        type: actionTypes.SET_ALERT,
        msg: msg,
        alertType: type
    })
    setTimeout(() => { dispatch(removeAlert()) }, 4000)
}

//result
export const result = (result, teamA, teamB) => async dispatch => {
    dispatch(teamStart())
    console.log('sending', result, teamA, teamB)
    try {
        let res = await axios.post(
            'http://localhost:5000/api/results',
            JSON.stringify({ result, teamA, teamB }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status === 200) dispatch(setAlert('success', 'Result updated successfully'))
        dispatch(loadTeams())
    } catch (error) {
        dispatch(teamError(error))
        dispatch(setAlert('danger', 'Some error occurred, please try again !'))
        console.log('some unknown error occurred !')
    }
}

//sorting
export const sortByScore = (teams) => {

    teams.sort(function (a, b) {
        return b.score - a.score
    })
    console.log(teams)
    return { type: actionTypes.SORT_BY_SCORE, teams: teams }
}

export const sortByName = (teams) => {

    teams.sort(function (a, b) {
        var nameA = a.team_name.toLowerCase(), nameB = b.team_name.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    return { type: actionTypes.SORT_BY_NAME, teams: teams }
}

//filtering
export const filterByName = (teams) => {
    return { type: actionTypes.FILTER_BY_NAME, teams: teams }
}
import * as actionTypes from '../actions/types'

const initialState = {
    loading: false,
    error: null,
    teams: [],
    team: null,
    msg: null,
    type: null,
    sortedByScore: [],
    sortedByName: [],
    filteredTeams: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TEAM_START: return { ...state, loading: true, error: null, team: null }
        case actionTypes.TEAM_ERROR: return { ...state, loading: false, error: action.errorMsg }
        case actionTypes.LOAD_TEAMS: return { ...state, loading: false, teams: action.teams }
        case actionTypes.ADD_TEAM_SUCCESS: return { ...state, loading: false, team: action.team }
        case actionTypes.SET_ALERT: return { ...state, msg: action.msg, type: action.alertType }
        case actionTypes.REMOVE_ALERT: return { ...state, msg: null, type: null }
        case actionTypes.SORT_BY_SCORE: return { ...state, loading: false, sortedByScore: action.teams }
        case actionTypes.SORT_BY_NAME: return { ...state, loading: false, sortedByName: action.teams }
        case actionTypes.FILTER_BY_NAME: 
        case actionTypes.FILTER_BY_SCORE:
            return { ...state, filteredTeams: action.teams }
        default:
            return initialState
    }
}

export default reducer
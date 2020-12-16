import { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { addTeam, loadTeams, result, sortByScore, sortByName, filterByName } from '../../store/actions'
import Spinner from './UI/Spinner'
import Modal from './UI/Modal'
import Search from './Search'

const HomePage = ({ addTeam, loading, alertMsg, alertType, teamsDB, loadTeams, result, sortByName, sortByScore, sortedByScore, sortedByName, filterByName, filtered }) => {

    const [input, setInput] = useState(null)
    const [disabledCheckboxes, setDisabledChecboxes] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [res, setRes] = useState()

    let selectedTeams = []
    let length = 0
    let displayTeams

    const checkboxHandler = (name) => {

        const index = selectedTeams.indexOf(name)

        if (index > -1) {
            selectedTeams.splice(index, 1)
            length = length - 1
            return;
        }

        if (length < 2) {
            selectedTeams.push(name)
            length = length + 1
        }

        //check length and disable checkboxes
        if (length === 2) {
            localStorage.setItem('teams', selectedTeams)
            setDisabledChecboxes(true)

            //show a modal give options to choose again or declare a result
            const enableCheckboxPopup = (
                <div>Want to choose teams again ? <span><button className='btn btn-light' onClick={() => { window.location.reload(false) }}>Click Here</button></span></div>
            )
            setInput(enableCheckboxPopup)
            setShowModal(!showModal)

        }

        console.log(selectedTeams)
        console.log(length)
    }

    if (sortedByScore.length !== 0) {
        displayTeams = (
            sortedByScore.map(team => {
                return <tr key={team._id}>
                    <td><input type='checkbox' disabled={disabledCheckboxes} onChange={checkboxHandler.bind(this, team.team_name)} /></td>
                    <td>{team.team_name}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.score}</td>
                </tr>
            })
        )
    } else if (sortedByName.length !== 0) {
        displayTeams = (
            sortedByName.map(team => {
                return <tr key={team._id}>
                    <td><input type='checkbox' disabled={disabledCheckboxes} onChange={checkboxHandler.bind(this, team.team_name)} /></td>
                    <td>{team.team_name}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.score}</td>
                </tr>
            })
        )
    } else if (filtered.length !== 0) {
        displayTeams = (
            filtered.map(team => {
                return <tr key={team._id}>
                    <td><input type='checkbox' disabled={disabledCheckboxes} onChange={checkboxHandler.bind(this, team.team_name)} /></td>
                    <td>{team.team_name}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.score}</td>
                </tr>
            })
        )
    } else {
        displayTeams = (
            teamsDB.map(team => {
                return <tr key={team._id}>
                    <td><input type='checkbox' disabled={disabledCheckboxes} onChange={checkboxHandler.bind(this, team.team_name)} /></td>
                    <td>{team.team_name}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.score}</td>
                </tr>
            })
        )
    }

    useEffect(() => {
        loadTeams()
    }, [sortedByName])

    let newTeam = ''

    const changeHandler = (event) => {
        newTeam = (event.target.value)
    }

    let addTeamPopup
    const addTeamHandler = (event) => {
        event.preventDefault();
        addTeamPopup = (
            <div>
                Enter Team Name : <input type='text' autoFocus name='team_name' onChange={changeHandler.bind(this)} /> <span><button className='btn btn-primary' onClick={addHandler.bind(this)}> Add</button></span>
            </div>
        )
        setInput(addTeamPopup)
    }

    const addHandler = (event) => {
        event.preventDefault();
        setInput(null)
        addTeam(newTeam)
    }

    const sortByScoreHandler = () => {
        //dispatching
        sortByScore(teamsDB)
    }

    const sortByTeamNameHandler = () => {
        //dispatching
        sortByName(teamsDB)
    }

    const proceedHandler = () => {
        const teamA = teamsArray[0]
        const teamB = teamsArray[1]
        console.log(teamA, teamB)
        setShowModal(!showModal)
        result(res, teamA, teamB)
    }

    const searchHandler = (filteredTeams) => {
        //dispatch an action to set filtered teams
        filterByName(filteredTeams)
    }

    const alertClasses = ['alert']
    if (alertType === 'success') alertClasses.push('alert-primary')
    else alertClasses.push('alert-dark')

    const teams = localStorage.getItem('teams')

    let teamsArray = []
    teamsArray = teams && teams.split(',')
    // console.log(teamsArray)

    let content = (
        <Fragment>
            <div className='container'>
                {alertMsg ? <p className={alertClasses.join(' ')}>{alertMsg}</p> : null}

                <strong>Actions : </strong>
                <span><button className='btn btn-primary' onClick={addTeamHandler}>Add Team</button></span>
                <span><button className='btn btn-primary' onClick={sortByScoreHandler}>Sort By Score</button></span>
                <span><button className='btn btn-primary' onClick={sortByTeamNameHandler}>Sort By Team Name</button></span><br />
                {/* <Search onFilterIngredients={searchHandler} /> */}
                {input}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Team Name</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Ties</th>
                            <th>Scores</th>
                        </tr>
                    </thead>
                    <tbody>{displayTeams}</tbody>
                </table>
                <Modal show={showModal} backdropClicked={() => {
                    setShowModal(!showModal)
                    localStorage.clear('teams')
                    window.location.reload(false)
                }}>
                    <div>
                        {/* {console.log('teams latest', teamsArray)} */}
                        You have selected {teamsArray !== null ? <Fragment>
                            <span><strong>{teamsArray[0]}</strong> and <strong>{teamsArray[1]}</strong></span>
                        </Fragment> : null}
                        <br />
                        Please decide result between these two teams : <br />
                        <input type='radio' name='res' onChange={() => setRes('A wins')} /> Team A wins <br />
                        <input type='radio' name='res' onChange={() => setRes('B wins')} /> Team B wins <br />
                        <input type='radio' name='res' onChange={() => setRes('Tie')} /> Tie-breaker <br /><br />

                        Want to choose teams again ? <span><button className='btn btn-dark' onClick={() => { window.location.reload(false) }}>Click Here</button></span><br />

                        {teamsArray !== null ? <button className='btn btn-primary btn-large' onClick={proceedHandler}>Proceed</button> : null}
                    </div>
                </Modal>
            </div>
        </Fragment>
    )

    if (loading) content = <Spinner />
    return content
}

const mapStateToProps = state => {
    return {
        loading: state.team.loading,
        alertMsg: state.team.msg,
        alertType: state.team.type,
        teamsDB: state.team.teams,
        sortedByScore: state.team.sortedByScore,
        sortedByName: state.team.sortedByName,
        filtered: state.team.filteredTeams
    }
}

export default connect(mapStateToProps, { addTeam, loadTeams, result, sortByName, sortByScore, filterByName })(HomePage)
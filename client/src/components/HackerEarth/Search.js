import { memo, useEffect, useState, useRef, Fragment } from 'react'
import { connect } from 'react-redux'

import './Search.css'

const Search = memo(({ onFilterIngredients, teamsDB, sortedByName, sortedByScore }) => {
    const [userInputFilter, setUserInputFilter] = useState('')
    const [userInputScoreFilter, setUserInputScoreFilter] = useState('')

    const inputFilterRef = useRef()
    const inputFilterScoreRef = useRef()

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (userInputFilter !== '' && userInputFilter === inputFilterRef.current.value) {

    //             if (sortedByName.length !== 0) {
    //                 const filtered = sortedByName.filter(team => {
    //                     return team.team_name.includes(userInputFilter)
    //                 })
    //                 onFilterIngredients(filtered)
    //             } else if (sortedByScore.length !== 0) {
    //                 const filtered = sortedByScore.filter(team => {
    //                     return team.team_name.includes(userInputFilter)
    //                 })
    //                 onFilterIngredients(filtered)
    //             } else {
    //                 const filtered = teamsDB.filter(team => {
    //                     return team.team_name.includes(userInputFilter)
    //                 })
    //                 onFilterIngredients(filtered)
    //             }

    //         } else {
    //             if (sortedByName.length !== 0) {
    //                 const filtered = sortedByName.filter(team => {
    //                     return team.score.toString() === userInputScoreFilter
    //                 })
    //                 onFilterIngredients(filtered)
    //             } else if (sortedByScore.length !== 0) {
    //                 const filtered = sortedByScore.filter(team => {
    //                     return team.score.toString() === userInputScoreFilter
    //                 })
    //                 onFilterIngredients(filtered)
    //             } else {
    //                 const filtered = teamsDB.filter(team => {
    //                     return team.score.toString() === userInputScoreFilter
    //                 })
    //                 onFilterIngredients(filtered)
    //             }
    //         }
    //     }, 1000)
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [userInputFilter, onFilterIngredients])

    useEffect(() => {
        if (userInputFilter !== '' && userInputFilter === inputFilterRef.current.value) {

            if (sortedByName.length !== 0) {
                const filtered = sortedByName.filter(team => {
                    return team.team_name.includes(userInputFilter)
                })
                onFilterIngredients(filtered)
            } else if (sortedByScore.length !== 0) {
                const filtered = sortedByScore.filter(team => {
                    return team.team_name.includes(userInputFilter)
                })
                onFilterIngredients(filtered)
            } else {
                const filtered = teamsDB.filter(team => {
                    return team.team_name.includes(userInputFilter)
                })
                onFilterIngredients(filtered)
            }

        } else {
            if (sortedByName.length !== 0) {
                const filtered = sortedByName.filter(team => {
                    return team.score.toString() === userInputScoreFilter
                })
                onFilterIngredients(filtered)
            } else if (sortedByScore.length !== 0) {
                const filtered = sortedByScore.filter(team => {
                    return team.score.toString() === userInputScoreFilter
                })
                onFilterIngredients(filtered)
            } else {
                const filtered = teamsDB.filter(team => {
                    return team.score.toString() === userInputScoreFilter
                })
                onFilterIngredients(filtered)
            }
        }
    }, [userInputFilter, onFilterIngredients])

    return (
        <Fragment>
            <div className='Search'>
                <p>Search by Team Name</p>
                <input
                    ref={inputFilterRef}
                    type='text'
                    id='filterByName'
                    value={userInputFilter}
                    onChange={event => setUserInputFilter(event.target.value)} />
            </div>
            <div className='Search'>
                <p>Search by Team Score</p>
                <input
                    ref={inputFilterScoreRef}
                    type='text'
                    id='filterByScore'
                    value={userInputScoreFilter}
                    onChange={event => setUserInputScoreFilter(event.target.value)} />
            </div>
        </Fragment>
    )
})

const mapStateToProps = state => {
    return {
        teamsDB: state.team.teams,
        sortedByScore: state.team.sortedByScore,
        sortedByName: state.team.sortedByName
    }
}

export default connect(mapStateToProps)(Search)
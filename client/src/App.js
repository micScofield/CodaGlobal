import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './components/HackerEarth/Dashboard'

import './App.css';

const App = props => {

  return (
    <Router>
      <Fragment>
        <Dashboard />
      </Fragment>
    </Router>
  )
}

export default App
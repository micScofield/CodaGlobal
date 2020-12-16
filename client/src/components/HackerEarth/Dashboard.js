import { Fragment, useEffect } from "react";
import { Redirect, Route, Switch } from 'react-router'

import HomePage from './HomePage'

const Dashboard = () => {

    let routes = (
        <Switch>
            <Route path='/' exact component={HomePage} />
            <Redirect to='/' />
        </Switch>
    )

    return <Fragment>
        {routes}
    </Fragment>
}

export default Dashboard
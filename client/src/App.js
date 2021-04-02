import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import Loader from './components/Loader/Loader'

// Styles
import './App.css'

// Pages
const Form = lazy(() => import('./pages/Form/Form'))
const Setup = lazy(() => import('./pages/Setup/Setup'))
const NotFound = lazy(() => import('./pages/404/404'))

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Suspense fallback={<Loader to="page" />}>
                        <Switch>
                            <Route exact path="/authenticate" component={Form} />
                            <Route exact path="/setup/:id" component={Setup} />
                            <Route exact path="/*" render={props => <NotFound {...props} />} />
                        </Switch>
                    </Suspense>
                </Router>
            </div>
        )
    }
}

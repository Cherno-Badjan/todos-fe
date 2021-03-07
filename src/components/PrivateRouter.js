import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ render: Component, ...rest }) => {
    return (
        //Hide component if there is no User signed and redirect to log in page
        <Route {...rest} render={props => (rest.token ? <Component {...props} {...rest} /> : <Redirect to="/login" />)} />
    )
}
export default PrivateRoute


import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { ReadLogin, ReadRegister } from './views/Auth';

const AuthRouter = ({ match: { url } }) => (
    <Switch>
        <Route path={`${url}/login`} exact component={ReadLogin} />
        <Route path={`${url}/register`} exact component={ReadRegister} />
        <Redirect to="/auth/login" />
    </Switch>
);

export default withRouter(AuthRouter);
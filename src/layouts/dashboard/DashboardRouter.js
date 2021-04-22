import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { ReadDashboard } from './views/Admin';
import { ReadUsers, CreateUser, UpdateUser } from './views/Users';
import { ReadOrders, CreateOrders, UpdateOrders } from './views/Orders';
import { ReadNotifications } from './views/Notification';
import { ReadChat } from './views/Chat';
import { ReadTools, CreateTools, UpdateTools } from './views/Tool';
import { ReadForms, CreateForms, UpdateForms } from './views/Form';
import { ReadEntrys, CreateEntrys } from './views/Entry';

const DashboardRouter = ({ match: { url } }) => {
    const rol = useSelector(state => state.auth.user.role);

    if (rol === 'ADMIN') {
        return (
            <Switch>
                <Route path={`${url}`} exact component={ReadDashboard} />
                <Route path={`${url}/users`} exact component={ReadUsers} />
                <Route path={`${url}/users/create`} exact component={CreateUser} />
                <Route path={`${url}/users/:id`} exact component={UpdateUser} />
                <Route path={`${url}/orders`} exact component={ReadOrders} />
                <Route path={`${url}/orders/create`} exact component={CreateOrders} />
                <Route path={`${url}/orders/:id`} exact component={UpdateOrders} />
                <Route path={`${url}/notifications`} exact component={ReadNotifications} />
                <Route path={`${url}/chat`} exact component={ReadChat} />
                <Route path={`${url}/tools`} exact component={ReadTools} />
                <Route path={`${url}/tools/create`} exact component={CreateTools} />
                <Route path={`${url}/tools/:id`} exact component={UpdateTools} />
                <Route path={`${url}/forms`} exact component={ReadForms} />
                <Route path={`${url}/forms/create`} exact component={CreateForms} />
                <Route path={`${url}/forms/:id`} exact component={UpdateForms} />
                <Route path={`${url}/entrys`} exact component={ReadEntrys} />
                <Route path={`${url}/entrys/create`} exact component={CreateEntrys} />
                <Redirect to="/dashboard" />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route path={`${url}`} exact component={ReadDashboard} />
                <Route path={`${url}/orders`} exact component={ReadOrders} />
                <Route path={`${url}/orders/create`} exact component={CreateOrders} />
                <Route path={`${url}/orders/:id`} exact component={UpdateOrders} />
                <Route path={`${url}/entrys`} exact component={ReadEntrys} />
                <Route path={`${url}/entrys/create`} exact component={CreateEntrys} />
                <Route path={`${url}/notifications`} exact component={ReadNotifications} />
                <Route path={`${url}/chat`} exact component={ReadChat} />
                <Redirect to="/dashboard" />
            </Switch>
        );
    }
};

export default withRouter(DashboardRouter);
import React from 'react';
import './stylesheets/main.scss';
import ReactDOM from 'react-dom';
import moment from 'moment';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter } from "react-router-dom"
import PrivateRoute from "../src/common/PrivateRoute";
import Main from "../src/layouts/Main";
import ForgotPassword from "./ForgotPassword";
import Password from './Password';
import SignIn from "./LogIn";
import Private from './layouts/Private';
import Auth from "../src/services/AuthService";
import NotFound from './components/NotFound';

moment.locale();
const auth = new Auth();

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => (<Main><SignIn /></Main>)} />
            <Route exact path="/forgot-password" component={() => (<Main><ForgotPassword /></Main>)} />
            <Route exact path="/password" component={() => (<Main><Password /></Main>)} />
            <PrivateRoute path="/profile" component={()=><Private />} />
            <PrivateRoute path="/client" component={()=><Private />} />
            <PrivateRoute path="/user" component={()=><Private />} />
            <PrivateRoute path="/server" component={()=><Private />} />
            <PrivateRoute path="/deployment" component={()=><Private />} />
            <PrivateRoute path="/software" component={()=><Private />} />
            <PrivateRoute path="/cloud-provider" component={()=><Private />} />
            <PrivateRoute path="/component-categorie" component={()=><Private />} />
            <PrivateRoute path="/component" component={()=><Private />} />
            <PrivateRoute path="/project" component={()=><Private />} />
            <Route exact path="/logout" component={()=>auth.logout()} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

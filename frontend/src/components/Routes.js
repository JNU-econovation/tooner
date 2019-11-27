import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from '../screens/Login';
import Sign from '../screens/Sign';
import Main from '../screens/Main';
import Header from './Header/Header';

export default () => (
    <Router>
        <Header />
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/sign' component={Sign} />
    </Router>
)
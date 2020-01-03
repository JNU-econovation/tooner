import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './Main/Main';
import Header from './Header/Header';
import MiddleHeader from './MiddleHeader/MiddleHeader'
import Login from './Login';
import Signup from './Signup';
import ShortReview from './Review/ShortReview/ShortReview';
import LongReview from './Review/LongReview/LongReview';
import Footer from './Footer/Footer';

export default () => (
    <Router>
        <Header />
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/' component={MiddleHeader} />
            
        </Switch>
        <Switch>
            <Route path='/review/short' component={ShortReview} />
            <Route path='/review/long' component={LongReview} />
            <Route path='/review' component={ShortReview} />
            <Route exact path='/' component={Main} />
            {/*<Route component={NotFound} />*/}
        </Switch>
        <Footer />
    </Router>
)
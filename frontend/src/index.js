import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { AuthProvider }  from '../src/components/Context/AuthProvider';

function Index() {
    console.log(localStorage)
    return(
        <AuthProvider>
            <App />
        </AuthProvider>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

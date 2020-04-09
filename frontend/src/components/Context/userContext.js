import React, { useState, useEffect } from 'react';

const userContext = React.createContext({});
const initialState = {
    logged: false
}

const authReducer = (action) => {
    switch (action.type) {
        case 'login':
            return { logged : true };
        case 'logout':
            return { logged: false };
        default:
            throw new Error();
    }
}

function AuthProvider(props) {
    const [state, dispatch] = React.useReducer(authReducer, initialState)
    return (
        <userContext.Provider value={state}>
            { props.children }
        </userContext.Provider>
    );
}

export { AuthProvider, userContext }
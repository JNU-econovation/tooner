import React from 'react';
import AuthHelperMethods from './AuthHelperMethods';

const auth = new AuthHelperMethods();
const AuthContext = React.createContext(null);
const initialState = {
    logged: auth.loggedIn(),
    token: auth.getToken()
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'login':
            const token = action.payload.token;
            localStorage.setItem('token', token);
            return {
                ...state,
                logged: true,
                token: token
            };
        case 'logout':
            localStorage.clear();
            return {
                ...state,
                logged: false,
                token: null
            }
        default:
            return state;
    }
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    console.log(state);
    return(
        <AuthContext.Provider value={{
            state,
            dispatch
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext };
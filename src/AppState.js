import React, { useContext, useReducer } from "react";

/// Initial State

const initialState = {
    url: "http://blogspec-api.herokuapp.com",
    token: null,
    username: null
}

/// Reducer

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "auth":
            newState = { ...state, ...action.payload };
            return newState;
            break;
        case "logout":
            newState = {...state, token: null, username: null};
            window.localStorage.removeItem("auth");
            return newState;
        default:
            return state;
            break;
    }
}

/// AppContext

const AppContext = React.createContext(null)

/// AppState Component

export const AppState = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return <AppContext.Provider value={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>
};

/// useAppState Hook

export const useAppState = () => {
    return React.useContext(AppContext)
}

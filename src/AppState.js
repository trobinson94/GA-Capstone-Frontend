import React, { useReducer } from "react";

/// Initial State

const initialState = {
    url: "http://blogspec-api.herokuapp.com"
}

/// Reducer

const reducer = (state, action) => {

    switch(action.type){
        default:
            return state
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

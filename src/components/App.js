import React from "react";
import "../App.css";
import {Switch, Route} from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import {useAppState} from "../AppState";

const App = (props) => {
    
    const {state, dispatch} = useAppState()
    React.useState(() => {
        const auth = JSON.parse(window.localStorage.getItem("auth"))
        if (auth) {
            dispatch({type: "auth", payload: auth})
            props.history.push("/dashboard")
        } else {
            props.history.push("/")
        }
    }, [])
    
    return (
        <> 
            <Route path="/" component={Nav} />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/auth/:form" component={Auth}/> 
                {/* <Route path="/signup/:form" component={Auth}/>  */}
                <Route path="/dashboard" component={Dashboard}/> 
            </Switch>
        </>
    );
};

export default App
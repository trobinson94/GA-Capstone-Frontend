import React from "react";
import {Switch, Route} from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

const App = (props) => {
    return <> 
    <Nav/>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/auth/:form" component={Auth}/> 
        <Route path="/signup/:form" component={SignUp}/> 
        <Route path="/dashboard" component={Dashboard}/> 
    </Switch>
    </>
}

export default App
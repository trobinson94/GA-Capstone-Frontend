import React from "react";
import "../App.css";
import {Switch, Route} from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Contact from "../pages/Contact";
import Post from "../pages/Post";
import Dashboard from "../pages/Dashboard";
import {useAppState} from "../AppState";
import BlogForm from "./BlogForm";

const App = (props) => {
    
    const {state, dispatch} = useAppState()
    React.useEffect(() => {
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
            <section>
            <Route path="/" component={Nav} />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/auth/:form" component={Auth}/> 
                <Route path="/dashboard" component={Dashboard}/> 
                <Route path="/posts/:id" component={Post}/> 
                {/* <Route path="/posts/:action" component={BlogForm}/> */}
                <Route path="/posts/new" component={BlogForm}/>
                <Route path="/posts/edit" component={BlogForm}/>
                <Route path="/contact" component={Contact}/>
            </Switch>
            </section>
        </>
    );
};

export default App
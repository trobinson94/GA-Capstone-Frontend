import React from "react";
import { Link } from "react-router-dom"
import { useAppState } from "../AppState";

const Nav = (props) => {

    const {state, dispatch} = useAppState()

    return (
    <header>
        <h1 className="logo">BlogSpec</h1>
        <div className="nav">
        <nav>
            {!state.token ? (<>
            <Link to="/"><div>Home</div></Link>
            <Link to="/auth/signup">
                <div>Sign Up</div>
                </Link>
            <Link to="/auth/login">
                <div>Login</div>
            </Link></>) : null }
            {state.token ? 
            <>
            <Link to="/dashboard"><div>Home</div></Link>
            <Link to="/contact"><div>Contact</div></Link>
            <Link to="/profile"><div>Edit Profile</div></Link>
            <div 
            onClick={() => {
                dispatch({type: "logout"}) 
                props.history.push("/")
            }}>
                Logout
            </div> 
             </> : null}
            
        </nav>
        </div>
    </header>)
}

export default Nav
import React from "react";
import { Link } from "react-router-dom"

const Nav = (props) => {
    return <header>
        <h1>Blogspec</h1>
        <nav>
            <Link to="/"><div>Home</div></Link>
            <Link to="/auth/signup"><div>Sign Up</div></Link>
            <Link to="/auth/login"><div>Login</div></Link>
            <Link to="/new"><div>New Post</div></Link>
        </nav>
    </header>
}

export default Nav
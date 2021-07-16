import React from "react";
import { useLocation } from "react-router-dom"
import {useAppState} from "../AppState";

const Auth = (props) => {

    const type = props.match.params.form;
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        img: "",
        bio: "",
        location: "",
        social: ""
    });
    const [userData, setUserData] = React.useState(null);
    const { state, dispatch } = useAppState();
    const location = useLocation();


    React.useEffect(() => {
        if (userData) {
            console.log(userData)
            const { token, user } = userData;
            dispatch({ type: "auth", payload: { token, username: user.username } });
            window.localStorage.setItem("auth", JSON.stringify({ token, username: user.username }))
            props.history.push("/dashboard")
        }
    }, [userData]);

    const actions = {
        signup: () => {
            return fetch(state.url + "/users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        login: () => {
            return fetch(state.url + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        }
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        actions[type]().then((data) => {
            setUserData(data);
        });
    };

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <label for="username">Username</label><br></br>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                <label for="password">Password</label><br></br>
                <input type="text" name="password" value={formData.password} onChange={handleChange} />
                
                {location.pathname === "/auth/signup" ? (<><label for="email">Email</label><br></br>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                <label for="firstname">First Name</label><br></br>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                <label for="lastname">Last Name</label><br></br>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                <label for="img">Profile Picture URL</label><br></br>
                <input type="text" name="img" value={formData.img} onChange={handleChange} />
                <label for="bio">Bio</label><br></br>
                <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
                <label for="location">Location</label><br></br>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
                <label for="social">Social Media Handle</label><br></br>
                <input type="text" name="social" value={formData.social} onChange={handleChange} />
                </>) : null }
                
                <input type="submit" value={type} />
            </form>
        </div>
    );
};

export default Auth
import React from "react";
import { useAppState } from "../AppState";

const BlogForm = (props) => {

    const {state, dispatch} = useAppState();
    const {token} = state;
    const action = props.match.params.action;
    const [formData, setFormData] = React.useState(state[action]);

    const actions = {
        new: () => {
            return fetch(state.url + "/posts/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token,
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        edit: () => {
            return fetch(state.url + "/posts/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token,
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
        actions[action]().then((data) => {
            props.getPosts()
            props.history.push("/dashboard/")
        });
    };


    return (
        <div className="blogform">
            <form onSubmit={handleSubmit}>
                <label for="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                />
                <label for="body">Body</label>
                <textarea 
                    type="text" 
                    name="body" 
                    value={formData.body} 
                    onChange={handleChange} 
                />
                <input type="submit" value={action} />
            </form>
        </div>
    );

};

export default BlogForm;
import React from "react";
import {useAppState} from "../AppState";
import { Route, Link } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const Dashboard = (props) => {

    const {state, dispatch} = useAppState();
    const {token, url, posts, username} = state;

    const getPosts = async () => {
        const response = await fetch(url + "/posts/", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            },
        });
        const fetchedPosts = await response.json()
        dispatch({type: "getPosts", payload: fetchedPosts})
    }

    React.useEffect(() => {
        getPosts()
    }, []);

    const loaded = () => {
        return (
            <div class="dashboard">
                <Link to="/dashboard/new">
                    <button>Create New Blog Post</button>
                </Link>
                <Route 
                    path="/dashboard/:action" 
                    render={(rp) => <BlogForm {...rp} getPosts={getPosts}/> } 
                />
                    <ul>
                        {state.posts.map((post) => (
                            <div key={post.id}>
                                <h2>{post.title}</h2>
                                <h4>{post.body}</h4>
                            </div>
                        ))}
                    </ul>
            </div>
    )}

    return posts ? loaded() : <h1>Loading...</h1>
};

export default Dashboard
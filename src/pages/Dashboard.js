import React from "react";
import {useAppState} from "../AppState";
import { Route, Link } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import moment from "moment";


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
        const date = moment().local(state.posts.created_at).format("dddd, MMMM Do YYYY, h:mm a");

        return (
            <div class="dashboard">
                <Link to="/dashboard/:action">
                    <button>Create New Blog Post</button>
                </Link>
                <Route 
                    path="/dashboard/:action" 
                    render={(rp) => <BlogForm {...rp} getPosts={getPosts}/> } 
                />
                    <ul>
                        {state.posts.map((post) => (
                            <div className="post" key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{date}</p>
                                <h4>{post.body}</h4>
                                <button onClick={() => {
                                    dispatch({type: "select", payload: post})
                                    props.history.push("/dashboard/edit")
                                }}>Edit Note</button>
                                <button onClick={() => {
                                   fetch(url + "/posts/" + post.id, {
                                       method: "delete",
                                       headers: {
                                        Authorization: "bearer " + token
                                    }
                                   })
                                   .then(() => getPosts());
                                }}>Delete Note</button>
                            </div>
                        ))}
                    </ul>
            </div>
    )}

    return posts ? loaded() : <h1>Loading...</h1>
};

export default Dashboard
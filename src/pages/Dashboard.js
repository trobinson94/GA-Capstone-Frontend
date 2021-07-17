import React from "react";
import {useAppState} from "../AppState";
import { Route, Link } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import moment from "moment";


const Dashboard = (props) => {

    const {state, dispatch} = useAppState();
    const {token, url, posts, email, firstname} = state;

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
                <div className="row">
                <div className="leftcolumn">
                    <div className="card">
                    <ul>
                        {state.posts.map((post) => (
                            <div className="post" key={post.id}>
                                <h2>{post.title}</h2>
                                <p className="date">{date}</p>
                                <h4>{post.body}</h4>
                                <button 
                                    onClick={() => {
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

                    <Link to="/dashboard/new">
                        <button>Create New Blog Post</button>
                    </Link>
                    <Route 
                        path="/dashboard/:action" 
                        render={(rp) => <BlogForm {...rp} getPosts={getPosts}/> } 
                    />
                    </div>
                    </div>

                    <div className="rightcolumn">
                        <div className="card">
                        <div class="userimg"></div>
                            <h2>Tani</h2>
                            <p class="subtitle is-6">@tanirob</p>
                            <p class="subtitle is-6">Queens, NY</p>
                            <h5>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris. 
                                Proin vestibulum commodo elit a efficitur. Cras pulvinar dignissim interdum. Nulla congue magna sed lorem blandit gravida. Fusce pellentesque ultrices tempus. Ut eu nibh a erat molestie malesuada eu ac metus. Cras vehicula mauris nisl, ut hendrerit elit accumsan non. Pellentesque orci magna, ultricies nec vestibulum id, tempor tempor eros
                            </h5>
                    </div>
                    </div>
                </div>

            </div>
    )}

    return posts ? loaded() : <h1>Loading...</h1>
};

export default Dashboard
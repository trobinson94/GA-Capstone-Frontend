import React from "react";
import {useAppState} from "../AppState";
import { Route, Link } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const Post = (props) => {
    
    const {state, dispatch} = useAppState();
    const id = props.match.params.id
    const post = state.posts.find((p) => {
        return p.id === parseInt(id)
    })

    return (
        <div>
            <h2>{post.title}</h2>
            <h3>{post.body}</h3>

           
            <button>Edit Post</button>
            <button>Delete Post</button>
           
        </div>
    )

    
}

export default Post
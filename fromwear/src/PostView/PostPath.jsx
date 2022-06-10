import React from 'react';
import { useParams } from "react-router";
import Post from "./Post.jsx";

function PostPath() {
    const {postid} = useParams();
    
    return (
      <div>
          <Post postid = {postid}/>
      </div>  
    );
        
}

export default PostPath;
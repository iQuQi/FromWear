import React from 'react';
import { useParams } from "react-router";
import WholeCommentPage from "./WholeCommentPage.jsx";

function WholeCommentPagePath() {
    const {postid} = useParams();
    
    return (
      <div>
          <WholeCommentPage postid = {postid}/>
      </div>  
    );
        
}

export default WholeCommentPagePath;
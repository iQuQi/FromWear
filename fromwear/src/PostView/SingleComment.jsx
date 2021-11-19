import React from 'react';
import './SingleComment.css';
import writer_img from './Imgs/pro1.jpeg';
import Thumb from './Thumb';
import Select_button from './Select_button';
import StarIcon from '@mui/icons-material/Star';

import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries';

let post_id = 1

export default function SingleComment({comment}){
    /*
    API.graphql({
        query: getUser, variables: {id: comment.usesr_id}
    })
    .then(res => console.log(res))
    .catch(e => console.log(e));*/
    
    return (
        <div>
            <div className="one_comment">
                <img src={writer_img} className="writer_img" />
                <div className="comment_user_name">{comment.user_id}</div>
                <Thumb />
                {
                    post_id?
                    <Select_button /> : <div></div>
                }
                <p className="comment_content">{comment.content}</p>
            </div>
        </div>
    )
}

import React from 'react';
import './SingleComment.css';
import writer_img from './Imgs/pro1.jpeg';

export default function SingleComment({tweet}){
    return (
        <div className="one_comment">
            <img src={writer_img} className="writer_img" />
            <div classNae="comment_user">{tweet.name}</div>
            <p className="comment_content">{tweet.content}</p>
        </div>
    )
}

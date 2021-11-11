import React from 'react';
import './SingleComment.css';
import writer_img from './Imgs/pro1.jpeg';
import Thumb from './Thumb';

export default function SingleComment({tweet}){
    return (
        <div>
            <div className="one_comment">
                <img src={writer_img} className="writer_img" />
                <div className="comment_user">{tweet.name}</div>
                <Thumb />
                <p className="comment_content">{tweet.content}</p>
            </div>
        </div>
    )
}

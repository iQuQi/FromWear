import React from 'react';
import './SingleComment.css';
import writer_img from './Imgs/pro1.jpeg';
import Thumb from './Thumb';
import Select_button from './Select_button';
import StarIcon from '@mui/icons-material/Star';

let post_id = 1

export default function SingleComment({tweet}){
    return (
        <div>
            <div className="one_comment">
                <div className="star_icon">
                    <StarIcon />
                </div>
                <img src={writer_img} className="writer_img best_pick" />
                <div className="comment_user_name">{tweet.name}</div>
                <Thumb />
                {
                    post_id?
                    <Select_button /> : <div></div>
                }
                <p className="comment_content">{tweet.content}</p>
            </div>
        </div>
    )
}

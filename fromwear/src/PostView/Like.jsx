import React, {Component} from 'react';
import './Like.css'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';


let Like =(props) => {
    let {like_num, like_click, handleLikeButton} = props;
    //like_user_list,
    //console.log(like_user_list);
    return (
            <div className="icons_list">
                {
                    like_click ?
                    <HeartFilled className="button heart_filled" onClick={handleLikeButton}/>
                    : <HeartOutlined className="button heart_outlined" onClick={handleLikeButton}/>
                }

                
                {
                    <div className="like_num">{like_num}</div>
                    /*like_user_list == null ?
                    <div className="like_num">0</div>
                    : <div className="like_num">{like_user_list.length}</div>*/
                }
                
            </div>
        )
        
}

export default Like;

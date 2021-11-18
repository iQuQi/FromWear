import React, {Component} from 'react';
import './Like.css'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { sizeHeight } from '@mui/system';


let like_num = 50

let Like = (prop) => {
    let {like_user_list, like_click} = prop;
    
    let state = {
        is_checked: false,
        notice: like_num, //기본 상태
    };
/*
    onClick = () => {
        this.state.is_checked?
        this.not_like() : this.push_like()
    }

    not_like = () { //좋아요 안누른 상태 (눌렀다 취소 상태)
        like_num = like_num - 1
        this.setState({
            is_checked: false,
            notice: like_num,
        })
    }

    push_like = () => { //좋아요 누른 상태
        like_num = like_num + 1
        this.setState({
            is_checked: true,
            notice: like_num,
        })
    }

*/
    
    return (
        <div className="icons_list">
            {
                like_click ?
                <HeartFilled className="button heart_filled"/>
                : <HeartOutlined className="button heart_outlined"/>
            }
            <div className="like_num">{like_user_list.length}</div>
        </div>
    )
    
}

export default Like;
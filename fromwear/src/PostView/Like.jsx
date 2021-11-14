import React, {Component} from 'react';
import './Like.css'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';


let like_num = 50

class Like extends Component{

    state = {
        is_checked: false,
        notice: like_num, //기본 상태
    };

    onClick = () => {
        this.state.is_checked?
        this.not_like() : this.push_like()
    }

    not_like(){ //좋아요 안누른 상태 (눌렀다 취소 상태)
        like_num = like_num - 1
        this.setState({
            is_checked: false,
            notice: like_num,
        })
    }

    push_like(){ //좋아요 누른 상태
        like_num = like_num + 1
        this.setState({
            is_checked: true,
            notice: like_num,
        })
    }

    render() {
        return (
            <div className="icons_list">
                {
                    this.state.is_checked ?
                    <HeartFilled className="button heart_filled" onClick={this.onClick}/>
                    : <HeartOutlined className="button heart_outlined" onClick={this.onClick}/>
                }
                <div className="like_num">{this.state.notice}</div>
            </div>
        )
    }
}

export default Like;
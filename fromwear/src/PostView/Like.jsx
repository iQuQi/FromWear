import React, {Component} from 'react';
import './Like.css'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';


let Like =(props) => {
    let {like_user_list, like_click, handleLikeButton} = props;

    console.log(like_user_list);
    return (
            <div className="icons_list">
                {
                    like_click ?
                    <HeartFilled className="button heart_filled" onClick={handleLikeButton}/>
                    : <HeartOutlined className="button heart_outlined" onClick={handleLikeButton}/>
                }
                {
                    like_user_list == null ?
                    <div className="like_num">0</div>
                    : <div className="like_num">{like_user_list.length}</div>
                }
                
            </div>
        )
        
}

export default Like;

/*

class Like extends Component {
    constructor(props){
        this.state = {
            like_user_list: props.like_user_list,
            like_click: props.like_click,
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.like_user_list !== prevProps.like_user_list){
            this.setState({like_user_list: this.props.like_user_list});
        }
        if(this.props.like_click !== prevProps.like_click){
            this.setState({like_click: this.props.like_click})
        }
    }

    render(){
        let {like_user_list, like_click} = this.state;
        console.log(like_user_list);
        return (
            <div className="icons_list">
                {
                    like_click ?
                    <HeartFilled className="button heart_filled" onClick={this.props.handleLikeButton}/>
                    : <HeartOutlined className="button heart_outlined" onClick={this.props.handleLikeButton}/>
                }
                <div className="like_num">{like_user_list.length}</div>
            </div>
        )
    }
        
}

export default Like;
*/
import React, {Component} from 'react';
import './Thumb.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import { API } from 'aws-amplify';
import { createCommentLikeUser, deleteCommentLikeUser } from '../graphql/mutations';

class Thumb extends Component{
    constructor(props){
        super();

        this.state = {
            is_checked: false,
            comment_list: props.comment_list,
            user_id: props.user_id,
            comment_like_num: props.comment_list.like_user_list.items.length,
        };

    }

    componentDidMount(){
        this.set_comment_like(this.state.comment_list.like_user_list.items)
    }

    set_comment_like = (list) => {
        console.log("now:",list)
        let comment_like = list.filter((data)=>{
            if(data.user_id == this.state.user_id) return true;
            else return false;
        })
        if(comment_like.length !== 0){
            this.setState({
                is_checked: true,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment_list !== prevProps.comment_list) {
          this.setState({
              comment_list: this.props.comment_list,
              comment_like_num: this.props.comment_list.like_user_list.items.length
            })
          this.set_comment_like(this.props.comment_list.like_user_list.items)
        }
    }

    onClick = () => {
        if(this.state.is_checked == true){
            this.setState({
                comment_like_num: this.state.comment_like_num-1,
            })
            API.graphql({query: deleteCommentLikeUser, variables:{input:
                {
                    id: this.state.user_id + this.state.comment_list.id,
                }}
            })
            .then(res => console.log(res))

            this.setState((prev) => {
                return {
                    is_checked: !prev.is_checked,
                }
            })
        }
        else {
            this.setState({
                comment_like_num: this.state.comment_like_num+1,
            })
            API.graphql({query: createCommentLikeUser, variables:{input:
                {
                    id: this.state.user_id + this.state.comment_list.id,
                    user_id: this.state.user_id,
                    comment_id: this.state.comment_list.id,
                }}
            })
            .then(res => console.log(res))
            
            this.setState((prev) => {
                return {
                    is_checked: !prev.is_checked,
                }
            })
        }

    }


    render() {
        let {comment_list, is_checked, comment_like_num} = this.state;

        console.log("comment_like",comment_list)
        console.log("coment_like_user_list",comment_list.like_user_list.items)
        
        return (
            <div className="thumb_div">
                {
                    comment_list.like_user_list === null ?
                    <div className="thumb_num">0</div>
                    :<div className="thumb_num">{comment_like_num}</div>
                
                }
                {
                    is_checked ?
                    <ThumbUpAltIcon className="button thumb_up" onClick={this.onClick}/>
                    : <ThumbUpAltIcon className="button thumb_off" onClick={this.onClick}/>
                }
            </div>
            
        )
    }
}

export default Thumb;

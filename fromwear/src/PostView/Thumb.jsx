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
        };

    }

    componentDidMount(){
    }

    set_comment_like = (list) => {
        let comment_like = list.filter((data)=>{
            if(data.user_id == this.state.user_id) return true;
            else return false;
        })
        if(comment_like.length !== 0){
            this.setState({
                bookmark_click: true,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment_list !== prevProps.comment_list) {
          this.setState({comment_list: this.props.comment_list,})
        }
    }

    onClick = () => {
        if(this.state.is_checked == true){
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
        let {comment_list, is_checked} = this.state;

        console.log("ccc",comment_list)

        console.log("ccc",comment_list.like_user_list)
        return (
            <div className="thumb_div">
                {
                    comment_list.like_user_list === null ?
                    <div className="thumb_num">0</div>
                    :<div className="thumb_num">{comment_list.like_user_list.length}</div>
                
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

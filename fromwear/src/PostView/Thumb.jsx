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
            now_user: props.now_user,
            comment_like_num: 0,
        };

    }

    componentDidMount(){
        if(this.state.comment_list.like_user_list){
            this.set_comment_like(this.state.now_user.id)
        }
        if(this.props.comment_list.like_user_list.items){
            this.setState({
                comment_like_num: this.props.comment_list.like_user_list.items.length
            })
        }
    }

    set_comment_like = (now_user_id) => {
        console.log("추가", now_user_id);
        let like_num = this.state.comment_list.like_user_list.items.filter((data)=>{
            if(data.user_id == now_user_id){   
                return true;
            };
            return false;
        })
        if(like_num.length > 0){
            this.setState({
                is_checked: true,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment_list !== prevProps.comment_list) {
            console.log("따봉 업데이트 진행!!")
            this.setState({
              comment_list: this.props.comment_list,
              comment_like_num: this.props.comment_list.like_user_list.items.length
            })
            this.set_comment_like(this.state.now_user.id)
        }
        if(this.props.now_user !== prevProps.now_user){
            //console.log(this.state.now_user, "랑 ",this.props.now_user)
            this.setState({
                now_user: this.props.now_user
            })
            this.set_comment_like(this.props.now_user.id)
        }
    }

    onClick = () => {
        if(this.state.now_user == 'noUser'){
            alert("로그인 후 이용가능합니다.")
            return
        }
        if(this.state.is_checked == true){
            this.setState({
                comment_like_num: this.state.comment_like_num-1,
            })
            API.graphql({query: deleteCommentLikeUser, variables:{input:
                {
                    id: this.state.now_user.id + this.state.comment_list.id,
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
                    id: this.state.now_user.id + this.state.comment_list.id,
                    user_id: this.state.now_user.id,
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
        
        return (
            <div className="thumb_div">
                <div className="thumb_pc">
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
                <div className="thumb_mobile">
                    {
                        comment_list.like_user_list === null ?
                        <div className="thumb_num">0</div>
                        :<div className="thumb_num">{comment_like_num}</div>
                    
                    }
                    {
                        is_checked ?
                        <ThumbUpAltIcon className="button thumb_up" onClick={this.onClick} style={{fontsize: 30}}/>
                        : <ThumbUpAltIcon className="button thumb_off" onClick={this.onClick} style={{fontsize: 30}}/>
                    }
                </div>
            </div>
            
        )
    }
}

export default Thumb;

import React, {Component} from 'react';
import './Thumb.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

let now_id

class Thumb extends Component{
    constructor(props){
        super();

        this.state = {
            is_checked: false,
            thumb_num: props.comment.like, //기본 상태
            comment: props.comment,
            user_id: props.user_id,
            thumb_like_list: props.comment.like_user_list,
        };

    }

    onClick = () => {
        if(this.state.is_checked == true){
            let index = this.state.thumb_like_list.indexOf(this.state.user_id)
            if(index > -1){
                this.state.thumb_like_list.splice(index, 1);
                this.setState((prev) => {
                    return{
                        is_checked: false,
                        thumb_num: this.state.thumb_num -1,
                    }
                })
            }
            else {
                console.log("error!! cannot find user_id in like_user_list");
            }
        }
        else {
            this.state.thumb_like_list.push(this.state.user_id);
            this.setState((prev) => {
                return {
                    is_checked: true,
                    thumb_num: this.state.thumb_num +1,
                }
            })
        }
        //console.log(this.state.thumb_like_list);

    }


    render() {
        return (
            <div className="thumb_div">
                <div className="thumb_num">{this.state.thumb_num}</div>
                {
                    this.state.is_checked ?
                    <ThumbUpAltIcon className="button thumb_up" onClick={this.onClick}/>
                    : <ThumbUpAltIcon className="button thumb_off" onClick={this.onClick}/>
                }
            </div>
            
        )
    }
}

export default Thumb;

/*

class Thumb extends Component{

    state = {
        is_checked: false,
        notice: thumb_num, //기본 상태
    };

    onClick = () => {
        this.state.is_checked?
        this.not_thumb() : this.push_thumb()
    }

    not_thumb(){ //좋아요 안누른 상태 (눌렀다 취소 상태)
        thumb_num = thumb_num - 1
        this.setState({
            is_checked: false,
            notice: thumb_num,
        })
    }

    push_thumb(){ //좋아요 누른 상태
        thumb_num = thumb_num + 1
        this.setState({
            is_checked: true,
            notice: thumb_num,
        })
    }

    render() {
        return (
            <div className="thumb_div">
                <div className="thumb_num">{this.state.notice}</div>
                {
                    this.state.is_checked ?
                    <ThumbUpAltIcon className="button thumb_up" onClick={this.onClick}/>
                    : <ThumbUpAltIcon className="button thumb_off" onClick={this.onClick}/>
                }
            </div>
            
        )
    }
}

export default Thumb;
*/
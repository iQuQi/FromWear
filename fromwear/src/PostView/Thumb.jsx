import React, {Component} from 'react';
import './Thumb.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

class Thumb extends Component{
    constructor(props){
        super();

        this.state = {
            is_checked: false,
            thumb_num: props.comment_list.like, //기본 상태
            comment_list: props.comment_list,
            user_id: props.user_id,
        };

        //console.log("constructor", this.state.is_checked)
        //console.log(this.state.comment_list.like_user_list);
    }

    componentDidMount(){
        let index = this.state.comment_list.like_user_list.indexOf(this.state.user_id)
        //console.log(this.state.comment_list.like_user_list)
        //console.log(index)
        if(index > -1){
            //console.log("값이 바뀌어야함")
            this.setState(
                {is_checked: true,}
            )
            //console.log(this.state.is_checked)
            //console.log("값이 바뀜")
        }
        //console.log(this.state.comment_list.like_user_list);
    }

    onClick = () => {
        console.log(this.state.is_checked);
        if(this.state.is_checked == true){
            let index = this.state.comment_list.like_user_list.indexOf(this.state.user_id)
            if(index > -1){
                this.state.comment_list.like_user_list.splice(index, 1);
                this.setState((prev) => {
                    return{
                        is_checked: !prev.is_checked,
                        thumb_num: this.state.thumb_num -1,
                    }
                })
            }
            else {
                console.log("error!! cannot find user_id in list");
            }
        }
        else {
            this.state.comment_list.like_user_list.push(this.state.user_id);
            this.setState((prev) => {
                return {
                    is_checked: !prev.is_checked,
                    thumb_num: this.state.thumb_num +1,
                }
            })
        }
    }


    render() {
        //console.log(this.state.is_checked)
        let {comment_list, is_checked} = this.state;
        //console.log(comment_list)
        return (
            <div className="thumb_div">
                <div className="thumb_num">{comment_list.like_user_list.length}</div>
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

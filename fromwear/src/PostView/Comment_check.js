import React, {Component} from 'react';
import './Comment_check.css';

let now_user_name = "최지민";

class Comment_check extends Component{

    state = {
        is_checked: false,
    };

    onClick = () => {
        this.state.is_checked?
        this.setState({
            is_checked:false,
        })
        :
        this.setState({
            is_checked:true,
        })
    
    }

    render() {
        return (
            <div>
                {
                    this.state.is_checked ?
                    <div className="writing_area">
                            <div className="now_comment_user">{now_user_name}</div>
                            <div class="writing_content">
                                <textarea class="new_tweet_content"></textarea>
                                <button class="new_tweet_submit_button" onClick={this.addTweet}>댓글 달기</button>
                            </div>
                    </div>
                    :<div className="comment_no" onClick={this.onClick}>댓글 쓰기</div>
                }
            </div>
        )
    }
}

export default Comment_check;
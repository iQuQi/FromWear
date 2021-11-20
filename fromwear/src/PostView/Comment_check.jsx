import React, {Component} from 'react';
import './Comment_check.css';

import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries';

class Comment_check extends Component{

    constructor(props){
        super();

        this.state = {
            is_checked: false,
            comment_list: props.comment_list,
            user_id: props.user_id,
            writer_: Object,
        }
    }


    
    

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
        let {is_checked, comment_list, user_id, writer_} = this.state;

        return (
            <div>
                {
                    is_checked ?
                    <div className="writing_area">
                            <div className="now_comment_user">{writer_.name}</div>
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
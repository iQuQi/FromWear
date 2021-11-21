import React, {Component} from 'react';
import SingleComment from './SingleComment'
import './Comments.css';

import { API } from 'aws-amplify';
import { getUser} from '../graphql/queries';
import  { createComment } from '../graphql/mutations';

class Comments_help extends Component {

    constructor(props){
        super();

        this.state = {
            post_id: props.post_id,
            comment_list: props.comment_list,
            board_type: props.board_type,
            user_id: props.user_id,
            write_is_checked: false,
            writer_: Object,
        }
    }

    componentDidUpdate(props){
        if(this.state.comment_list !== props.comment_list){
            this.setState({comment_list: props.comment_list});
          }
    }

    componentDidMount(){
        API.graphql({
            query: getUser, variables: {id: this.state.user_id}
        })
        .then(res => this.setState({
            writer_: res.data.getUser,
        }))
        .catch(e => console.log(e));
    }

    onClick = () => {
        this.state.write_is_checked?
        this.setState({
            write_is_checked:false,
        })
        :
        this.setState({
            write_is_checked:true,
        })
    
    }
    

    addTweet = () => {

        let value = document.querySelector('.new_tweet_content').value;

        API.graphql({
            query: createComment, variables: {
                input: 
                {
                    adopted: false, 
                    content: value, 
                    like: 0, 
                    post_id: this.state.post_id, 
                    user_id: this.state.user_id,
                    like_user_list: [],
                } }
        })
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }


    render(){
        let {comment_list, board_type, user_id, write_is_checked, writer_} = this.state;
        
        return (
            <div>
                <div>
                    <div className="comment_num">댓글 {comment_list.length}개</div>
                    <ul className="comment_ul">
                        {
                            comment_list.map(comment_list => {
                                return <SingleComment key={comment_list.user_id} comment_list={comment_list} board_type={board_type} user_id={user_id}/>
                            })
                        }
                    </ul>
                    <div className="comment_check">
                        <div>
                        {
                            write_is_checked ?
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
                    </div>
                </div>
            </div>
        )
    }

}

export default Comments_help;

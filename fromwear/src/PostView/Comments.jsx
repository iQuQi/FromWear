import React, {Component} from 'react';
import SingleComment from './SingleComment'
import './Comments.css';

import { API } from 'aws-amplify';
import { getUser, getPost } from '../graphql/queries';
import  { createComment } from '../graphql/mutations';
import { onCreateComment } from '../graphql/subscriptions';
import  { deleteComment } from '../graphql/mutations';
import { onDeleteComment } from '../graphql/subscriptions';

class Comments extends Component {

    constructor(props){
        super();

        this.state = {
            post_id: props.post_id,
            comment_list: [],
            board_type: props.board_type,
            user_id: props.user_id, //현재 댓글을 쓰는 사람 = 현재 접속자 id
            write_is_checked: false,
            writer_: Object, //현재 댓글을 쓰는 사람
            post_writer: props.post_writer, //현재 보고 있는 post를 쓴 사람
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.board_type !== prevProps.board_type){
            this.setState({board_type: this.props.board_type});
        }
        if(this.props.post_writer !== prevProps.post_writer){
            this.setState({post_writer: this.props.post_writer})
        }
    }

    componentWillMount(){
        API.graphql({
            query: getUser, variables: {id: this.state.user_id}
        })
        .then(res => this.setState({
            writer_: res.data.getUser,
        }))
        .catch(e => console.log(e));

        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
      
        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
        .then(res => {
            this.setState({
            comment_list: res.data.getPost.comment_list.items
            })
            this.subscription = API.graphql({query: onCreateComment, variables: { post_id: this.state.post_id }})
            .subscribe({
                next: newCreatedComment => {
                    console.log(newCreatedComment)
                    if(newCreatedComment.post_id === this.state.post_id)
                        return;
                    let {comment_list} = this.state;
                    this.setState({
                        comment_list: [...comment_list, newCreatedComment.value.data.onCreateComment]
                    });
                }
            });
        })
        .catch(e => console.log(e));
        
        /*this.subscription = API.graphql({query: onDeleteComment, variables: { post_id: this.state.post_id }})
        .subscribe({
            next: deletedComment => {
                console.log(deleteComment)

                }
        });*/
        
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
        .catch(e => console.log(e));
        document.querySelector('.new_tweet_content').value = "";

    }


    removeComment = (delete_id) => {
        console.log(delete_id)
        
        API.graphql({
            query: deleteComment, variables: {input:{id: delete_id, _version: 1}}
        })
        .then(res => {
            console.log(res)
            const index = this.state.comment_list.findIndex(function(item){return item.id == delete_id})
            if(index > -1){
                this.state.comment_list.splice(index, 1)
            }
            this.setState({
                comment_list: this.state.comment_list
            })
        })
    }
    

    render(){
        let {comment_list, board_type, user_id, write_is_checked, writer_, post_writer} = this.state;
        
        //comment_list sort
        //console.log()
        //console.log(writer_.name)
        comment_list.sort(function(a, b) {return new Date(a.createdAt) - new Date(b.createdAt);})
        return (
            <div>
                <div>
                    <div className="comment_num">댓글 {comment_list.length}개</div>
                    <ul className="comment_ul">
                        {
                            comment_list.map(comment_list => {
                                return <div className="one_comment_and_remove_button">
                                    <SingleComment key={comment_list.user_id} comment_list={comment_list} board_type={board_type} user_id={user_id} post_writer={post_writer}/>
                                    {
                                        comment_list.user_id == user_id ?
                                        <button className="remove_comment" onClick={() => this.removeComment(comment_list.id)}>삭제</button>
                                        :
                                        <div></div>
                                    }
                                    </div>
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

export default Comments;

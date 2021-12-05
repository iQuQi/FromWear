import React, {Component} from 'react';
import SingleComment from './SingleComment'
import './Comments.css';

import { API } from 'aws-amplify';
import { getUser, listComments, listCommentLikeUsers } from '../graphql/queries';
import  { createComment } from '../graphql/mutations';
import { onCreateComment } from '../graphql/subscriptions';
import  { deleteComment, deleteCommentLikeUser } from '../graphql/mutations';

class Comments extends Component {

    constructor(props){
        super();

        this.state = {
            post_id: props.post_id,
            comment_list: [],
            board_type: props.board_type,
            write_is_checked: false,
            post_writer: props.post_writer, //해당 post를 쓴 사람
            now_user: props.now_user, //현재 접속자
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.board_type !== prevProps.board_type){
            this.setState({board_type: this.props.board_type});
        }
        if(this.props.post_writer !== prevProps.post_writer){
            this.setState({post_writer: this.props.post_writer})
        }
        if(this.props.now_user !== prevProps.now_user){
            this.setState({now_user: this.props.now_user})
        }
    }

    componentWillMount(){

        API.graphql({
            query: listComments, variables: {filter:
                {
                    post_id: {eq: this.state.post_id}
                }
            }
        })
        .then(res => {
            this.setState({
            comment_list: res.data.listComments.items
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
        if(this.state.now_user=='noUser'){
            alert("로그인 후 댓글 쓰기가 가능합니다.")
            return
        }
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
        if(value == ""){
            alert("내용을 입력하세요")
            return
        }
        API.graphql({
            query: createComment, variables: {
                input: 
                {
                    adopted: false, 
                    content: value, 
                    post_id: this.state.post_id, 
                    user_id: this.state.now_user.id,
                } }
                
        })
        .catch(e => console.log(e));
        document.querySelector('.new_tweet_content').value = "";

    }


    removeComment = (delete_id) => {
        
        API.graphql({
            query: listCommentLikeUsers, variables: {input:{comment_id: delete_id}}
        })
        .then(res => {
            res.data.listCommentLikeUsers.items.map((like)=>{
                API.graphql({
                    query: deleteCommentLikeUser, variables: {input:{id: like.id}}
                })
                .then(res => console.log(res))
                .catch(e => console.log(e))
            })
        })
        .catch(e => console.log(e))


        API.graphql({
            query: deleteComment, variables: {input:{id: delete_id}}
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
        let {comment_list, board_type, write_is_checked, now_user, post_writer} = this.state;
        console.log("user_id", now_user)
        comment_list.sort(function(a, b) {return new Date(a.createdAt) - new Date(b.createdAt);})
        return (
            <div>
                <div>
                    <div className="comment_num">댓글 {comment_list.length}개</div>
                    <ul className="comment_ul">
                        {
                            comment_list.map(comment_list => {
                                return <div className="one_comment_and_remove_button">
                                    <SingleComment key={comment_list.user_id} comment_list={comment_list} board_type={board_type} now_user={now_user} post_writer={post_writer}/>
                                    {
                                        comment_list.user_id == now_user.id ?
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
                                    <div className="now_comment_user">{now_user.name}</div>
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

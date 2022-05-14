import React, {Component} from 'react';
import SingleComment from './SingleComment';
import './Comments.css';

import { API } from 'aws-amplify';
import { listComments, listCommentLikeUsers } from '../graphql/queries';
import  { createComment } from '../graphql/mutations';
import { onCreateComment } from '../graphql/subscriptions';
import  { deleteComment, createAlarm, deleteCommentLikeUser } from '../graphql/mutations';
import WholeCommentPage from './WholeCommentPage';

class Comments extends Component {

    constructor(props){
        super();

        this.state = {
            post_id: props.post_id,
            comment_list: [],
            board_type: props.board_type,
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
            
            this.subscription = API.graphql({query: onCreateComment, variables: { input: {post_id: this.state.post_id }}})
            .subscribe({
                next: newCreatedComment => {
                    if(newCreatedComment.value.data.onCreateComment.post_id !== this.state.post_id)
                        return;
                    let {comment_list} = this.state;
                    this.setState({
                        comment_list: [...comment_list, newCreatedComment.value.data.onCreateComment]
                    });
                }
            })
            .then(e => console.log(e));
            
        })
        .catch(e => console.log(e));

        
        /*this.subscription = API.graphql({query: onDeleteComment, variables: { post_id: this.state.post_id }})
        .subscribe({
            next: deletedComment => {
                console.log(deleteComment)

                }
        });*/
        
    }

    moveToWholeCommentPage = () => {
        window.location.href = this.state.post_id + '/wholecommentpage';
    }
    
    onClick = () => {
        alert("로그인 후 댓글 쓰기가 가능합니다.")
    }

    getCommentValuePC = () => {
        let item = document.querySelector('.new_comment_content_pc_version');
        let value = item.value;
        if(value == ""){
            alert("내용을 입력하세요.")
            return
        }
        this.addComment(value);
        item.value = '';

    }

    getCommentValueMobile = () => {
        let item = document.querySelectorAll('.new_comment_content_mobile_version').item(1);
        let value = item.value;
        if(value == ""){
            alert("내용을 입력하세요.")
            return
        }
        this.addComment(value);
        item.value = '';
    }

    addComment = (value) => {
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

        API.graphql({query: createAlarm, variables:{input:
            {
                user_id: this.state.post_writer.id,
                content: this.state.now_user.name+'님이 게시글에 댓글을 달았습니다.',
                link:'post/' + this.state.post_id

            }}
        })
        .then(e => console.log(e))
    }


    removeComment = (delete_comment) => {

        // delete_comment.like_user_list.items.map((like)=>{
        //     API.graphql({
        //         query: deleteCommentLikeUser, variables: {input:{id: like.id}}
        //     })
        //     .then(res => console.log(res))
        //     .catch(e => console.log(e))
        // })
        /*
        .then(e => {
            API.graphql({
                query: deleteComment, variables: {input:{id: delete_comment.id}}
            })
            .then(res => {
                console.log(res)
                const index = this.state.comment_list.findIndex(function(item){return item.id == delete_comment.id})
                if(index > -1){
                    this.state.comment_list.splice(index, 1)
                }
                this.setState({
                    comment_list: this.state.comment_list
                })
            })
        }   
        )*/
        
        API.graphql({    
            query: listCommentLikeUsers, variables: {filter:{
                comment_id: {eq: delete_comment.id}
            }}
        })
        .then(res => {
            res.data.listCommentLikeUsers.items.map((like)=>{
                API.graphql({
                    query: deleteCommentLikeUser, variables: {input:{id: like.id}}
                })
                .then(res => console.log(res))
                .catch(e => console.log(e))
                .then(res => console.log(res))
                .catch(e => console.log(e))
            })
        })
        .catch(e => console.log(e))
        .then(e => {
            API.graphql({
                query: deleteComment, variables: {input:{id: delete_comment.id}}
            })
            /*
            .then(res => {
                console.log(res)
                const index = this.state.comment_list.findIndex(function(item){return item.id == delete_comment.id})
                if(index > -1){
                    this.state.comment_list.splice(index, 1)
                }
                this.setState({
                    comment_list: this.state.comment_list
                })
            })*/
            .then(window.location.reload())
        })
    }
    

    render(){
        let {comment_list, board_type, now_user, post_writer} = this.state;
        
        comment_list.sort(function(a, b) {return new Date(a.createdAt) - new Date(b.createdAt);})
        console.log("commet", comment_list)

        let recommend_list = [...comment_list]; //같은 추천수에서는 먼저 작성한 댓글이 우선
        console.log("origin_recommend_list:",recommend_list);
        recommend_list.sort(function(a, b) {
            return b.like_user_list.items.length - a.like_user_list.items.length;
        });
        console.log("sorted_recommend_list", recommend_list)
        
        return (
            <div>
                <div className="pc_comment">
                    <div className="comment_num">댓글 {comment_list.length}개</div>
                    <ul className="comment_ul">
                        {
                            comment_list.map(comment_list => {
                                return <div className="one_comment_and_remove_button">
                                    <SingleComment key={comment_list.user_id} comment_list={comment_list} board_type={board_type} now_user={now_user} post_writer={post_writer}/>
                                    {
                                        comment_list.user_id === now_user.id ?
                                        <button className="remove_comment" onClick={() => this.removeComment(comment_list)}>삭제</button>
                                        :
                                        <div/>
                                    }
                                    </div>
                            })
                        }
                    </ul>
                    <div>
                        <div>
                        {
                            this.state.now_user==='noUser' ?
                            <div>
                                <div className="now_comment_user">방문자</div>
                                    <div className="writing_content">
                                        <textarea onClick={this.onClick}></textarea>
                                        <button className="new_comment_submit_button" onClick={this.onClick}>댓글 등록</button>
                                    </div>

                            </div>
                            :<div className="writing_area">
                                    <div className="now_comment_user">{now_user.name}</div>
                                    <div className="writing_content">
                                        <textarea className="new_comment_content_pc_version"></textarea>
                                        <button className="new_comment_submit_button" onClick={this.getCommentValuePC}>댓글 등록</button>
                                    </div>
                            </div>
                        }
                        </div>
                    </div>
                </div>
                <div className="mobile_comment">
                    <div className="comment_num" onClick={this.moveToWholeCommentPage}>댓글 {comment_list.length}개 모두 보기</div>
                    <ul className="comment_ul">
                        {
                            recommend_list.map((comment_list, index) => {
                                if(index <= 1){
                                    return <div className="one_comment_and_remove_button">
                                    <SingleComment key={comment_list.user_id} comment_list={comment_list} board_type={board_type} now_user={now_user} post_writer={post_writer}/>
                                    {
                                        comment_list.user_id == now_user.id ?
                                        <button className="remove_comment" onClick={() => this.removeComment(comment_list)}>삭제</button>
                                        :
                                        <div></div>
                                    }
                                    </div>
                                }
                                return null;
                            })
                        }
                    </ul>
                    <div>
                        <div>
                        {
                            this.state.now_user=='noUser' ?
                            <div>
                                <div className="now_comment_user">방문자</div>
                                    <div className="writing_content">
                                        <textarea onClick={this.onClick}></textarea>
                                        <button className="new_comment_submit_button" onClick={this.onClick}>등록</button>
                                    </div>

                            </div>
                            :<div className="writing_area">
                                    <div className="now_comment_user">{now_user.name}</div>
                                    <div className="writing_content">
                                        <textarea className="new_comment_content_mobile_version"></textarea>
                                        <button className="new_comment_submit_button" onClick={this.getCommentValueMobile}>등록</button>
                                    </div>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Comments;

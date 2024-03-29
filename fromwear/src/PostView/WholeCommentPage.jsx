import React, {Component} from 'react';
import SingleComment from './SingleComment';
import { useParams } from "react-router";
import './Comments.css';
import './WholeCommentPage.css';

import Header from '../Header/Header'

import { API } from 'aws-amplify';
import { getPost, getUser, listComments, listCommentLikeUsers } from '../graphql/queries';
import  { createComment, getComment } from '../graphql/mutations';
import { onCreateComment } from '../graphql/subscriptions';
import  { deleteComment, createAlarm, deleteCommentLikeUser } from '../graphql/mutations';
import profile_skyblue from './Imgs/profile_skyblue.jpg';

class WholeCommentPage extends Component {

    constructor(props){
        super();

        this.state = {
            post_id: props.postid,
            now_post: Object,
            tag_list: [],
            comment_list: [],
            board_type: 0,
            post_writer: Object,
            now_user: 'noUser',
        }
    }

    handle_user_info = (user) => {
        if(this.state.now_user == 'noUser'){
            this.setState({
                now_user: user,
            })
            this.set_like_urgent(this.state.like_urgent_user_list)
            this.set_bookmark(this.state.bookmark_user_list)
        }
        else {
        }
	}

    componentDidMount(){
        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
        .then(res => this.setState({
            now_post: res.data.getPost,
            board_type: res.data.getPost.board_type,
            tag_list: res.data.getPost.tag_list.items,
            post_writer: res.data.getPost.user
        }))

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
    }

    moveToWriterPage = () => {
        if(this.state.now_writer.id == this.state.now_user.id) {
            window.location.href = "/mypage"
        }
        else {
            window.location.href = "/userpage/" + this.state.now_writer.id
        }
    }
    
    onClick = () => {
        alert("로그인 후 댓글 쓰기가 가능합니다.")
    }

    addComment = () => {
        let value = document.querySelector('.new_comment_content').value;

        if(value == ""){
            alert("내용을 입력하세요.")
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
        document.querySelector('.new_comment_content').value = "";


        API.graphql({query: createAlarm, variables:{input:
            {
                user_id: this.state.post_writer.id,
                content: this.state.now_user.name+'님이 게시글에 댓글을 달았습니다.',
                link:'post/' + this.state.post_id

            }}
        })
        .then(e => console.log(e))
    }

    checkRemoveComment = (delete_comment) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            //삭제 실행
            this.removeComment(delete_comment);
          } else {
          }
    }

    removeComment = (delete_comment) => {
        
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
            })
        })
        .catch(e => console.log(e))
        .then(e => {
            API.graphql({
                query: deleteComment, variables: {input:{id: delete_comment.id}}
            })
            .then(window.location.reload())
        })
    }
    

    render(){
        let {now_post, tag_list, comment_list, board_type, now_user, post_writer} = this.state;
        
        comment_list.sort(function(a, b) {return new Date(a.createdAt) - new Date(b.createdAt);})
        
        let recommend_list = [...comment_list]; //같은 추천수에서는 먼저 작성한 댓글이 우선
        recommend_list.sort(function(a, b) {
            return b.like_user_list.items.length - a.like_user_list.items.length;
        });

        let top_3_id = []; //오늘의 착장 게시판
        recommend_list.forEach((top_comment, index)=>{
            if(index<=2){ //상위 3개의 댓글을 보여줌
                top_3_id.push(top_comment.id);
            }
        })

        let adopted_recommend_list = [...recommend_list]; //같은 추천수에서는 채택된 댓글이 우선 (같은 추천수, 둘 다 채택되었다면 작성한 댓글순)
        adopted_recommend_list.sort(function (a, b) {
            return b.adopted - a.adopted;
        });

        let top_3_id_adopted = []; //도움이 필요해 게시판
        adopted_recommend_list.forEach((top_comment, index)=>{
            if(index<=2){
                top_3_id_adopted.push(top_comment.id);
            }
        })
        
        return (
            <div className="whole_comment_page_wrap">
                <Header handle_user_info={this.handle_user_info}/>
                <div className="writer">
                    {
                        now_post.blind?
                        <img className="post_writer_img" src={profile_skyblue} />
                        :<div className="post_writer_img move_to_userpage" style={{backgroundImage: 'URL('+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+post_writer.profile_img+')', backgroundPosition: 'center', backgroundSize: 'cover'}} onClick={this.moveToWriterPage} />
                    }
                    {
                        now_post.blind?
                        <div className="writer_name">익명</div>
                        :<div className="writer_name move_to_userpage" onClick={this.moveToWriterPage}>{post_writer.name}</div>
                    }
                </div>
                <div className="post_content_whole_comment">
                    {now_post.content}
                </div>

                <div className="whole_comment_wrap">
                    <div className="mobile_comment">
                        <div className="comment_num_whole_comment" onClick={this.moveToWholeCommentPage}>댓글 {comment_list.length}개</div>
                        <ul className="comment_ul_whole_comment">
                            {
                                board_type?
                                <div>
                                    {
                                        adopted_recommend_list.map((comment_list, index) => {
                                            if(index <= 2){
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
                                    {
                                        comment_list.map((comment_list)=>{
                                            if(comment_list.id != top_3_id_adopted[0] && comment_list.id != top_3_id_adopted[1] && comment_list.id != top_3_id_adopted[2]){
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
                                        })
                                    }
                                </div>
                                :
                                <div>
                                    {
                                        recommend_list.map((comment_list, index) => {
                                            if(index <= 2){
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
                                    {
                                        comment_list.map((comment_list)=>{
                                            if(comment_list.id != top_3_id[0] && comment_list.id != top_3_id[1] && comment_list.id != top_3_id[2]){
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
                                        })
                                    }
                                </div>
                                
                            }
                        </ul>
                    </div>
                    <div className="whole_comment_writing_wrap">
                        <div>
                        {
                            this.state.now_user=='noUser' ?
                            <div className="writing_area">
                                <div className="now_comment_user">방문자</div>
                                    <div className="writing_content">
                                        <textarea className="visitor_comment" onClick={this.onClick}></textarea>
                                        <button className="new_comment_submit_button" onClick={this.onClick}>등록</button>
                                    </div>

                            </div>
                            :<div className="writing_area">
                                    <div className="now_comment_user">{now_user.name}</div>
                                    <div className="writing_content">
                                        <textarea className="new_comment_content"></textarea>
                                        <button className="new_comment_submit_button" onClick={this.addComment}>등록</button>
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

export default WholeCommentPage;
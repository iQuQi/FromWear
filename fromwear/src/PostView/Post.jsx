import React, {Component} from 'react';
//import { Link } from 'react-router-dom';

import './Post.css'
import Comments from './Comments';
import Bookmark from './Bookmark';
import LikeUrgent from './LikeUrgent'

import PostSearchResult from './PostSearchResult';
import Header from '../Header/Header'
import  Typography  from '@mui/material/Typography';

import { API } from 'aws-amplify';
import { getPost, listPosts, listComments, listCommentLikeUsers, listPostLikeUrgentUsers, listUserBookmarkPosts } from '../graphql/queries';
import { updatePost, deletePost, createUserBookmarkPost, deleteUserBookmarkPost, createPostLikeUrgentUser, deletePostLikeUrgentUser, deleteComment, deleteCommentLikeUser } from '../graphql/mutations';
import profile_skyblue from './Imgs/profile_skyblue.jpg';


//나중에 상위 컴포넌트한테 prop로 받아야하는 것
let user_id = "현경 id"; //현재 유저

//board type 0 : 오늘의 착장 1 : 도움이 필요해
class Post extends Component{
    constructor(props){
        super();

        this.state = {
            post_id: props.postid,
            now_post:Object,
            now_writer:Object,
            like_urgent_user_list: [],
            like_urgent_click: false,
            tag_list: [],
            user_id,
            bookmark_user_list: [],
            bookmark_click: false,
            first_click: false,

            like_urgent_num: 0,

            deleted_comment:false,
            deleted_comment_like:false,
            deleted_like_urgent:false,
            deleted_bookmark:false,
            deleted_post:false,
            now_post_board_type:0, //delete할때 board_type담아둘것

            same1:[],
            same2:[],
            same3:[],
            result_post:[],
        }
    }

    componentDidMount(){
        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
        .then(res => this.setState({
            now_post: res.data.getPost,
            now_writer: res.data.getPost.user,
            like_urgent_user_list: res.data.getPost.like_urgent_user_list.items,
            tag_list: res.data.getPost.tag_list.items,
            bookmark_user_list: res.data.getPost.bookmark_user_list.items,
        }))
        .then(res => this.set_like_urgent(this.state.like_urgent_user_list))
        .then(res => this.set_bookmark(this.state.bookmark_user_list))
        .then(res => this.getTagList())
        
        .catch(e => console.log(e));


        /*
        this.subscription = API.graphql({query: onCreatePostLikeUrgentUser, variables: { id: this.state.user_id + this.state.post_id }})
        .subscribe({
            next: newCreated => {
                console.log(newCreated)
                if(newCreated.post_id === this.state.user_id + this.state.post_id) //이거 무슨 의민지 공부..
                    return;
                let {like_urgent_user_list} = this.state;
                this.setState({
                    like_urgent_user_list: [...like_urgent_user_list, newCreated.value.data.onCreatePostLikeUrgentUser]
                });
            }
        });*/
    }

    setClickNum = (input_click_num) => {
        //input_click_num : '현재 조회수'
        this.state.first_click = true

        API.graphql({query: updatePost, variables:{input: {id: this.state.post_id,
            click_num: input_click_num+1}}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e)) 
    }

    handleBookmarkButton = () => {
        if(this.state.bookmark_click == true){
            this.setState((prev) => {
                return {
                    bookmark_click: false,
                }

            });

            API.graphql({query: deleteUserBookmarkPost, variables:{input:
                {
                    id: this.state.user_id + this.state.post_id,
                }}
            })
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }
        else {
            this.setState((prev) => {
                return {
                    bookmark_click: true,
                }
            });

            API.graphql({query: createUserBookmarkPost, variables:{input:
                {
                    id: this.state.user_id + this.state.post_id,
                    user_id: this.state.user_id,
                    post_id: this.state.post_id,
                }}
            })
        }
    }


    handleLikeUrgentButton = () => {
        if(this.state.like_urgent_click == true){
            this.setState((prev) => {
                return {
                    like_urgent_click: false,
                    like_urgent_num: this.state.like_urgent_num-1,
                }

            });

            API.graphql({query: deletePostLikeUrgentUser, variables:{input:
                {
                    id: this.state.user_id + this.state.post_id,
                }}
            })
            .then(res => console.log(res))
            .catch(e => console.log(e));

        }
        else {
            this.setState((prev) => {
                return {
                    like_urgent_click: true,
                    like_urgent_num: this.state.like_urgent_num+1,
                }
            });

            API.graphql({query: createPostLikeUrgentUser, variables:{input:
                {
                    id: this.state.user_id + this.state.post_id, //id는 안적어도 자동 생성되는데 그럼 delete때 id를 못넣어줘서 따로 지정하는 것
                    user_id: this.state.user_id,
                    post_id: this.state.post_id,
                }}
            })
        }

    }

    set_like_urgent(list) {
        let like_urgent = list.filter((data)=>{
            if(data.user_id == this.state.user_id) return true;
            else return false;
        })
        if(like_urgent.length !== 0){
            this.setState({
                like_urgent_click: true,
            })
        }

        this.setState({
            like_urgent_num: list.length,
        })

    }

    set_bookmark(list){
        let bookmark = list.filter((data)=>{
            if(data.user_id == this.state.user_id) return true;
            else return false;
        })
        if(bookmark.length !== 0){
            this.setState({
                bookmark_click: true,
            })
        }
    }

    removePost = () => {
        this.setState({
            now_post_board_type: this.state.now_post.board_type,
        })

        console.log("now_post 댓글", this.state.now_post.comment_list.items.length)
        if(this.state.now_post.comment_list.items.length == 0){
            this.setState({
                deleted_comment: true, //이미 null이라 삭제안해도됨
                deleted_comment_like: true,
            })
        }
        else {
            API.graphql({
                query: listComments, variables: {filter:
                    {
                        post_id: {eq: this.state.post_id}
                    }
                }
            })
            .then(res => {
                res.data.listComments.items.map((comment)=>{
                    API.graphql({
                        query: listCommentLikeUsers, variables: {filter:
                            {
                                comment_id: {eq: comment.id}
                            }
                        }
                    })
                    .then(res => {
                        if(res.data.listCommentLikeUsers.items.length == 0){
                            this.setState({deleted})
                        }
                        res.data.listCommentLikeUsers.items.map((comment_like)=>{
                            API.graphql({
                                query: deleteCommentLikeUser, variables:{input:{id: comment_like.id}}
                            })
                            .then(e => 
                                this.setState({deleted_comment_like: true}))
                        })
                    })
                    
                    API.graphql({
                    query: deleteComment, variables: {input:{id: comment.id}}
                    })
                    .then(e => this.setState({
                        deleted_comment:true,
                    }))
                })
            })
            .catch(e => console.log(e));
        }

        if(this.state.now_post.like_urgent_user_list.items.length == 0){
            this.setState({
                deleted_like_urgent: true,
            })
        }
            else {
            API.graphql({
                query: listPostLikeUrgentUsers, variables: {filter:
                    {
                        post_id: {eq: this.state.post_id}
                    }
                }
            })
            .then(res => {
                res.data.listPostLikeUrgentUsers.items.map((like)=>{
                    API.graphql({
                        query: deletePostLikeUrgentUser, variables:{input:{id: like.id}}
                    })
                    .then(e => this.setState({
                        deleted_like_urgent:true,
                    }))
                })
            })
        }

        if(this.state.now_post.bookmark_user_list.items.length == 0){
            this.setState({
                deleted_bookmark: true,
            })
        }
        else {
            API.graphql({
                query: listUserBookmarkPosts, variables: {filter:
                    {
                        post_id: {eq: this.state.post_id}
                    }
                }
            })
            .then(res => {
                res.data.listUserBookmarkPosts.items.map((bookmark)=>{
                    API.graphql({
                        query: deleteUserBookmarkPost, variables:{input:{id: bookmark.id}}
                    })
                    .then(e => console.log(e))
                })
                this.setState({
                    deleted_bookmark: true,
                })
            })

        }
        

        
        /*
        API.graphql({
            query: deletePost, variables: {input:{id: this.state.post_id}}
        })
        .then(res => this.setState({
            deleted_post: true,
        }));*/
    }

    moveTo = () => {
        console.log(this.state.now_post_board_type)
        if(this.state.now_post_board_type == 0){
            window.location.href = "/todayboard"
        }
        else if(this.state.now_post_board_type == 1){
            window.location.href = "/sosboard"
        }
        else if(this.state.now_post_board_type == 2){
            window.location.href = "/weeklytag"
        }
        
    }

    getTagList =() => {
        let {same1, same2, same3, now_post,} = this.state;
        API.graphql({
            query: listPosts, variables: { filter: {board_type: {ne: 1}}} //이번주태그 페이지도 보여줘도되나?
        })
        .then(res=>{
            res.data.listPosts.items.map((post)=>{
                // 지금 post면 비교X
                if (post.id == now_post.id) return false;

                //태그 필터링
                let same = 0;
                post.tag_list.items.map((post_tag)=>{
                    now_post.tag_list.items.map(now_tag=>{
                        if(post_tag.tag_id == now_tag.tag_id) same++;
                    })
                })

                //console.log("same: "+ same);
                if(same == 3) same3=[...same3,post]
                else if(same==2) same2=[...same2,post]
                else if(same==1) same1=[...same1,post]
                return true;

            })
            
            same3=same3.sort(function(a,b){return b.like_urgent_user_list.length-a.like_urgent_user_list.length});
            same2=same2.sort(function(a,b){return b.like_urgent_user_list.length-a.like_urgent_user_list.length});
            same1=same1.sort(function(a,b){return b.like_urgent_user_list.length-a.like_urgent_user_list.length});
            
            console.log("비교 결과 list:",[...same3,...same2,...same1]);
            this.setState({
                result_post: [...same3,...same2,...same1],
            })
        })
        .catch(e=>console.log(e))
    }

    render(){
        let {post_id, now_post, now_writer, like_urgent_click, tag_list, bookmark_user_list, bookmark_click, like_urgent_user_list, like_urgent_num, user_id, result_post} = this.state;

        if(typeof(now_post.click_num)=="number" && this.state.first_click==false){
            this.setClickNum(now_post.click_num);
        }

        if(this.state.deleted_comment && this.state.deleted_comment_like && this.state.deleted_like_urgent && this.state.deleted_bookmark){
            this.moveTo();
        }

        return (
            <div className="post_page">
                <Header />
                <div className="whole_page">
                    <div className="main_box">
                        <div className="post_div">
                            <div className="post_img" style={{backgroundImage: 'URL('+now_post.img+')'}}></div>
                            <div className="content_box">
                                <div className="writer">
                                    {
                                        now_post.blind?
                                        <img className="post_writer_img" src={profile_skyblue} />
                                        :
                                        <img className="post_writer_img" src={now_writer.profile_img} />
                                        //나중에 backgroundImg로 URL넘겨줄거면 div로 변경
                                        //마찬가지로 바꿀 때 SingleComment의 53번째 line도 div로 변경
                                        //div로 하면 src가 적용이 안됨 style에서 넘겨줘야할듯
                                        //<img className="post_writer_img" src={now_writer.profile_img}/> //style={{backgroundImage: 'URL('+now_writer.profile_img+')'}}
                                        //style={{backgroundImage: 'URL('+now_post.img+')'}}
                                    }
                                    {
                                        now_post.blind?
                                        <div className="writer_name">익명</div>
                                        :
                                        <div className="writer_name">{now_writer.name}</div>
                                    }
                                    {
                                        user_id == now_writer.id ?
                                        //<a href={'/'}>
                                            <button className="remove_post" onClick={this.removePost}>
                                                삭제
                                            </button>
                                        //</a>
                                        //onclick=" location.href = '/' "
                                        :
                                        <div></div>
                                    }
                                    <div className="writer_content">{now_post.content}{this.state.postid}</div>
                                </div>
                                <div className="comment">
                                    <Comments
                                    post_id = {post_id}
                                    board_type = {now_post.board_type}
                                    user_id = {user_id}
                                    post_id = {post_id}
                                    post_writer = {now_writer}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="icons">
                            <Bookmark 
                            bookmark_user_list={bookmark_user_list}
                            bookmark_click={bookmark_click}
                            handleBookmarkButton={this.handleBookmarkButton}
                            />
                            <LikeUrgent
                                like_urgent_user_list= {like_urgent_user_list}
                                like_urgent_click={like_urgent_click}
                                handleLikeUrgentButton={this.handleLikeUrgentButton}
                                board_type={now_post.board_type}
                                like_urgent_num={like_urgent_num}
                            />
                            <div className="post_list">
                                {
                                    tag_list.length > 0 ?
                                    <div>
                                        {"#" + tag_list[0].style_tag.value+ " "}
                                        {"#" + tag_list[1].style_tag.value + " "}
                                        {"#" + tag_list[2].style_tag.value}
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="main_post_tag_div">
                        <div className="recommend_tag">
                                태그 맞춤 추천
                        </div>
                        <div className="post_tag_list">
                            <div className="container">
                                <div className="content">
                                    {
                                        result_post.length!=0?
                                            <div className={"post_page_content"}>
                                                <PostSearchResult
                                                result_post={result_post} />
                                            </div>
                                            :
                                            <Typography>
                                                해당되는 게시물이 존재하지 않습니다.
                                            </Typography>
                                    }
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Post;

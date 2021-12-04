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
import { getPost, listPosts } from '../graphql/queries';
import { updatePost, deletePost, deleteComment, createUserBookmarkPost, deleteUserBookmarkPost, createPostLikeUrgentUser, deletePostLikeUrgentUser } from '../graphql/mutations';
//mport { onCreatePostLikeUrgentUser } from '../graphql/subscriptions'
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
            delete_comment_list:[],
            delete_is_checked:false,

            like_urgent_num: 0,

            same1:[],
            same2:[],
            same3:[],
            result_post:[],
        }
    }

    componentDidMount(){
        console.log("post_id:",this.state.post_id)
        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
        //.then(res=>console.log(res))
        .then(res => this.setState({
            now_post: res.data.getPost,
            now_writer: res.data.getPost.user,
            like_urgent_user_list: res.data.getPost.like_urgent_user_list.items,
            tag_list: res.data.getPost.tag_list,
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
        //console.log('현재 조회수', input_click_num)
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
        console.log("bookmark:", bookmark)
        if(bookmark.length !== 0){
            this.setState({
                bookmark_click: true,
            })
        }
    }

    removeCommentGet = () => {
        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
        .then(res => this.setState({
            delete_is_checked: true,
            delete_comment_list: res.data.getPost.comment_list
        }))

    }

    removeComment = (delete_comment_list) => {
        for (let i = 0; i < delete_comment_list.length; i++) {
            console.log("id : ",delete_comment_list[i].id)
            console.log("내용 : ",delete_comment_list[i].content)

            API.graphql({
                query: deleteComment, variables: {input:{id: delete_comment_list[i].id}}
            })
            .then(console.log("삭제삭제"))
            .then(res => {
                console.log(res)
            })
		}

        this.removePost();
    }

    removePost = () => {
        API.graphql({
            query: deletePost, variables: {input:{id: this.state.post_id}}
        })
        .then(res => {
            console.log(res)
        });
    }

    getTagList =() => {
        let {same1, same2, same3, now_post,} = this.state;
        //console.log("현재 사용자의 tag list", now_post.tag_list)
        API.graphql({
            query: listPosts, variables: { filter: {board_type: {ne: 1}}}
        })
        .then(res=>{
            res.data.listPosts.items.map((post)=>{
                //console.log(post)
                // 지금 post면 비교X
                if (post.id == now_post.id) return false;

                //태그 필터링
                let same = 0;
                post.tag_list.map((post_tag)=>{
                    now_post.tag_list.map(now_tag=>{
                        if(post_tag == now_tag) same++;
                    })
                })

                //console.log("same: "+ same);
                if(same == 3) same3=[...same3,post]
                else if(same==2) same2=[...same2,post]
                else if(same==1) same1=[...same1,post]
                return true;

            })
            /*
            same3=same3.sort(function(a,b){return b.like_user_num-a.like_user_num});
            same2=same2.sort(function(a,b){return b.like_user_num-a.like_user_num});
            same1=same1.sort(function(a,b){return b.like_user_num-a.like_user_num});
            */
            console.log("비교 결과 list:",[...same3,...same2,...same1]);
            this.setState({
                result_post: [...same3,...same2,...same1],
            })
        })
        .catch(e=>console.log(e))
    }

    render(){
        let {post_id, now_post, now_writer, like_urgent_click, tag_list, bookmark_user_list, bookmark_click, like_urgent_user_list, like_urgent_num, user_id, delete_comment_list, result_post} = this.state;

        if(typeof(now_post.click_num)=="number" && this.state.first_click==false){
            this.setClickNum(now_post.click_num);
        }

        if(this.state.delete_is_checked) {
            console.log("삭제 실행");
            
            console.log(delete_comment_list.items[0].id)
            this.removeComment(delete_comment_list.items)
            
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
                                            <button className="remove_post" onClick={this.removeCommentGet}>
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
                                {"#" + tag_list[0] + " "}
                                {"#" + tag_list[1] + " "}
                                {"#" + tag_list[2]}
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

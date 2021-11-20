import React, {Component} from 'react';

import './Post.css'
import Comments from './Comments';
import Bookmark from './Bookmark';
import Like from './Like'
import Urgent from './Urgent';

import SearchResult from './SearchResult';
import Header from '../Header/Header'


import { API } from 'aws-amplify';
import { getPost } from '../graphql/queries';
import { ControlOutlined } from '@ant-design/icons';

//이 둘은 나중에 상위 컴포넌트한테 prop로 받아야하는 것
let post_id = "post1 아이디";
let user_id = "현민 id"; //현재 유저

//board type 0 : 오늘의 착장 1 : 도움이 필요해

class Post extends Component{
    constructor(){
        super();

        this.state = {
            now_post:Object,
            now_writer:Object,
            like_user_list: [],
            tag_list: [],
            like_click: false,
            user_id,
            comment_list: [],
            bookmark_user_list: [],
            bookmark_click: false,
            post_id,
        }
    }

    componentDidMount(){
        API.graphql({
            query: getPost, variables: {id: post_id}
        })
        .then(res => this.setState({
            now_post: res.data.getPost,
            now_writer: res.data.getPost.user,
            like_user_list: res.data.getPost.like_user_list,
            tag_list: res.data.getPost.tag_list,
            comment_list: res.data.getPost.comment_list.items,
            bookmark_user_list: res.data.getPost.bookmark_user_list,
        }))
        .then(res => this.set_like(this.state.like_user_list))
        .then(res => this.set_bookmark(this.state.bookmark_user_list))
        .catch(e => console.log(e));  
    }

    handleBookmarkButton = () => {

        if(this.state.bookmark_click == true){
            var index = this.state.bookmark_user_list.indexOf(user_id)
            if(index > -1){
                this.state.bookmark_user_list.splice(index, 1); //index로부터 1개를 삭제 = user_id만 삭제
            }
            else {
                console.log("error!! cannot find user_id in bookmark_user_list");
            }

            this.setState((prev) => {
                return {
                    bookmark_click: false,
                }

            });
        }
        else {
            this.state.bookmark_user_list.push(user_id);
            this.setState((prev) => {
                return {
                    bookmark_click: true,
                }
            });
        }
    }


    handleLikeButton = () => {
        if(this.state.like_click == true){
            var index = this.state.like_user_list.indexOf(user_id)
            if(index > -1){
                this.state.like_user_list.splice(index, 1); //index로부터 1개를 삭제 = user_id만 삭제
            }
            else {
                console.log("error!! cannot find user_id in like_user_list");
            }

            this.setState((prev) => {
                return {
                    like_click: false,
                }

            });
        }
        else {
            this.state.like_user_list.push(user_id);
            this.setState((prev) => {
                return {
                    like_click: true,
                }

            });
        }
        
    }

    set_comment_list = (changed_comment_list) => {
        this.setState(prev => ({
          commenet_list: changed_comment_list,
        }));

      }

    set_like(list) {
        var index = list.indexOf(user_id)
        if(index > -1){
            this.setState({like_click:true}) //index로부터 1개를 삭제 = user_id만 삭제
        }
    }
    
    set_bookmark(list){
        var index = list.indexOf(user_id)
        if(index > -1){
            this.setState({bookmark_click:true}) //index로부터 1개를 삭제 = user_id만 삭제
        }
    }

    render(){
        let {post_id, now_post, now_writer, like_user_list, like_click, tag_list, comment_list, bookmark_user_list, bookmark_click, user_id} = this.state;
        
        console.log(comment_list);

        return (
            <div className="post_page">
                <Header />
                <div className="whole_page">
                    <div className="main_box">
                        <div className="post_div">
                            <img className="post_img" style={{backgroundImage: 'URL('+now_post.img+')'}}/>
                            <div className="content_box">
                                <div className="writer"> 
                                    <img className="post_writer_img" style={{backgroundImage: 'URL('+now_writer.profile_img+')'}}/>
                                    <div className="writer_name">{now_writer.name}</div>
                                    <div className="writer_content">{now_post.content}</div>
                                </div>
                                <div className="comment">
                                    <Comments
                                    comment_list = {comment_list}
                                    board_type = {now_post.board_type}
                                    user_id = {user_id}
                                    post_id = {post_id}
                                    set_comment_list = {this.set_comment_list}
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
                            {
                                
                                (now_post.board_type == 0) ?
                                <Like
                                like_user_list={like_user_list}
                                like_click={like_click}
                                handleLikeButton={this.handleLikeButton}
                                /> : <Urgent />
                            }
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
                        <div className="tag_list">
                            <div className="container">
                                <div className="content">
                                    <SearchResult />
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

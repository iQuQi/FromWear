import React, {Component} from 'react';


import img_a from './Imgs/img.jpeg';
import writer_img from './Imgs/pro1.jpeg';
import './Post.css'
import Comments from './Comments';
import Bookmark from './Bookmark';
import Like from './Like'
import Urgent from './Urgent';

import SearchResult from './SearchResult';
import Header from '../Header/Header'


import { API } from 'aws-amplify';
import { getPost, listPosts } from '../graphql/queries';
import { handleBreakpoints } from '@mui/system';
import { ConsoleSqlOutlined, TrademarkCircleOutlined } from '@ant-design/icons';
import { ConsoleLogger } from '@aws-amplify/core';

//이 둘은 나중에 상위 컴포넌트한테 prop로 받아야하는 것
let post_id = "post1 아이디";
let user_id = "연지 id";

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
        }

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
            //this.state.like_click = false;
            //console.log(this.state.like_user_list);
        }
        else {
            this.state.like_user_list.push(user_id);
            this.setState((prev) => {
                return {
                    like_click: true,
                }

            });
            //console.log(this.state.like_user_list);
        }
        
    }


    render(){

        let {now_post, now_writer, like_user_list, like_click, tag_list, comment_list, bookmark_user_list, bookmark_click, user_id} = this.state;

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
                                    comment_list = {comment_list}/>
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

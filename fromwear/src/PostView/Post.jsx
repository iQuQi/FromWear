import React, {Component} from 'react';
//import { Link } from 'react-router-dom';

import './Post.css'
import Comments from './Comments';
import Bookmark from './Bookmark';
import Like from './Like'
import Urgent from './Urgent';

import PostSearchResult from './PostSearchResult';
import Header from '../Header/Header'

import { API } from 'aws-amplify';
import { getPost } from '../graphql/queries';
import { updatePost, deletePost, deleteComment } from '../graphql/mutations';

import profile_skyblue from './Imgs/profile_skyblue.jpg';
//import pro1 from './Imgs/pro1.jpeg';
//import img_pro from './Imgs/img.jpeg';


//나중에 상위 컴포넌트한테 prop로 받아야하는 것
let user_id = "현경 id"; //현재 유저

//board type 0 : 오늘의 착장 1 : 도움이 필요해
class Post extends Component{
    constructor(props){
        super();

        this.state = {
            now_post:Object,
            now_writer:Object,
            like_user_list: [],
            like_click: false,
            urgent_user_list: [],
            urgent_click: false,
            tag_list: [],
            user_id,
            bookmark_user_list: [],
            bookmark_click: false,
            //post_id,
            post_id: props.postid,
            first_click: false,
            delete_comment_list:[],
            delete_is_checked:false,
        }
    }

    componentDidMount(){
        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
        .then(res => this.setState({
            now_post: res.data.getPost,
            now_writer: res.data.getPost.user,
            like_user_list: res.data.getPost.like_user_list,
            urgent_user_list: res.data.getPost.urgent_user_list,
            tag_list: res.data.getPost.tag_list,
            bookmark_user_list: res.data.getPost.bookmark_user_list,
        }))
        .then(res => this.setLikeAndUrgent(this.state.now_post.board_type))
        .then(res => this.set_bookmark(this.state.bookmark_user_list))
        .catch(e => console.log(e));  

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

    setLikeAndUrgent = (board_type) => {
        if(board_type == 0 || board_type == 2){
            this.set_like(this.state.like_user_list)
            //console.log("오늘의 착장")
        }
        else if(board_type == 1){
            this.set_urgent(this.state.urgent_user_list)
            //console.log("도움이 필요해")
        }
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

        API.graphql({query: updatePost, variables:{input: {id: this.state.post_id,
            bookmark_user_list: this.state.bookmark_user_list,
            }}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e))
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
            if(this.state.like_user_list === null){
                this.state.like_user_list = []
            }
            this.state.like_user_list.push(user_id);
            this.setState((prev) => {
                return {
                    like_click: true,
                }

            });
        }

        API.graphql({query: updatePost, variables:{input: {id: this.state.post_id,
            like_user_list: this.state.like_user_list,
            like_user_num: this.state.like_user_list.length,
            }}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }

    handleUrgentButton = () => {
        if(this.state.urgent_click == true){
            var index = this.state.urgent_user_list.indexOf(user_id)
            if(index > -1){
                this.state.urgent_user_list.splice(index, 1); //index로부터 1개를 삭제 = user_id만 삭제
            }
            else {
                console.log("error!! cannot find user_id in urgent_user_list");
            }

            this.setState((prev) => {
                return {
                    urgent_click: false,
                }

            });
        }
        else {
            if(this.state.urgent_user_list === null){
                this.state.urgent_user_list = []
            }
            this.state.urgent_user_list.push(user_id);
            this.setState((prev) => {
                return {
                    urgent_click: true,
                }

            });
        }

        API.graphql({query: updatePost, variables:{input: {id: this.state.post_id,
            urgent_user_list: this.state.urgent_user_list,
            urgent_user_num: this.state.urgent_user_list.length,
            }}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e))
        
    }

    set_like(list) {
        var index = list.indexOf(user_id)
        if(index > -1){
            this.setState({like_click:true}) //index로부터 1개를 삭제 = user_id만 삭제
        }
    }
    
    set_urgent(list) {
        var index = list.indexOf(user_id)
        if(index > -1){
            this.setState({urgent_click:true}) //index로부터 1개를 삭제 = user_id만 삭제
        }
    }

    set_bookmark(list){
        var index = list.indexOf(user_id)
        if(index > -1){
            this.setState({bookmark_click:true}) //index로부터 1개를 삭제 = user_id만 삭제
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
    

    render(){
        let {post_id, now_post, now_writer, like_user_list, like_click, tag_list, bookmark_user_list, bookmark_click, user_id, urgent_click, urgent_user_list, delete_comment_list} = this.state;
       
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
                            {
                                
                                (now_post.board_type == 0 || now_post.board_type == 2)  ?
                                <Like
                                like_user_list={like_user_list}
                                like_click={like_click}
                                handleLikeButton={this.handleLikeButton}
                                /> : <Urgent
                                urgent_user_list={urgent_user_list}
                                urgent_click={urgent_click}
                                handleUrgentButton={this.handleUrgentButton}
                                />
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
                                    <PostSearchResult />
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

import React, {Component} from 'react';

import Storage from '@aws-amplify/storage';
import './Post.css'
import Comments from './Comments';
import Bookmark from './Bookmark';
import LikeUrgent from './LikeUrgent'
import PostModifyPage from './PostModifyPage';
import Footer from '../Footer/Footer'

import PostSearchResult from './PostSearchResult';
import Header from '../Header/Header'
import  Typography  from '@mui/material/Typography';
import ProfileEdit from '../ProfileEditPage/ProfileEdit';

import { API } from 'aws-amplify';
import { getPost, getStyleTag, listPosts, listComments, listCommentLikeUsers, listPostLikeUrgentUsers, listUserBookmarkPosts } from '../graphql/queries';
import { updatePost, deletePost, createUserBookmarkPost, deleteUserBookmarkPost, createPostLikeUrgentUser, deletePostLikeUrgentUser, deleteComment, deleteCommentLikeUser, deletePostStyleTag, createAlarm, updateStyleTag, deleteStyleTag } from '../graphql/mutations';
import profile_skyblue from './Imgs/profile_skyblue.jpg';

var AWS = require('aws-sdk'); 

let is_ell = false;

//board type 0 : 오늘의 착장 / 1 : 도움이 필요해
class Post extends Component{
    constructor(props){
        super();

        this.state = {
            post_id: props.postid,
            now_post:Object,
            now_writer:Object, //post 작성자
            like_urgent_user_list: [],
            like_urgent_click: false,
            tag_list: [],
            now_user: 'noUser',
            bookmark_user_list: [],
            bookmark_click: false,
            first_click: false,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            btn_check: false,
            create_post_time: '',

            like_urgent_num: 0,

            deleted_comment:false,
            deleted_comment_like:false,
            deleted_like_urgent:false,
            deleted_bookmark:false,
            deleted_post:false,
            deleted_tag:false,
            completely_deleted_tag:false,
            delete_img: false,
            deleted_styletag: false,
            icon_delete_once:false,
            now_post_board_type:0,

            same1:[],
            same2:[],
            same3:[],
            result_post:[],

            is_write_page:false,
            current_next_post_page: 1,

            isMobile: false,
        }
    }

    inquireIsMobile=(isMobile)=> {
		this.setState({
			isMobile
		})
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
        .then(res => this.getCreateTime())
        .then(res => this.getTagList())
        
        .catch(e => console.log(e));

        window.addEventListener("scroll", this.handleScroll);
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

    setClickNum = (input_click_num) => {
        this.state.first_click = true

        API.graphql({query: updatePost, variables:{input: {id: this.state.post_id,
            click_num: input_click_num+1}}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e)) 
    }

    handleBookmarkButton = () => {
        
        if(this.state.now_user == 'noUser'){
            alert("로그인해주세요.")    
            return
        }
        if(this.state.bookmark_click == true){
            this.setState((prev) => {
                return {
                    bookmark_click: false,
                }

            });

            API.graphql({query: deleteUserBookmarkPost, variables:{input:
                {
                    id: this.state.now_user.id + this.state.post_id,
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
                    id: this.state.now_user.id + this.state.post_id,
                    user_id: this.state.now_user.id,
                    post_id: this.state.post_id,
                }}
            })

        }
    }


    handleLikeUrgentButton = () => {
        if(this.state.now_user == 'noUser'){
            alert("로그인해주세요.")    
            return
        }
        API.graphql({
            query: getPost, variables: {id: this.state.post_id}
        })
        .then()
        if(this.state.like_urgent_click == true){
            this.setState((prev) => {
                return {
                    like_urgent_click: false,
                    like_urgent_num: this.state.like_urgent_num-1,
                }

            });

            API.graphql({query: deletePostLikeUrgentUser, variables:{input:
                {
                    id: this.state.now_user.id + this.state.post_id,
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
                    id: this.state.now_user.id + this.state.post_id,
                    user_id: this.state.now_user.id,
                    post_id: this.state.post_id,
                }}
            })
            
            API.graphql({query: createAlarm, variables:{input:
                {
                    user_id: this.state.now_writer.id,
                    content: this.state.now_user.name+'님이 게시글에 좋아요를 눌렀습니다',
                    link:'post/' + this.state.post_id

                }}
            })
            .then(e => console.log(e))
        }

    }

    set_like_urgent(list) {
        let like_urgent = list.filter((data)=>{
            if(data.user_id == this.state.now_user.id) return true;
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
            if(data.user_id == this.state.now_user.id) return true;
            else return false;
        })
        if(bookmark.length !== 0){
            this.setState({
                bookmark_click: true,
            })
        }
    }

    modifyPost = () => {
		this.setState({
			is_write_page: !this.state.is_write_page
		})

    }

	handle_write_page=()=> {
		this.setState({
			is_write_page: !this.state.is_write_page
		})
	}

    handleScroll = () => {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;
		const clientHeight = document.documentElement.clientHeight;
		if (scrollTop + clientHeight >= scrollHeight) {
		  // 페이지 끝에 도달하면 추가 데이터
		  this.setState({
			current_next_post_page: this.state.current_next_post_page+1
			})
		}
	}

    componentWillUnmount(){
		window.removeEventListener("scroll", this.handleScroll);
	}

    check_button_click = () => {
        this.setState({
            btn_check: !this.state.btn_check
        });

        
    }


    checkRemovePost = () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            //삭제 실행
            this.removePostIcons();
          } else {
          }
    }

    removePostIcons = () => { 

        let today = new Date();   

        //오늘 날짜
        let year = today.getFullYear();
        let month = today.getMonth() + 1;  
        let date = today.getDate(); 
  
        //포스트 생성 날짜
        let post_created_time = new Date(this.state.now_post.createdAt)

        let now_post_created_year = post_created_time.getFullYear();
        let now_post_created_month = post_created_time.getMonth() + 1;
        let now_post_created_date = post_created_time.getDate();
          
        var datetime_same = false;
        if(year == now_post_created_year && month == now_post_created_month && date == now_post_created_date){
            datetime_same = true;
        }

        let tag_id_list;
        if(this.state.now_post.tag_list.items.length != 0){
            tag_id_list = [this.state.now_post.tag_list.items[0].tag_id, this.state.now_post.tag_list.items[1].tag_id, this.state.now_post.tag_list.items[2].tag_id]
        }

        this.setState({
            now_post_board_type: this.state.now_post.board_type,
        })

        API.graphql({
            query: listComments, variables: {filter:
                {
                    post_id: {eq: this.state.post_id}
                }
            }
        })
        .then(res => {
            if(res.data.listComments.items.length == 0){
                this.setState({
                    deleted_comment: true, //이미 null
                    deleted_comment_like: true,
                })
            }
            else{
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
                            this.setState({deleted_comment_like:true})

                            API.graphql({
                                query: deleteComment, variables: {input:{id: comment.id}}
                            })
                            .then(e => this.setState({
                                deleted_comment:true,
                            }))
                        }
                        else{
                            var tmpData = res.data.listCommentLikeUsers.items
                            res.data.listCommentLikeUsers.items.map((comment_like,index)=>{
                                API.graphql({
                                    query: deleteCommentLikeUser, variables:{input:{id: comment_like.id}}
                                })
                                .then(res=>{
                                    if(index == tmpData.length-1){
                                        this.setState({deleted_comment_like:true,})

                                        API.graphql({
                                            query: deleteComment, variables: {input:{id: comment.id}}
                                        })
                                        .then(e => this.setState({
                                            deleted_comment:true,
                                        }))
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
        .then(res => {
            //이미지 s3 삭제
            Storage.remove(this.state.now_post.img)
            .then(this.setState({delete_img: true,}))
        })
        .then(res => {      
            if(this.state.like_urgent_num == 0){
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
                        .then(e => console.log(e))
                    })
                })
                .then(e => this.setState({deleted_like_urgent: true,}))
            }

            if(this.state.now_post.bookmark_user_list.items.length == 0 && this.state.bookmark_click == false){
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
                })
                .then(res => this.setState({deleted_bookmark: true,}))

            }  
        })
        .then(res => {
            //태그 num-1
            if(datetime_same){ //생성날짜가 당일이라면
                this.state.now_post.tag_list.items.forEach((tag)=>{
                    API.graphql({
                        query: updateStyleTag,
                        variables: {
                          input: {
                            id: tag.tag_id,
                            num: tag.style_tag.num - 1,
                          },
                        },
                      })
                      .catch((e) => console.log(e));
                })
            }
        })
        .then(res => {
            this.state.now_post.tag_list.items.map((tag, index)=>{
                API.graphql({
                    query: deletePostStyleTag, variables:{input:{id: tag.id}}
                })
                .then(res=>{
                    if(index == 2){
                        //tag last
                        this.setState({deleted_tag:true,});
                    }
                })
                .catch((e)=> console.log("onChange error", e))
                .then(res => {
                    if(this.state.deleted_tag){
                        tag_id_list.forEach((delete_tag, index)=>{
                            API.graphql({
                            query: getStyleTag,
                            variables: {id: delete_tag}
                            })
                            .then(res=>{
                                if(!res.data.getStyleTag.is_static && !res.data.getStyleTag.is_weekly && res.data.getStyleTag.post_list.items.length === 0){   
                                    API.graphql({
                                    query: deleteStyleTag,
                                    variables : {
                                        input : {
                                            id : delete_tag
                                        }
                                    }
                                    })
                                    .then(res => console.log(res))
                                    .catch((e)=> console.log("onChange error", e))
                                }
                            })
                            .then(res=>{
                                if(index == 2){
                                    //tag 삭제 last
                                    this.setState({completely_deleted_tag:true,});
                                }
                            })
                            .catch((e) => console.log("onChange error", e))
                            .then(res => {
                                if(this.state.completely_deleted_tag){
                                    this.setState({
                                        deleted_styletag: true,
                                        icon_delete_once: true,
                                    })
                                }
                            })
                        })
                    }
                })
            })
        })
        .catch((e)=>console.log("error",e))
    }

    removePost(){
        API.graphql({
            query: deletePost, variables: {input:{id: this.state.now_post.id}}
        })
        .then(res => this.setState({
            deleted_post: true,
            icon_delete_once: false,
        }))
        .then(res => {
            if(this.state.now_post_board_type == 0){
                window.location.href = "/todayboard"
            }
            else if(this.state.now_post_board_type == 1){
                window.location.href = "/sosboard"
            }
            else if(this.state.now_post_board_type == 2){
                window.location.href = "/weeklytag"
            }
        });
    }
    
    moveToWriterPage = () => {
        if(this.state.now_writer.id == this.state.now_user.id) {
            window.location.href = "/mypage"
        }
        else {
            window.location.href = "/userpage/" + this.state.now_writer.id
        }
    }

    getCreateTime = () => {
        let post_create_time = new Date(this.state.now_post.createdAt)

        var tmp_month = String(post_create_time.getMonth() + 1);
        var tmp_date = String(post_create_time.getDate());
        if(tmp_month.length === 1){
            tmp_month = '0' + tmp_month;
        }
        if(tmp_date.length === 1){
            tmp_date = '0' + tmp_date;
        }

        let create_time = String(post_create_time.getFullYear()) + '-' + tmp_month + '-' + tmp_date;
        this.setState({
            create_post_time: create_time
        });
    }
    
    getTagList = () => {
        let {same1, same2, same3, now_post,} = this.state;
        API.graphql({
            query: listPosts, variables: { filter: {board_type: {ne: 1}}}
        })
        .then(res=>{
            res.data.listPosts.items.map((post)=>{
                if (post.id == now_post.id) return false;

                //태그 필터링
                let same = 0;
                
                post.tag_list.items.map((post_tag)=>{
                    now_post.tag_list.items.map(now_tag=>{
                        if(post_tag.tag_id == now_tag.tag_id) same++;
                    })
                })

                if(same == 3) same3=[...same3,post]
                else if(same==2) same2=[...same2,post]
                else if(same==1) same1=[...same1,post]
                return true;

            })
              
            same3=same3.sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length});
            same2=same2.sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length});
            same1=same1.sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length});
            
            this.setState({
                result_post: [...same3,...same2,...same1],
            })

        })
        .catch(e=>console.log(e))
    }


    render(){
        let {post_id, now_post, now_writer, now_user, is_write_page, like_urgent_click, tag_list, bookmark_user_list, bookmark_click, like_urgent_user_list, like_urgent_num, result_post} = this.state;

        if(typeof(now_post.click_num)=="number" && this.state.first_click==false){
            this.setClickNum(now_post.click_num);
        }

        if(this.state.deleted_comment && this.state.deleted_comment_like && this.state.deleted_like_urgent && this.state.deleted_bookmark && this.state.delete_img && this.state.deleted_styletag && this.state.deleted_tag && this.state.completely_deleted_tag && this.state.icon_delete_once){
            this.removePost();
        }

        let img_src123 = now_post.img
        let img_src = 'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+img_src123;

        
        let box = document.getElementById("post_content");
        
        if(box !== null){
           if(box.offsetHeight >= 44){
            is_ell = true;
            }
        }

        return (
            <div className="post_page">
                {
                is_write_page 
					? <PostModifyPage 
						board_type={now_post.board_type} 
						user={now_user}
                        handle_write_page={this.handle_write_page}
                        now_post={now_post}
                        isMobile={this.state.isMobile}
					  />
					: null
                }
                <Header handle_user_info={this.handle_user_info} inquireIsMobile={this.inquireIsMobile}/>
                <div className="whole_page">
                    <div className="main_box">
                        <div className="post_div">
                            <div className="mobile_writer_box">
                                    <div className="writer">
                                        {
                                            now_post.blind?
                                            <img className="post_writer_img" src={profile_skyblue} />
                                            :<div className="post_writer_img move_to_userpage" style={{backgroundImage: 'URL('+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+now_writer.profile_img+')', backgroundPosition: 'center', backgroundSize: 'cover'}} onClick={this.moveToWriterPage} />
                                        }
                                        {
                                            now_post.blind?
                                            <div className="writer_name">익명</div>
                                            :
                                            <div className="writer_name move_to_userpage" onClick={this.moveToWriterPage}>{now_writer.name}</div>
                                        }
                                        {
                                            now_user.id == now_writer.id ?
                                            <div>
                                                <button className="delete_post" onClick={this.checkRemovePost}>
                                                    삭제
                                                </button>
                                                <button className="modify_post" onClick={this.modifyPost}>
                                                    수정
                                                </button>
                                            </div>
                                            :<div>
                                            </div>
                                        }
                                    </div>
                                    
                            </div>
                            <div className="post_img" style={{backgroundImage: 'URL('+img_src+')'}}></div>
                            
                            <div className="content_box">
                                <div className="writer">
                                    {
                                        now_post.blind?
                                        <img className="post_writer_img" src={profile_skyblue} />
                                        :<div className="post_writer_img move_to_userpage" style={{backgroundImage: 'URL('+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+now_writer.profile_img+')', backgroundPosition: 'center', backgroundSize: 'cover'}} onClick={this.moveToWriterPage} />
                                    }
                                    {
                                        now_post.blind?
                                        <div className="writer_name">익명</div>
                                        :
                                        <div className="writer_name move_to_userpage" onClick={this.moveToWriterPage}>{now_writer.name}</div>
                                    }
                                    {
                                        now_user.id == now_writer.id ?
                                        <div>
                                            <button className="delete_post" onClick={this.checkRemovePost}>
                                                삭제
                                            </button>
                                            <button className="modify_post" onClick={this.modifyPost}>
                                                수정
                                            </button>
                                        </div>
                                        :<div>
                                        </div>
                                    }
                                    
                                    <div>
                                        <div id='post_content'>
                                            <div className={is_ell ? 'part_ell' : '' }>
                                                <div className={this.state.btn_check ? 'post_blind' : ''}>
                                                    {now_post.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        this.state.btn_check ?
                                        <div> 
                                            <div className="whole_post_content">
                                                {now_post.content}
                                            </div>
                                            <input id="check_btn" type="checkbox" />
                                            <label for="check_btn" className={is_ell ? "check_button" : "post_blind"} onClick={this.check_button_click}>
                                                <span>숨기기</span>
                                            </label>
                                        </div>
                                        :<div>
                                            <input id="check_btn" type="checkbox" />
                                            <label for="check_btn" className={is_ell ? "check_button" : "post_blind"} onClick={this.check_button_click}>
                                                <span>더보기</span>
                                            </label>
                                        </div>
                                    }
                                
                                    <div className="post_create_time">{this.state.create_post_time}</div>
                                
                                </div>
                                <div className="comment">
                                    <Comments
                                    post_id = {post_id}
                                    board_type = {now_post.board_type}
                                    post_writer = {now_writer}
                                    now_user = {now_user}
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
                            <div className="post_tag_list">
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
                        <div className="mobile_post_content">
                                <div id='post_content'>
                                    <div className={is_ell ? 'part_ell' : '' }>
                                        <div className={this.state.btn_check ? 'post_blind' : ''}>
                                            {now_post.content}
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.btn_check ?
                                    <div className="check_btn_wrap"> 
                                        <div className="whole_post_content">
                                            {now_post.content}
                                        </div>
                                        <input id="check_btn" type="checkbox" />
                                        <label for="check_btn" className={is_ell ? "check_button" : "post_blind"} onClick={this.check_button_click}>
                                            <span>숨기기</span>
                                        </label>
                                    </div>
                                    :<div className="check_btn_wrap">
                                        <input id="check_btn" type="checkbox" />
                                        <label for="check_btn" className={is_ell ? "check_button" : "post_blind"} onClick={this.check_button_click}>
                                            <span>더보기</span>
                                        </label>
                                    </div>
                                }
                                <div className="mobile_post_create_time">{this.state.create_post_time}</div>
                                
                                <div className="comment">
                                    <Comments
                                    post_id = {post_id}
                                    board_type = {now_post.board_type}
                                    post_writer = {now_writer}
                                    now_user = {now_user}
                                    />
                                </div>
                        </div>
                    </div>
                    <div className="recommend_post_wrap">
                        <div className="recommend_tag">
                                태그 맞춤 추천
                        </div>
                        <div className="recommend_post_list">
                            <div className="container">
                                <div className="content">
                                    {   
                                        result_post.length!=0?
                                            <div className={"post_page_content"}>
                                                <PostSearchResult
                                                result_post={result_post}
								                current_next_post_page={this.state.current_next_post_page}
                                                isMobile={this.state.isMobile} />
                                            </div>
                                            :
                                            <Typography className="post_page_tag_empty">
                                                해당되는 게시물이 존재하지 않습니다.
                                            </Typography>
                                            
                                    }
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>

        );
    }

}

export default Post;
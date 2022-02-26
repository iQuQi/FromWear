import React, {Component} from 'react';
//import { Link } from 'react-router-dom';

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
            delete_img: false,
            deleted_styletag: false,
            icon_delete_once:false,
            now_post_board_type:0, //delete할때 board_type담아둘것

            same1:[],
            same2:[],
            same3:[],
            result_post:[],

            is_write_page:false,
            current_next_post_page: 1,
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
            create_post_time: res.data.getPost.createdAt.substring(0, 10),
        }))
        .then(res => this.set_like_urgent(this.state.like_urgent_user_list))
        .then(res => this.set_bookmark(this.state.bookmark_user_list))
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
        //input_click_num : '현재 조회수'
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
                    id: this.state.now_user.id + this.state.post_id, //id는 안적어도 자동 생성되는데 그럼 delete때 id를 못넣어줘서 따로 지정하는 것
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
        //console.log("좋아요 list:",list)
        //console.log("현재 사람:",this.state.now_user)
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
        console.log("is",this.state.is_write_page)
        
    }

	handle_write_page=()=> {
		this.setState({
			is_write_page: !this.state.is_write_page
		})
        console.log("is",this.state.is_write_page)
	}

    handleScroll = () => {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;
		const clientHeight = document.documentElement.clientHeight;
		if (scrollTop + clientHeight >= scrollHeight) {
		  // 페이지 끝에 도달하면 추가 데이터를 받아온다
		  this.setState({
			current_next_post_page: this.state.current_next_post_page+1
			})
		}
	}

    componentWillUnmount(){
		window.removeEventListener("scroll", this.handleScroll);
	}

    check_button_click = () => {
        
        // if(this.state.btn_check){
        //     document.getElementById("demo").innerHTML = '더보기'
        // }
        // else {
        //     document.getElementById("demo").innerHTML = '숨기기'
        // }
        this.setState({
            btn_check: !this.state.btn_check
        });

        
    }


    removePostIcons = () => { 

        let today = new Date();   

        //오늘 날짜
        let year = today.getFullYear();
        let month = today.getMonth() + 1;  
        let date = today.getDate(); 
  
        //포스트 생성 날짜
        let now_post_created_year = String(this.state.now_post.createdAt).substr(0,4);
        let now_post_created_month = String(this.state.now_post.createdAt).substr(5,2);
        let now_post_created_date = String(this.state.now_post.createdAt).substr(8,2);
          
        var datetime_same = false;
        if(year == now_post_created_year && month == now_post_created_month && date == now_post_created_date){
            console.log("오늘 날짜와 생성 날짜가 같음")
            datetime_same = true;
        }

        let tag_id_list = [this.state.now_post.tag_list.items[0].tag_id, this.state.now_post.tag_list.items[1].tag_id, this.state.now_post.tag_list.items[2].tag_id]
        
        
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
                console.log("이미 댓글 없어서 댓글 삭제, 댓글 따봉 true로 변경")
                this.setState({
                    deleted_comment: true, //이미 null이라 삭제안해도됨
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
                            console.log("이미 댓글 따봉 없어서 true로 변경")
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
                                .then(e => console.log("댓글 좋아요 지워지는중"))
                                .then(res=>{
                                    if(index == tmpData.length-1){
                                        console.log("댓글 좋아요 last")
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
            .catch((e) => console.log("onChange error", e));
        })
        .then(res => {
                
            if(this.state.like_urgent_num == 0){
                console.log("이미 좋아요 없어서 true로 변경")
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
                console.log("이미 북마크 없어서 true로 변경")
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
            //태그 삭제
            if(this.state.now_post.tag_list.items.length == 0){
                console.log("tag list가 null")
                this.setState({deleted_tag: true,})
            }
            else {
                this.state.now_post.tag_list.items.map((tag, index)=>{
                    API.graphql({
                        query: deletePostStyleTag, variables:{input:{id: tag.id}}
                    })
                    .then(res=>{
                        if(index == 2){
                            console.log("tag last", tag);
                            this.setState({deleted_tag:true,});
                        }
                    })
                    .then(console.log("tag 삭제 완료"))
                })
            }
        })
        .then(res => {
            tag_id_list.forEach((delete_tag)=>{
                // console.log("@@@:",delete_tag)
                API.graphql({
                query: getStyleTag,
                variables: {id: delete_tag}
                })
                .then(res=>{
                    // console.log("현재 post", this.state.now_post)
                    // console.log("현재 delete_tag의 정보", res.data.getStyleTag)
                    // console.log("post_list 길이", res.data.getStyleTag.post_list.items.length)
                    if(!res.data.getStyleTag.is_static && !res.data.getStyleTag.is_weekly && (res.data.getStyleTag.post_list.items.length == 0)){
                        console.log("태그 삭제!!")
                        API.graphql({
                        query: deleteStyleTag,
                        variables : {
                            input : {
                                id : delete_tag
                            }
                        }
                        })
                    }
                })
                .catch((e) => console.log("onChange error", e));
            })
        })
        .then(res => this.setState({deleted_styletag: true,}))
        .then(res => this.setState({icon_delete_once: true,}))
        
        
    }

    removePost(){
        console.log("post삭제")
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

        console.log("현재 게시글 정보", this.state.now_post)
        //now_writer : 지금 보고 있는 post 작성자
        let {post_id, now_post, now_writer, now_user, is_write_page, like_urgent_click, tag_list, bookmark_user_list, bookmark_click, like_urgent_user_list, like_urgent_num, result_post} = this.state;

        //console.log("현재 유저:",now_user.id)
        if(typeof(now_post.click_num)=="number" && this.state.first_click==false){
            this.setClickNum(now_post.click_num);
        }

        if(this.state.deleted_comment && this.state.deleted_comment_like && this.state.deleted_like_urgent && this.state.deleted_bookmark && this.state.delete_img && this.state.deleted_styletag && this.state.deleted_tag && this.state.icon_delete_once){

            this.removePost();
            console.log("아이콘 다지워짐!!")
        }

        let img_src123 = now_post.img
        let img_src = 'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+img_src123;


        
        let box = document.getElementById("post_content");
        
        if(box !== null){
           if(box.offsetHeight >= 44){
            is_ell = true;
            }
        }

        // console.log("현재 포스트 : ",now_post)
        return (
            <div className="post_page">
                {
                is_write_page 
					? <PostModifyPage 
						board_type={now_post.board_type} 
						user={now_user}
                        handle_write_page={this.handle_write_page}
                        now_post={now_post}
					  />
					: null
                }
                <Header handle_user_info={this.handle_user_info}/>
                <div className="whole_page">
                    <div className="main_box">
                        <div className="post_div">
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
                                            <button className="remove_post" onClick={this.removePostIcons}>
                                                삭제
                                            </button>
                                            <button className="modify_post" onClick={this.modifyPost}>
                                                수정
                                            </button>
                                            {/* <div className="post_create_time">{this.state.create_post_time}</div> */}
                                        </div>
                                        :<div>
                                            {/* <div className="post_create_time_other">{this.state.create_post_time}</div> */}
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
                                
                                
                                    {
                                        this.state.btn_check ?
                                        <div>
                                            {
                                                this.state.is_ell ?
                                                <div>경우1</div>
                                                :<div className="post_create_time">{this.state.create_post_time}</div> //긴 내용이 전부 나오는 상태
                                            }
                                        </div>
                                        :<div>
                                            {
                                                this.state.is_ell ?
                                                <div>경우2</div>
                                                :<div className="post_create_time">{this.state.create_post_time}</div> //내용 숨겨진 상태, 애초에 안 넘는 상태
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="comment">
                                    <Comments
                                    post_id = {post_id}
                                    board_type = {now_post.board_type}
                                    post_id = {post_id}
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
                                                result_post={result_post}
								                current_next_post_page={this.state.current_next_post_page} />
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
                <Footer />
            </div>

        );
    }

}

export default Post;
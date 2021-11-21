import {Component} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';

import dayFilter from './dayFilter';
import genderFilter from './genderFilter';
import './CSS/TodayPostBoardPosts.css';

import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';


/*
post_list : [
                {
                    id: "",
                    img: "",
                    like_user_num: "",
                    click_num: "",
                    comment_list:{
                        items: "",
                    },
                    createdAt: "",
                    user : {
                        name: "",
                        profile_img: "",
                    },
                },
            ],
*/
export default class TodayPostBoardPosts extends Component {
    constructor() {
		super();

		this.state = {
            post_state: 1,
            filter_gender: "",
            filter_day: "",
            post_list:[],
		}

	}

    componentDidMount() {
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
			.then(res => this.setState({
                post_list: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num})
            }))
			.catch(e => console.log(e));
    }

	handleSortLike = (e) => {
		console.log("like");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
			.then(res => this.setState({
                post_state: 1,
                post_list: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num})
            }))
			.catch(e => console.log(e));
	}

	handleSortView = (e) => {
		console.log("view");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
			.then(res => this.setState({
                post_state: 2,
                post_list: res.data.listPosts.items.sort(function(a,b){return b.click_num-a.click_num})
            }))
			.catch(e => console.log(e));
	}

    consolePrint = () => {
        console.log(this.state.post_list[0].comment_list.items);
    }

	handleSortReply = (e) => {
		console.log("reply");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
			.then(res => {
                this.setState({
                post_state: 3,
                post_list: res.data.listPosts.items.sort(function(a,b){return b.comment_list.items-a.comment_list.items}) 
            })
        })
			.catch(e => console.log(e));

        API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
            .then(res => {
                console.log(Object.values(res.data.listPosts.items[0])); 
            })
        .catch(e => console.log(e));
        this.consolePrint();
	}

	handleSortLatest = (e) => {
		console.log("Latest");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
			.then(res => this.setState({
                post_state: 4,
                post_list: res.data.listPosts.items.sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)})
            }))
			.catch(e => console.log(e));
	}

    handle_select_gender = (e) => {
		let select = e.target.value;
		let gender = "";
		if(select == 10) gender="F";
		else if(select==20) gender="M";
	
		this.setState({
			filter_gender : gender
		});
	}

	// handle_select_day = (e) => {
	// 	let select = e.target.value;
	// 	let day = -1;
	// 	if(day<select) day=select;


	// 	this.setState({
	// 		filter_day : day
	// 	});
	// }


    render() {
		let {post_state, post_list} = this.state;

        return (<article className="wrap_recommend">
            <form className="sort_font select_sort">
                <input type="radio" id="sort_like" name="sort" defaultChecked onChange={this.handleSortLike}></input>
                <label htmlFor="sort_like">좋아요순</label>
                <input type="radio" id="sort_view" name="sort" onChange={this.handleSortView}></input>
                <label htmlFor="sort_view">조회수순</label>
                <input type="radio" id="sort_reply" name="sort" onChange={this.handleSortReply}></input>
                <label htmlFor="sort_reply">댓글순</label>
                <input type="radio" id="sort_latest" name="sort" onChange={this.handleSortLatest}></input>
                <label htmlFor="sort_latest">최신순</label>

            </form>
            <genderFilter />
            {/* <genderFilter style={{width:100,height:100}} handle_select_gender={this.handle_select_gender}/> */}
            {/* <dayFilter handle_select_day={this.handle_select_day}/> */}

            <div id = 'today_post' className = 'collection'>
                <ImageList cols={5} gap={8} style={{clear: 'left'}}>
                    {post_list.map((post) => (
                        <ImageListItem key={post.id} className='today_image_list_item'>
                            <img style={{height:'322.55px', borderRadius:16}}
                                src={`${post.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={post.user.name}
                                loading="lazy"
                            />
                            
                            <a href='/post'> 
                                <span className='dimmed_layer'>	</span>
                            </a>

                            <Stack direction="row" spacing={0}>
                                <div className="user_profile">
                                    <img src={post.user.profile_img} style={{margin: '7px 3px 7px 5px', width:'20px', height:'20px'}}/>
                                    <p style={{margin: '16px 0px'}}>{post.user.name}</p>
                                </div>
                                {(post_state == 1 || post_state == 4 || post_state == 3 ) && 
                                    <div className="user_like">
                                        <p style={{margin: '16px 0px'}}>{post.like_user_num}</p>
                                        <FavoriteBorderIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/> 
                                    </div>
                                }
                                {post_state == 2 && 
                                    <div className="user_like">
                                        <p style={{margin: '16px 0px'}}>{post.click_num}</p>
                                        <VisibilityIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/> 
                                    </div>
                                }
                                {/* {post_state == 3 && 
                                    <div className="user_like">
                                        <p style={{margin: '16px 0px'}}>{post.comment_list.items}</p>
                                        <CommentIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/> 
                                    </div>
                                } */}
                            </Stack>				
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </article>)
    }
}
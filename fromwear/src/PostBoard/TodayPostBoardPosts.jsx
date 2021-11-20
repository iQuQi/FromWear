import {Component} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';

import './CSS/TodayPostBoardPosts.css';

import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';

export default class TodayPostBoardPosts extends Component {
    constructor() {
		super();

		this.state = {
            post_list : [
                {
                    id: "",
                    img: "",
                    like_user_num: "",
                    click_num: "",
                    comment_list: [],
                    updatedAt: "",
                    user : {
                        id: "",
                        profile_img: "",
                    },
                },
            ],
			itemData: [
				{
				  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
				  user: 'Breakfast',
				  like: '1005',
                  profile_img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
				},
			],
		}
	}

    componentDidMount() {
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {eq: 0}}}})
			.then(res => this.setState({
                post_list: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num})
            }))
			.catch(e => console.log(e));
        console.log(this.state.post_list.length);
    }

	handleSortLike = (e) => {
		console.log("like");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {eq: 0}}}})
			.then(res => this.setState({
                post_list: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num})
            }))
			.catch(e => console.log(e));
            console.log(this.state.post_list.length);
	}

	handleSortView = (e) => {
		console.log("view");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {eq: 0}}}})
			.then(res => this.setState({
                post_list: res.data.listPosts.items.sort(function(a,b){return b.click_num-a.click_num})
            }))
			.catch(e => console.log(e));
            console.log(this.state.post_list.length);
	}

	handleSortReply = (e) => {
		console.log("reply");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {eq: 0}}}})
			.then(res => this.setState({
                post_list: res.data.listPosts.items.sort(function(a,b){return b.updatedAt-a.updatedAt})
            }))
			.catch(e => console.log(e));
            console.log(this.state.post_list.length);
	}

	handleSortLatest = (e) => {
		console.log("Latest");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {eq: 0}}}})
			.then(res => this.setState({
                post_list: res.data.listPosts.items.sort(function(a,b){return b.comment_list.length-a.like_user_num.length})
            }))
			.catch(e => console.log(e));
	}

    render() {
		let {post_list} = this.state;

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

            <div id = 'today_post' className = 'collection'>
                <ImageList cols={5} gap={8} style={{clear: 'left'}}>
                    {post_list.map((post) => (
                        <ImageListItem key={post.id} className='today_image_list_item'>
                            <img style={{height:'322.55px', borderRadius:16}}
                                src={`${post.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={post.user.id}
                                loading="lazy"
                            />
                            
                            <a href='/post'> 
                                <span className='dimmed_layer'>	</span>
                            </a>

                            <Stack direction="row" spacing={0}>
                                <div className="user_profile">
                                    <img src={post.user.profile_img} style={{margin: '7px 3px 7px 5px', width:'20px', height:'20px'}}/>
                                    <p style={{margin: '16px 0px'}}>{post.user.id}</p>
                                </div>
                                <div className="user_like">
                                    <p style={{margin: '16px 0px'}}>{post.like_user_num}</p>
                                    <FavoriteBorderIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
                                </div>
                            </Stack>				
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </article>)
    }
}
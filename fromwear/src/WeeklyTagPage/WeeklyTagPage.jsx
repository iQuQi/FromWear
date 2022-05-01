import {Component} from 'react';
import './WeeklyTagPage.css';
import PROFILE from './img/profile.png'

import Header from '../Header/Header'

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import {API} from 'aws-amplify';
import {listPosts} from '../graphql/queries.js';
import {listStyleTags} from '../graphql/queries';

import Footer from '../Footer/Footer.jsx';
import PostWritePage from '../PostWritePage/PostWritePage';
import WeeklyTagBody from './WeeklyTagBody';

let link = '';

let link_change = (item, now_user) => {
    item.user.id == now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.user.id
}

class WeeklyTagPage extends Component {

    constructor() {
		super();

		this.state = {
			postlist_0: [],
			postlist_1: [],
			postlist_2: [],
			weekly_tag_id: [],
			weekly_tag: [],
			current_next_post_page: 1,
			now_user: 'noUser',

			is_write_page: false,
		};
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

	handle_user_info = (user) => {
		
		this.setState({ now_user: user });
		
	}

	componentDidMount(){
		window.addEventListener("scroll", this.handleScroll);

		API.graphql({ query: listPosts, variables: { filter: {board_type: {eq: 2}} }})
		.then( res => {
			this.setState({ postlist_0: res.data.listPosts.items.sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length}) });
		})
		.catch( e => console.log(e));

		API.graphql({ query: listStyleTags, variables: { filter: {is_weekly: {eq: true}}}})
		.then( res => {
			for (let i = 0; i < 3; i++) {
				this.setState({ weekly_tag: [...this.state.weekly_tag, res.data.listStyleTags.items[i].value] });	
			}	
		})
		.catch( e => console.log(e));
		
	}

	componentWillUnmount(){
		window.removeEventListener("scroll", this.handleScroll);
	}
	
	handleWriteButton = (e) => {
		console.log(this.state.now_user);
		if (this.state.now_user == "noUser") {
		  alert("로그인이 필요합니다.");
		  return;
		}
		this.handle_write_page();
	};

	
	
	

	render(){
		console.log(this.state.weekly_tag);
		console.log(this.state.now_user);
		const posts = this.state.postlist_0;
		const best_posts = posts.slice(0,4);
		const ranking_posts = posts.slice(4);
	
        let {current_next_post_page, now_user, is_write_page, weekly_tag} = this.state;

		return (
			<div>
				<Header handle_user_info={this.handle_user_info}/>
				<WeeklyTagBody
					current_next_post_page={current_next_post_page}
					now_user={now_user}
					best_posts={best_posts}
					ranking_posts={ranking_posts}
					weekly_tag={weekly_tag}
				/>
			</div>
		
		)
    }

}

export default WeeklyTagPage;
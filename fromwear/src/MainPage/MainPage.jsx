import {Component} from 'react';
import './MainPage.css';
import BANNER from './img/Main.png'

import Header from '../Header/Header'
import FeedPage from '../FeedPage/FeedPage.jsx'
import Footer from '../Footer/Footer.jsx';

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { API } from 'aws-amplify';
import { listPosts } from '.././graphql/queries';

import { fontWeight } from '@mui/system';
import Box from '@mui/material/Box';
import BottomTab from '../BottomNavigation/BottomNavigation';
import MainPageBody from './MainPageBody';

let link = '';

let link_change = (item, now_user) => {
    item.user.id == now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.user.id
}

class MainPage extends Component {
	constructor() {
		super();

		this.state = {
			postlist_0: [],
			postlist_1: [],
			postlist_2: [],
			now_user:{},
		};
	}

	componentWillMount(){
		for (let i = 0; i < 3; i++) {
			this.getPosts(i);	
		}
	}

	handle_user_info = (user) => {
		
		this.setState({ now_user: user });
		
	}

	getPosts = (i) => {
		API.graphql({ query: listPosts, variables: { filter: {board_type: {eq: i}}  }})
		.then( res => {
			if(i==0) {
				this.setState({ postlist_0: res.data.listPosts.items });
				this.setState({ postlist_0: [...this.state.postlist_0, ...this.state.postlist_2].sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length})});
			}
			else if(i==1) this.setState({ postlist_1: res.data.listPosts.items.sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length}) });
			else if(i==2) {
				this.setState({ postlist_2: res.data.listPosts.items.sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length}) });
				this.setState({ postlist_0: [...this.state.postlist_0, ...this.state.postlist_2].sort(function(a,b){return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length})});
			}
		})
		.catch( e => console.log(e));
	}



	render(){

		const best_post_0 = this.state.postlist_0.slice(0,5);
		const best_post_1 = this.state.postlist_1.slice(0,5);
		const best_post_2 = this.state.postlist_2.slice(0,5);
		//<Box className = 'banner' sx={{width:'100%', height:'780px', backgroundColor:'#F2F2F2'}}>

		let {now_user} = this.state;
		
		return (
			<div>
				<Header handle_user_info={this.handle_user_info}/>
				<MainPageBody
					now_user={now_user}
					best_post_0={best_post_0}
					best_post_1={best_post_1}
					best_post_2={best_post_2}
				/>
			</div>
			
		)
	}

	
	
}

export default MainPage;
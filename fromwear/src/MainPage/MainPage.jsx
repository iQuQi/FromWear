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
		
		return <div id = 'main_page'>
			<Header handle_user_info={this.handle_user_info}/>
			<BottomTab />
			<div style={{width: '100%',backgroundColor: '#c0e0f6',}}>
			<div className='main_banner'>	
				<img className='banner_img' src={BANNER} alt='Main banner' style={{height:'650px',width:'1082px',position:'relative',top:'30px'}}/>

				<div className = 'banner_title'>
					<p style={{fontSize: '5em', fontWeight: 'bold', marginBottom:'20px', color:'#FFFFFF', textShadow:'3px 3px 3px black'}}>FROMWEAR</p>
					<p style={{fontSize: '2em', fontWeight:'bolder'}}>옷으로 시작되는 하루</p>
				</div>

				<div className = 'banner_title' style={{top: '450px'}}>
					<p style={{fontSize: '1.3em', margin: '10px 0px'}}>착장 공유부터 스타일 조언까지,</p>
					<p style={{fontSize: '1.3em', margin: '10px 0px'}}>프롬웨어와 함께 당신의 하루를 시작해요.</p>
				</div>
				
				
			</div>
			</div>

			<div className='contents'>
				<div id = 'today_post' className = 'main_collection'>
					<h2 className = 'main_title'>오늘의 착장</h2>
					<a className = 'main_seemore' href='/todayboard'>둘러보기</a>
					
					<ImageList cols={5} gap={8} style={{clear: 'left'}}>
						{best_post_0.map((item) => (
							<ImageListItem key={item.img} >		
								<a className='dimmed' href={'/post/'+item.id}> 
									<img style={{borderRadius:16, width:'209.6px', height:'322.55px'}}
										src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format`}
										srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
										alt={item.id}
										loading="lazy"
									/>
									<span className='dimmed_layer'>	</span>
								</a>

								<Stack direction="row" spacing={0} justifyContent="space-between">
									{link_change(item, now_user)}
									<div>
										<div className='innerdiv'>
											<a href = {link}>
												<img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
												style={{borderRadius:"50%",margin: '7px 5px 7px 3px', width:'20px', height:'20px'}}/>
											</a>
											<a href = {link}>
												<p className='user_name' style={{margin: '9px 0px'}}>{item.user.name}</p>
											</a>
										</div>
									</div>
									<div>
										<div className='innerdiv_margin'>
											<p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
											<FavoriteBorderIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
										</div>
									</div>
								</Stack>				
							</ImageListItem>
						))}
					</ImageList>
				
				</div>

				<div id = 'help_post' className = 'main_collection'>
					<h2 className = 'main_title'>도움이 필요해</h2>
					<a className = 'main_seemore' href='/sosboard'>둘러보기</a>

					<ImageList cols={5} gap={8}>
						{best_post_1.map((item) => (
							<ImageListItem key={item.img}>
								<a className='dimmed' href={'/post/'+item.id}> 
									<img style={{borderRadius:16, width:'209.6px', height:'322.55px' }}
										src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format`}
										srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
										alt={item.id}
										loading="lazy"
									/>
									<span className='dimmed_layer'>	</span>
								</a>

								<Stack direction="row" spacing={0} justifyContent="space-between">
									{link_change(item, now_user)}
									<div>
										<div className='innerdiv'>
											{
												item.blind? <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+'profile_skyblue.jpg'} 
												style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
												: 
												<a href = {link}>
													<img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
													style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
												</a>
											}
											
											{
												item.blind? <p className='user_name' style={{margin: '8px 0px'}}>익명</p>
												: 
												<a href = {link} >
													<p className='user_name' style={{margin: '8px 0px'}}>{item.user.name}</p>
												</a>
											}
										</div>
									</div>	
									<div>
										<div className='innerdiv_margin'>
											<p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
											<MoodBadIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
										</div>
									</div>
									
								</Stack>				
							</ImageListItem>
						))}
					</ImageList>
				</div>

				<div id = 'weekly_best' className = 'main_collection'>
					<h2 className = 'main_title'>이번주 태그 랭킹</h2>
					<a className = 'main_seemore' href='/weeklytag'>둘러보기</a>
					
					<ImageList cols={5} gap={8}>
						{best_post_2.map((item) => (
							<ImageListItem key={item.img}>
								<a className='dimmed' href={'/post/'+item.id}> 
									<img style={{borderRadius:16, width:'209.6px', height:'322.55px'}}
										src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format`}
										srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
										alt={item.user}
										loading="lazy"
									/>
									<span className='dimmed_layer'>	</span>
								</a>

								<Stack direction="row" spacing={0} justifyContent="space-between">
									{link_change(item, now_user)}
									<div>
										<div className='innerdiv'>
											<a href = {link}>
												<img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
												style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
											</a>
											<a href = {link}>
												<p className='user_name' style={{margin: '8px 0px'}}>{item.user.name}</p>
											</a>
										</div>
									</div>
									<div>
										<div className='innerdiv_margin'>
											<p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
											<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
										</div>
									</div>
									
								</Stack>			
							</ImageListItem>
						))}
					</ImageList>
				</div>
			</div>
			
			<Footer/>
		</div>
	}

	
	
}

export default MainPage;
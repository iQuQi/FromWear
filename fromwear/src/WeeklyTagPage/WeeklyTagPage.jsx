import {Component} from 'react';
import './WeeklyTagPage.css';
import PROFILE from './img/profile.png'

import Header from '../Header/Header'

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import {API} from 'aws-amplify';
import {listPosts} from '../graphql/queries.js';
import {listStyleTags} from '../graphql/queries';

import Footer from '../Footer/Footer.jsx';
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
	
	
	
	

	render(){
		console.log(this.state.weekly_tag);
		const posts = this.state.postlist_0;
		const best_posts = posts.slice(0,4);
		const ranking_posts = posts.slice(4);
	
        let {current_next_post_page} = this.state;

		return <div id = 'main_page'>
			<Header/>
			<div className = 'banner'>
                <div className = 'banner_text'>
                    <h1 style={{margin:'50px 0px 0px 0px', fontSize:'4em', lineHeight:'2em'}}>이번주 태그&nbsp;<span style={{fontSize:'0.9em', color:'#FFFFFF', textShadow:'3px 3px 3px black'}}>TOP4</span></h1>
                    <h1 style={{fontSize:'1.5em'}}>매주 바뀌는 태그에 맞춰서 <u>#이번주태그</u> 를 걸고 좋아요 랭킹에 도전하자!</h1>
					<h1 style={{fontSize:'1.7em', fontWeight:'bolder', color:'rgb(82 89 178)'}}>#{this.state.weekly_tag[0]} &nbsp;#{this.state.weekly_tag[1]}</h1>		
					
				</div>

                <div className = 'banner_bestpost'>
				
						<Stack direction="row" spacing={1} justifyContent="center" style={{width:'1200px', margin:'auto'}}>
							{best_posts.map((item) => 
								
								(<ImageListItem key={item.img} className='weekly_image_list_item'>
									<img className='banner_bestpost_photo' style={{width:'250px', height:'350px', borderRadius:16}}
											src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format`}
											srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
											alt={item.id}
											loading="lazy"
									/>
									
									<a href={'/post/'+item.id}>  
										<span className='dimmed_layer'>	</span>
									</a>
									
									<Stack direction="row" spacing={0} justifyContent="space-between" style={{width:'250px'}}>
									
										<div>
											<div className='innerdiv'>
												<img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
												style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
												<p style={{margin: '16px 0px'}}>{item.user.name}</p>
											</div>
										</div>
										<div>
											<div className='innerdiv_margin'>
												<p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
												<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
											</div>
										</div>
									</Stack>				
								</ImageListItem>)
								
								)}
						</Stack>
				
                </div>
			</div>

			<div id = 'today_post' class = 'collection'>
				{/*<h3 className = 'title'>랭킹 5위~</h3>*/}
				<br></br>
				
				<ImageList cols={5} gap={8} style={{clear: 'left'}}>
					{ranking_posts.map((item, index) => (
						index<(current_next_post_page * 25)?
						<ImageListItem key={item.img} className='weekly_image_list_item'>
							<img style={{height:'322.55px', borderRadius:16}}
								src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format`}
								srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
							/>
							
							<a href={'/post/'+item.id}>  
								<span className='dimmed_layer'>	</span>
							</a>

							<Stack direction="row" spacing={0} justifyContent="space-between">
								<img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img}
								 style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
								<p style={{margin: '16px 0px'}}>{item.user.name}</p>
								<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
								<p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
								<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
							</Stack>				
						</ImageListItem>
						: console.log(index + "pass")
					))}
				</ImageList>
			
			</div>

			<Footer/>
        </div>       
    }

}

export default WeeklyTagPage;
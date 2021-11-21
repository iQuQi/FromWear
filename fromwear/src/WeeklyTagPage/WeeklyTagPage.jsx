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
import {listTagLists, listStyleTags} from '../graphql/queries';

class WeeklyTagPage extends Component {

    constructor() {
		super();

		this.state = {
			postlist_0: [],
			postlist_1: [],
			postlist_2: [],
			weekly_tag_id: [],
			weekly_tag: []
		};
	}



	componentDidMount(){
		
		API.graphql({ query: listPosts, variables: { filter: {board_type: {eq: 2}} }})
		.then( res => {
			this.setState({ postlist_0: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num}) });
		})
		.catch( e => console.log(e));

		API.graphql({ query: listTagLists})
		.then( res => {
			this.setState({ weekly_tag_id: res.data.listTagLists.items[0].week_tag_list });
			this.setState({ weekly_tag_id: this.state.weekly_tag_id.slice(1)})
			console.log(this.state.weekly_tag_id)	
		})
		.then( res => {
			for (let i = 0; i < 3; i++) {
				this.getWeeklyTag(i);	
			}	
		})
		.catch( e => console.log(e));
		
		
		
	}

	getWeeklyTag = (i) => {
		API.graphql({ query: listStyleTags, variables: { filter: {id: {eq: this.state.weekly_tag_id[i]}} }})
		.then( res => {
			this.setState({ weekly_tag: [...this.state.weekly_tag, res.data.listStyleTags.items[0].value] });
			console.log(this.state.weekly_tag)
		})
		.catch( e => console.log(e));
	};
	
	
	
	
	

	render(){
		const posts = this.state.postlist_0;
		const best_posts = posts.slice(0,4);
		const ranking_posts = posts.slice(4);
	
       
		return <div id = 'main_page'>
			<Header/>
			<div className = 'banner'>
                <div className = 'banner_text'>
                    <h1 style={{margin:'50px 0px 0px 0px', fontSize:'4em', lineHeight:'2em'}}>이번주 태그</h1>
                    <h1 style={{fontSize:'1.5em'}}>매주 바뀌는 태그에 맞춰서 <u>#이번주태그</u> 를 걸고 랭킹에 도전하자!</h1>
					<h1 style={{fontSize:'1.7em', fontWeight:'bolder', color:'#CC3D3D'}}>#{this.state.weekly_tag[0]} &nbsp;#{this.state.weekly_tag[1]}</h1>		
                </div>

                <div className = 'banner_bestpost'>
				
						<Stack direction="row" spacing={1} justifyContent="center" style={{width:'1200px', margin:'auto'}}>
							{best_posts.map((item) => 
								
								(<ImageListItem key={item.img} className='weekly_image_list_item'>
									<img className='banner_bestpost_photo' style={{width:'250px', height:'350px', borderRadius:16}}
											src={`${item.img}?w=248&fit=crop&auto=format`}
											srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
											alt={item.id}
											loading="lazy"
									/>
									
									<a href='/post'> 
										<span className='dimmed_layer'>	</span>
									</a>
									
									<Stack direction="row" spacing={0} justifyContent="space-between" style={{width:'250px'}}>
										<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
										
										<p style={{margin: '16px 0px'}}>{item.user.name}</p>
										<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
										<p style={{margin: '16px 0px'}}>{item.like_user_num}</p>
										<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
									</Stack>				
								</ImageListItem>)
								
								)}
						</Stack>
				
                </div>
			</div>

			<div id = 'today_post' class = 'collection'>
				<h3 className = 'title'>이번주 태그 랭킹</h3>
				
				<ImageList cols={5} gap={8} style={{clear: 'left'}}>
					{ranking_posts.map((item) => (
						<ImageListItem key={item.img} className='weekly_image_list_item'>
							<img style={{height:'322.55px', borderRadius:16}}
								src={`${item.img}?w=248&fit=crop&auto=format`}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
							/>
							
							<a href='/post'> 
								<span className='dimmed_layer'>	</span>
							</a>

							<Stack direction="row" spacing={0} justifyContent="space-between">
								<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
								<p style={{margin: '16px 0px'}}>{item.user.name}</p>
								<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
								<p style={{margin: '16px 0px'}}>{item.like_user_num}</p>
								<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
							</Stack>				
						</ImageListItem>
					))}
				</ImageList>
			
			</div>


        </div>       
    }

}

export default WeeklyTagPage;
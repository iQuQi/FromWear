import {Component} from 'react';
import PROFILE from './img/profile.png'

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';


import Header from '../Header/Header';

import './CSS/PostBoard.css';
import './CSS/todayPostList.css';

import wear1 from './image/wear1.png';
import wear2 from './image/wear2.png';
import wear3 from './image/wear3.png';
import wear4 from './image/wear4.png';
import { Container } from '@mui/material';

import { API } from 'aws-amplify';
import { getPost } from '../graphql/queries.js';

class TodayPostBoard extends Component { 

	/*constructor() {
		super();
	}*/
	
	render() {
        const bestItem = [
            {
                img: wear1,
                user: 'Breakfast',
                like: '1005',
            },
            {
                img: wear2,
                user: 'Breakfast',
                like: '1005',
            },
            {
                img: wear3,
                user: 'Breakfast',
                like: '1005',
            },
            {
                img: wear4,
                user: 'Breakfast',
                like: '1005',
            },
        ];

        const itemData = [
			{
			  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
			  user: 'Breakfast',
			  like: '1005',
			},
		];
	}

	render () {
		return ( <section className="wrap">
			<Header />
			API.graphql({
				query:getPost, variables:{id: "post1 아이디"}})
			.then(res=>console.log(res))
			.catch(e=>console.log(e));
			<div className="today_background_wrap">
				<article className="today_wear">
					<h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p>
					<div className="rank_list">
						<IconButton className="left arrow">
							<ChevronLeftIcon />
						</IconButton>
						<img className="rank4 rank_form3" src={ require('./img/model_img.jpg').default } alt="model"></img>
						<img className="rank5 rank_form2" src={ require('./img/model_img.jpg').default } alt="model"></img>
						<img className="rank1 rank_form1" src={ require('./img/model_img.jpg').default } alt="model"></img>
						<img className="rank2 rank_form2" src={ require('./img/model_img.jpg').default } alt="model"></img>
						<img className="rank3 rank_form3" src={ require('./img/model_img.jpg').default } alt="model"></img>
						<IconButton className="right arrow">
							<ChevronRightIcon />
						</IconButton>
					</div>
				</article>
			</div>
			<article className="wrap_recommend">
				<div className="sort_font select_sort">
					<input type="radio" id="sort_like" name="sort" checked></input>
					<label for="sort_like">좋아요순</label>
					<input type="radio" id="sort_view" name="sort"></input>
					<label for="sort_view">조회수순</label>
					<input type="radio" id="sort_reply" name="sort"></input>
					<label for="sort_reply">댓글순</label>
					<input type="radio" id="sort_latest" name="sort"></input>
					<label for="sort_latest">최신순</label>
				</div>
				<div id = 'today_post' className = 'collection'>
					<ImageList cols={5} gap={8} style={{clear: 'left'}}>
						{itemData.map((item) => (
							<ImageListItem key={item.img} className='today_image_list_item'>
								<img style={{borderRadius:16}}
									src={`${item.img}?w=248&fit=crop&auto=format`}
									srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.user}
									loading="lazy"
								/>
								
								<span className='dimmed_layer'>	</span>

								<Stack direction="row" spacing={0} justifyContent="flex-end">
									<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
									<p>&nbsp;</p>
									<p style={{margin: '16px 0px'}}>{item.user}</p>
									<p>&emsp;&emsp;&emsp;</p>
									<p style={{margin: '16px 0px'}}>{item.like}</p>
									<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
								</Stack>				
							</ImageListItem>
						))}
					</ImageList>
				</div>
			</article>
		</section> )
	}
}

export default TodayPostBoard;

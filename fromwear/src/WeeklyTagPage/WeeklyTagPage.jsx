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

import wear1 from './image/wear1.png';
import wear2 from './image/wear2.png';
import wear3 from './image/wear3.png';
import wear4 from './image/wear4.png';
import wear5 from './image/wear5.png';
import wear6 from './image/wear6.png';
import wear7 from './image/wear7.png';
import wear8 from './image/wear8.png';
import wear9 from './image/wear9.png';
import wear10 from './image/wear10.png';
import wear11 from './image/wear11.png';
import { Container } from '@mui/material';


class WeeklyTagPage extends Component {

    /*constructor() {
		super();
	}*/
	
	render(){
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
        ]

        const itemData = [
			{
			img: wear5,
			user: 'Breakfast',
			like: '1005',
			},
			{
				img: wear6,
				user: 'Breakfast',
				like: '1005',
			},
			{
				img:wear7,
				user: 'Breakfast',
				like: '1005',
			},
			{
				img: wear8,
				user: 'Breakfast',
				like: '1005',
			},
			{
				img: wear9,
				user: 'Breakfast',
				like: '1005',
			},
			{
				img: wear10,
				user: 'Breakfast',
				like: '1005',
			},
			{
				img: wear11,
				user: 'Breakfast',
				like: '1005',
			},
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

		return <div id = 'main_page'>
			<Header/>
			<div className = 'banner'>
                <div className = 'banner_text'>
                    <h1 style={{margin:'65px 0px 0px 0px', fontSize:'4em', lineHeight:'1.2em'}}>이번주 태그</h1>
                    <h1 style={{fontSize:'1.5em'}}>매주 바뀌는 태그에 맞춰서 <u>#이번주태그</u> 를 걸고 랭킹에 도전하자!</h1>
                    <h1 style={{fontSize:'1.8em', fontWeight:'bolder', color:'orange'}}>#빨간색 #원피스</h1>
                </div>

                <div className = 'banner_bestpost'>
				
						<Stack direction="row" spacing={1} justifyContent="center" style={{width:'1200px', margin:'auto'}}>
							{bestItem.map((item) => (
								<ImageListItem key={item.img} className='weekly_image_list_item'>
									<img className='banner_bestpost_photo' style={{width:'250px', height:'350px', borderRadius:16}}
											src={`${item.img}?w=248&fit=crop&auto=format`}
											srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
											alt={item.user}
											loading="lazy"
									/>
									
									<a href='/post'> 
										<span className='dimmed_layer'>	</span>
									</a>
									
									<Stack direction="row" spacing={0} justifyContent="center" style={{width:'250px'}}>
										<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
										<p>&nbsp;</p>
										<p style={{margin: '16px 0px'}}>{item.user}</p>
										<p>&emsp;&emsp;&emsp;&emsp;&emsp;</p>
										<p style={{margin: '16px 0px'}}>{item.like}</p>
										<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
									</Stack>				
								</ImageListItem>
							))}
						</Stack>
				
                </div>
			</div>

			<div id = 'today_post' class = 'collection'>
				<h3 className = 'title'>이번주 태그 랭킹</h3>
				
				<ImageList cols={5} gap={8} style={{clear: 'left'}}>
					{itemData.map((item) => (
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


        </div>       
    }

}

export default WeeklyTagPage;

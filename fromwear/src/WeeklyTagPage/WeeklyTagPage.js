import {Component} from 'react';
import './WeeklyTagPage.css';
import PROFILE from '../img/profile.png'

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

		return <div id = 'main_page'>
			<Header/>
			<div className = 'banner'>
                <div className = 'banner_text'>
                    <h1 style={{fontSize:'4em', lineHeight:'2em'}}>이번주 태그</h1>
                    <h1 style={{fontSize:'1.5em'}}>매주 바뀌는 태그에 맞춰서 #이번주태그 를 걸고 랭킹에 도전하자!</h1>
                    <h1 style={{fontSize:'1.8em', fontWeight:'bolder', color:'orange'}}>#빨간색 #원피스</h1>
                </div>

                <div className = 'banner_bestpost'>
				
						<Stack direction="row" spacing={1} justifyContent="center" style={{width:'1200px', margin:'auto'}}>
							{bestItem.map((item) => (
								<ImageListItem key={item.img} className='image_list_item'>
									<img className='banner_bestpost_photo' style={{width:'250px', height:'350px', borderRadius:16}}
											src={`${item.img}?w=248&fit=crop&auto=format`}
											srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
											alt={item.user}
											loading="lazy"
									/>
									
									<span className='dimmed_layer'>	</span>

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
				<h3 className = 'title'>오늘의 착장</h3>
				<a className = 'seemore' href=''>둘러보기</a>
				
				<ImageList cols={5} gap={8} style={{clear: 'left'}}>
					{itemData.map((item) => (
						<ImageListItem key={item.img} className='image_list_item'>
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


        </div>       
    }

}

export default WeeklyTagPage;
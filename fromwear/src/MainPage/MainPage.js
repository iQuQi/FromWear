import {Component} from 'react';
import './MainPage.css';
import BANNER from '../img/Main_banner.png'
import PROFILE from '../img/profile.png'

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { borderRadius } from '@mui/system';

import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

class MainPage extends Component {
	/*constructor() {
		super();
	}*/
	
	render(){
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
			<div className = 'banner'>
				<img src = {BANNER} alt = 'Main Banner'/>
			</div>

			<div className = 'today_post'>
				<h3 sx={{color: 'text.primary'}}>오늘의 착장</h3>
				
				<ImageList cols={5} gap={8}>
					{itemData.map((item) => (
						<ImageListItem key={item.img}>
							<img style={{borderRadius:16 }}
								src={`${item.img}?w=248&fit=crop&auto=format`}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
							/>
							<Stack direction="row" spacing={0} justifyContent="flex-end">
								<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
								<p>&nbsp;</p>
								<p>{item.user}</p>
								<p>&emsp;&emsp;&emsp;</p>
								<p>{item.like}</p>
								<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
							</Stack>				
						</ImageListItem>
					))}
				</ImageList>
			
			</div>

			<div className = 'help_post'>
				<h3 sx={{color: 'text.primary'}}>도움이 필요해</h3>
				
				<ImageList cols={5} gap={8}>
					{itemData.map((item) => (
						<ImageListItem key={item.img}>
							<img style={{borderRadius:16 }}
								src={`${item.img}?w=248&fit=crop&auto=format`}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
							/>
							<Stack direction="row" spacing={0} justifyContent="flex-end">
								<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
								<p>&nbsp;</p>
								<p>{item.user}</p>
								<p>&emsp;&emsp;&emsp;</p>
								<p>{item.like}</p>
								<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
							</Stack>				
						</ImageListItem>
					))}
				</ImageList>
			</div>

			<div className = 'weekly_best'>
				<h3 sx={{color: 'text.primary'}}>이번주 태그 랭킹</h3>
				
				<ImageList cols={5} gap={8}>
					{itemData.map((item) => (
						<ImageListItem key={item.img}>
							<img style={{borderRadius:16 }}
								src={`${item.img}?w=248&fit=crop&auto=format`}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
							/>
							<Stack direction="row" spacing={0} justifyContent="flex-end">
								<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
								<p>&nbsp;</p>
								<p>{item.user}</p>
								<p>&emsp;&emsp;&emsp;</p>
								<p>{item.like}</p>
								<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
							</Stack>				
						</ImageListItem>
					))}
				</ImageList>
			</div>
			

		</div>
	}

	
	
}

export default MainPage;


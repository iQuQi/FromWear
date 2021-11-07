import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';

import './CSS/PostBoard.css';
import './CSS/ImgList.css';
import PROFILE from './img/profile.png'

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


let TodayPostBoard = () =>	<section className="wrap">
	<div className="today_background_wrap">
		<article className="today_wear">
			<h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p>
			<div className="rank_list">
				<IconButton className="left arrow">
					<ChevronLeftIcon />
				</IconButton>
				<img className="rank4 rank_form3" src={ require('./img/model_img.jpg').default } alt="model"></img>
				<img className="rank2 rank_form2" src={ require('./img/model_img.jpg').default } alt="model"></img>
				<img className="rank1 rank_form1" src={ require('./img/model_img.jpg').default } alt="model"></img>
				<img className="rank3 rank_form2" src={ require('./img/model_img.jpg').default } alt="model"></img>
				<img className="rank5 rank_form3" src={ require('./img/model_img.jpg').default } alt="model"></img>
				<IconButton className="right arrow">
					<ChevronRightIcon />
				</IconButton>
			</div>
		</article>
	</div>
	<article className="img_list_wrap">
		<div className = 'today_post'>
			<ImageList cols={5} gap={8} style={{clear: 'left'}}>
				{itemData.map((item) => (
					<ImageListItem key={item.img}>
						<img style={{borderRadius:16}}
							src={`${item.img}?w=248&fit=crop&auto=format`}
							srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
							alt={item.user}
							loading="lazy"
						/>
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
	</section>


export default TodayPostBoard;

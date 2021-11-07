import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './CSS/PostBoard.css';

let img_width = 180, img_height = 270;

let TodayPostBoard = () =>	<section className="wrap">
	<div className="today_background_wrap">
		<article className="today_wear">
			<h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p>
			<div className="rank_list">
				<IconButton className="left arrow">
					<ChevronLeftIcon />
				</IconButton>
				<img className="rank4 rank_form3" src={ require('./img/model_img.jpg').default } width={img_width} height={img_height} alt="model"></img>
				<img className="rank2 rank_form2" src={ require('./img/model_img.jpg').default } width={img_width} height={img_height} alt="model"></img>
				<img className="rank1 rank_form1" src={ require('./img/model_img.jpg').default } width={img_width} height={img_height} alt="model"></img>
				<img className="rank3 rank_form2" src={ require('./img/model_img.jpg').default } width={img_width} height={img_height} alt="model"></img>
				<img className="rank5 rank_form3" src={ require('./img/model_img.jpg').default } width={img_width} height={img_height} alt="model"></img>
				<IconButton className="right arrow">
					<ChevronRightIcon />
				</IconButton>
				</div>
			</article>
		</div>
	</section>


export default TodayPostBoard;

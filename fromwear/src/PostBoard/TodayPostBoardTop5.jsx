import React, { Component } from 'react';
import Slider from 'react-slick';

export default class TodayPostBoardTop5 extends Component {
    render() {
		const settings = {
			className: "center",
			centerMode: true,
			infinite: true,
			slidesToShow: 5,

            centerPadding: "0px",
			speed: 500,
		};
		return (
			<div className="container">
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
				<style>{cssstyle}</style>
                <p>center</p>
				<Slider {...settings}>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1551963831-b3b1ca40c98e')"}}></img>
					</div>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1551782450-a2132b4ba21d')"}}></img>
					</div>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1522770179533-24471fcdba45')"}}></img>
					</div>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c')"}}></img>
					</div>
                    <div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1533827432537-70133748f5c8')"}}></img>
					</div>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1551963831-b3b1ca40c98e')"}}></img>
					</div>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1551782450-a2132b4ba21d')"}}></img>
					</div>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1522770179533-24471fcdba45')"}}></img>
					</div>
					<div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c')"}}></img>
					</div>
                    <div className="div_test">
                        <img style={{backgroundImage: "URL('https://images.unsplash.com/photo-1533827432537-70133748f5c8')"}}></img>
					</div>
				</Slider>
			</div>
		);
	}
}

const cssstyle = `
.container{
  margin: 0 auto;
  padding: 100px 0;
  width: 1000px;
}
.container .div_test {
    margin-left: -60px;
}

img {
    width:200px;
    height:322.55px;
    margin: 30px;
    position: relative;
    text-align: center;
    background-size: cover;
    background-position: center center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}

.center .slick-center img {
    z-index: 10;
    opacity: 1;
    -ms-transform: scale(1.5);
    transform: scale(1.5);
}
.center img {
    transition: all .3s ease;
}
`

/*
import React, { Component } from 'react';
import Slider from 'react-slick';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import './CSS/TodayPostBoardTop5.css'
import { render } from '@testing-library/react';

class TodayPostBoardTop5 extends Component {
    render() {
        const settings = {
			className: "center",
			centerMode: true,
			infinite: true,
			centerPadding: "60px",
			slidesToShow: 3,
			speed: 500
		};
		return (
			<div className="container">
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
				<h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p>
				<Slider {...settings}>
					<div>
                        <img src={ require('./img/model_img.jpg').default } alt="model"></img>
					</div>
					<div>
                        <img src={ require('./img/model_img.jpg').default } alt="model"></img>
					</div>
					<div>
                        <img src={ require('./img/model_img.jpg').default } alt="model"></img>
					</div>
					<div>
                        <img src={ require('./img/model_img.jpg').default } alt="model"></img>
					</div>
					<div>
                        <img src={ require('./img/model_img.jpg').default } alt="model"></img>
					</div>
					<div>
                        <img src={ require('./img/model_img.jpg').default } alt="model"></img>
					</div>
				</Slider>
			</div>
		);
	}
}*/


    /*{    return (
    <div className="today_background_wrap">
        <article className="today_wear">
            <h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p>
            <div className="rank_list">
                <IconButton className="left arrow">
                    <ChevronLeftIcon />
                </IconButton>
                <img className="rank4" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank5" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank1" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank2" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank3" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <IconButton className="right arrow">
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </article>
    </div>
    )}


export default TodayPostBoardTop5;*/
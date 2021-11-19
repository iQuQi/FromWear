import React, { Component } from 'react';
import Slider from 'react-slick';

import './CSS/TodayPostBoardTop5.css'

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
            <div className="today_background_wrap">
                <article className="today_wear">
                    <h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p>
                    <div className="container">
                        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
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
                </article>
            </div>
		);
	}
}

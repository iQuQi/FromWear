import React, { Component } from 'react';
import Slider from 'react-slick';

import './CSS/TodayPostBoardTop5.css'

import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';

export default class TodayPostBoardTop5 extends Component {

    constructor() {
        super();
        this.state = {
            post_top_list:[],
            post_top: ["https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
                "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
                "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
                "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
                "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            ],
        };
    }

    componentDidMount() {
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {eq: 0}} }})
			.then(res => this.setState({
                post_top_list: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num})
            }))
			.catch(e => console.log(e));
	}


    render() {
        let {post_top_list, post_top} = this.state;
        console.log(post_top_list[0]);
        

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
                            {post_top.map((url, index) => (
                                    <div className="div_test">
                                        <img style={{backgroundImage: `URL(${url})`}}></img>
                                    </div>
                            ))}
                            {post_top.map((url, index) => (
                                    <div className="div_test">
                                        <img style={{backgroundImage: `URL(${url})`}}></img>
                                    </div>
                            ))}
                        </Slider>
                    </div>
                </article>
            </div>
		);
	}
}

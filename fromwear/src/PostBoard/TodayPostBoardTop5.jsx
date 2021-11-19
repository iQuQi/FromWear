import React, { Component } from 'react';
import Slider from 'react-slick';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
            user_name: ["name1", "name2", "name3", "name4", "name5"],
            user_profile_img: ["https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            ],
            like_user_num: ["500", "400", "300", "200", "100"],
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
        let {post_top_list} = this.state;
        let {post_top, user_name, user_profile_img, like_user_num} = this.state;
        console.log(post_top_list[0]);
        

		const settings = {
			className: "center",
			centerMode: true,
			infinite: true,
			slidesToShow: 5,

            centerPadding: "0px",
			speed: 700,
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
                                        <a href="/post">
                                            <span className={"dimmed_layer"}>
                                                <span className="dimmed_info_writer">
                                                    <img src={user_profile_img[index]} alt="프로필" 
                                                        style={{width:"30px",height:"30px",borderRadius:"50%", 
                                                        position: "relative",top:"10px", left:"5px", marginLeft:"5px"}}/>
                                                    {user_name[index]}
                                                </span>
                                                <span className="dimmed_info_like">
                                                    {like_user_num[index]}<FavoriteIcon style={{fontSize: 20,position:"relative",top:5, marginLeft:5}}/>
                                                </span>
                                            </span>
									    </a>
                                    </div>
                            ))}
                            {post_top.map((url, index) => (
                                    <div className="div_test">
                                        <img style={{backgroundImage: `URL(${url})`}}></img>
                                        <a href="/post">
                                            <span className={"dimmed_layer"}>
                                                <span className="dimmed_info_writer">
                                                    <img src={user_profile_img[index]} alt="프로필" 
                                                        style={{width:"30px",height:"30px",borderRadius:"50%", 
                                                        position: "relative",top:"10px", left:"5px", marginLeft:"5px"}}/>
                                                    {user_name[index]}
                                                </span>
                                                <span className="dimmed_info_like">
                                                    {like_user_num[index]}<FavoriteIcon style={{fontSize: 20,position:"relative",top:5, marginLeft:5}}/>
                                                </span>
                                            </span>
									    </a>
                                    </div>
                            ))}
                        </Slider>
                    </div>
                </article>
            </div>
		);
	}
}

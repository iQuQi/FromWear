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
            post_top_list : [
                {
                    img: "",
                    like_user_num: "",
                    user : {
                        id: "",
                        profile_img: "",
                    },
                },
            ],
        };
    }

    componentWillMount() {
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {eq: 0}}}})
			.then(res => this.setState({
                post_top_list: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num}).slice(0, 5)
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
                            {post_top_list.map((post, index) => (
                                    <div className="div_test">
                                        <img style={{backgroundImage: `URL(${post.img})`}}></img>
                                        <a href="/post">
                                            <span className={"dimmed_layer"}>
                                                <span className="dimmed_info_writer">
                                                    <img src={post.user.profile_img} alt="프로필" 
                                                        style={{width:"30px",height:"30px",borderRadius:"50%", 
                                                        position: "relative",top:"10px", left:"3px", marginLeft:"5px"}}/>
                                                    {post.user.id}
                                                </span>
                                                <span className="dimmed_info_like">
                                                    {post.like_user_num}<FavoriteIcon style={{fontSize: 20,position:"relative",top:5, marginLeft:5}}/>
                                                </span>
                                            </span>
									    </a>
                                    </div>
                            ))}
                            {post_top_list.map((post, index) => (
                                    <div className="div_test">
                                        <img style={{backgroundImage: `URL(${post.img})`}}></img>
                                        <a href="/post">
                                            <span className={"dimmed_layer"}>
                                                <span className="dimmed_info_writer">
                                                    <img src={post.user.profile_img} alt="프로필" 
                                                        style={{width:"30px",height:"30px",borderRadius:"50%", 
                                                        position: "relative",top:"10px", left:"3px", marginLeft:"5px"}}/>
                                                    {post.user.id}
                                                </span>
                                                <span className="dimmed_info_like">
                                                    {post.like_user_num}<FavoriteIcon style={{fontSize: 20,position:"relative",top:5, marginLeft:5}}/>
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

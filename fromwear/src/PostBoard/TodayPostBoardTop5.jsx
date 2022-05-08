import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import MoodBadIcon from '@mui/icons-material/MoodBad';

import AcUnitIcon from "@mui/icons-material/AcUnit";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

import defaultImg from '../PostView/Imgs/profile_skyblue.jpg';

import './CSS/TodayPostBoardTop5.css'

import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';
import { ConsoleLogger } from '@aws-amplify/core';

/*
post_top_list : [
    {
        id: "",
        img: "",
        like_user_num: "",
        user : {
            name: "",
            profile_img: "",
        },
    },
]
*/

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'border',
    height: '20px',
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
}));
  

export default class TodayPostBoardTop5 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post_top_list : [],
            board_type: props.board_type,
        };
    }

    componentDidMount() {
        let today = new Date();
        today.setDate(today.getDate());

        let sort_function = (a, b) => {
            return b.like_urgent_user_list.items.length-a.like_urgent_user_list.items.length;
        }

        if(this.state.board_type == 0) {
            API.graphql({ 
                query: listPosts, 
                variables: { filter: {board_type: {ne: 1}}}})
                .then(res => {
                    let posts = res.data.listPosts.items.filter((post)=>{
                        //날짜 필터링
                        let basis = new Date();
                        var base_y = basis.getFullYear();
                        var base_m = basis.getMonth()+1;
                        var base_d = basis.getDate();
                        var today_y = new Date(post.createdAt).getFullYear();
                        var today_m = new Date(post.createdAt).getMonth()+1;
                        var today_d = new Date(post.createdAt).getDate();

                        if(!(base_y==today_y && base_m ==today_m && base_d ==today_d)){
                            return false;
                        }
                        return true;
                    })
                    this.setState({
                        post_list : posts.sort(sort_function).slice(0, 5)
                    })
                })
                .catch(e => console.log(e));
            if(this.state.post_top_list.length < 5) {
                API.graphql({ 
                    query: listPosts,
                    variables: { filter: {board_type: {ne: 1}}}})
                    .then(res => this.setState({
                        post_top_list: res.data.listPosts.items
                        .sort(sort_function).slice(0, 5)
                    }))
                    .catch(e => console.log(e));

            }
        }
        else {
            API.graphql({ 
                query: listPosts, 
                variables: { filter: {board_type: {eq: 1}, createdAt: {ge: today}}}})
                .then(res => {
                    let posts = res.data.listPosts.items.filter((post)=>{
                        //날짜 필터링
                        let basis = new Date();
                        var base_y = basis.getFullYear();
                        var base_m = basis.getMonth()+1;
                        var base_d = basis.getDate();
                        var today_y = new Date(post.createdAt).getFullYear();
                        var today_m = new Date(post.createdAt).getMonth()+1;
                        var today_d = new Date(post.createdAt).getDate();

                        if(!(base_y==today_y && base_m ==today_m && base_d ==today_d)){
                            return false;
                        }
                        return true;
                    })
                    this.setState({
                        post_list : posts.sort(sort_function).slice(0, 5)
                    })
                })
                .catch(e => console.log(e));
            if(this.state.post_top_list.length < 5) {
                API.graphql({ 
                    query: listPosts, 
                    variables: { filter: {board_type: {eq: 1}}}})
                    .then(res => this.setState({
                        post_top_list: res.data.listPosts.items.sort(sort_function).slice(0, 5)
                    }))
                    .catch(e => console.log(e));
            }
        }
	}

    render() {
        let {post_top_list, board_type} = this.state;
        let { isMobile } = this.props;

		const settings = {
      className: "center",
      centerMode: true,
      slidesToShow: isMobile? 3:5,
      beforeChange: this.handle_slider_index_before,
      centerPadding: "0px",
      speed: 700,
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
    };
        
		return (
      <div className="today_background_wrap" style={{...(isMobile &&
              {height: '330px', position:'relative',top: '90px'})}}>
        <article className={isMobile? 'today_wear_mobile today_wear' : "today_wear"}
                 style={{...(isMobile && {width: '390px'})}}>
          {board_type == 0 ? (
            <div>
                {!isMobile &&
                    <>
                        <AcUnitIcon
                            style={{
                                fontSize: "6vmin",
                                color: "rgb(3, 25, 68)",
                                position: "absolute",
                            }}
                        />
                        <h1
                            className="title"
                            style={{
                                fontSize: "6vmin",
                                fontWeight: "bold",
                                marginBottom: "20px",
                                // color: "black",
                                color: "#FFFFFF",
                                textShadow: "3px 3px 3px black",
                            }}
                        >
                            오늘의 착장
                        </h1>
                    </>
                }
                <p
                    className="title_tag"
                    style={{ fontSize: "2vmin", fontWeight: "bold",
                        ...(isMobile && {
                            fontSize: 18,
                            marginLeft: '20px',
                        }),
                    }}
                >
                #오늘의 #베스트드레서는 #나야나
              </p>
            </div>
          ) : (
            <div>
                { !isMobile &&
                    <>
                        <ContactSupportOutlinedIcon
                            style={{
                                fontSize: "6vmin",
                                color: "rgb(3, 25, 68)",
                                position: "absolute",
                            }}
                        />
                        <h1
                            className="title"
                            style={{
                                fontSize: "6vmin",
                                fontWeight: "bold",
                                marginBottom: "20px",
                                // color: "black",
                                color: "#FFFFFF",
                                textShadow: "3px 3px 3px black",
                            }}
                        >
                            도움이 필요해
                        </h1>
                    </>
                }
                <p
                    className="title_tag"
                    style={{ fontSize: "2vmin", fontWeight: "bold",
                        ...(isMobile && {
                            fontSize: 18,
                            marginLeft: '20px',
                        }),
                    }}
                >
                #옷입는거 #어려워
              </p>
            </div>
          )}
          <Box className="container" sx={{width: '900px',...(isMobile &&
                  {
                      width: '320px',
                      position: 'relative',
                      top: '-45px',
                      '& .slick-arrow': {visibility: 'hidden'},
                      '& .slick-slider': {height: '276px'},
                      '& .div_test' : {height: '236px'}
                  }
              )}}>
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <Slider {...settings}>
              {[...post_top_list, ...post_top_list].map((post, index) => (
                <div className={"div_test"} key={post.id + "_1"}>
                  <div
                    className="img_div"
                    style={{
                        backgroundImage:
                            `URL(https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img})`,
                        borderRadius: "30px",
                        boxShadow: "0 8px 15px 0 gray ",
                        ...(isMobile && {
                            width: '110px',
                            height:'165px',
                        })
                    }}
                    />

                  <a href={"/post/" + post.id} >
                    <span className="dimmed_layer">
                      <span className="dimmed_info" >
                        <div  style={{...(isMobile && {display: 'none'})}}>
                          {board_type == 1 && post.blind == true ? (
                            <div>
                              <img
                                src={defaultImg}
                                alt="기본프로필이미지"
                                className="profileImg"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />
                              <p
                                className="profileName postEllips"
                                style={{ textAlign: "left" }}
                              >
                                익명
                              </p>
                            </div>
                          ) : (
                            <div>
                              <img
                                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.user.profile_img}`}
                                alt="프로필이미지"
                                className="profileImg"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />
                              <p
                                className="profileName postEllips"
                                style={{ textAlign: "left" }}
                              >
                                {post.user.name}
                              </p>
                            </div>
                          )}
                        </div>
                        <Box sx={{ width: "40px", ...(isMobile && {display: 'none'}) }} className="box">
                          <Grid
                            container
                            rowSpacing={0}
                            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                          >
                            <Grid item xs={4}>
                              <Item>
                                {board_type == 0 ? (
                                  <FavoriteIcon
                                    style={{ color: "#ffffff" }}
                                    sx={{ fontSize: "1.4rem" }}
                                  />
                                ) : (
                                  <MoodBadIcon
                                    style={{ color: "#ffffff" }}
                                    sx={{ fontSize: "1.4rem" }}
                                  />
                                )}
                              </Item>
                            </Grid>
                            <Grid item xs={4}>
                              <Item>
                                {post.like_urgent_user_list.items.length}
                              </Item>
                            </Grid>
                            <Grid item xs={4}>
                              <Item>
                                <VisibilityIcon
                                  style={{ color: "#ffffff" }}
                                  sx={{ fontSize: "1.4rem" }}
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={4}>
                              <Item>{post.click_num}</Item>
                            </Grid>
                            <Grid item xs={4}>
                              <Item>
                                <CommentIcon
                                  style={{ color: "#ffffff" }}
                                  sx={{ fontSize: "1.4rem" }}
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={4}>
                              <Item>{post.comment_list.items.length}</Item>
                            </Grid>
                          </Grid>
                        </Box>
                      </span>
                    </span>
                  </a>
                </div>
              ))}
            </Slider>
          </Box>
        </article>
      </div>
    );
	}
}

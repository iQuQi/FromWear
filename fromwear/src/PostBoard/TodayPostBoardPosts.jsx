import * as React from 'react';
import {Component} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  Typography  from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import './CSS/TodayPostBoardPosts.css';
import { Box } from '@mui/system';
import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';
import { ThirtyFpsTwoTone } from '@mui/icons-material';


/*
post_list : [
                {
                    id: "",
                    img: "",
                    like_user_num: "",
                    click_num: "",
                    comment_list:{
                        items: "",
                    },
                    createdAt: "",
                    user : {
                        name: "",
                        profile_img: "",
                    },
                },
            ],
*/
export default class TodayPostBoardPosts extends Component {
    constructor() {
		super();

		this.state = {
            post_state: 1,
            genderVal: "",
            filter_gender: "",
            dayVal: "",
            filter_day: -1,
            post_list:[],
		}
        
	}

    componentDidMount() {
        this.handleFilteredData(1);
    }

    handleFilteredData = (sortVal) => {
        API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
			.then(res => {
                let posts = res.data.listPosts.items.filter((post)=>{
                    //날짜 필터링
                    let today = new Date();
                    if(this.state.filter_day==10){//오늘
                        today.setDate(today.getDate());
                        if(new Date(post.createdAt)<today) return false;
                    }
                    else if(this.state.filter_day==20){//일주일
                        today.setDate(today.getDate() - 7);
                        if(new Date(post.createdAt)<today) return false;
                    }
                    else if(this.state.filter_day==30){//한달
                        today.setMonth(today.getMonth() - 1);
                        if(new Date(post.createdAt)<today) return false;
                    }
                    else if(this.state.filter_day==40){//6개월
                        today.setMonth(today.getMonth() - 6);
                        if(new Date(post.createdAt)<today) return false;
                    }
                    else if(this.state.filter_day==50){//1년
                        today.setFullYear(today.getFullYear() - 1);
                        if(new Date(post.createdAt)<today) return false;
                    }

                    if(this.state.filter_gender!=""&&this.state.filter_gender!=post.user.gender) return false;

                    return true;
                })
            if(sortVal == 1){
                this.setState({
                    post_state: sortVal,
                    post_list : posts.sort(function(a,b){return b.like_user_num-a.like_user_num})
                })
            } 
            else if(sortVal == 2) {
                this.setState({
                    post_state: sortVal,
                    post_list : posts.sort(function(a,b){return b.click_num-a.click_num})
                })
            }
            else {
                this.setState({
                    post_state: sortVal,
                    post_list : posts.sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)})
                })
            }
        })
		.catch(e => console.log(e));
    }

	handleSortLike = (e) => {
		console.log("like");
        this.handleFilteredData(1);
        
	}

	handleSortView = (e) => {
		console.log("view");
        this.handleFilteredData(2);
	}

    // consolePrint = () => {
    //     console.log(this.state.post_list[0].comment_list.items);
    // }

	// handleSortReply = (e) => {
	// 	console.log("reply");
	// 	API.graphql({ 
    //         query: listPosts, 
    //         variables: { filter: {board_type: {ne: 1}}}})
	// 		.then(res => {
    //             this.setState({
    //             post_state: 3,
    //             post_list: res.data.listPosts.items.sort(function(a,b){return b.comment_list.items-a.comment_list.items}) 
    //         })
    //     })
	// 		.catch(e => console.log(e));

    //     API.graphql({ 
    //         query: listPosts, 
    //         variables: { filter: {board_type: {ne: 1}}}})
    //         .then(res => {
    //             console.log(Object.values(res.data.listPosts.items[0])); 
    //         })
    //     .catch(e => console.log(e));
    //     this.consolePrint();
	// }

	handleSortLatest = (e) => {
		console.log("Latest");
        this.handleFilteredData(4);
	}

    handlePostAgain = () => {
        let {post_state} = this.state;
        this.handleFilteredData(post_state);
    }

    handle_select_gender = (e) => {
        this.setState({genderVal: e.target.value});
		let select = e.target.value;
		let gender = "";
		if(select == 10) gender="F";
		else if(select == 20) gender="M";
	
		this.setState({
			filter_gender : gender
		});
        this.handlePostAgain();
	}

	handle_select_day = (e) => {
        this.setState({dayVal: e.target.value});
		let select = e.target.value;
		let day = -1;
		if(day<select) day=select;


		this.setState({
			filter_day : day
		});
        this.handlePostAgain();
	}


    render() {
		let {post_state, post_list} = this.state;
        let {genderVal, dayVal} = this.state;

        return (<article className="wrap_recommend">
            <form className="sort_font select_sort">

                <input type="radio" id="sort_like" name="sort" defaultChecked onChange={this.handleSortLike}></input>
                <label htmlFor="sort_like">좋아요순</label>
                <input type="radio" id="sort_view" name="sort" onChange={this.handleSortView}></input>
                <label htmlFor="sort_view">조회수순</label>
                {/* <input type="radio" id="sort_reply" name="sort" onChange={this.handleSortReply}></input>
                <label htmlFor="sort_reply">댓글순</label> */}
                <input type="radio" id="sort_latest" name="sort" onChange={this.handleSortLatest}></input>
                <label htmlFor="sort_latest">최신순</label>

            </form>
            <div style={{verticalAlign:"center", height:"50px", lineHeight:"50px"}}>
                <Box className="filter_layout">
                    <FormControl sx={{ m: 1.2, minWidth: 100 }}>
                        <Select 
                        style ={{height: "35px", fontSize:14,textAlign:"center", borderRadius:"30px", fontFamily : "'나눔고딕' ,NanumGothic, '돋움' , Dotum, sans-serif", fontWeight:"bold" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={genderVal}
                        onChange={this.handle_select_gender}
                        displayEmpty
                        >
                        <MenuItem style={{fontSize:13 }} value="">성별</MenuItem>
                        <MenuItem style={{fontSize:13 }} value={10}>여자</MenuItem>
                        <MenuItem style={{fontSize:13 }} value={20}>남자</MenuItem>

                        </Select>
                    </FormControl>
                </Box>
                <Box className="filter_layout">
                    <FormControl sx={{ m: 1.2, minWidth: 100 }}>
                        <Select
                        style ={{height: "35px", fontSize:14,textAlign:"center", borderRadius:"30px", fontFamily : "'나눔고딕' ,NanumGothic, '돋움' , Dotum, sans-serif", fontWeight:"bold" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dayVal}
                        onChange={this.handle_select_day}
                        displayEmpty
                        >
                        <MenuItem  style={{fontSize:13 }} value="">기간</MenuItem>
                        <MenuItem style={{fontSize:13 }} value={10}>오늘</MenuItem>
                        <MenuItem style={{fontSize:13 }} value={20}>일주일</MenuItem>
                        <MenuItem style={{fontSize:13 }} value={30}>한달</MenuItem>
                        <MenuItem style={{fontSize:13 }} value={40}>6개월</MenuItem>
                        <MenuItem style={{fontSize:13 }} value={50}>1년</MenuItem>


                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div id = 'today_post' className = 'collection'>
                {post_list.length != 0
                    ? <ImageList cols={5} gap={8} style={{clear: 'left'}}>
                        {post_list.map((post) => (
                            <ImageListItem key={post.id} className='today_image_list_item'>
                                <img style={{height:'322.55px', borderRadius:16}}
                                    src={`${post.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={post.user.name}
                                    loading="lazy"
                                />
                                <a href='/post'> 
                                    <span className='dimmed_layer'>	</span>
                                </a>

                                <Stack direction="row" spacing={0}>
                                    <div className="user_profile">
                                        <img src={post.user.profile_img} style={{margin: '7px 3px 7px 5px', width:'20px', height:'20px'}}/>
                                        <p style={{margin: '16px 0px'}}>{post.user.name}</p>
                                    </div>
                                    {(post_state == 1 || post_state == 4) && 
                                        <div className="user_like">
                                            <p style={{margin: '16px 0px'}}>{post.like_user_num}</p>
                                            <FavoriteBorderIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/> 
                                        </div>
                                    }
                                    {post_state == 2 && 
                                        <div className="user_like">
                                            <p style={{margin: '16px 0px'}}>{post.click_num}</p>
                                            <VisibilityIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/> 
                                        </div>
                                    }
                                    {/* {post_state == 3 && 
                                        <div className="user_like">
                                            <p style={{margin: '16px 0px'}}>{post.comment_list.items}</p>
                                            <CommentIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/> 
                                        </div>
                                    } */}
                                </Stack>				
                            </ImageListItem>
                        ))}
                    </ImageList>
                    : <Typography 
                      
                        style={{color:"black", marginTop:"20px",fontSize:15, textAlign:"center"}}
                        >
                        해당되는 게시물이 존재하지 않습니다.
                    </Typography>
                 }
            </div>
        </article>)
    }
}

import * as React from 'react';
import {Component} from 'react';
import './SearchPage.css'
import Header from '../Header/Header';
import TagList from './TagList'
import SearchResult from './SearchResult';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import RankTag from './RankTag';
import  Typography  from '@mui/material/Typography';
import {get_rank_tag } from './RankTag'; 
import moment from 'moment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import API from '@aws-amplify/api';
import {getPost, listPosts, listUsers} from '../graphql/queries.js';
import { format } from "date-fns";
import Footer from '../Footer/Footer';
import { static_tag_data } from './TagData';
import { Box } from '@mui/material';
import BottomTab from "../BottomNavigation/BottomNavigation";
var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그
var rank_tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //15개 태그
var AWS = require('aws-sdk'); 
/*
AWS.config.update(
	{
	  accessKeyId: ".. your key ..",
	  secretAccessKey: ".. your secret key ..",
	}
  );
  */


const s3 = new AWS.S3();
class SearchPage extends Component{
	constructor(){
		super();


		this.state={

			target_tag_button: tag_clicked_list,
			target_rank_tag_button: rank_tag_clicked_list,
			is_tag_more: false,

			filter_gender: "",
			filter_day:-1,
			filter_board:-1,

			post_data: [],
			rank_tag_data:[],

			current_next_post_page: 1,
			current_input_tag: [],
			current_click_tag_num: 0,
			tag_div_on_to_off: false,
			isMobile: false,
			user: {},

		};
	}

	handleScroll = () => {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;
		const clientHeight = document.documentElement.clientHeight;
		if (scrollTop + clientHeight >= scrollHeight) {
		  // 페이지 끝에 도달하면 추가 데이터를 받아온다
		  this.setState({
			current_next_post_page: this.state.current_next_post_page+1
			})
		}
	}


	componentDidMount(){
		window.addEventListener("scroll", this.handleScroll);
		this.update_post_data(-1,"",this.state.current_input_tag,-1);
		get_rank_tag(this.handle_rank_tag_data);

	}

	componentWillUnmount(){
		window.removeEventListener("scroll", this.handleScroll);

	}

	handle_tag_button_click=(e,index)=>{
		if(!tag_clicked_list[index]) {
			tag_clicked_list[index]= 1;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num+1
			})
		}
		else {
			tag_clicked_list[index]=0;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num-1
			})
		}
		
		this.setState({
			target_tag_button: tag_clicked_list,
		})

		this.update_post_data(this.state.filter_day,this.state.filter_gender,
			this.state.current_input_tag,
			this.state.filter_board);

	}

	handle_rank_tag_button_click=(e,index)=>{
		if(!rank_tag_clicked_list[index]) {
			rank_tag_clicked_list[index]= 1;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num+1
			})
		}
		else {
			rank_tag_clicked_list[index]=0;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num-1
			})
		}

		this.setState({
			target_rank_tag_button: rank_tag_clicked_list,
		})

		this.update_post_data(this.state.filter_day,this.state.filter_gender,
			this.state.current_input_tag,
			this.state.filter_board);
	}

	handle_tag_more_button=e=>{
		if(this.state.is_tag_more){
		this.setState({
			is_tag_more:false,
			tag_div_on_to_off: true
		})
		}
		else{
			this.setState({
				is_tag_more:true,
				tag_div_on_to_off: true
			})
		}
	}

	handle_post_data=(new_post_data)=>{
		
		this.setState({
			post_data: new_post_data
		})
		
	}

	handle_rank_tag_data=(new_rank_tag_data)=>{

		if(this.state.rank_tag_data.length==0){
			this.setState({
				rank_tag_data: new_rank_tag_data,
			})
		}
	}

	handle_inputbase_on_change=e=>{
		let split_tags=[];
		e.target.value.split("#").map(data=>{
			split_tags = [...split_tags,data.split(' ').join('')];
		});
		this.setState({
			current_input_tag: split_tags.slice(1,split_tags.length)
		})

		this.update_post_data(this.state.filter_day,this.state.filter_gender,split_tags.slice(1,split_tags.length),
		this.state.filter_board);

	}


	handle_x_button_on_click=e=>{
		this.setState({
			is_tag_more:false
		})
	}

	handle_select_gender=e=>{
		let select=e.target.value;
		let gender="";
		if(select==10)gender="F";
		else if(select==20)gender="M";
	
		this.setState({
			filter_gender : gender
		})

		this.update_post_data(this.state.filter_day,gender,this.state.current_input_tag,
			this.state.filter_board);

	}

	handle_select_day=e=>{
		let select=e.target.value;
		let day=-1;
		if(day<select) day=select;


		this.setState({
			filter_day : day
		})
		this.update_post_data(day,this.state.filter_gender,this.state.current_input_tag,
			this.state.filter_board);
	}


	handle_select_board=e=>{
		let select=e.target.value;
		let board=-1;
		if(select==10){
			board=0;
		} 
		else if(select ==20){
			board=1;
		}
		else if(select==30){
			board=2;
		}


		this.setState({
			filter_board : board
		})
		this.update_post_data(this.state.filter_day,this.state.filter_gender,this.state.current_input_tag,
			board);
	}

	handle_user_info=(user)=>{
		this.setState({user});
	}


	update_post_data=(day,gender,current_input_tag,board)=>{

		this.get_post_data(this.handle_post_data,
			current_input_tag,
			tag_clicked_list,
			rank_tag_clicked_list,
			day,gender,board);
	}

	inquireIsMobile = (isMobile) => {
		this.setState({isMobile});
	}

	fetchImages = ()=>{
		s3.getObject(
		  { Bucket: "my-bucket", Key: "my-picture.jpg" },
		  function (error, data) {
			if (error != null) {
			  alert("Failed to retrieve an object: " + error);
			} else {
			  alert("Loaded " + data.ContentLength + " bytes");
			  // do something with data.Body
			}
		  }
		);

	}

	get_post_data =  (handle_post_data,
		current_input_tag,
		tag_clicked_list,
		rank_tag_clicked_list,
		filter_day,filter_gender,filter_board) =>{

			let same3=[],same2=[],same1=[];
			let result_post=[];
			let rmved =[];

			let var_one={
				filter:{
					board_type: {
						eq: filter_board 
					}
				}
			}

			API.graphql({
			  query: listPosts,
			  variables:filter_board==-1?{}:var_one
			}).then(res=>{
			  res.data.listPosts.items
			  .map((post)=>{
				//날짜 필터링
				let basis = new Date();
				if(filter_day==10){//오늘
				  var base_y = basis.getFullYear();
				  var base_m = basis.getMonth()+1;
				  var base_d = basis.getDate();
				  var today_y = new Date(post.createdAt).getFullYear();
				  var today_m = new Date(post.createdAt).getMonth()+1;
				  var today_d = new Date(post.createdAt).getDate();

				  if(!(base_y==today_y && base_m ==today_m && base_d ==today_d)){
					return false;
				}
			
				}
				else if(filter_day==20){//일주일
					basis.setDate(basis.getDate() - 7);
				  if(new Date(post.createdAt)<basis) return false;
				}
				else if(filter_day==30){//한달
					basis.setMonth(basis.getMonth() - 1);

				  if(new Date(post.createdAt)<basis) return false;
				}
				else if(filter_day==40){//6개월
					basis.setMonth(basis.getMonth() - 6);
				  if(new Date(post.createdAt)<basis) return false;
				}
				else if(filter_day==50){//1년
					basis.setFullYear(basis.getFullYear() - 1);
				  if(new Date(post.createdAt)<basis) return false;
				}
		  
				//성별 필터링
				if(filter_gender!=""&&filter_gender!=post.user.gender) return false;
				
				//입력 태그 중복 없애기
				let dup=[];
				//검색 태그에서 찾기
				current_input_tag.map(find_tag=>{
					dup.push(find_tag);
				})
				//고정 태그에서 찾기
				static_tag_data.map((find_tag,index)=>{
					if(tag_clicked_list[index])dup.push(find_tag.name);
				})

				//랭킹 태그에서 찾기
				this.state.rank_tag_data.map((find_tag,index)=>{
					if(rank_tag_clicked_list[index])dup.push(find_tag.value);
				})

				let dup_rmv= new Set(dup);
				rmved = [...dup_rmv];


				//태그 필터링
				//입력된 태그가 없다면 전체 보여주기
				if(rmved.length==0) {
					result_post=[...result_post,post];
					return true;
				}
				else{
					let same = 0;
					
					post.tag_list.items.map((post_tag)=>{
						rmved.map(tag=>{
							if(post_tag.style_tag.value==tag) same++;
						})
					})
				
					if(same == 3) same3=[...same3,post]
					else if(same==2) same2=[...same2,post]
					else if(same==1) same1=[...same1,post]
					return true;

				}
			   
	  
			  })
			  
			  if(rmved.length===0) {
				result_post=result_post.sort(function(a,b){
					return b.like_urgent_user_list.items.length-
						a.like_urgent_user_list.items.length});
			  }
			  else{
				same3=same3.sort(function(a,b){return b.like_urgent_user_list.items.length-
					a.like_urgent_user_list.items.length});
				same2=same2.sort(function(a,b){return b.like_urgent_user_list.items.length-
					a.like_urgent_user_list.items.length});
				same1=same1.sort(function(a,b){return b.like_urgent_user_list.items.length-
					a.like_urgent_user_list.items.length});

			  	result_post=[...same3,...same2,...same1];
			  }

			  return handle_post_data(result_post);
			})
			.catch(e=>console.log(e))
	  

	  }


	render(){
		const {target_tag_button,is_tag_more,target_rank_tag_button,post_data,rank_tag_data,tag_div_on_to_off,
		current_next_post_page, user, isMobile} = this.state;

		return(
			<div>
				<Header 
				handle_inputbase_on_change={this.handle_inputbase_on_change}
				handle_select_day={this.handle_select_day}
				handle_select_gender={this.handle_select_gender}
				handle_select_board={this.handle_select_board}
				handle_user_info={this.handle_user_info}
				inquireIsMobile = {this.inquireIsMobile}
				/>
				
				<div className="search_page_container">	
				
					<div
						className = {is_tag_more?'tag_div_on': tag_div_on_to_off?'tag_div_on_to_off':"tag_div_off"}
					>
						<Stack direction="row">
							<div className={"tag_more_list"}
								  style={{...(isMobile && {width: '390px'})}}
							>
								<RankTag
									isMobile={isMobile}
									target_button={target_rank_tag_button}
									handle_rank_tag_button_click={this.handle_rank_tag_button_click}
									is_tag_more={is_tag_more}
									rank_tag_data={rank_tag_data}
									handle_tag_more_button={this.handle_tag_more_button}
									handle_x_button_on_click={this.handle_x_button_on_click}
								/>
								<TagList
									isMobile={isMobile}
									target_button={target_tag_button}
									handle_tag_button_click={this.handle_tag_button_click}
								/>
							</div>
						</Stack>
					</div>

					{post_data.length!=0?
						
						<div className={"search_page_content"}
							 style={{width: isMobile ? '390px': '1080px',
								 top: isMobile? '10px': '50px',
							 }}>
							<Box sx={{minHeight:'800px', paddingTop: '80px'}}>
								<SearchResult
									isMobile={isMobile}
									post_data={post_data}
									current_next_post_page={current_next_post_page}
								/>
							</Box>
						</div>
						:
						<Box sx={{minHeight:'800px'}}>
							<Typography 
							style={{color:"black",position:"relative",top:400,fontSize:15}}
							>
							해당되는 게시물이 존재하지 않습니다.
							</Typography>
						</Box>
						
					}

				</div>
				<Footer/>
				{isMobile && <BottomTab user={user}/>
				}
			</div>
		)
	}


}

export default SearchPage;

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
import {listPosts, listUsers} from '../graphql/queries.js';
import { FastForwardOutlined } from '@ant-design/icons';
import MainPage from "../MainPage/MainPage";
var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그
var rank_tag_clicked_list=[0,0,0,0,0,0,0,0,0,0]; //10개 태그

class SearchPage extends Component{
	constructor(){
		super();


		this.state={

			target_tag_button: tag_clicked_list,
			target_rank_tag_button: rank_tag_clicked_list,
			is_tag_more: false,
			filter_gender: "",
			filter_day:-1,
			post_data: [],
			rank_tag_data:[],
			current_next_post_page: 1,
			current_input_tag: [],
			current_click_tag_num: 0,

		};
	}

	componentWillMount(){
		this.update_post_data("","");
		get_rank_tag(this.handle_rank_tag_data);

	}

	handle_post_more_on_click=e=>{
		this.setState({
			current_next_post_page: this.state.current_next_post_page+1
		})
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
	}

	handle_tag_more_button=e=>{
		const {is_tag_more} = this.state;
		if(is_tag_more){
		this.setState({
			is_tag_more:false
		})
		}
		else{
			this.setState({
				is_tag_more:true
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

		console.log(split_tags.slice(1,split_tags.length));
		this.update_post_data(this.state.filter_day,this.state.filter_gender);

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

		this.update_post_data(this.state.filter_day,gender);

	}

	handle_select_day=e=>{
		let select=e.target.value;
		let day=-1;
		if(day<select) day=select;


		this.setState({
			filter_day : day
		})

		this.update_post_data(day,this.state.filter_gender);
	}

	update_post_data=(day,gender)=>{
		const {current_input_tag,current_click_tag_num} = this.state;

		this.get_post_data(this.handle_post_data,current_input_tag,tag_clicked_list,
			rank_tag_clicked_list,current_click_tag_num,day,gender);
	}

	get_post_data =  (handle_post_data,current_input_tag,tag_clicked_list,rank_tag_clicked_list,
		current_click_tag_num,filter_day,filter_gender) =>{
		  console.log("get post data");
			API.graphql({
			  query: listPosts,
			  variables:{filter:{board_type:{ne:1}}}
			}).then(res=>{
			  let result_post= res.data.listPosts.items
			  .filter((post)=>{
				//날짜 필터링
				let today = new Date();
				if(filter_day==10){//오늘
				  today.setDate(today.getDate());
				  if(new Date(post.createdAt)<today) return false;
				}
				else if(filter_day==20){//일주일
				  today.setDate(today.getDate() - 7);
				  if(new Date(post.createdAt)<today) return false;
				}
				else if(filter_day==30){//한달
				  today.setMonth(today.getMonth() - 1);
				  if(new Date(post.createdAt)<today) return false;
				}
				else if(filter_day==40){//6개월
				  today.setMonth(today.getMonth() - 6);
				  if(new Date(post.createdAt)<today) return false;
				}
				else if(filter_day==50){//1년
				  today.setFullYear(today.getFullYear() - 1);
				  console.log(today);
				  if(new Date(post.createdAt)<today) return false;
				}
		  
				//성별 필터링
				if(filter_gender!=""&&filter_gender!=post.user.gender) return false;
				
	  
				
				//태그 필터링
				//입력된 태그가 없다면 전체 보여주기
				  if(current_click_tag_num+current_input_tag.length==0) return true;
				  //post.tag_list.map((tag)=>{
					 
				  //})
				  else return true;
			   
	  
			  })
			  .sort(function(a,b){return b.like_user_num-a.like_user_num});
	  
			  console.log(result_post);
			  return handle_post_data(result_post);
			})
			.catch(e=>console.log(e))
	  
	  
	  }

	render(){
		const {target_tag_button,is_tag_more,target_rank_tag_button,post_data,rank_tag_data,
		current_next_post_page} = this.state;


		console.log("render");


		return(
			<div>
				<Header 
				handle_inputbase_on_change={this.handle_inputbase_on_change}
				handle_select_day={this.handle_select_day}
				handle_select_gender={this.handle_select_gender}
				/>
				
				<div className="search_page_container">	
				
					<div className = "tag_div" >
						<Stack direction="row">
							<Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", fontWeight: 300, color: "black"}}>
								<CloseIcon onClick={this.handle_x_button_on_click}/>	
							</Button>
							<div className={is_tag_more?"tag_more_list_on":"tag_more_list_off"}>
								<TagList
								target_button={target_tag_button}
								handle_tag_button_click={this.handle_tag_button_click}
								/>
								<Typography style={{color: "black",fontSize:"18px",fontWeight: "bold",margin: "15px 0 5px"}}>오늘의 태그</Typography>
								<RankTag 
									target_button={target_rank_tag_button}
									handle_rank_tag_button_click={this.handle_rank_tag_button_click}
									is_tag_more={is_tag_more}
									rank_tag_data={rank_tag_data}
								/>
								
							</div>
							<Button 
								style={{width: 85, boxShadow:"0 0 0 0" ,height: 40,fontWeight: "bold", border: !is_tag_more?"0":"1px solid lightgray",
								borderRadius:"30px",backgroundColor: !is_tag_more?"black":"white",color:!is_tag_more?"white":"black",fontSize:13,
								position:"absolute", top:10, right:25,zIndex:1000}} 
								variant="contained"
								onClick={this.handle_tag_more_button}	
							>
								더보기
							</Button>
							
							
						</Stack>
						
					</div>

					{post_data.length!=0?
						
						<div className={"search_page_content"}>
							<SearchResult 
							post_data={post_data}
							current_next_post_page={current_next_post_page}
							/>
							
							<Button
							variant="contained"
							style={{
								width: "100%",height: 50,
								marginTop:20, backgroundColor:"black"

							}}
							onClick={this.handle_post_more_on_click}
							>   
								<ArrowDropDownIcon style={{fontSize:40}}/>
							</Button>
						</div>
						:
						<Typography 
							style={{color:"black",position:"relative",top:-150,fontSize:15}}
							>
							해당되는 게시물이 존재하지 않습니다.
						</Typography>
					}
				
					
					
				
					
				</div>
			</div>
		)
	}


}

export default SearchPage;
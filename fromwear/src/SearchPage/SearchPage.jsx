
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
import get_post_data, {post_items} from "./SearchData"
import {get_rank_tag } from './TagData'; 
import moment from 'moment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import API from '@aws-amplify/api';
import {getUser,getAppInfo,listStyleTags} from '../graphql/queries.js';
var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그
var rank_tag_clicked_list=[0,0,0,0,0,0,0,0,0,0]; //10개 태그

class SearchPage extends Component{
	constructor(){
		super();


		this.state={
			target_tag_button: tag_clicked_list,
			target_rank_tag_button: rank_tag_clicked_list,
			is_tag_more: false,
			post_data: [],
			rank_tag_data:[],
			current_next_post_page: 1

		};
	}

	componentWillMount(){
	
		
	}

	handle_post_more_on_click=e=>{
		this.setState({
			current_next_post_page: this.state.current_next_post_page+1
		})
	}

	handle_tag_button_click=e=>{
		var button_index = e.target.value;
		if(!tag_clicked_list[button_index]) tag_clicked_list[button_index]= 1;
		else tag_clicked_list[button_index]=0;
		this.setState({
			target_tag_button: tag_clicked_list
		})
	}

	handle_rank_tag_button_click=e=>{
		console.log(e.target.value);
		var button_index = e.target.value;
		if(!rank_tag_clicked_list[button_index]) rank_tag_clicked_list[button_index]= 1;
		else rank_tag_clicked_list[button_index]=0;
		this.setState({
			target_rank_tag_button: rank_tag_clicked_list
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
		
		if(this.state.post_data.length==0){
			this.setState({
				post_data: new_post_data
			})
		}
	}

	handle_rank_tag_data=(new_rank_tag_data)=>{
		if(this.state.rank_tag_data.length==0){
			this.setState({
				rank_tag_data: new_rank_tag_data
			})
		}
	}

	render(){
		const {target_tag_button,is_tag_more,target_rank_tag_button,post_data,rank_tag_data,
		user_name,user_profile_img,current_next_post_page} = this.state;

		get_post_data(this.handle_post_data);
		get_rank_tag(this.handle_rank_tag_data);
		

		return(
			<div className="search_page_container">	
                <Header/>
				<div className = "tag_div" >
					<Stack direction="row">
						<Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", fontWeight: 300, color: "black"}}>
							<CloseIcon/>	
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
				<div className="search_page_content">
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
			
				
			</div>
		)
	}


}

export default SearchPage;
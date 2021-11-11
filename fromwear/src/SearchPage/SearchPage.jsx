
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

var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
class SearchPage extends Component{
	constructor(){
		super();
		this.state={
			target_tag_button: tag_clicked_list,
			is_tag_more: false
		};
	
	}

	handle_img_on_click=e=>{
		console.log("img clicked");

	}
	handle_tag_button_click=e=>{
		var button_index = e.target.value;
		if(!tag_clicked_list[button_index]) tag_clicked_list[button_index]= 1;
		else tag_clicked_list[button_index]=0;
		this.setState({
			target_tag_button: tag_clicked_list
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

	render(){
		const {target_tag_button,is_tag_more} = this.state;
		return(
			<div className="container">		
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
							<RankTag 
								is_tag_more={is_tag_more}
							/>
						</div>
						<Button 
							style={{width: 100, boxShadow:"0 0 0 0" ,height: 40, float: "right",fontWeight: "bold",
							borderRadius:"30px",height:45, backgroundColor: "black",color:"white",fontSize:15}} 
							variant="contained"
							onClick={this.handle_tag_more_button}	
						>
							더보기
						</Button>
						
					</Stack>
					
				</div>
				<div className="content">
						<SearchResult 
						handle_img_on_click={this.handle_img_on_click} 
						/>
					</div>
			</div>
		)
	}


}

export default SearchPage;

import * as React from 'react';
import {Component} from 'react';
import './SearchPage.css'
import Header from '../Header/Header';
import TagList from './TagList'
import SearchResult from './SearchResult';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';


class SearchPage extends Component{
	constructor(){
		super();
	
	}

	handle_img_on_click=e=>{
		console.log("img clicked");
		console.log(e.target);

	}


	render(){

		return(
			<div className="container">		
                <Header/>
				<div className = "tag_div" >
					<Stack direction="row">
						<Button  style={{ minWidth: 40,height: 40,margin: "0 5px 10px", fontSize:"30px", fontWeight: 300, color: "black"}}>
							<CloseIcon/>	
						</Button>
						<div className = "tag_list">
							<TagList/>
						</div>
						<Button style={{width: 80 ,height: 40, float: "right"}} variant="contained">더보기</Button>
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
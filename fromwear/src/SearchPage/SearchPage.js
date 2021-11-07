
import * as React from 'react';
import {Component} from 'react';
import './SearchPage.css'
import Header from '../Header/Header';
import TagList from './TagList'
import SearchResult from './SearchResult';

import CloseIcon from '@mui/icons-material/Close';

class SearchPage extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<div className="container">		
                <Header/>
                <CloseIcon style={{ marginLeft: 10,marginRight: 10,fontSize:"35px", fontWeight: 300, float: "left"}}/>

                <div className = "tag_list" >
                <TagList/>
                </div>
                <div className="content">
                    <SearchResult />
                </div>
			</div>
		)
	}


}

export default SearchPage;
import * as React from 'react';
import {Component} from 'react';
import './Header.css'
import PrimarySearchAppBar from './Bar'



class Header extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<div className="header_bar">		
				<PrimarySearchAppBar/>
			</div>
		)
	}


}

export default Header;

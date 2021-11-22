import * as React from 'react';
import {Component} from 'react';
import './Header.css'
import PrimarySearchAppBar from './Bar'
import MoveToTop from "./MoveToTop"


let Header =({handle_inputbase_on_change,handle_select_day,handle_select_gender})=>

	
			<div className="header_bar">		
				<PrimarySearchAppBar 
				handle_inputbase_on_change={handle_inputbase_on_change}
				handle_select_day={handle_select_day}
				handle_select_gender={handle_select_gender}
				/>
				<MoveToTop/>
			</div>
		
	




export default Header;

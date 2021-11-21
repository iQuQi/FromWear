import * as React from 'react';
import {Component} from 'react';
import './Header.css'
import PrimarySearchAppBar from './Bar'
import MoveToTop from "./MoveToTop"


let Header =({handle_inputbase_on_change})=>

	
			<div className="header_bar">		
				<PrimarySearchAppBar handle_inputbase_on_change={handle_inputbase_on_change}/>
				<MoveToTop/>
			</div>
		
	




export default Header;

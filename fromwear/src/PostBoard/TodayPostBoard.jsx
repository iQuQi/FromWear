import {Component} from 'react';
import PROFILE from './img/profile.png'

import * as React from 'react';

import Header from '../Header/Header';
import TodayPostBoardTop5 from './TodayPostBoardTop5';
import TodayPostBoardPosts from './TodayPostBoardPosts';

import './CSS/PostBoard.css';

class TodayPostBoard extends Component { 

	render() {
		return ( 
		<section className="wrap">
			<Header />
			<TodayPostBoardTop5 />
			<TodayPostBoardPosts />
		</section> )
	}
}

export default TodayPostBoard;

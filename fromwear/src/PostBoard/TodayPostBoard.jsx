import {Component} from 'react';

import * as React from 'react';

import Header from '../Header/Header';
import TodayPostBoardTop5 from './TodayPostBoardTop5';
import TodayPostBoardPosts from './TodayPostBoardPosts';

import './CSS/PostBoard.css';

class TodayPostBoard extends Component { 

	constructor(props) {
		super();

		this.state = { post_type: props.post_type };
	}

	render() {
		let {post_type} = this.state;

		return ( 
			<section className="wrap">
				<Header />
				<TodayPostBoardTop5 post_type={post_type} />
				<TodayPostBoardPosts post_type={post_type} />
			</section> )
	}
}

export default TodayPostBoard;


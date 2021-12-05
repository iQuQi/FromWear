import {Component} from 'react';

import * as React from 'react';

import TodayPostBoardTop5 from './TodayPostBoardTop5';
import TodayPostBoardPosts from './TodayPostBoardPosts';

import Header from '../Header/Header';
import './CSS/PostBoard.css';

class TodayPostBoard extends Component { 

	constructor(props) {
		super();

		this.state = { board_type: props.board_type };
	}

	handle_user_info = (user) => {

	}

	render() {
		let {board_type} = this.state;

		return ( 
			<section className="wrap">
            	<Header handle_user_info={this.handle_user_info}/>
				<TodayPostBoardTop5 board_type={board_type} />
				<TodayPostBoardPosts board_type={board_type} />
			</section> )
	}
}

export default TodayPostBoard;


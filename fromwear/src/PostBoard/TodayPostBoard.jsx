import {Component} from 'react';

import * as React from 'react';

import TodayPostBoardTop5 from './TodayPostBoardTop5';
import TodayPostBoardPosts from './TodayPostBoardPosts';

import Header from '../Header/Header';
import './CSS/PostBoard.css';
import { set } from 'date-fns';

class TodayPostBoard extends Component { 

	constructor(props) {
		super();

		this.state = { 
			board_type: props.post_type,
			user: 'noUser',
		};
	}

	handle_user_info = (user) => {
		console.log("user get",user);
		this.setState({
			user:user
		})
	}

	render() {
		let {board_type, user} = this.state;

		return ( 
			<section className="wrap">
				{console.log("render user",user)}
            	<Header handle_user_info={this.handle_user_info}/>
				<TodayPostBoardTop5 board_type={board_type} />
				<TodayPostBoardPosts 
					board_type={board_type} 
					user={user=="noUser"?"?..":"userexist"}
				/>
			</section> )
	}
}

export default TodayPostBoard;


import {Component} from 'react';

import * as React from 'react';

import TodayPostBoardTop5 from './TodayPostBoardTop5';
import TodayPostBoardPosts from './TodayPostBoardPosts';

import Header from '../Header/Header';
import './CSS/PostBoard.css';
import { set } from 'date-fns';
import PostWritePage from '../PostWritePage/PostWritePage';

class TodayPostBoard extends Component { 

	constructor(props) {
		super();

		this.state = { 
			board_type: props.post_type,
			user: 'noUser',
			is_write_page: false,
		};
	}

	handle_user_info = (user) => {
		if(this.state.user=='noUser') {
			this.setState({
				user:user
			})
		}
	}

	handle_write_page_open=()=> {
		console.log(this);
		this.setState({
			is_write_page: true
		})
	}

	render() {
		let {board_type, user} = this.state;
		let {is_write_page} = this.state;

		return ( 
			<section className="wrap">
				{ is_write_page 
					? <PostWritePage />
					: null
				}
            	<Header handle_user_info={this.handle_user_info}/>
				<TodayPostBoardTop5 board_type={board_type} />
				<TodayPostBoardPosts 
					board_type={board_type} 
					user={user}
					handle_write_page_open={this.handle_write_page_open}
				/>
			</section> )
	}
}

export default TodayPostBoard;


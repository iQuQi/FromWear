import {Component} from 'react';

import * as React from 'react';

import TodayPostBoardTop5 from './TodayPostBoardTop5';
import TodayPostBoardPosts from './TodayPostBoardPosts';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CSS/PostBoard.css';
import { set } from 'date-fns';
import PostWritePage from '../PostWritePage/PostWritePage';
import BottomTab from "../BottomNavigation/BottomNavigation";
import {Tab} from "@mui/material";
import TopMenu from "../BottomNavigation/TopMenu";


class TodayPostBoard extends Component {

	constructor(props) {
		super();

		this.state = {
			board_type: props.post_type,
			user: 'noUser',
			is_write_page: false,
			isMobile: false,
		};
	}

	handle_user_info = (user) => {
		if(this.state.user=='noUser') {
			this.setState({
				user:user
			})
		}
	}

	handle_write_page=()=> {
		this.setState({
			is_write_page: !this.state.is_write_page
		})
	}

	inquireIsMobile=(isMobile)=> {
		this.setState({
			isMobile
		})
	}

	render() {
		let {board_type, user,isMobile} = this.state;
		let {is_write_page} = this.state;


		return (
			<>
				<Header handle_user_info={this.handle_user_info} inquireIsMobile={this.inquireIsMobile}/>
				{isMobile && !is_write_page &&
					<TopMenu pos={board_type == 0 ? '100px' : '195px'} wid={'79px'}/>
				}
				{ is_write_page
					&& <PostWritePage
						board_type={board_type}
						user={user}
						handle_write_page={this.handle_write_page}
					/>
				}
				<section className="wrap"
						 style={{...(isMobile &&
								{
									width: '390px',
									minWidth: '390px',
								}
							)
						}}
				>
					<TodayPostBoardTop5
						isMobile={isMobile}
						board_type={board_type}
					/>
					<TodayPostBoardPosts
						isMobile={isMobile}
						board_type={board_type}
						user={user}
						handle_write_page={this.handle_write_page}
					/>
				</section>
				<Footer/>
				{isMobile && <BottomTab user={user} handle_write_page={this.handle_write_page}/>}
			</>
			 )
	}
}

export default TodayPostBoard;


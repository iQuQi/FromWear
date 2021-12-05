import * as React from 'react';
import {Component} from 'react';
import './Header.css'
import PrimarySearchAppBar from './Bar'
import MoveToTop from "./MoveToTop"
import Auth from '@aws-amplify/auth';
import { get_rank_tag } from '../SearchPage/RankTag';
import Login from "./Login";

class Header extends Component{
	constructor(){
		super();
		this.state = {
			rank_1:"",
			login_popup:false,
			user :"noUser"
		}
	}

	componentDidMount(){
		console.log("will mount");
		console.log(this.state.user);

		Auth.currentAuthenticatedUser()
		.then(res=>{
		  this.setState({
			user: {username: res.username, ... res.attributes,
			login_popup: false
			}});
		  console.log(res);
		}).catch(e=>console.log(e));

		{get_rank_tag(this.handle_rank_data)}

	}

	handle_rank_data=(rank_data)=>{
		this.setState({
			rank_1:rank_data[0].value
		});
		console.log("rank_1: "+rank_data[0].value)
  
	};



	handle_login_click=()=>{
		this.setState({
			login_popup:true
		});
	}
	



	render(){
		let {rank_1,user,login_popup} = this.state;
		return <div className="header_bar">		
				<PrimarySearchAppBar 
				handle_inputbase_on_change={this.props.handle_inputbase_on_change}
				handle_select_day={this.props.handle_select_day}
				handle_select_gender={this.props.handle_select_gender}
				handle_login_click={this.handle_login_click}
				rank_1 ={rank_1}
				user={user}
				/>
				
				{login_popup?<Login handle_login_complete={this.handle_login_complete}/>:<br/>}
				<MoveToTop/>
		</div>
	}	
}




export default Header;

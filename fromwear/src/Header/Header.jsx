import * as React from 'react';
import {Component} from 'react';
import './Header.css'
import PrimarySearchAppBar from './Bar'
import MoveToTop from "./MoveToTop"
import Auth from '@aws-amplify/auth';
import { get_rank_tag } from '../SearchPage/RankTag';
import Login from "./Login";
import API from '@aws-amplify/api';
import {createUser} from '../graphql/mutations.js';
import {getUser} from '../graphql/queries.js';
import profile_skyblue from '../PostView/Imgs/profile_skyblue.jpg';
import SignOutButton from './SignOutButton';


class Header extends Component{
	constructor(){
		super();
		this.state = {
			rank_1:"",
			login_popup:false,
			user :"noUser",
		}
	}

	componentDidMount(){
		console.log("will mount");
		console.log(this.state.user);
		let auth_user ;
	

		Auth.currentAuthenticatedUser()
		.then(res=>{
		  
		  console.log(res);
		  auth_user=res;
		  API.graphql({
			  query: getUser,
			  variables: {id: auth_user.attributes.sub}
		  }).then(res=>{
			  if(res.data.getUser==null){
				console.log("create new user!");
				API.graphql({
					query: createUser,
					variables:{ input:{
				   id: auth_user.attributes.sub,
				   name: auth_user.username,
				   email:auth_user.attributes.email,
				   phone:auth_user.attributes.phone_number,
				   profile_img: profile_skyblue,
				   introduce: "자기소개를 입력해주세요",
				   gender: "",
				   adopted: 0,
				   award_today: 0,
				   award_week: 0}}
				}).then(
					res=>{console.log(res,"new user get!!");
					API.graphql({
						query: getUser,
						variables: {id: auth_user.attributes.sub}
					}).then(res=>{
						this.handle_get_user(res.data.getUser);
					})
					.catch(e=>console.log("새 유저 get error",e));
				})
				.catch(e=>console.log(e));
			  }else{
			  console.log("already exist user");
			  this.handle_get_user(res.data.getUser);
			  }
			 
		  })
		  .catch(e=>{
			console.log(e);
			
		  })
		}).catch(e=>{
			console.log(e)
			
		});

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
	
	handle_get_user=(user)=>{
		this.setState({
			user: user,
			login_popup: false

		})
		if(this.props.handle_user_info!=undefined){
			this.props.handle_user_info(user);
		}
		console.log("user set complete",user);
	}



	render(){
		let {rank_1,user,login_popup} = this.state;
		return <div className="header_bar">		
				<PrimarySearchAppBar 
				handle_inputbase_on_change={this.props.handle_inputbase_on_change}
				handle_select_day={this.props.handle_select_day}
				handle_select_gender={this.props.handle_select_gender}
				handle_select_board={this.props.handle_select_board}
				handle_login_click={this.handle_login_click}
				rank_1 ={rank_1}
				user={user}
				/>
				{login_popup?<Login 
				handle_login_complete={this.handle_login_complete}/>:<br/>}
				<MoveToTop/>
		</div>
	}	
}




export default Header;

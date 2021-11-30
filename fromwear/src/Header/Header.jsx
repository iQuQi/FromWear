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
		let auth_user ;
		Auth.currentAuthenticatedUser()
		.then(res=>{
		  
		  console.log(res.attributes.sub);
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
				   passwd: "",
				   profile_img: "https://github.com/iQuQi/FromWear/blob/main/fromwear/src/SearchPage/image/wear10.png?raw=true",
				   introduce: "",
				   gender: "",
				   adopted: 0,
				   follower_num: 0,
				   following_num: 0,
				   my_tag_list: [],
				   award_today: 0,
				   award_week: 0}
				}
				}).then(
					res=>{console.log(res,"new user get!!");
					API.graphql({
						query: getUser,
						variables: {id: auth_user.attributes.sub}
					}).then(res=>{
						this.handle_get_user(res.data.getUser);
					})
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
	
	handle_get_user=(user)=>{
		this.setState({
			user: user,
			login_popup: false

		})
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

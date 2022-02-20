import * as React from 'react';
import {Component} from 'react';
import { Box } from '@mui/material';
import './Header.css'
import PrimarySearchAppBar from './Bar'
import MoveToTop from "./MoveToTop"
import Auth from '@aws-amplify/auth';
import { get_rank_tag } from '../SearchPage/RankTag';
import Login from "./Login";
import API from '@aws-amplify/api';
import {createUser,createUserStyleTag} from '../graphql/mutations.js';
import {getUser} from '../graphql/queries.js';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#000',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#000',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


class Header extends Component{
	constructor(){
		super();
		this.state = {
			rank_1:"",
			login_popup:false,
			user :"noUser",
			chatbot_open: false,
			
		}
	}

	componentDidMount(){
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
				API.graphql({
					query: createUser,
					variables:{ input:{
				   id: auth_user.attributes.sub,
				   name: auth_user.username,
				   email:auth_user.attributes.email,
				   phone:auth_user.attributes.phone_number,
				   profile_img: "profile_skyblue.jpg",
				   introduce: "자기소개를 입력해주세요",
				   gender: "",
				   adopted: 0,
				   award_today: 0,
				   award_week: 0}}
				})
				.then(res=>{
					API.graphql({
						query: createUserStyleTag,
						variables:{
							input:{
								user_id: auth_user.attributes.sub,
								style_tag_id: 101
							}
						}
					})

					API.graphql({
						query: createUserStyleTag,
						variables:{
							input:{
								user_id: auth_user.attributes.sub,
								style_tag_id: 102
							}
						}
					})

					API.graphql({
						query: createUserStyleTag,
						variables:{
							input:{
								user_id: auth_user.attributes.sub,
								style_tag_id: 103
							}
						}
					})

					return res;
				})
				.then(
					res=>{
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
			  this.handle_get_user(res.data.getUser);
			  }
			 
		  })
		  .catch(e=>{
			console.log(e);
			
		  })
		}).catch(e=>{
			console.log(e)
			
		});

		get_rank_tag(this.handle_rank_data)
	

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
	}
	
	
	
	render(){
	
	
		let {rank_1,user,login_popup, chatbot_open} = this.state;
		console.log(user.name);
		const steps= [
			{
			  id: '0',
			  message: `안녕하세요  ${user.name}님!
			  무엇을 도와드릴까요?`,
			  trigger: '1',
			},
			{
				id: '1',
				options: [
				  { value: 'suggestion', label: '건의사항', trigger: '2' },
				  { value: 'bug', label: '버그신고', trigger: '2' },
				  { value: 'etc', label: '기타', trigger: '2' },
				],
			},
			{
				id: '2',
				message: '어떤 점을 건의하고 싶으신가요?',
				trigger: '3',
			},
			{
				id: '3',
				user: true,
				trigger: '4',
			},
			{
				id: '4',
				message: '해당 내용을 전송하시겠습니까?',
				trigger: '5',
			},
			{
				id: '5',
				options: [
					{ value: 'yes', label: '네', trigger: '6' },
					{ value: 'no', label: '아니요', trigger: '7' },
				],
			},
			{
			  id: '6',
			  message: '불편함을 드려 죄송합니다. 해당 내용은 신속하게 처리해드리겠습니다.',
			  trigger: '7',
			},
			{
				id: '7',
				message: '추가로 건의하실 사항이 있으신가요?',
				trigger: '8',
		
			},
			{
				id: '8',
				options: [
					{ value: 'yes', label: '네', trigger: '1' },
					{ value: 'no', label: '아니요', trigger: '9' },
				],				
			  },
			{
				id: '9',
				message: '저희 Fromwear를 사용해주셔서 감사합니다 :)',
				end: true,
			},
			
		  ];
		  console.log('step',steps);
		  this.setState({
			chatbot_open: true,
		})
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
				<ThemeProvider theme={theme}>
					{user?.name && 
					<ChatBot 
						headerTitle='고객문의'
						floating={true} 
						steps={steps}
						handleEnd={(result)=>{
							this.setState({
								chatbot_open: false,
							})
							if(result.values[2]==='yes'){
								console.log('email test',result.values[1]);
							}
						}}
						floatingStyle={{left:true}}
					/>  }
					
				</ThemeProvider>
				<MoveToTop/>

		</div>
	}	
}




export default Header;

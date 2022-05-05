import * as React from 'react';
import {useEffect, useState} from 'react';
import './Header.css'
import PrimarySearchAppBar from './Bar'
import MoveToTop from "./MoveToTop"
import Auth from '@aws-amplify/auth';
import {get_rank_tag} from '../SearchPage/RankTag';
import Login from "./Login";
import API from '@aws-amplify/api';
import {createUser, createUserStyleTag} from '../graphql/mutations.js';
import {getUser} from '../graphql/queries.js';
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from 'styled-components';
import FeedPage from '../FeedPage/FeedPage.jsx'
import {init, send} from 'emailjs-com';
import { useMediaQuery } from 'react-responsive'



const emailList = [
	{address: 'S7SrqZoZfyHaqqain', templateId: 'template_rq5y7j8'},
	{address: 'yiktImKsBDGDhFVA_', templateId: 'template_uhdkh4l'},
	{address: 'N1fxofznKfSgsJfor',templateId: 'template_yqgbnyh'},
];

function Header(props){
	const [rank1, setRank_1] = useState('');
	const [loginPopup, setLoginPopup] = useState(false);
	const [user, setUser] = useState("noUser");
	const isMobile = useMediaQuery({ maxWidth: 391 })

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
		...(isMobile && {'&.rsc' : {position: 'relative', bottom :'30px'}})
	};

	const handle_get_user=(user)=>{
		setUser(user);
		setLoginPopup(false);
		if(props.handle_user_info!==undefined){
			props.handle_user_info(user);
		}
	}

	console.log('is mobile?', isMobile);
	useEffect(() => {
		let auth_user ;

		Auth.currentAuthenticatedUser()
		.then(res=>{
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
					()=>{
					API.graphql({
						query: getUser,
						variables: {id: auth_user.attributes.sub}
					}).then(res=>{
						handle_get_user(res.data.getUser);
					})
					.catch(e=>console.log("새 유저 get error",e));
				})
				.catch(e=>console.log(e));
			  }else{
			 	handle_get_user(res.data.getUser);
			  }
			 
		  })
		  .catch(e=>{
			console.log(e);
			
		  })
		}).catch(e=>{
			console.log(e)
			
		});

		get_rank_tag(handle_rank_data)
	

	}, [])

	const handle_rank_data=(rank_data)=>{
		setRank_1(rank_data[0].value);

	};

	const handle_login_click=()=>{
		setLoginPopup(true);
	}

	const handle_login_complete = () => {
		setLoginPopup(false);
	};
	
	
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
			  { value: 'bug', label: '버그신고', trigger: '3' },
			  { value: 'etc', label: '기타', trigger: '4' },
			],
		},
		{
			id: '2',
			message: '어떤 점을 건의하고 싶으신가요?',
			trigger: '5',
		},
		{
			id: '3',
			message: '어떤 점을 건의하고 싶으신가요?',
			trigger: '6',
		},
		{
			id: '4',
			message: '어떤 점을 건의하고 싶으신가요?',
			trigger: '7',
		},
		{
			id: '5',
			user: true,
			validator: () => {
				return true;
			  },
			trigger: '8',
		},
		{
			id: '6',
			user: true,
			validator: () => {
				return true;
			  },
			trigger: '8',
		},
		{
			id: '7',
			user: true,
			validator: () => {
				return true;
			  },
			trigger: '8',
		},
		{
		  id: '8',
		  message: '불편함을 드려 죄송합니다. 해당 내용은 신속하게 처리해드리겠습니다.',

		  trigger: '9',
		},
		{
			id: '9',
			message: '추가로 건의하실 사항이 있으신가요?',
			trigger: '10',

		},
		{
			id: '10',
			options: [
				{ value: 'yes', label: '네', trigger: '1' },
				{ value: 'no', label: '아니요', trigger: '11' },
			],
		  },
		{
			id: '11',
			message: '저희 Fromwear를 사용해주셔서 감사합니다 :)',
			end: true,
		},

	  ];


	return <>
		<div className={`header_bar 
			${window.location.pathname===("/search"||"/search#"||"/search/")?' header_bar_tag_div_on':''}`}>		
			<PrimarySearchAppBar 
				handle_inputbase_on_change={props.handle_inputbase_on_change}
				handle_select_day={props.handle_select_day}
				handle_select_gender={props.handle_select_gender}
				handle_select_board={props.handle_select_board}
				handle_login_click={handle_login_click}
				rank_1 ={rank1}
				user={user}
					
			/>
			
			</div>
			{ (user?.name && window.location.pathname !== ("/search"||"/search#"||"/search/")) 
						  && <FeedPage now_user={user} />}
			<MoveToTop/>
			<ThemeProvider theme={theme}>
					{user?.name && 
					<ChatBot
						headerTitle='고객문의'
						floating={true} 
						steps={steps}
						handleEnd={(result)=>{
							const subtitle = result.renderedSteps
								.filter((step) => step.id ==='1')
								.map((step) => step.message);
							const subcontent = result.renderedSteps
								.filter((step) => step.id === '5' || step.id === '6' || step.id === '7')
								.map((step) => step.message);

							let content = '';
							subtitle.forEach((title, index) => {
								content += `${title}:  
								${subcontent[index]}
								`;
							})

							const templateParams = {
								name: user?.name,
								content,
							};

							emailList.forEach((email) => {
								init(email.address);
								send('fromwear', email.templateId, templateParams)
									.then(function(response) {
										window.location.reload();
										console.log('SUCCESS!', email.address, response.status, response.text);
									}, function(error) {
										console.log('FAILED...', error);
									});
							})


						}}
						floatingStyle={{left:true}}
					/>  }
					
			</ThemeProvider>
			{loginPopup&&<Login
			handle_login_complete={handle_login_complete}/>}
			</>
}




export default Header;

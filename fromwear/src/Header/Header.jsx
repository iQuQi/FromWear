import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
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
import {Box} from "@mui/system";



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
	};

	const handle_get_user= (user)=>{
		setUser(user);
		setLoginPopup(false);
		if(props.handle_user_info!==undefined){
			props.handle_user_info(user);
		}
	};

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
				   introduce: "??????????????? ??????????????????",
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
					.catch(e=>console.log("??? ?????? get error",e));
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
		if (props.inquireIsMobile) props.inquireIsMobile(isMobile);


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

	const isSearchPage = window.location.pathname===("/search"||"/search#"||"/search/");

	const steps= [
		{
		  id: '0',
		  message: `???????????????  ${user.name}???!
		  ????????? ???????????????????`,
		  trigger: '1',
		},
		{
			id: '1',
			options: [
			  { value: 'suggestion', label: '????????????', trigger: '2' },
			  { value: 'bug', label: '????????????', trigger: '3' },
			  { value: 'etc', label: '??????', trigger: '4' },
			],
		},
		{
			id: '2',
			message: '?????? ?????? ???????????? ????????????????',
			trigger: '5',
		},
		{
			id: '3',
			message: '?????? ?????? ???????????? ????????????????',
			trigger: '6',
		},
		{
			id: '4',
			message: '?????? ?????? ???????????? ????????????????',
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
		  message: '???????????? ?????? ???????????????. ?????? ????????? ???????????? ???????????????????????????.',

		  trigger: '9',
		},
		{
			id: '9',
			message: '????????? ???????????? ????????? ????????????????',
			trigger: '10',

		},
		{
			id: '10',
			options: [
				{ value: 'yes', label: '???', trigger: '1' },
				{ value: 'no', label: '?????????', trigger: '11' },
			],
		  },
		{
			id: '11',
			message: '?????? Fromwear??? ?????????????????? ??????????????? :)',
			end: true,
		},

	  ];


	return <Box
				sx={{...(isMobile &&
						{'& .rsc-float-button' :
							{bottom :'60px',
								right: '15px'},
						  '& .rsc-container' : {
							width: '100%',
						    height: '100%',
						    zIndex: '9999999',
						  }
						}),
					}}
			>
			<Box
				className={`header_bar 
				${isSearchPage?' header_bar_tag_div_on':''}`}>
				<PrimarySearchAppBar
					input={props.input}
					isMobile={isMobile}
					handle_inputbase_on_change={props.handle_inputbase_on_change}
					handle_select_day={props.handle_select_day}
					handle_select_gender={props.handle_select_gender}
					handle_select_board={props.handle_select_board}
					handle_login_click={handle_login_click}
					rank_1 ={rank1}
					user={user}

				/>
			</Box>
			{ (user?.name && !isSearchPage)
						  && <FeedPage now_user={user} />}
			<MoveToTop/>
			<ThemeProvider theme={theme}>
					{user?.name && (!isMobile || (isMobile && !isSearchPage)) &&
					<ChatBot
						headerTitle='????????????'
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
			</Box>
}




export default Header;

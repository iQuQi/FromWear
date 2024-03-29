import React, { Component } from 'react';
import '../MyPage/MyPage.css';
import Header from '../Header/Header';


import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries.js';

import OtherUserProfile from './OtherUserProfile';
import OtherUserProfileM from './OtherUserProfileM';
import MyPostBoard from '../MyPage/MyPostBoard';

import Footer from '../Footer/Footer.jsx';
import BottomTab from '../BottomNavigation/BottomNavigation';

class UserPage extends Component {
    constructor(props) {
		super();

		this.state = {
			now_user_id: '',
			now_user: {},
            user_id: props.userid,
			user: {},
			is_mobile: props.is_mobile,
		};
	}

	componentDidUpdate(){
		if(this.state.user_id!=this.props.userid){
			API.graphql({ query: getUser, variables: { id: this.props.userid} })
			.then( res => {
				this.setState({
					user_id: this.props.userid,
					user: res.data.getUser,
				})
			})
			.catch( e => console.log(e));		
		}
	}

    componentDidMount(){
		API.graphql({ query: getUser, variables: { id: this.props.userid} })
		.then( res => {
			this.set_user(res.data.getUser);
		})
		.catch( e => console.log(e));	
    }

	set_user = (user) => {
		this.setState({ user: user });
	}

	handle_user_info = (user) => {
		this.setState({ now_user: user });
	}


    render(){
		let {now_user, user, is_mobile} = this.state;


		if(Object.keys(now_user).length>0&&Object.keys(user).length>0&&now_user.id==user.id){
			window.location.href = "/mypage";
		}
        return <div id = 'my_page'>
			<Header handle_user_info={this.handle_user_info}/>
			
			<div className='mypage_contents'>

				<div id = 'profile' className = 'mypage_profile'>
					
				</div>
				
				{
					is_mobile?
					<div>
						<OtherUserProfileM now_user={now_user} user={user}/>
						<BottomTab user={now_user}/>
					</div>
					: <OtherUserProfile now_user={now_user} user={user}/>
				}
				

				<div id = 'tab' className = 'mypage_collection'>
					<MyPostBoard user={user} board={20} is_mobile={is_mobile}/>
				</div>

				

				
            </div>

			<Footer/>
        </div>
    }
}


export default UserPage;
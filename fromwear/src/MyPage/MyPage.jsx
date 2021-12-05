import { Component } from 'react';
import './MyPage.css';
import Header from '../Header/Header';


import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries.js';

import Profile from './Profile';
import MyPageTab from './MyPageTab';


class MyPage extends Component {
    constructor(props) {
		super();

		this.state = {
			now_user_id: props.userid,
			now_user: {},
		};
	}

    componentWillMount(){
		API.graphql({ query: getUser, variables: { id: this.state.now_user_id} })
		.then( res => {
			this.set_now_user(res.data.getUser);
			console.log(res.data.getUser);
		})
		.catch( e => console.log(e));	
    }

	set_now_user = (user) => {
		this.setState({ now_user: user });
	}


    render(){

		let {now_user, now_user_id} = this.state;
		
        return <div id = 'my_page'>
			<Header/>
			
			<div className='mypage_contents'>

				<div id = 'profile' className = 'mypage_profile'>
					
				</div>
				<Profile user={now_user}/>

				<div id = 'tab' className = 'mypage_collection'>
					<MyPageTab user={now_user}/>
				</div>

				

				
            </div>

			
        </div>
    }
}


export default MyPage;
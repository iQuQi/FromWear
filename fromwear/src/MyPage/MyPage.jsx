import { Component } from 'react';
import './MyPage.css';
import Header from '../Header/Header';


import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries.js';

import MyPostBoard from './MyPostBoard';
import Profile from './Profile';


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
			console.log(res.data);
		})
		.catch( e => console.log(e));	
    }

	set_now_user = (user) => {
		this.setState({ now_user: user });
	}


    render(){

        console.log(this.state.now_user);
		

		let {now_user, now_user_id} = this.state;
		
        return <div id = 'my_page'>
			<Header/>
			
			<div className='mypage_contents'>

				<div id = 'profile' className = 'mypage_profile'>
					
				</div>
				<Profile user={now_user}/>

				<div id = 'my_post' className = 'mypage_collection'>
					<MyPostBoard userid={now_user_id}/>					
				</div>
            </div>

			
        </div>
    }
}


export default MyPage;
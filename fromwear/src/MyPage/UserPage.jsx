import { Component } from 'react';
import './MyPage.css';
import Header from '../Header/Header';


import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries.js';

import OtherUserProfile from './OtherUserProfile';



class UserPage extends Component {
    constructor(props) {
		super();

		this.state = {
			now_user_id: '',
			now_user: {},
            user_id: props.userid,
		};
	}

    componentDidMount(){
		API.graphql({ query: getUser, variables: { id: this.state.user_id} })
		.then( res => {
			this.set_now_user(res.data.getUser);
			console.log(res.data.getUser);
		})
		.catch( e => console.log(e));	
    }

	set_now_user = (user) => {
		this.setState({ now_user: user });
	}

	handle_user_info = (user) => {
		this.setState({ now_user: user });
	}


    render(){
		console.log(this.props.user);
		console.log(this.state.now_user);
		let {now_user, now_user_id} = this.state;

		
        return <div id = 'my_page'>
			<Header handle_user_info={this.handle_user_info}/>
			
			<div className='mypage_contents'>

				<div id = 'profile' className = 'mypage_profile'>
					
				</div>
				
				<OtherUserProfile now_user={now_user} user={user}/>

				<div id = 'tab' className = 'mypage_collection'>
					<MyPostBoard user={user} board={20}/>
				</div>

				

				
            </div>

			
        </div>
    }
}


export default UserPage;
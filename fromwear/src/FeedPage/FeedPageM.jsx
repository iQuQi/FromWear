import * as React from 'react';
import {Component} from 'react';
import BottomTab from '../BottomNavigation/BottomNavigation';
import Header from '../Header/Header';
import FeedPost from './FeedPost';

export default class FeedPageM extends Component {
    constructor() {
        super();

		this.state = {
			now_user: 'noUser',
		};
	}
    

    handle_user_info = (user) => {
		
		this.setState({
            now_user: user,
        });
		
	}
    
    
    render(){
        let {now_user, after} = this.state;
        
        return(
            <div className='mobile_wrap'>
                <Header handle_user_info={this.handle_user_info}/>
                {
                    this.state.now_user=='noUser'?
                    <p style={{marginTop: '100px'}}>
                        로그인 후 이용해주세요.
                    </p>
                    :null
                }
                <FeedPost user={now_user} />
                <BottomTab />
            </div>
        )

        
        
    }
}
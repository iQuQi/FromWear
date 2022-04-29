import * as React from 'react';
import {Component} from 'react';
import BottomTab from '../BottomNavigation/BottomNavigation';
import Header from '../Header/Header';
import FeedPost from './FeedPost';

export default class FeedPageM extends Component {
    constructor() {
        super();

		this.state = {
			now_user:{},
		};
	}
    

    handle_user_info = (user) => {
		
		this.setState({now_user: user,});
		
	}
    
    render(){
        let {now_user} = this.state;
        return(
            <div>
                <Header handle_user_info={this.handle_user_info}/>
                <FeedPost user={now_user} />
            </div>
        )

        <BottomTab />
        
    }
}
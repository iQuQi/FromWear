import {Component} from 'react';
import './MyPage.css';
import Header from '../Header/Header';


import {API} from 'aws-amplify';
import {listPosts} from '../graphql/queries.js';

import MyPostBoard from './MyPostBoard';

class MyPage extends Component {
    constructor(props) {
		super();

		this.state = {
			postlist_0: [],
			postlist_1: [],
			postlist_2: [],
			now_user_id: props.userid,
		};
	}

    componentDidMount(){
		
		API.graphql({ query: listPosts, variables: { filter: {user_id: {eq: this.state.now_user_id}} }})
		.then( res => {
			this.setState({ postlist_0: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num}) });
		})
		.catch( e => console.log(e));
    }

    render(){

        const best_post_0 = this.state.postlist_0.slice(0,5);

        return <div id = 'main_page'>
			<Header/>

			<div className='mypage_contents'>
				<div id = 'my_post' className = 'mypage_collection'>
					<MyPostBoard userid={this.state.now_user_id}/>					
				</div>
            </div>

			
        </div>
    }
}


export default MyPage;
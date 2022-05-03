import * as React from 'react';
import './MyPage.css';
import Header from '../Header/Header';

import Footer from '../Footer/Footer.jsx';
import MyPageBody from './MyPageBody';
import MyPageBodyM from './MyPageBodyM';

import { useMediaQuery } from 'react-responsive';

export default function MyPage() {
    const [now_user, set_now_user] = React.useState('noUser');
	const isMobile = useMediaQuery({ maxWidth: 391 });

	const handle_user_info = (user) => {
		
		set_now_user(user);
		
	}



	return <div id = 'my_page'>
		<Header handle_user_info={handle_user_info}/>
		
		{isMobile==false?
			<MyPageBody now_user={now_user}/>
			:<MyPageBodyM now_user={now_user}/>
		}
		
		<Footer />
	</div>
    
}

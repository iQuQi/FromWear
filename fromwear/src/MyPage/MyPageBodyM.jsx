import * as React from 'react';

import ProfileM from './ProfileM';
import MyPageButtonGroup from './MyPageButtonGroup';
import ProfileEdit from '../ProfileEditPage/ProfileEdit';
import BottomTab from '../BottomNavigation/BottomNavigation';

import MyPostBoard from './MyPostBoard';
import MyPostBoardSOS from './MyPostBoard_SOS';

export default function MyPageBodyM({now_user}) {
    const [is_profile_edit, set_is_profile_edit] = React.useState(false);

    let handle_profile_edit = () => {
        set_is_profile_edit(!is_profile_edit);
    }

    return(

        <div className='mobile_wrap'>
            <BottomTab user={now_user}/>
            {
                now_user=='noUser'?
                <p style={{marginTop:'100px'}}>로그인 후 이용해주세요</p>
                :
                <div>
                    {is_profile_edit?
                        <ProfileEdit user={now_user} handle_profile_edit={handle_profile_edit} isMobile/>
                        : null
                    }
                    
                    <div className='mypage_contents'>
                        <ProfileM user={now_user} handle_profile_edit={handle_profile_edit}/>
                        
                        <div id = 'tab' className = 'mypage_collection'>
                            <MyPageButtonGroup user={now_user} is_mobile={true}/>
                        </div>
                        	
                    </div>
                </div>
            }
            
        </div>

    )
}
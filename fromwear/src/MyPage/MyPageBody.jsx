import * as React from 'react';

import Profile from './Profile';
import MyPageButtonGroup from './MyPageButtonGroup';
import ProfileEdit from '../ProfileEditPage/ProfileEdit';

export default function MyPageBody({now_user}) {
    const [is_profile_edit, set_is_profile_edit] = React.useState(false);

    let handle_profile_edit = () => {
        set_is_profile_edit(!is_profile_edit);
    }

    return(

        <div>
            {is_profile_edit?
                <ProfileEdit user={now_user} handle_profile_edit={handle_profile_edit} />
                : null
            }
            
            <div className='mypage_contents'>
                <Profile user={now_user} handle_profile_edit={handle_profile_edit}/>
                
                <div id = 'tab' className = 'mypage_collection'>
                    <MyPageButtonGroup user={now_user}/>
                </div>		
            </div>
            
        </div>

    )
}
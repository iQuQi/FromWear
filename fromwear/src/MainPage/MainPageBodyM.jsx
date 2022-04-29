import * as React from 'react';
import BottomTab from '../BottomNavigation/BottomNavigation';
import MyPage from '../MyPage/MyPage';
import MainPageBody from './MainPageBody';

export default function MainPageBodyM({now_user}) {
    return(
        <div>
            <BottomTab now_user={now_user}/>
            
        </div>
    )
}
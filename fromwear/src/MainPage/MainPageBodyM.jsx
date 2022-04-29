import * as React from 'react';
import BottomTab from '../BottomNavigation/BottomNavigation';
import MyPage from '../MyPage/MyPage';
import MainPageBody from './MainPageBody';
import './MainPage.css';
import TopMenu from '../BottomNavigation/TopMenu';

export default function MainPageBodyM({now_user}) {
    return(
        <div>
            <TopMenu pos={'15px'} wid={'79px'}/>
            <BottomTab now_user={now_user}/>
            
        </div>
    )
}
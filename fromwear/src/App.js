import { React, Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage/MainPage.jsx';
import TodayPostBoard from './PostBoard/TodayPostBoard.jsx';
import PostPath from './PostView/PostPath.jsx';
import WholeCommentPagePath from './PostView/WholeCommentPagePath.jsx'
import SearchPage from './SearchPage/SearchPage.jsx';
import WeeklyTagPage from './WeeklyTagPage/WeeklyTagPage.jsx';
//import MyPagePath from './MyPage/MyPagePath.jsx';
import ProfileEdit from './ProfileEditPage/ProfileEdit.jsx';
import MyPage from './MyPage/MyPage.jsx';
import UserPagePath from './UserPage/UserPagePath.jsx';
import FeedPageM from './FeedPage/FeedPageM.jsx';

import BottomNavigation from './BottomNavigation/BottomNavigation.jsx';

function App() {

    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} exact/>
              <Route path="/todayboard" element={<TodayPostBoard post_type="0"/>} exact/>
              <Route path="/sosboard" element={<TodayPostBoard post_type="1"/>} exact/>
              <Route path="/post/:postid" element={<PostPath/>} exact/>
              <Route path="/post/:postid/wholecommentpage" element={<WholeCommentPagePath/>} exact/>
              <Route path="/search" element={<SearchPage />} exact/>
              <Route path="/weeklytag" element={<WeeklyTagPage />} exact/>
              <Route path="/mypage" element={<MyPage/>} exact/>
              <Route path="/userpage/:userid" element={<UserPagePath/>} exact/>
              <Route path="/profileedit" element={<ProfileEdit/>} exact/>
              <Route path="/feed" element={<FeedPageM />} exact/>
              <Route path="/BottomNavigation" element={<BottomNavigation/>} exact/>
            </Routes>
          </BrowserRouter>
      </div>

    );
  }


export default App;



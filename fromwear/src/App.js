import { React, Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage/MainPage.jsx';
import TodayPostBoard from './PostBoard/TodayPostBoard.jsx';
import PostPath from './PostView/PostPath.jsx';
import PostWritePage from './PostWritePage/PostWritePage.jsx';
import SearchPage from './SearchPage/SearchPage.jsx';
import WeeklyTagPage from './WeeklyTagPage/WeeklyTagPage.jsx';

import MyPagePath from './MyPage/MyPagePath.jsx';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);


function App() {

    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} exact/>
              <Route path="/todayboard" element={<TodayPostBoard post_type="0"/>} exact/>
              <Route path="/sosboard" element={<TodayPostBoard post_type="1"/>} exact/>
              <Route path="/post/:postid" element={<PostPath/>} exact/>
              <Route path="/posting" element={<PostWritePage />} exact/>
              <Route path="/search" element={<SearchPage />} exact/>
              <Route path="/weeklytag" element={<WeeklyTagPage />} exact/>
              <Route path="/mypage/:userid" element={<MyPagePath/>} exact/>
            </Routes>
          </BrowserRouter>
      </div>

    );
  }


export default App;

import { React, Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage/MainPage.jsx';
import TodayPostBoard from './PostBoard/TodayPostBoard.jsx';
import PostPath from './PostView/PostPath.jsx';
import PostWritePage from './PostWritePage/PostWritePage.jsx';
import SearchPage from './SearchPage/SearchPage.jsx';
import WeeklyTagPage from './WeeklyTagPage/WeeklyTagPage.jsx';
import MyPage from './MyPage/MyPage.jsx';



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
              <Route path="/mypage" element={<MyPage/>} exact/>

            </Routes>
          </BrowserRouter>
      </div>

    );
  }


export default App;

/*

    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
>>>>>>> c5615bfdad653787cd5514a37df215624a80c153
              <Route path="/" element={<MainPage />} exact/>
              <Route path="/todayboard" element={<TodayPostBoard post_type="0"/>} exact/>
              <Route path="/sosboard" element={<TodayPostBoard post_type="1"/>} exact/>
              <Route path="/post/:postid" element={<PostPath/>} exact/>
              <Route path="/posting" element={<PostWritePage />} exact/>
              <Route path="/search" element={<SearchPage />} exact/>
              <Route path="/weeklytag" element={<WeeklyTagPage />} exact/>
              <Route path="/mypage" element={<MyPage/>} exact/>

            </Routes>
          </BrowserRouter>
      </div>

    );
  }


export default App;



  
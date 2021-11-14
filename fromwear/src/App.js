import { React, Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage/MainPage.jsx';
import TodayPostBoard from './PostBoard/TodayPostBoard.jsx';
import PostView from './PostView/Post.jsx';
import PostWritePage from './PostWritePage/PostWritePage.jsx';
import SearchPage from './SearchPage/SearchPage.jsx';
import WeeklyTagPage from './WeeklyTagPage/WeeklyTagPage.jsx';



function App() {

    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} exact/>
              <Route path="/todayboard" element={<TodayPostBoard/>} exact/>
              <Route path="/post" element={<PostView />} exact/>
              <Route path="/posting" element={<PostWritePage />} exact/>
              <Route path="/search" element={<SearchPage />} exact/>
              <Route path="/weeklytag" element={<WeeklyTagPage />} exact/>
            </Routes>
          </BrowserRouter>
      </div>

    );
  }


export default App;

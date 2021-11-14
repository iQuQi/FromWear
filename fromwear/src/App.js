
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './MainPage/MainPage.jsx';
import TodayPostBoard from './PostBoard/TodayPostBoard.jsx'
import PostView from './PostView/Post.jsx'
import PostWritePage from './PostWritePage/PostWritePage.jsx'
import SearchPage from './SearchPage/SearchPage.jsx'
import WeeklyTagPage from './WeeklyTagPage/WeeklyTagPage.jsx';

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Route path="/" component={MainPage} exact/>
          <Route path="/todayboard" component={TodayPostBoard} exact/>
          <Route path="/post" component={PostView} exact/>
          <Route path="/posting" component={PostWritePage} exact/>
          <Route path="/search" component={SearchPage} exact/>
          <Route path="/weeklytag" component={WeeklyTagPage} exact/>
        </BrowserRouter>
      </div>
  );
}

export default App;

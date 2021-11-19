import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import './CSS/TodayPostBoardTop5.css'

let TodayPostBoardTop5 = () => {
    return (
    <div className="today_background_wrap">
        <article className="today_wear">
            <h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p>
            <div className="rank_list">
                <IconButton className="left arrow">
                    <ChevronLeftIcon />
                </IconButton>
                <img className="rank4" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank5" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank1" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank2" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <img className="rank3" src={ require('./img/model_img.jpg').default } alt="model"></img>
                <IconButton className="right arrow">
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </article>
    </div>
    )
}

export default TodayPostBoardTop5;
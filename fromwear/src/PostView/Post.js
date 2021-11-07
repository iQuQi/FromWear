import React, {Component} from 'react';
import img_a from './Imgs/img.jpeg';
import writer_img from './Imgs/pro1.jpeg';
import './Post.css'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Comments from './Comments';

let post_id = 111;
let img = img_a
let writer_name = "진영"
let content = "오늘은 K-POP스타 녹화날! 오늘 의상 너무 맘에 드는데 주변에서 다들 말린다.... 이유가 뭘까요?? 지금 녹화가 1시간 밖에 안 남았어요ㅠ  이러고 가도 괜찮을까요? 의견 남겨주세요~~";


class Post extends Component{
    /*
    constructor(){
        super();
    }
    */

    render(){

        return (
            <div className="main_box">
                <img src={img_a} className="post_img"/>
                <div className="content_box">
                    <div className="writer">
                        <img src={writer_img} className="writer_img"/>
                        <div className="writer_name">{writer_name}</div>
                        <div className="writer_content">{content}</div>
                    </div>
                    <div className="comment">
                        <Comments />
                    </div>
                    <ThumbUpOffAltIcon />
                </div>
            </div>
        );
    }
}

export default Post;

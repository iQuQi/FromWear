import React, {Component} from 'react';
import img_a from './Imgs/img.jpeg';
import writer_img from './Imgs/pro1.jpeg';
import './Post.css'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

let post_id = 111;
let img = img_a
let writer_name = "진영"
let content = "오늘은 K-POP스타 녹화날! 오늘 의상 너무 맘에 드는데 주변에서 다들 말린다.... 이유가 뭘까요?? 지금 녹화가 1시간 밖에 안 남았어요ㅠ  이러고 가도 괜찮을까요? 의견 남겨주세요~~";
let comment = ["리본 넥타이를 꼭 해야 될까요?! 다른 넥타이를 착용해보는 걸 추천드려요!", "머리를 좀 단정하게 다듬으면 좋을 것 같아요", "셔츠 팔 부분이 좀 더 길었으면 좋겠어요~", "액세서리를 활용해보세요. 좀 심심하네요"]

let comment_num = comment.length;

class Post extends Component{
    constructor(){
        super();
    }

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
                        <div className="comment_num">댓글 {comment_num}개</div>
                        <div className="one_comment">
                            <img src={writer_img} className="writer_img"/>
                            <div className="comment_user">지민</div>
                            <p className="comment_content">{comment[0]}</p>
                        </div>
                        <div className="one_comment">
                            <img src={writer_img} className="writer_img"/>
                            <div className="comment_user">지현</div>
                            <p className="comment_content">{comment[1]}</p>
                        </div>
                        <div className="one_comment">
                            <img src={writer_img} className="writer_img"/>
                            <div className="comment_user">유진</div>
                            <p className="comment_content">{comment[2]}</p>
                        </div>
                        <div className="one_comment">
                            <img src={writer_img} className="writer_img"/>
                            <div className="comment_user">연지</div>
                            <p className="comment_content">{comment[3]}</p>
                        </div>
                        <div className="one_comment_last">
                            <img src={writer_img} className="writer_img"/>
                            <div className="comment_user">연지</div>
                            <p className="comment_content">{comment[3]}</p>
                        </div>
                    </div>
                    <ThumbUpOffAltIcon />
                </div>
            </div>
        );
    }
}



export default Post;

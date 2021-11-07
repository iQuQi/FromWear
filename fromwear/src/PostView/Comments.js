import React, {Component} from 'react';
import SingleComment from './SingleComment'
import './Comments.css';

let now_user_name = "최지민";

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: [
                {
                    user_id: 1,
                    name: "최지민",
                    content: "리본 넥타이를 꼭 해야 될까요?! 다른 넥타이를 착용해보는 걸 추천드려요!"
                },
                {
                    user_id: 2,
                    name: "이지현",
                    content: "머리를 좀 단정하게 다듬으면 좋을 것 같아요"
                },
                {
                    user_id: 3,
                    name: "전연지",
                    content: "셔츠 팔 부분이 좀 더 길었으면 좋겠어요~"
                },
                {
                    user_id: 4,
                    name: "김유진",
                    content: "액세서리를 활용해보세요. 좀 심심하네요"
                }
            ]
        }
        this.addTweet = this.addTweet.bind(this);
    }
    addTweet() {
        let value = document.querySelector('#new-tweet-content').value;
        this.setState({tweets: [...this.state.tweets, {
            user_id: this.state.tweets.length +1,
            name: now_user_name,
            content: value
        }]})
    }
    render() {
        return (
            <div>
                <div>
                    <div className="comment_num">댓글 {this.state.tweets.length}개</div>
                    <ul id="tweets">
                        {
                            this.state.tweets.map(tweet => {
                                return <SingleComment key={tweet.user_id} tweet={tweet} />
                            })
                        }
                    </ul>
                    <div>작성자:now_user_name</div>
                    <div id="writing-area">
                        <textarea id="new-tweet-content"></textarea>
                        <button id="submit-new-tweet" onClick={this.addTweet}>댓글 달기</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments;

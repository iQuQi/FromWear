import React, {Component} from 'react';
import SingleComment from './SingleComment'
import './Comments.css';
import Comment_check from './Comment_check'

let now_user_name = "최지민";


let Comments = (props) => {
    let {comment_list, board_type} = props;

    let addTweet = () => {
        //let value = document.querySelector('.new_tweet_content').value;
        this.setState({comment_list: [...this.props.comment_list, {
            user_id: this.props.comment_list.length +1,
            name: now_user_name,
            content: "1234"
        }]})
    }

    return (
        <div>
            <div>
                <div className="comment_num">댓글 {comment_list.length}개</div>
                <ul className="comment_ul">
                    {
                        comment_list.map(comment_list => {
                            return <SingleComment key={comment_list.user_id} comment={comment_list} board_type={board_type}/>
                        })
                    }
                </ul>
                <div className="comment_check">
                    <Comment_check />
                </div>
            </div>
        </div>
    )

}

export default Comments;

/*
class Comments extends Component {

    constructor(props){
        super(props);

        this.state = {
            comment_list: this.props.comment_list,
        }
        //this.comment_list = this.comment_list.bind(this);
    }
    addTweet() {
        //let value = document.querySelector('.new_tweet_content').value;
        this.setState({comment_list: [...this.props.comment_list, {
            user_id: this.props.comment_list.length +1,
            name: now_user_name,
            content: "1234"
        }]})
    }

    render() {
        let {comment_list} = this.state;
        //console.log(this.props.comment_list);

        return (
            <div>
                <div>
                    <div className="comment_num">댓글 {this.props.comment_list.length}개</div>
                    <ul className="comment_ul">
                        {
                            this.state.comment_list.map(comment_list => {
                                return <SingleComment key={comment_list.user_id} comment={comment_list} />
                            })
                        }
                    </ul>
                    <div className="comment_check">
                        <Comment_check />
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments;
*/

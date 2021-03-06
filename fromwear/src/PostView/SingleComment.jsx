import React, { Component } from 'react';
import './SingleComment.css';
import Thumb from './Thumb';
import Select_button from './Select_button';

import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries';

class SingleComment extends Component {

    constructor(props){
        super();

        this.state={
            comment_list: props.comment_list,
            board_type: props.board_type,
            writer_user: Object, //댓글 작성자
            now_user: props.now_user,
            post_writer: props.post_writer,
            board_type: props.board_type,
        }
    }
  
    componentDidUpdate(prevProps) {
        if (this.props.comment_list !== prevProps.comment_list) {
            this.setState({comment_list: this.props.comment_list,})   
        }
        if(this.props.board_type !== prevProps.board_type){
            this.setState({board_type: this.props.board_type});
        }
        if(this.props.post_writer !== prevProps.post_writer){
            this.setState({post_writer: this.props.post_writer})
        }
        if(this.props.now_user !== prevProps.now_user){
            this.setState({now_user: this.props.now_user})
        }
    }


    componentDidMount(){
        API.graphql({
            query: getUser, variables: {id: this.state.comment_list.user_id}
        })
        .then(res => this.setState({
            writer_user: res.data.getUser,
        }))
        .catch(e => console.log(e));
    }

    moveToWriterPage = () => {
        if(this.state.writer_user.id == this.state.now_user.id) {
            window.location.href = "/mypage"
        }
        else {
            window.location.href = "/userpage/" + this.state.writer_user.id
        }
    }
    
    render(){
        let {comment_list, board_type, writer_user, now_user, post_writer} = this.state;
        
        return (
            <div>
                <div>
                    {
                        (board_type == 1)?
                        <div className="single_comment">
                            <Select_button
                                writer_user={writer_user}
                                comment_list={comment_list}
                                now_user={now_user}
                                post_writer={post_writer}
                                board_type={board_type}
                            />
                            <p className="comment_content">{comment_list.content}</p>
                        </div>
                        :<div>
                                <div className="single_comment">
                                    <div className="writer_img move_to_userpage" style={{backgroundImage: 'URL('+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+writer_user.profile_img+')', backgroundPosition: 'center', backgroundSize: 'cover'}} onClick={this.moveToWriterPage} />
                                    <div className="comment_user_name move_to_userpage" onClick={this.moveToWriterPage}>{writer_user.name}</div>
                                    <Thumb 
                                    comment_list={comment_list}
                                    now_user={now_user}/>
                                    <p className="comment_content">{comment_list.content}</p>
                                    
                                </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default SingleComment;

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
            writer_user: Object,
            user_id: props.user_id,
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
    }


    componentDidMount(){
        //console.log("여기0")
        API.graphql({
            query: getUser, variables: {id: this.state.comment_list.user_id}
        })
        .then(res => this.setState({
            writer_user: res.data.getUser,
        }))
        .catch(e => console.log(e));

        //console.log(this.state.comment_list.like_user_list)
        //console.log("여기")
    }
/*
    removeComment = e => {
        console.log(e)
        console.log(this.state.comment_list.id)
        API.graphql({
            query: deleteComment, variables: {input:{id: this.state.comment_list.id}}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e));
        this.subscription = API.graphql({query: onDeleteComment, variables: { post_id: this.state.post_id }})
            .subscribe({
                next: newCreatedComment => {
                    if(newCreatedComment.post_id === this.state.post_id)
                        return;
                    let {comment_list} = this.state;
                    this.setState({
                        comment_list: [...comment_list, newCreatedComment.value.data.onCreateComment]
                    });
                }
        });
    }
    */
    

    render(){
        let {comment_list, board_type, writer_user, user_id, post_writer} = this.state;
        console.log(comment_list)
        return (
            <div>
                <div>
                    {
                        (board_type == 1)?
                        <div>
                            <Select_button
                                writer_user={writer_user}
                                comment_list={comment_list}
                                user_id={user_id}
                                post_writer={post_writer}
                                board_type={board_type}
                            />
                            <p className="comment_content">{comment_list.content}</p>
                        </div>
                        :<div>
                                <div>
                                    <img src={writer_user.profile_img} className="writer_img" /> 
                                    <div className="comment_user_name">{writer_user.name}</div>
                                    <Thumb 
                                    comment_list={comment_list}
                                    user_id={user_id}/>
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

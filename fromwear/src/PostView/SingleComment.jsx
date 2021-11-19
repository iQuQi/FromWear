import React, { Component } from 'react';
import './SingleComment.css';
import writer_img from './Imgs/pro1.jpeg';
import Thumb from './Thumb';
import Select_button from './Select_button';
import StarIcon from '@mui/icons-material/Star';

import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries';


class SingleComment extends Component {

    constructor(props){
        super();

        this.state={
            comment: props.comment,
            board_type: props.board_type,
            writer_user: Object,
            user_id: props.user_id,
        }
    }

    componentDidMount(){
        API.graphql({
            query: getUser, variables: {id: this.state.comment.user_id}
        })
        .then(res => this.setState({
            writer_user: res.data.getUser,
        }))
        .catch(e => console.log(e));
    }
    

    render(){
        let {comment, board_type, writer_user, user_id} = this.state;
        //this.get_user(comment.user_id);
        
        console.log(comment);
        return (
            <div>
                <div className="one_comment">
                    <img src={writer_user.profile_img} className="writer_img" /> 
                    <div className="comment_user_name">{writer_user.name}</div>
                    <Thumb 
                    comment={comment}
                    user_id={user_id}/>
                    {
                        (board_type==1)?
                        <Select_button /> : <div></div>
                    }
                    <p className="comment_content">{comment.content}</p>
                </div>
            </div>
        )
    }
}

export default SingleComment;


/*
class SingleComment extends Component {

    constructor(props){
        super();

        this.state={
            comment: props.comment,
            board_type: props.board_type,
            writer_user: Object,
        }
    }
    get_user = (what_user_id) => {
        API.graphql({
            query: getUser, variables: {id: what_user_id}
        })
        .then(res => this.setState({
            writer_user: res.data.getUser,
        }))
        .catch(e => console.log(e));
    }
    


    render(){
        let {comment, board_type, writer_user} = this.state;
        //this.get_user(comment.user_id);
        
        console.log(comment);
        return (
            <div>
                <div className="one_comment">
                    <img src={writer_img} className="writer_img" /> 
                    <div className="comment_user_name">{comment.user_id}</div>
                    <Thumb comment={comment}/>
                    {
                        (board_type==1)?
                        <Select_button /> : <div></div>
                    }
                    <p className="comment_content">{comment.content}</p>
                </div>
            </div>
        )
    }
}
*/
/*

let SingleComment =(props) => {

    let {comment, board_type} = props;


    let who_writer_user = Object;

    API.graphql({
            query: getUser, variables: {id: comment.user_id}
        })
    .then(res => {who_writer_user = res.data.getUser
    console.log(who_writer_user.name)})
    .catch(e => console.log(e));

    console.log(who_writer_user);

    return (
        <div>
            <div className="one_comment">
                <img src={who_writer_user.profile_img} className="writer_img" /> 
                <div className="comment_user_name">{who_writer_user.name}</div>
                <Thumb />
                {
                    (board_type==1)?
                    <Select_button /> : <div></div>
                }
                <p className="comment_content">{comment.content}</p>
            </div>
        </div>
    )
}

export default SingleComment;
*/
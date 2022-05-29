import React, {Component} from 'react';
import './Select_button.css';
import Thumb from './Thumb';

import { API } from 'aws-amplify';
import { updateComment, updateUser } from '../graphql/mutations';

class Select_button extends Component{

    constructor(props){
        super();

        this.state = {
            select_button_is_checked: props.comment_list.adopted,
            now_user: props.now_user,
            comment_list: props.comment_list,
            post_writer: props.post_writer, //게시물 작성자
            board_type: props.board_type,
            writer_user: props.writer_user,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment_list !== prevProps.comment_list) {
            this.setState({
                comment_list: this.props.comment_list,
                select_button_is_checked: this.props.comment_list.adopted,
            })
        }
        if(this.props.board_type !== prevProps.board_type){
            this.setState({board_type: this.props.board_type});
        }
        if(this.props.post_writer !== prevProps.post_writer){
            this.setState({post_writer: this.props.post_writer})
        }
        if (this.props.writer_user !== prevProps.writer_user) {
          this.setState({writer_user: this.props.writer_user})
        }
        if(this.props.now_user !== prevProps.now_user){
            this.setState({now_user: this.props.now_user})
        }
    }

    checkSelectComment = () => {
        if (window.confirm("댓글을 채택하시겠습니까?")) {
            //삭제 실행
            this.selectComment();
          } else {
          }
    }


    selectComment = () => {
        if(!this.state.select_button_is_checked){ //false->true
            API.graphql({query: updateComment, variables:{input: {id: this.state.comment_list.id,
                adopted: !this.state.select_button_is_checked,
                }}
            })
            .then(res => console.log(res))
            .catch(e => console.log(e))
    
            this.setState((prev) => {
                return{
                    select_button_is_checked: !prev.select_button_is_checked,
                }
            })

            API.graphql({
                query: updateUser, variables:{input: {id: this.state.writer_user.id,
                    adopted: this.state.writer_user.adopted+1,
                }}

            })
            .then(res => console.log(res))
            .catch(e => console.log(e))
            
        }
    }
    
    moveToWriterPage = () => {
        if(this.state.writer_user.id == this.state.now_user.id) {
            window.location.href = "/mypage"
        }
        else {
            window.location.href = "/userpage/" + this.state.writer_user.id
        }
    }
    

    render() {
        let {select_button_is_checked, now_user, comment_list, post_writer, writer_user} = this.state;
        return (
            <div className="single_select">
                {
                    select_button_is_checked ?
                    <div className="selected_star_img">
                        <div className="writer_img selected_img move_to_userpage" style={{backgroundImage: 'URL('+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+writer_user.profile_img+')', backgroundPosition: 'center', backgroundSize: 'cover'}} onClick={this.moveToWriterPage} />
                    </div>
                    :<div className="writer_img move_to_userpage" style={{backgroundImage: 'URL('+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+writer_user.profile_img+')', backgroundPosition: 'center', backgroundSize: 'cover'}} onClick={this.moveToWriterPage} />        
                }
                {
                    select_button_is_checked ?
                    <div className="comment_user_name move_to_userpage" onClick={this.moveToWriterPage}>{writer_user.name}</div>
                    :<div className="comment_user_name  move_to_userpage" onClick={this.moveToWriterPage}>{writer_user.name}</div>
                }
                <Thumb 
                        comment_list={comment_list}
                        now_user={now_user}/>
                <div className="select_div">
                    {
                        (post_writer.id==now_user.id)&&(now_user.id!=writer_user.id) ?
                        <div>
                        {
                            select_button_is_checked ?
                            <div>
                                <div className="select_yes">
                                    채택된 댓글
                                </div>
                            </div>
                            :
                            <div className="select_no" onClick={this.checkSelectComment}>
                                채택하기
                            </div>
                        }
                        </div>
                        :
                        <div>
                        {
                            select_button_is_checked ?
                            <div className="select_yes">
                                채택된 댓글
                            </div>
                            :
                            <div className="select_no"></div>
                        }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Select_button;
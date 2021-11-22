import React, {Component} from 'react';
import './Select_button.css';
import Thumb from './Thumb';

class Select_button extends Component{

    constructor(props){
        super();

        this.state = {
            select_button_is_checked: false,
            user_id: props.user_id, //현재 로그인한 사람
            comment_list: props.comment_list,
            post_writer: props.post_writer, //게시물을 쓴 사람
            board_type: props.board_type,
            writer_user: props.writer_user,
        }
    }
    
    componentDidMount(){
        if(this.state.comment_list.adopted == true){
            this.setState({
                select_button_is_checked: true,
            })
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
        if (this.props.writer_user !== prevProps.writer_user) {
          this.setState({writer_user: this.props.writer_user})
        }
    }


    onClick = () => {
        console.log(this.state.select_button_is_checked);
        this.setState((prev) => {
            return{
                select_button_is_checked: !prev.select_button_is_checked,
            }
        })
    }
    

    render() {
        let {select_button_is_checked, user_id, comment_list, post_writer, post_board, writer_user} = this.state;
        return (
            <div>
                {
                    select_button_is_checked ?
                    <div className="selected_star_img">
                        <img src={writer_user.profile_img} className="writer_img selected_img" /> 
                    </div>
                    :<img src={writer_user.profile_img} className="writer_img" /> 
                
                }
                {
                    select_button_is_checked ?
                    <div className="comment_user_name selected_name">{writer_user.name}</div>
                    :<div className="comment_user_name ">{writer_user.name}</div>
                }
                <Thumb 
                        comment_list={comment_list}
                        user_id={user_id}/>
                <div className="select_div">
                    {
                        post_writer.id==user_id ?
                        <div>
                        {
                            select_button_is_checked ?
                            <div className="select_yes" onClick={this.onClick}>
                                채택하기
                            </div>
                            :
                            <div className="select_no" onClick={this.onClick}>
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
                            <div className="select_no"></div> //채택안됨
                        }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Select_button;
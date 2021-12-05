import React, {Component} from 'react';
import './LikeUrgent.css'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import MoodBadIcon from '@mui/icons-material/MoodBad';


class LikeUrgent extends Component {
    constructor(props){
        super();

        this.state = {
            like_urgent_user_list: props.like_urgent_user_list,
            like_urgent_click: props.like_urgent_click,
            handleLikeUrgentButton: props.handleLikeUrgentButton,
            board_type: props.board_type,
            like_urgent_num: props.like_urgent_num,
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.like_urgent_user_list !== prevProps.like_urgent_user_list) {
          this.setState({
            like_urgent_user_list: this.props.like_urgent_user_list,})
        }
        if (this.props.like_urgent_click !== prevProps.like_urgent_click) {
          this.setState({like_urgent_click: this.props.like_urgent_click,})
        }
        if (this.props.board_type !== prevProps.board_type) {
            this.setState({board_type: this.props.board_type,})
        }
        if (this.props.like_urgent_num !== prevProps.like_urgent_num) {
            this.setState({like_urgent_num: this.props.like_urgent_num,})
        }
    }

    render(){
        let {like_urgent_user_list, like_urgent_click, handleLikeUrgentButton, board_type, like_urgent_num} = this.state;

        return (
            <div className="icons_list">
                {
                    board_type == 1 ?
                    <div>
                        {
                            like_urgent_click ?
                            <MoodBadIcon className="button urgent_yes" onClick={handleLikeUrgentButton}/>
                            : <MoodBadIcon className="button urgent_not" onClick={handleLikeUrgentButton}/>
                        }

                        {
                            like_urgent_user_list == null ?
                            <div className="like_num">0</div>
                            : <div className="like_num">{like_urgent_num}</div>
                        }
                    </div>
                    :
                    <div>
                        {
                            like_urgent_click ?
                            <HeartFilled className="button heart_filled" onClick={handleLikeUrgentButton}/>
                            : <HeartOutlined className="button heart_outlined" onClick={handleLikeUrgentButton}/>
                        }

                        {
                            like_urgent_user_list == null ?
                            <div className="like_num">0</div>
                            : <div className="like_num">{like_urgent_num}</div>
                        }
                    </div>
                }
            </div>
            )
    }
}

export default LikeUrgent;

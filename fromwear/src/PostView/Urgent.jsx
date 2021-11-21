import React, {Component} from 'react';
import './Urgent.css'
import MoodBadIcon from '@mui/icons-material/MoodBad';

let Urgent =(props) => {
    let {urgent_user_list, urgent_click, handleUrgentButton} = props;

    return (
            <div className="icons_list">
                {
                    urgent_click ?
                    <MoodBadIcon className="button urgent_yes" onClick={handleUrgentButton}/>
                    : <MoodBadIcon className="button urgent_not" onClick={handleUrgentButton}/>
                }
                <div className="urgent_num">{urgent_user_list.length}</div>
            </div>
        )
        
}

export default Urgent;

/*

class Urgent extends Component{

    state = {
        is_checked: false,
        notice: urgent_num, //기본 상태
    };

    onClick = () => {
        this.state.is_checked?
        this.not_urgent() : this.push_urgent()
    }

    not_urgent(){ //급해요 안누른 상태 (눌렀다 취소 상태)
        urgent_num = urgent_num - 1
        this.setState({
            is_checked: false,
            notice: urgent_num,
        })
    }

    push_urgent(){ //좋아요 누른 상태
        urgent_num = urgent_num + 1
        this.setState({
            is_checked: true,
            notice: urgent_num,
        })
    }

    render() {
        return (
            <div className="icons_list">
                {
                    this.state.is_checked ?
                    <MoodBadIcon className="button urgent_yes" onClick={this.onClick}/>
                    : <MoodBadIcon className="button urgent_not" onClick={this.onClick}/>
                }
                <div className="urgent_num">{this.state.notice}</div>
            </div>
        )
    }
}

export default Urgent;
*/
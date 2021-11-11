import React, {Component} from 'react';
import './Thumb.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

let thumb_num = 100

class Thumb extends Component{

    state = {
        is_checked: false,
        notice: thumb_num, //기본 상태
    };

    onClick = () => {
        this.state.is_checked?
        this.not_thumb() : this.push_thumb()
    }

    not_thumb(){ //좋아요 안누른 상태 (눌렀다 취소 상태)
        thumb_num = thumb_num - 1
        this.setState({
            is_checked: false,
            notice: thumb_num,
        })
    }

    push_thumb(){ //좋아요 누른 상태
        thumb_num = thumb_num + 1
        this.setState({
            is_checked: true,
            notice: thumb_num,
        })
    }

    render() {
        return (
            <div className="thumb_div">
                {
                    this.state.is_checked ?
                    <ThumbUpAltIcon className="button thumb_up" onClick={this.onClick}/>
                    : <ThumbUpAltIcon className="button thumb_off" onClick={this.onClick}/>
                }
                <div className="thumb_num">{this.state.notice}</div>
            </div>
            
        )
    }
}

export default Thumb;
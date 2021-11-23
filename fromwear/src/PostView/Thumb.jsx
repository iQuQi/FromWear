import React, {Component} from 'react';
import './Thumb.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import { API } from 'aws-amplify';
import { updateAppInfo, updateComment } from '../graphql/mutations';

class Thumb extends Component{
    constructor(props){
        super();

        this.state = {
            is_checked: false,
            comment_list: props.comment_list,
            user_id: props.user_id,
        };

    }

    componentDidMount(){
        if(this.state.comment_list.like_user_list != null){
            let index = this.state.comment_list.like_user_list.indexOf(this.state.user_id)
            if(index > -1){
                this.setState(
                    {is_checked: true,}
                )
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment_list !== prevProps.comment_list) {
          this.setState({comment_list: this.props.comment_list,})
        }
    }

    onClick = () => {
        if(this.state.is_checked == true){
            let index = this.state.comment_list.like_user_list.indexOf(this.state.user_id)
            if(index > -1){
                this.state.comment_list.like_user_list.splice(index, 1);
                this.setState((prev) => {
                    return{
                        is_checked: !prev.is_checked,
                    }
                })
            }
            else {
                console.log("error!! cannot find user_id in list");
            }
        }
        else {
            this.state.comment_list.like_user_list.push(this.state.user_id);
            this.setState((prev) => {
                return {
                    is_checked: !prev.is_checked,
                }
            })
        }

        API.graphql({query: updateComment, variables:{input: {id: this.state.comment_list.id,
            like_user_list: this.state.comment_list.like_user_list,
            like: this.state.comment_list.like_user_list.length,
                }}
            })
        .then(res => console.log(res))
        .catch(e => console.log(e))

    }


    render() {
        let {comment_list, is_checked} = this.state;
        return (
            <div className="thumb_div">
                {
                    comment_list.like_user_list == null ?
                    <div className="thumb_num">0</div>
                    :<div className="thumb_num">{comment_list.like_user_list.length}</div>
                
                }
                {
                    is_checked ?
                    <ThumbUpAltIcon className="button thumb_up" onClick={this.onClick}/>
                    : <ThumbUpAltIcon className="button thumb_off" onClick={this.onClick}/>
                }
            </div>
            
        )
    }
}

export default Thumb;

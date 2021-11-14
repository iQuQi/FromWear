import { Select } from '@mui/material';
import React, {Component} from 'react';
import './Select_button.css';

class Select_button extends Component{

    state = {
        is_checked: false,
    };

    onClick = () => {
        this.state.is_checked?
        this.setState({
            is_checked: false,
        }) : 
        this.setState({
            is_checked: true,
        })
    }

    render() {
        return (
            <div className="select_div">
                {
                    this.state.is_checked ?
                    <div className="select_yes" onClick={this.onClick}>
                        채택하기
                    </div>
                    :
                    <div className="select_no" onClick={this.onClick}>
                        채택하기
                    </div>
                }
            </div>
        )
    }
}

export default Select_button;
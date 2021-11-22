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

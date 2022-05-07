import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import {static_tag_data, static_tag_data_by_grouping} from "./TagData"
import Typography from "@mui/material/Typography";
const groupMap = {
    season: {name: '계절별', start: 0},
    age: {name: '연령별', start: 4},
    style: {name: '스타일별', start: 8},
    situation: {name: '상황별', start: 29},
}

let TagList = ({target_button,handle_tag_button_click}) => {
    const tagListMap = (group) => static_tag_data_by_grouping.filter((tag) => tag.group === group);


    return <>
        {['season', 'age', 'style', 'situation'].map((group) =>
        <ul className="tag_list" key={group}>
            <Typography sx={{color: "#555",fontSize:"18px",fontWeight: "bold",
                lineHeight: '45px', textAlign: 'left',
            }}>{groupMap[group].name}</Typography>
            {tagListMap(group).map((data, index) =>
                <li key={data.id}>
                    <Button key={data.name + index}
                            style={{
                                width: 95,
                                height: 40,
                                marginBottom: 10,
                                marginRight: 8,
                                fontSize: 12,
                                float: "left",
                                border: '1px solid darkgray',
                                color: target_button[groupMap[group].start + index] == 0 ? "black" : "white",
                                backgroundColor: target_button[groupMap[group].start + index] == 0 ? "#fff" : "#000000",
                                borderRadius: "30px",
                                boxShadow: "0 0 0 0"
                            }}
                            variant="contained"
                            onClick={e => (handle_tag_button_click(e,
                                groupMap[group].start + index, data.name))}

                    >
                        #{data.name}
                    </Button>
                </li>
            )}
        </ul>
    )}
    </>;
}
            
         
export default TagList;
    

import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import tag_data from "./TagData"

let TagList = ({target_button,handle_tag_button_click}) => {
            return(
                    <ul className="tag_list">
                    {tag_data.map((data,index) =>
                    target_button[index]==0?
                        <li>
                        <Button key={data.name+index} 
                            style={{minWidth: 100,height: 45,marginBottom:10,marginRight:10,fontSize: 15,float:"left", 
                            color: "black", backgroundColor: "#d8c8b2", borderRadius: "30px",boxShadow:"0 0 0 0"}} 
                            variant="contained"
                            onClick={handle_tag_button_click}
                            value={index} 
                        >
                            {data.name}
                        </Button>
                        </li>
                    :
                        <li>
                        <Button key={data.name+index} 
                            style={{minWidth: 100,height: 45,marginBottom:10,marginRight:10,fontSize: 15, float:"left", 
                            color: "white", backgroundColor: "#000000", borderRadius: "30px",boxShadow:"0 0 0 0"}} 
                            variant="contained"
                            onClick={handle_tag_button_click}
                            value={index} 

                        >
                            {data.name}
                        </Button>
                        </li>
                    )
                    }           
                    </ul>
                
            )
}
            
         
export default TagList;
    
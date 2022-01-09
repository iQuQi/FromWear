import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import {static_tag_data} from "./TagData"


let TagList = ({target_button,handle_tag_button_click}) => {
            return(
                    <ul className="tag_list">
                        {
                          console.log("target_button", target_button)  
                        }
                    {static_tag_data.map((data,index) =>
                        <li>
                        <Button key={data.name+index} 
                            style={{width: 95,height: 40,marginBottom:10,marginRight:8,fontSize: 13,float:"left", 
                            color:  target_button[index]==0?"black":"white", backgroundColor: target_button[index]==0?"#D7DFF5":"#000000", borderRadius: "30px",boxShadow:"0 0 0 0"}} 
                            variant="contained"
                            onClick={e=>(handle_tag_button_click(e,index,data.name))}
                           
                        >
                            #{data.name}
                        </Button>
                        </li>
                    )
                    }           
                    </ul>
                
            )
}
            
         
export default TagList;
    
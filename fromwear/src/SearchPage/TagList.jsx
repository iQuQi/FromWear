
import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import tag_data from "./TagData"

let TagList = ({}) => {
            return(
                <Stack direction="row"   style={{overflow: "hidden"}}>

                    {tag_data.map((data,index) =>(
                        <Button key={data.name+index} style={{minWidth: 100,marginBottom:10,marginRight:10,fontSize: 15, color: "black", backgroundColor: "#f2f2f2"}} variant="contained">
                            {data.name}
                        </Button>
                        ))
                    }

                </Stack>
            )
}
            
         
export default TagList;
    
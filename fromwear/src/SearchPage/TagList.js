
import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TagData from "./TagData"
let TagList = ({}) => 
           

                <Stack direction="row" >
                    {TagData.map((data) => (
                        <Button key={data.name} style={{minWidth: 100,marginRight:10,fontSize: 15, color: "black", backgroundColor: "#f2f2f2"}} variant="contained">
                            {data.name}
                        </Button>
                        ))
                    }
                    <Button style={{minWidth: 80}} variant="contained">더보기</Button>

                </Stack>
         
export default TagList;
    
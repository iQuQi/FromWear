
import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { TagRankData as tag_rank_data } from './TagData'; 

let RankTag = ({is_tag_more})=>is_tag_more?
    <Stack direction="row">
         {tag_rank_data.map((data) =>
                    
                        <Button key={data} 
                            style={{minWidth: 100,height: 45,marginBottom:10,marginRight:10,fontSize: 15, 
                            color: "black", backgroundColor: "#d8c8b2", borderRadius: "30px",boxShadow:"0 0 0 0"}} 
                            variant="contained"
                        >
                            {data}
                        </Button>
      
         )}
    </Stack>
    :<br/>
;
            
         
export default RankTag;
    
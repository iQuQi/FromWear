
import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import {API, Auth} from 'aws-amplify';
import {listStyleTags} from '../graphql/queries.js';
let RankTag = ({is_tag_more,handle_rank_tag_button_click,target_button,rank_tag_data})=>
    is_tag_more?
    <Stack>
        <ul className="rank_tag_list">  
            {rank_tag_data.map((data,index) =>
                        <li>
                            <Button key={data} 
                                style={{minWidth: 80,height: 40,marginBottom:10,marginRight:10,fontSize: 13, 
                                color: target_button[index]==0?"black":"white", backgroundColor: target_button[index]==0?"#e7e6d2":"black", borderRadius: "30px",boxShadow:"0 0 0 0"}} 
                                variant="contained"
                                onClick={e=>handle_rank_tag_button_click(e,index,data.value)}
                            >
                                #{data.value}
                            </Button>
                        </li>
        
            )}
         </ul>
    </Stack>
    :<br/>
;

export let get_rank_tag =(handle_rank_tag_data)=>{
    var style_tags;
    API.graphql({
      query: listStyleTags,
    })
    .then(res=>{
      style_tags = res.data.listStyleTags.items;
      //a.sort(function (a, b) { return b - a }) - javascript sorting 방법
      return style_tags.sort(function(a,b){return b.num-a.num});

    })
    .then((res)=>
       handle_rank_tag_data(res.slice(0,10))
    )
    .catch(e=>console.log(e))


}

         
export default RankTag;
    

import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import {API, Auth} from 'aws-amplify';
import {listStyleTags} from '../graphql/queries.js';
import Typography from "@mui/material/Typography";
let RankTag = ({handle_rank_tag_button_click,
                   target_button,rank_tag_data,
                   is_tag_more,
                   handle_tag_more_button,
                   handle_x_button_on_click})=>
    <Stack sx={{width: '1000px', margin: 'auto'}} direction="row">
        <Typography sx={{color: "black",fontSize:"18px",fontWeight: "bold",
                lineHeight: '45px', minWidth: '150px',
        }}>
            오늘의 태그
        </Typography>
        <ul className="rank_tag_list">  
            {rank_tag_data.map((data,index) =>
                        <li>
                            <Button key={data} 
                                style={{minWidth: 80,height: 40,marginBottom:10,marginRight:10,fontSize: 13,
                                color: target_button[index]==0?"black":"white", backgroundColor: target_button[index]==0?"#c0e0f6":"black",
                                    borderRadius: "30px",boxShadow:"0 0 0 0",
                                }}
                                variant="contained"
                                onClick={e=>handle_rank_tag_button_click(e,index,data.value)}
                            >
                                #{data.value}
                            </Button>
                        </li>
        
            )}
         </ul>
        <Button
            style={{minWidth: 85, boxShadow:"0 0 0 0" ,height: 40,fontWeight: "bold",
                border: !is_tag_more?"0":"1px solid lightgray",
                borderRadius:"30px",backgroundColor: !is_tag_more?"black":"white",
                color:!is_tag_more?"white":"black",fontSize:13,
                zIndex:1000}}
            variant="contained"
            onClick={(e) => {
                if(is_tag_more)
                    handle_x_button_on_click(e);
                else
                    handle_tag_more_button(e);
            }}
        >
            {is_tag_more ? '닫기' : '더보기'}
        </Button>
    </Stack>
;

export let get_rank_tag =(handle_rank_tag_data)=>{
    var style_tags;
    API.graphql({
      query: listStyleTags,
    })
    .then(res=>{
      style_tags = res.data.listStyleTags.items;
      return style_tags.sort(function(a,b){return b.num-a.num});

    })
    .then((res)=>
       handle_rank_tag_data(res.slice(0,15))
    );
}

         
export default RankTag;
    
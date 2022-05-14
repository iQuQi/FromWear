
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
                    isMobile,
                   handle_tag_more_button,
                   handle_x_button_on_click})=>
    <Stack sx={{width: isMobile? '370px' : '1000px', margin: 'auto',
        ...(isMobile && {position: 'relative', top: '50px'})}}
           direction="row">
        <Typography sx={{color: "#555",fontSize:isMobile?'14px': "18px",fontWeight: "bold",
                lineHeight: isMobile? '30px':'45px', minWidth: isMobile? '100px' : '135px' ,
        }}>
            오늘의 태그
        </Typography>
        <ul className="rank_tag_list"
            style={{ ...(isMobile && {position:'absolute',top: '32px', left: '15px', width: '390px'})}}
        >
            {rank_tag_data.map((data,index) =>
                        <li key={data.id}>
                            <Button key={data} 
                                style={{
                                    width: 'auto',height: isMobile? 28:40,marginBottom: isMobile? 3 :10,
                                    marginRight: isMobile? 3: 10,fontSize: isMobile? 12:13,
                                    color: target_button[index]==0?"black":"white",
                                    backgroundColor: target_button[index]==0?"#c0e0f6":"black",
                                    borderRadius: "30px",boxShadow:"0 0 0 0",
                                    ...(isMobile && {padding: '6px 10px'}),
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
            sx={{minWidth: 85, boxShadow:"0 0 0 0" ,height: 40,fontWeight: "bold",
                border: !is_tag_more?"0":"1px solid lightgray",
                borderRadius:"30px",backgroundColor: !is_tag_more?"black":"white",
                color:!is_tag_more?"white":"black",fontSize:13,
                zIndex:1000,
                '&.MuiButton-contained:hover': {
                    backgroundColor: !is_tag_more?"black":"white",
                    boxShadow: 'none',
                },
                ...(isMobile && {position:'absolute', top: '-50px', right: 0})
        }}
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
    
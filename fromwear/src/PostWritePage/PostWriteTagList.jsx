import * as React from 'react';
import Button from '@mui/material/Button';
import {post_tag_data} from './PostTagData'

let PostWriteTagList = ({target_button,handle_tag_button_click}) => {
            return(
                    <ul className="postwrite_tag_list">
                    {post_tag_data.map((data,index) =>
                        <li>
                        <Button key={data.name+index} 
                            style={{width: 110,height: 40,marginBottom:10,marginRight:8,fontSize: 13,float:"left", 
                            color:  target_button[index]==0?"black":"white", backgroundColor: target_button[index]==0?"#c0e0f6":"#000000", borderRadius: "30px",boxShadow:"0 0 0 0"}}
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
            
         
export default PostWriteTagList;
    
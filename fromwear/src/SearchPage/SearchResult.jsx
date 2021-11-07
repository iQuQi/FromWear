import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { borderRadius } from '@mui/system';
import './SearchPage.css'
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import item_data from "./SearchData"
var is_hover = false;

let SearchResult = ({handle_img_on_click})=>
<ImageList cols={5} gap={10} >
					{item_data.map((item,index) => (
						<ImageListItem key={item.img+index} style={{position:"relative"}}>
                                <img style={{borderRadius:16 }}
								src={item.img}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
								onClick={handle_img_on_click}
								onMouseOver={()=>{is_hover=true;}}
								onMouseOut={()=>{is_hover=false;}}
							    />	
								<span className={is_hover?"hover":""}></span>

                            	
						</ImageListItem>
                    )
                    )}
</ImageList>


export default SearchResult;
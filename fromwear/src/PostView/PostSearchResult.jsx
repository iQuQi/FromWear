import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { borderRadius } from '@mui/system';
import './PostSearchPage.css'
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import item_data from "./SearchData"

let PostSearchResult = ({handle_img_on_click})=>
<ImageList cols={5} gap={10} >
					{item_data.map((item,index) => (
						<ImageListItem key={item.img+index} className = "image_list_item" style={{position:"relative"}}>
                                <img className="img_item"
								src={item.img}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.img+index}
								loading="lazy"
								onClick={handle_img_on_click}
							    />
								<span className={"dimmed_layer"}>
									<span className="dimmed_info_writer">
										<img src={item.img} alt="프로필"
											style={{width:"30px",height:"30px",borderRadius:"50%",
											position: "relative",top:"8px", marginRight:"5px"}}/>
										유진
									</span>
									<span className="dimmed_info_like">♥️ 1000</span>
								</span>


						</ImageListItem>
                    )
                    )}
</ImageList>


export default PostSearchResult;

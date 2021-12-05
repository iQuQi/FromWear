import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { ImageListItem } from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';

import './SearchPage.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
let link;
let SearchResult = ({post_data,current_next_post_page})=>
<ImageList cols={5} gap={10} >
					{post_data.map((item,index) => 
						 index<(current_next_post_page*25)?
						 <ImageListItem key={item.img+index} className = "image_list_item" style={{position:"relative"}}>
                                <img className="img_item" 
								src={item.img}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.img+index}
								loading="lazy"
							    />	
									{link="/post/"+item.id}
									<a href={link}>
										<span className={"dimmed_layer"}>
											<span className="dimmed_info_writer">
												<img src={item.user.profile_img} alt="프로필" 
													style={{width:"30px",height:"30px",borderRadius:"50%", 
													position: "relative",top:"8px", marginRight:"5px"}}/>
												{item.user.name}
											</span>
											<span className="dimmed_info_like">
											
												{item.like_urgent_user_list.items.length}
												{item.board_type==1?
												<MoodBadIcon style={{fontSize: 18,position:"relative",top:5, marginLeft:5}}/>
												:
												<FavoriteIcon style={{fontSize: 18,position:"relative",top:5, marginLeft:5}}/>
												}
											</span>
										</span>
									</a>
								)
						</ImageListItem>
						:
						console.log(index+": pass")
					)
				}
</ImageList>


export default SearchResult;
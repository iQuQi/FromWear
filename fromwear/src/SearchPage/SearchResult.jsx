import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { ImageListItem } from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';

import './SearchPage.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
let link,new_link;
let SearchResult = ({isMobile,post_data,current_next_post_page})=>
<ImageList cols={isMobile? 2: 5} gap={isMobile? 0 : 10}>
					{post_data.map((item,index) =>
						 index<(current_next_post_page*25) &&
						 <ImageListItem key={item.img+index} 
						 sx={{
							 '& .MuiImageListItem-img':{
							height: isMobile ? '300px' :'322.55px',
							},
                             position:"relative",width: isMobile? '180px' : '208px'
						 }}
						 className = "image_list_item"
                         >
							 {new_link = 'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.img}
                                <img className="img_item" 
								style={{borderRadius: isMobile? 0:16,width: isMobile? '195px' : '208px'}}
								src={new_link}
								srcSet={`${new_link}`}
								alt={item.img+index}
								loading="lazy"
							    />	
									{link="/post/"+item.id}
									<a href={link}>
										<span className={"dimmed_layer"}>
											<span className="dimmed_info_writer ellips" style={{width:'130px',height: '40px',textAlign:'left'}}>
												<img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} alt="프로필" 
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
					)
				}
</ImageList>


export default SearchResult;
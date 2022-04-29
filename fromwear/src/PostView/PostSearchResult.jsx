import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { ImageListItem } from '@mui/material';
import './PostSearchPage.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
let link;
let new_link;
let PostSearchResult = ({result_post, current_next_post_page})=> 
<ImageList cols={5} gap={10} >
					{result_post.map((item,index) => 
						 index<(current_next_post_page*25) &&
						 <ImageListItem key={item.img+index} className = "post_image_list_item" style={{position:"relative"}}>
                                {
									new_link = item.img[0]=='h'&&item.img[1]=='t'?item.img:'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.img
								}
								<img className="post_img_item" 
								src={new_link}
								style={{height:'322.55px'}}
								srcSet={`${new_link}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.img+index}
								loading="lazy"
							    />	
									{link="/post/"+item.id}
									<a href={link}>
										<span className={"post_dimmed_layer"}>
											<span className="post_dimmed_info_writer">
												<img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} alt="프로필" 
													style={{width:"30px",height:"30px",borderRadius:"50%", 
													position: "relative",top:"8px", marginRight:"5px"}}/>
												{item.user.name}
											</span>
											<span className="post_dimmed_info_like">
												{item.like_urgent_user_list.items.length}<FavoriteIcon style={{fontSize: 18,position:"relative",top:5, marginLeft:5}}/>
											</span>
										</span>
									</a>
								)
						</ImageListItem>

					)
				}
</ImageList>


export default PostSearchResult;

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { ImageListItem } from '@mui/material';
import API from '@aws-amplify/api';
import {getUser} from '../graphql/queries.js';
import './SearchPage.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
var user_name="",user_profile_img="";
/*
	{
									API.graphql({
										query: getUser,
										variables:{id:item.user_id}
									}).then(
										(res)=>{
											console.log(res);
											//user_name=res.data.getUser.item.name;
											//user_profile_img=res.data.getUser.item.profile_img;
										}
									).then((res)=>{
										handle_user_info();
									})
								}
*/
let SearchResult = ({handle_img_on_click,post_data, handle_user_info})=>
<ImageList cols={5} gap={10} >
					{post_data.map((item,index) => {
						return <ImageListItem key={item.img+index} className = "image_list_item" style={{position:"relative"}}>
                                <img className="img_item" 
								src={item.img}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.img+index}
								loading="lazy"
								onClick={handle_img_on_click}
							    />	
								
							
							
									<a href="/post">
										<span className={"dimmed_layer"}>
											<span className="dimmed_info_writer">
												<img src={user_profile_img} alt="프로필" 
													style={{width:"30px",height:"30px",borderRadius:"50%", 
													position: "relative",top:"8px", marginRight:"5px"}}/>
												{user_name}
											</span>
											<span className="dimmed_info_like">
												{item.like_user_num}<FavoriteIcon style={{fontSize: 18,position:"relative",top:5, marginLeft:5}}/>
											</span>
										</span>
									</a>
								)
						</ImageListItem>
					})
					}
</ImageList>


export default SearchResult;
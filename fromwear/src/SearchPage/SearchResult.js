import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { borderRadius } from '@mui/system';

import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import itemData from "./SearchData"

let SearchResult = ({})=>
<ImageList cols={5} gap={10} >
					{itemData.map((item) => (
                    
						<ImageListItem key={item.img}>
							#링크 달기
                                <img style={{borderRadius:16 }}
								src={item.img}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
							    />	
                            	
						</ImageListItem>
                    )
                    )}
</ImageList>


export default SearchResult;
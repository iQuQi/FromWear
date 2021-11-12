import React, {Component} from 'react';
import img_a from './Imgs/img.jpeg';
import writer_img from './Imgs/pro1.jpeg';
import './Post.css'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Comments from './Comments';
import Like from './Like'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import PROFILE from './Imgs/pro1.jpeg';

let post_id = 111;
let img = img_a
let writer_name = "진영"
let content = "오늘은 K-POP스타 녹화날! 오늘 의상 너무 맘에 드는데 주변에서 다들 말린다.... 이유가 뭘까요?? 지금 녹화가 1시간 밖에 안 남았어요ㅠ  이러고 가도 괜찮을까요? 의견 남겨주세요~~";
let post_tag = ["#자켓", " #분위기", " #청"]

class Post extends Component{
    /*
    constructor(){
        super();
    }
    */

    render(){

        const itemData = [
			{
			  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
			  user: 'Breakfast',
			  like: '1005',
			},
			{
			  img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
			  user: 'Breakfast',
			  like: '1005',
			},
		];

        return (
            <div>
                <div className="main_box">
                    <div>
                        <img src={img_a} className="post_img"/>
                        <div className="content_box">
                            <div className="writer">
                                <img src={writer_img} className="writer_img"/>
                                <div className="writer_name">{writer_name}</div>
                                <div className="writer_content">{content}</div>
                            </div>
                            <div className="comment">
                                <Comments />
                            </div>
                        </div>
                    </div>
                    <div className="icons">
                        <Like />
                        <div className="post_tag">{post_tag}</div>
                    </div>
                </div>
                <div className="tag_list">
                    <div className="recommend_tag">
                        태그 맞춤 추천
                    </div>
                    <ImageList cols={5} gap={8} style={{clear: 'left'}}>
					{itemData.map((item) => (
						<ImageListItem key={item.img}>
							<img style={{borderRadius:16}}
								src={`${item.img}?w=248&fit=crop&auto=format`}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.user}
								loading="lazy"
							/>
							<Stack direction="row" spacing={0} justifyContent="flex-end">
								<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
								<p>&nbsp;</p>
								<p style={{margin: '16px 0px'}}>{item.user}</p>
								<p>&emsp;&emsp;&emsp;</p>
								<p style={{margin: '16px 0px'}}>{item.like}</p>
								<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
							</Stack>				
						</ImageListItem>
					))}
				    </ImageList>
                </div>
            </div>

        );
    }
}

export default Post;

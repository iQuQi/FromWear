import {Component} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';

import './CSS/TodayPostBoardPosts.css';

import { API } from 'aws-amplify';
import { getPost } from '../graphql/queries.js';

export default class TodayPostBoardPosts extends Component {
    constructor() {
		super();

		this.state = {
			itemData: [
				{
				  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
				  user: 'Breakfast',
                  profile_img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
				  like: '1005',
				},
				{
				  img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
				  user: 'Breakfast',
				  like: '1005',
                  profile_img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
				},
			],
		}
	}

	handleSortLike = (e) => {
		console.log("like");
	}

	handleSortView = (e) => {
		console.log("view");
	}

	handleSortReply = (e) => {
		console.log("reply");
	}

	handleSortLatest = (e) => {
		console.log("Latest");
	}

    render() {
		let {itemData} = this.state;

        return (<article className="wrap_recommend">
            <form className="sort_font select_sort">
                <input type="radio" id="sort_like" name="sort" defaultChecked onChange={this.handleSortLike}></input>
                <label for="sort_like">좋아요순</label>
                <input type="radio" id="sort_view" name="sort" onChange={this.handleSortView}></input>
                <label for="sort_view">조회수순</label>
                <input type="radio" id="sort_reply" name="sort" onChange={this.handleSortReply}></input>
                <label for="sort_reply">댓글순</label>
                <input type="radio" id="sort_latest" name="sort" onChange={this.handleSortLatest}></input>
                <label for="sort_latest">최신순</label>
            </form>
            <div id = 'today_post' class = 'collection'>
                <ImageList cols={5} gap={8} style={{clear: 'left'}}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} className='today_image_list_item'>
                            <img style={{height:'322.55px', borderRadius:16}}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.user}
                                loading="lazy"
                            />
                            
                            <a href='/post'> 
                                <span className='dimmed_layer'>	</span>
                            </a>

                            <Stack direction="row" spacing={0} justifyContent="flex-end">
                                <img src={item.profile_img} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
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
        </article>)
    }
}
import {Component} from 'react';
import './MyPage.css';
import Header from '../Header/Header';

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import {API} from 'aws-amplify';
import {listPosts} from '../graphql/queries.js';

class MyPage extends Component {
    constructor() {
		super();

		this.state = {
			postlist_0: [],
			postlist_1: [],
			postlist_2: [],
		};
	}

    componentDidMount(){
		
		API.graphql({ query: listPosts, variables: { filter: {board_type: {eq: 2}} }})
		.then( res => {
			this.setState({ postlist_0: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num}) });
		})
		.catch( e => console.log(e));
    }

    render(){

        const best_post_0 = this.state.postlist_0.slice(0,5);

        return <div id = 'main_page'>
			<Header/>

			<div className='mypage_contents'>
				<div id = 'my_post' className = 'mypage_collection'>
					<h3 className = 'title'>오늘의 착장</h3>
					<a className = 'seemore' href='/todayboard'>둘러보기</a>
					
					<ImageList cols={3} gap={8} style={{clear: 'left'}}>
						{best_post_0.map((item) => (
							<ImageListItem key={item.img} className='mypage_image_list_item'ls
							>
								<img style={{height:'322.55px'}}
									src={`${item.img}?w=248&fit=crop&auto=format`}
									srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.id}
									loading="lazy"
								/>

								<a href='/post'> 
									<span className='dimmed_layer'>	
                                        <span className='dimmed_info' >
                                            <Stack direction="column" spacing={10} justifyContent="center" >
                                                <span className='dimmed_info' style={{margin: '16px 0px'}}>{item.like_user_num}</span>                    
                                                <FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
                                            </Stack>
                                        </span>
                                    </span>
                                    
								</a>

								<Stack direction="row" spacing={0} justifyContent="space-between">
									<img src={item.user.profile_img} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
									<p style={{margin: '16px 0px'}}>{item.user.name}</p>
									<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
									<p style={{margin: '16px 0px'}}>{item.like_user_num}</p>
									<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
								</Stack>				
							</ImageListItem>
						))}
					</ImageList>
				
				</div>
            </div>
        </div>
    }
}


export default MyPage;
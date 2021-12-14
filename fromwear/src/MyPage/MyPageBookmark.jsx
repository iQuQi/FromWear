import {Component} from 'react';
import * as React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//post board
import dayFilter from '../PostBoard/dayFilter';

import './MyPostBoard.css';
import './MyPage.css';
import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries.js';


//dimmed grid box
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'border',
    height: '20px',
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
}));


export default class MyPageBookmark extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: props.user
        }
    }

    render(){
        console.log(this.state.user);
        let {user} = this.state;

        return (
            <ImageList cols={3} gap={8} style={{clear: 'left', marginTop:'60px'}}>
                    {
                    user.my_bookmark_post_list.items.map((post) => (
                        
                        <ImageListItem key={post.id} className='mypage_image_list_item'>
                            <img style={{height:'322.55px'}}
                                src={`${post.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={user.name}
                                loading="lazy"
                            />
                            
                            <a href={'/post/'+post.id}> 
                                <span className='dimmed_layer'>	
                                    <span className='dimmed_info' >
                                        <Box style={{width: '40px'}}>
                                            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                                <Grid item xs={4}>
                                                    <Item><FavoriteIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{post.like_urgent_user_list.items.length}</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item><VisibilityIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{post.click_num}</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item><CommentIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{post.comment_list.items.length}
                                                    </Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </span>
                                
                                </span>
                            </a>


                            				
                        </ImageListItem>
                    ))}
                </ImageList>
        )
    }
}
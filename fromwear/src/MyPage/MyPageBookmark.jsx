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
            user: props.user,
            current_next_post_page: 1,
            is_mobile: props.is_mobile,
        }
    }

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;
		const clientHeight = document.documentElement.clientHeight;
		if (scrollTop + clientHeight + 1 >= scrollHeight) {
		  // 페이지 끝에 도달하면 추가 데이터를 받아온다
		  this.setState({
			current_next_post_page: this.state.current_next_post_page+1
			})
		}
	}

    render(){
        let {user, current_next_post_page, is_mobile} = this.state;

        return (
            <ImageList cols={3} gap={is_mobile?1:8} style={{clear: 'left', marginTop:is_mobile?0:'60px'}}>
                    {user.my_bookmark_post_list?
                    user.my_bookmark_post_list.items.map((item, index) => (
                        index < (current_next_post_page * 9) &&
                        <ImageListItem key={item.post.id} className='mypage_image_list_item'>
                            <img 
                                className='mypage_post_img'
                                style={{height : is_mobile?'130px':'322.55px'}}
                                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.post.img}?w=248&fit=crop&auto=format`}
                                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={user.name}
                                loading="lazy"
                            />
                            <a href={'/post/'+item.post.id}>
                                <span className='dimmed_layer'>	
                                    <span className='dimmed_info' >
                                        <Box style={{width: '40px'}}>
                                            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                                <Grid item xs={4}>
                                                    <Item><FavoriteIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{item.post.like_urgent_user_list?
                                                    item.post.like_urgent_user_list.items.length
                                                    :''}</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item><VisibilityIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{item.post.click_num}</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item><CommentIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>
                                                    {item.post.comment_list?
                                                    item.post.comment_list.items.length
                                                    :''}
                                                    </Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </span>
                                
                                </span>
                            </a>		
                        </ImageListItem>
                    ))
                    :<p/>}
                </ImageList>
        )
    }
}
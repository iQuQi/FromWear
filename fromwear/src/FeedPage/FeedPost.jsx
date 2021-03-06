import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Stack from '@mui/material/Stack';

import './FeedPost.css';
import FeedBookMark from './FeedBookMark';
import FeedLikeUrgent from './FeedLikeUrgent';
import { useMediaQuery } from 'react-responsive';

// 현재 사용자의 -> following_list의 -> 유저의 게시물 중 
//-> 도움이 필요해의 익명 글만 빼고 전부 가져오기 -> 근데 이제 followingfollower의 createdAt보다 나중꺼만

let link = '';

let link_change = (item, now_user) => {
    item.user.id == now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.user.id
}
let link_post = (item) => {
    link = '/post/' + item.id
}

export default function FeedPost({user}) {
    const isMobile = useMediaQuery({ maxWidth: 391 })
    let now_user = user; 
    let postlist = [];

    let bookmark_check = false;
    let likeurgent_check = false;

    if(now_user.following_list){
        now_user.following_list.items.map((item) => (
            item.following.my_post_list.items.map((post) => {
              if(post.board_type!=1){
                postlist = [...postlist, post]
              }
              else{
                if(post.blind==false){
                  postlist = [...postlist, post]
                }
              }
            })
        ));
    }
    
    postlist.sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)});
   
    return (
    <ImageList cols={1} sx={{ width: 390 }}>
      {
      postlist.length==0 && now_user!='noUser' ?
      <div>
        <p style={{marginTop: '100px'}}>팔로우 하는 사용자가 없습니다.</p>
        
      </div>
      
      : postlist.map((post) => (
          
            <ImageListItem key={post.img} >
            <img
                style={{height:'600px', objectFit:'cover'}}
                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}`}
                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}`}
                alt={post.user.name}
                loading="lazy"
            />
            <Stack direction="row" spacing={0} justifyContent="space-between">
              {link_change(post, now_user)}
              <div>
                <div className='innerdiv'>
                  <a href = {link}>
                    <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+post.user.profile_img} 
                    style={{borderRadius:"50%",margin: '7px 6px', width:isMobile?'23px':'20px', height:isMobile?'23px':'20px'}}/>
                  </a>
                  <a href = {link}>
                    <p className='user_name' style={{width:'140px', margin: '10px 5px 7px 0px', fontSize: isMobile?'1.1rem':'1rem'}}>{post.user.name}</p>
                  </a>
                </div>
              </div>
              <div>
                <div className='innerdiv_margin'>
                  
                  <FeedBookMark now_user={now_user} post={post}/>
                  <FeedLikeUrgent now_user={now_user} post={post}/>
                  
                </div>
              </div>
            </Stack>
            <div>
              {link_post(post)}
              <a href = {link}>
                <p className='post_ellipsis'>{post.content}</p>
              </a>
            </div>
            <div>
                <p className='post_date' style={{textAlign: 'right', margin: '0px 10px 10px 10px', fontSize: '0.6rem', lineHeight:'normal'}}>
                  {String(post.createdAt).substring(0,10)}
                </p>
            </div>
        
            </ImageListItem>
          
      ))}
    </ImageList>
  );
}

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Stack from '@mui/material/Stack';

import './FeedPost.css';

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

    let now_user = user; 
    let postlist = [];
    console.log(now_user.following_list);

    if(now_user.following_list){
        now_user.following_list.items.map((item) => (
            item.following.my_post_list.items.map((post) => (
                postlist = [...postlist, post]
            ))
        ));
    }
    
    postlist.sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)});

    console.log(postlist);
    return (
    <ImageList cols={1} sx={{ width: 390 }}>
      {postlist.map((post) => (
          
            <ImageListItem key={post.img} >
                {console.log(post)}
            <img
                style={{height:'600px'}}
                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format`}
                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={post.user.name}
                loading="lazy"
            />
            <Stack direction="row" spacing={0} justifyContent="space-between">
              {link_change(post, now_user)}
              <div>
                <div className='innerdiv'>
                  <a href = {link}>
                    <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+post.user.profile_img} 
                    style={{borderRadius:"50%",margin: '7px 5px 7px 5px', width:'20px', height:'20px'}}/>
                  </a>
                  <a href = {link}>
                    <p className='user_name' style={{margin: '10px 5px 7px 0px', fontSize: '1rem'}}>{post.user.name}</p>
                  </a>
                </div>
              </div>
              <div>
                <div className='innerdiv_margin'>
                  <BookmarkBorderIcon style={{margin: '7px 0px 7px 0px', color:'#000000'}} sx={{fontSize: '1.3rem'}}/>
                  <FavoriteBorderIcon style={{margin: '7px 2px 7px 3px', color:'#000000'}} sx={{fontSize: '1.3rem'}}/>
                  <p style={{margin: '19px 5px 7px 0px', fontSize: '1.1rem'}}>
                    {post.like_urgent_user_list.items.length>1000?
                      post.like_urgent_user_list.items.length/1000 + '.k'
                      : post.like_urgent_user_list.items.length}</p>
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

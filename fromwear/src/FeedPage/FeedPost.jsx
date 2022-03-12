import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


// 현재 사용자의 -> following_list의 -> 유저의 게시물 중 
//-> 도움이 필요해의 익명 글만 빼고 전부 가져오기 -> 근데 이제 followingfollower의 createdAt보다 나중꺼만

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
          
            <ImageListItem key={post.img}>
                {console.log(post)}
            <img
                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format`}
                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={post.user.name}
                loading="lazy"
            />
            <ImageListItemBar
                title={post.user.name}
                subtitle={post.user.name}
                actionIcon={
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${post.id}`}
                >
                    <InfoIcon />
                </IconButton>
                }
            />
            </ImageListItem>
          
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 1,
    cols: 1,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 1,
    cols: 1,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 1,
    cols: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 1,
  },
];
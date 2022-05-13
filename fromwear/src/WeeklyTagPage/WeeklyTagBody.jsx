import * as React from 'react';
import './WeeklyTagPage.css';
import PROFILE from './img/profile.png'

import Header from '../Header/Header'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Footer from '../Footer/Footer.jsx';
import PostWritePage from '../PostWritePage/PostWritePage';
import WeeklyTagBodyM from './WeeklyTagBodyM';

import { useMediaQuery } from 'react-responsive';
import TopMenu from '../BottomNavigation/TopMenu';
import BottomTab from '../BottomNavigation/BottomNavigation';

let link = '';

let link_change = (item, now_user) => {
    item.user.id === now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.user.id
}

export default function WeeklyTagBody({current_next_post_page, now_user,best_posts,ranking_posts, weekly_tag}) {
    const [is_write_page, set_is_write_page] = React.useState(false);
    const isMobile = useMediaQuery({ maxWidth: 391 })


    let handle_write_page = ()=> {
        set_is_write_page(!is_write_page);
	};

    let handleWriteButton = (e) => {
		console.log(now_user);
		if (now_user === "noUser") {
		  alert("로그인이 필요합니다.");
		  return;
		}
		handle_write_page();
	};

    return <div>
        
                {
                    isMobile && !is_write_page &&
                    <TopMenu pos={'290px'} wid={'79px'}/>
                }
                {
                    isMobile &&
                    <BottomTab user={now_user} />
                }
                <div id = 'main_page' style={{marginBottom:isMobile&&'20px'}}>  
                
                    { is_write_page 
                        && <PostWritePage
                            board_type='2'
                            user={now_user}
                            handle_write_page={handle_write_page} 
                            />
                    }
                    
                    <div className = 'banner'>
                        {
                            isMobile?
                            <div className = 'banner_text'>
                                <div style={{marginTop:'20px', marginBottom:'30px'}}>
                                    <span style={{margin:'30px 0px 0px 10px', fontSize:'23px', textAlign:'left'}}>이번주 태그</span>
                                    <span style={{margin:'-2px 0 0 5px', fontSize:'23px', color:'#ffffc6', textShadow:'1px 1px 2px black'}}>TOP4</span>
                                    <span style={{margin:'30px 0px 0px 30px', color:'rgb(82 89 178)'}}>#{weekly_tag[0]} &nbsp;#{weekly_tag[1]}</span>
                                </div>
                                <div style={{margin:'0 0 20px 30px'}}>
                                    <p style={{fontSize:'14px', textAlign:'left'}}>매주 바뀌는 태그에 맞춰서</p>
                                    <p style={{fontSize:'14px', textAlign:'left'}}> <u>#이번주태그</u> 를 걸고 좋아요 랭킹에 도전하자!</p>
                                </div>
                            </div>
                            :
                            <div className = 'banner_text'>
                                <h1 style={{margin:'50px 0px 0px 0px', fontSize:'4em', lineHeight:'2em'}}>이번주 태그&nbsp;<span style={{fontSize:'0.9em', color:'#FFFFFF', textShadow:'3px 3px 3px black'}}>TOP4</span></h1>
                                <h1 style={{fontSize:'1.5em'}}>매주 바뀌는 태그에 맞춰서 <u>#이번주태그</u> 를 걸고 좋아요 랭킹에 도전하자!</h1>
                                <h1 style={{fontSize:'1.7em', fontWeight:'bolder', color:'rgb(82 89 178)'}}>#{weekly_tag[0]} &nbsp;#{weekly_tag[1]}</h1>		
                            </div>
                        }
                        

                        <div className = 'banner_bestpost'>
                        
                                <Stack direction="row" spacing={isMobile?0:1} justifyContent="center" style={{width:isMobile?'390px':'1200px', margin:'auto'}}>
                                    {best_posts.map((item) => 
                                        
                                        (<ImageListItem key={item.img}>
                                            <a className='dimmed' href={'/post/'+item.id}>  
                                                <img className='banner_bestpost_photo' style={{width:isMobile?'97.5px':'250px', height:isMobile?'146.25px':'350px', borderRadius:isMobile?0:16, objectFit:'cover'}}
                                                    src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
                                                    srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
                                                    alt={item.id}
                                                    loading="lazy"
                                                />
                                                {
                                                    isMobile?
                                                    <></>
                                                    :<span className='dimmed_layer' />
                                                }
                                            </a>
                                            
                                            {
                                                isMobile?
                                                <div style={{marginBottom:'10px'}}/>
                                                :
                                                <Stack direction="row" spacing={0} justifyContent="space-between" style={{width:isMobile?'110px':'250px'}}>
                                                    {link_change(item, now_user)}
                                                    <div>
                                                        <div className='innerdiv'>
                                                            <a href={link}>
                                                                <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
                                                                style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
                                                            </a>
                                                            <a href={link}>
                                                                <p style={{margin: '16px 0px'}}>{item.user.name}</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='innerdiv_margin'>
                                                            <p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
                                                            <FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
                                                        </div>
                                                    </div>
                                                </Stack>		
                                            }
                                            		
                                        </ImageListItem>)
                                        
                                        )}
                                </Stack>
                        
                        </div>
                    </div>

                    <div
                        style={{
                            verticalAlign: "center",
                            width: isMobile?'390px':"900px",
                            height: "50px",
                            lineHeight: "50px",
                            margin: "auto",
                            paddingTop: '15px',
                        }}>
                        <Box >
                            <Button
                            variant="contained"
                            sx={{ m: 1.2, minWidth: 100 }}
                            endIcon={<CreateIcon />}
                            onClick={handleWriteButton}
                            style={{
                                height: "35px",
                                fontSize: 14,
                                textAlign: "center",
                                borderRadius: "30px",
                                fontFamily:
                                "'나눔고딕' ,NanumGothic, '돋움' , Dotum, sans-serif",
                                fontWeight: "bold",
                                color: "white",
                                borderColor: "#253861",
                                backgroundColor: "#253861",
                            }}
                            >
                            도전하기
                            </Button>
                        </Box>
                    </div>

                    <div id = 'today_post' class = 'collection'>
                        {/*<h3 className = 'title'>랭킹 5위~</h3>*/}
                        <br></br>
                        
                        <ImageList cols={isMobile?2:5} gap={isMobile?0:8} style={{clear: 'left'}}>
                            {ranking_posts.map((item, index) => (
                                index<(current_next_post_page * 25) &&
                                <ImageListItem key={item.img}>
                                    <a className='dimmed' href={'/post/'+item.id}>  
                                        <img style={{height:"318.18px", width:isMobile?'195px':'209.6px', borderRadius: isMobile? 0 :16, objectFit:'cover'}}
                                            src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
                                            srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
                                            alt={item.user}
                                            loading="lazy"
                                        />
                                        <span className='dimmed_layer' style={{...(isMobile && {borderRadius: 0})}}>	</span>
                                    </a>

                                    <Stack direction="row" spacing={0} justifyContent="space-between">
                                        {link_change(item, now_user)}
                                        <div>
                                            <div className='innerdiv'>
                                                <a href = {link}>
                                                    <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
                                                    style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
                                                </a>
                                                <a href = {link}>
                                                    <p style={{margin: '16px 0px'}}>{item.user.name}</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='innerdiv_margin'>
                                                <p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
                                                <FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
                                            </div>
                                        </div>
                                    </Stack>				
                                </ImageListItem>
                            ))}
                        </ImageList>
                    
                    </div>

                    
                </div>      
                <Footer/>
        
        
    </div> 
}
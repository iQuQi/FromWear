import './MainPage.css';
import BANNER from './img/Main.png'

import Header from '../Header/Header'
import FeedPage from '../FeedPage/FeedPage.jsx'
import Footer from '../Footer/Footer.jsx';

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { API } from 'aws-amplify';
import { listPosts } from '.././graphql/queries';

import { fontWeight } from '@mui/system';
import Box from '@mui/material/Box';
import BottomTab from '../BottomNavigation/BottomNavigation';
import { useMediaQuery } from 'react-responsive';
import MainPageBodyM from './MainPageBodyM';

let link = '';

let link_change = (item, now_user) => {
    item.user.id == now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.user.id
}



export default function MainPageBody({ now_user, best_post_0, best_post_1, best_post_2 }) {
    const isMobile = useMediaQuery({ maxWidth: 391 })
    
    return(
        <div>
            {
            isMobile == false?
            <div>
                <div id = 'main_page'>
                
                    <div style={{width: '100%',backgroundColor: '#c0e0f6',}}>
                        <div className='main_banner'>	
                            <img className='banner_img' src={BANNER} alt='Main banner' style={{height:'650px',width:'1080px',position:'relative',top:'30px'}}/>

                            <div className = 'banner_title'>
                                <p style={{fontSize: '5em', fontWeight: 'bold', marginBottom:'20px', color:'#FFFFFF', textShadow:'3px 3px 3px black'}}>FROMWEAR</p>
                                <p style={{fontSize: '2em', fontWeight:'bolder'}}>옷으로 시작되는 하루</p>
                            </div>

                            <div className = 'banner_title' style={{top: '450px'}}>
                                <p style={{fontSize: '1.3em', margin: '10px 0px'}}>착장 공유부터 스타일 조언까지,</p>
                                <p style={{fontSize: '1.3em', margin: '10px 0px'}}>프롬웨어와 함께 당신의 하루를 시작해요.</p>
                            </div>
                            
                            
                        </div>
                    </div>

                    <div className='contents'>
                        <div id = 'today_post' className = 'main_collection'>
                            <h2 className = 'main_title'>오늘의 착장</h2>
                            <a className = 'main_seemore' href='/todayboard'>둘러보기</a>
                            
                            <ImageList cols={5} gap={8} style={{clear: 'left'}}>
                                {best_post_0.map((item) => (
                                    <ImageListItem key={item.img} >		
                                        <a className='dimmed' href={'/post/'+item.id}> 
                                            <img style={{borderRadius:16, width:'209.6px', height:'322.55px'}}
                                                src={"https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/"+item.img}
                                                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
                                                alt={item.id}
                                                loading="lazy"
                                            />
                                            <span className='dimmed_layer'>	</span>
                                        </a>

                                        <Stack direction="row" spacing={0} justifyContent="space-between">
                                            {link_change(item, now_user)}
                                            <div>
                                                <div className='innerdiv'>
                                                    <a href = {link}>
                                                        <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
                                                        style={{borderRadius:"50%",margin: '7px 5px 7px 3px', width:'20px', height:'20px'}}/>
                                                    </a>
                                                    <a href = {link}>
                                                        <p className='user_name' style={{margin: '9px 0px'}}>{item.user.name}</p>
                                                    </a>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='innerdiv_margin'>
                                                    <p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
                                                    <FavoriteBorderIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
                                                </div>
                                            </div>
                                        </Stack>				
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        
                        </div>

                        <div id = 'help_post' className = 'main_collection'>
                            <h2 className = 'main_title'>도움이 필요해</h2>
                            <a className = 'main_seemore' href='/sosboard'>둘러보기</a>

                            <ImageList cols={5} gap={8}>
                                {best_post_1.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <a className='dimmed' href={'/post/'+item.id}> 
                                            <img style={{borderRadius:16, width:'209.6px', height:'322.55px' }}
                                                src={"https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/"+item.img}
                                                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.id}
                                                loading="lazy"
                                            />
                                            <span className='dimmed_layer'>	</span>
                                        </a>

                                        <Stack direction="row" spacing={0} justifyContent="space-between">
                                            {link_change(item, now_user)}
                                            <div>
                                                <div className='innerdiv'>
                                                    {
                                                        item.blind? <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+'profile_skyblue.jpg'} 
                                                        style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
                                                        : 
                                                        <a href = {link}>
                                                            <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
                                                            style={{borderRadius:"50%",margin: '7px 3px', width:'20px', height:'20px'}}/>
                                                        </a>
                                                    }
                                                    
                                                    {
                                                        item.blind? <p className='user_name' style={{margin: '8px 0px'}}>익명</p>
                                                        : 
                                                        <a href = {link} >
                                                            <p className='user_name' style={{margin: '8px 0px'}}>{item.user.name}</p>
                                                        </a>
                                                    }
                                                </div>
                                            </div>	
                                            <div>
                                                <div className='innerdiv_margin'>
                                                    <p style={{margin: '16px 0px'}}>{item.like_urgent_user_list.items.length}</p>
                                                    <MoodBadIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
                                                </div>
                                            </div>
                                            
                                        </Stack>				
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>

                        <div id = 'weekly_best' className = 'main_collection'>
                            <h2 className = 'main_title'>이번주 태그 랭킹</h2>
                            <a className = 'main_seemore' href='/weeklytag'>둘러보기</a>
                            
                            <ImageList cols={5} gap={8}>
                                {best_post_2.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <a className='dimmed' href={'/post/'+item.id}> 
                                            <img style={{borderRadius:16, width:'209.6px', height:'322.55px'}}
                                                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
                                                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
                                                alt={item.user}
                                                loading="lazy"
                                            />
                                            <span className='dimmed_layer'>	</span>
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
                                                        <p className='user_name' style={{margin: '8px 0px'}}>{item.user.name}</p>
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
                </div>
                <Footer/>
            </div>
            : <MainPageBodyM 
                now_user={now_user}
                best_post_0={best_post_0}
                best_post_1={best_post_1}
                best_post_2={best_post_2}
                />
        }
        </div>
        
        
    )
} 
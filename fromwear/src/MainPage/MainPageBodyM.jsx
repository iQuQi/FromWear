import * as React from 'react';
import BottomTab from '../BottomNavigation/BottomNavigation';
import MyPage from '../MyPage/MyPage';
import MainPageBody from './MainPageBody';
import './MainPage.css';
import TopMenu from '../BottomNavigation/TopMenu';
import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Footer from '../Footer/Footer';

export default function MainPageBodyM({ now_user, best_post_0, best_post_1, best_post_2 }) {
    let link = '';

    let link_change = (item, now_user) => {
        item.user.id == now_user.id ?
        link = '/mypage':
        link = '/userpage/'+item.user.id
    }
    return(
        <div>
            <TopMenu pos={'15px'} wid={'79px'}/>
            <BottomTab user={now_user}/>
            <div className='mobile_wrap' style={{marginTop:'90px'}}>
                <div id='0' className='swiper-container'>
                    <div className='swiper-wrapper'>
                        <div className='swiper-slide'>
                            <a style={{
                                backgroundImage: 'url(C:/Users/user/Desktop/FROMWEAR 스크린샷/배경.jpg)'
                                //backgroundColor: 'black'
                            }} className='imgg'>

                            </a>
                        </div>
                    </div>
                </div>

                <div id='1' className='section_container'>
                    <a href='/todayboard' className='section_title'>               
                        <span>오늘의 착장</span>
                        <ChevronRightIcon style={{marginTop:'-2px', fontSize: '1.3em'}}/>  
                    </a>
                    <div className='slider_top5'>
                        {best_post_0.map((item) => (
                            <div spacing='16' className='slider_content' key={item.id}>
                                <a href={'/post/'+item.id}> 
                                    <img className='userpost_img'
                                        src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.img}`}
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
                                                className='user_img'/>
                                            </a>
                                            <a href = {link}>
                                                <p className='user_name' style={{margin: '9px 0px'}}>{item.user.name}</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='innerdiv_margin'>
                                            <p className='likeurgent_num'>{item.like_urgent_user_list.items.length}</p>
                                            <FavoriteBorderIcon style={{margin: '7px 5px 7px 3px', color:'#000000'}} sx={{fontSize: '1rem'}}/>
                                        </div>
                                    </div>
                                </Stack>	    
                            </div>
                            
                        ))}
                        
                    </div>
                </div>  

                <div id='2' className='section_container'>
                    <a href='/sosboard' className='section_title'>               
                        <span>도움이 필요해</span>
                        <ChevronRightIcon style={{marginTop:'-2px', fontSize: '1.3em'}}/>    
                    </a>
                    <div className='slider_top5'>
                        {best_post_1.map((item) => (
                            <div spacing='16' className='slider_content' key={item.id}>
                                <a href={'/post/'+item.id}> 
                                    <img className='userpost_img'
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
                                            {
                                                item.blind? <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+'profile_skyblue.jpg'} 
                                                className='user_img'/>
                                                : 
                                                <a href = {link}>
                                                    <img src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.user.profile_img} 
                                                    className='user_img'/>
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
                                            <p className='likeurgent_num'>{item.like_urgent_user_list.items.length}</p>
                                            <MoodBadIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1rem'}}/>
                                        </div>
                                    </div>
                                    
                                </Stack>				
                            </div>
                        ))}
                    </div>
                </div>

                <div id='3' className='section_container'>
                    <a href='/weeklytag' className='section_title'>               
                        <span>이번주 태그</span>  
                        <ChevronRightIcon style={{marginTop:'-2px', fontSize: '1.3em'}}/>  
                    </a>
                    <div className='slider_top5'>
                    
                        {best_post_2.map((item) => (
                            <div spacing='16' className='slider_content' key={item.id}>
                                <a href={'/post/'+item.id}> 
                                    <img className='userpost_img'
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
                                                className='user_img'/>
                                            </a>
                                            <a href = {link}>
                                                <p className='user_name' style={{margin: '8px 0px'}}>{item.user.name}</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='innerdiv_margin'>
                                            <p className='likeurgent_num'>{item.like_urgent_user_list.items.length}</p>
                                            <FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1rem'}}/>
                                        </div>
                                    </div>
                                    
                                </Stack>			
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
                   
        </div>
    )
}
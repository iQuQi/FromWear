import { useMediaQuery } from 'react-responsive';
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { styled } from '@mui/material/styles';

import './BottomNavigation.css';

import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme } from '@mui/system';
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from '@emotion/react';
import FeedPage from '../FeedPage/FeedPage';
import FeedPost from '../FeedPage/FeedPost';

const ntheme = createTheme({
    components: {
        MuiBottomNavigationActionLabel: {
            styleOverrides: {
                
                label: {
                    fontSize: '0.7rem',
                },
               
            },
        },
    },
    
});

export default function BottomTab() {
   const isMobile = useMediaQuery({ maxWidth: 391 })
   const [value, setValue] = React.useState(0);
   const [textColor, setTextColor] = React.useState("off");
   const [first, setFirst] = React.useState(true);

   let now_link = window.location.pathname;
   if(now_link=='/feed'){
        console.log(now_link);
   }
   

    return (
        <div style={{ width: '390px' }}>
            {
                isMobile &&
                <Box className="menu_shortcut">
                    
                        <ul>
                            <li>
                                <a href='/' className={now_link=='/'? 'shortcut_home on': 'shortcut_home'}>
                                    <HomeIcon />
                                    <p>홈</p>
                                </a>
                            </li>
                            <li>
                                <a href='/feed' className={now_link=='/feed'? 'shortcut_feed on': 'shortcut_feed'}>
                                    <FormatListBulletedIcon />
                                    <p>피드</p>
                                </a>
                            </li>
                            <li style={{paddingTop:'0px'}}>
                                <a>
                                    <AddCircleIcon className='shortcut_home on' style={{fontSize:'3rem'}}/>
                                </a>
                            </li>
                            <li>
                                <a href='/search' className={now_link=='/search'? 'shortcut_search on': 'shortcut_search'}>
                                    <SearchIcon />
                                    <p>검색</p>
                                </a>
                            </li>
                            <li>
                                <a href='/mypage' className={now_link=='/mypage'? 'shortcut_mypage on': 'shortcut_mypage'}>
                                    <PersonIcon />
                                    <p>마이페이지</p>
                                </a>
                            </li>
                                
                        </ul>
                        
                        
                        
            
                    
                </Box>    

                
                
            }
            
            {
                value==0?
                
                    first? <></>
                    : window.location.href = '/'
                    
                   
                : value==1? window.location.href = '/feed'
                       
                : value==2?
                <p style={{position: "absolute"}}>글쓰기</p>
                : value==3?
                <p style={{position: "absolute"}}>검색</p>
                : value==4?
                <p style={{position: "absolute"}}>마이페이지</p>
                : <p>그냥</p>
            }
        </div>
    )
    
}

/*
<BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
<BottomNavigationAction className={textColor} label="피드" icon={<FormatListBulletedIcon className='shortcut_feed on'/>} />
                        <BottomNavigationAction className={textColor} style={{paddingTop:'0'}} icon={<AddCircleIcon style={{fontSize:'3rem'}} className='shortcut_write on'/>} />
                        <BottomNavigationAction className={textColor} label="검색" icon={<SearchIcon className='shortcut_search on'/>} />
                        <BottomNavigationAction className={textColor} label="마이페이지" icon={<PersonIcon className='shortcut_mypage on'/>} />
                        
                </BottomNavigation>
                        */
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
import IconButton from "@mui/material/IconButton";
import {Button} from "@mui/material";

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

export default function BottomTab({user, handle_write_page}) {
   const isMobile = useMediaQuery({ maxWidth: 391 })
   const [value, setValue] = React.useState(0);
   const [textColor, setTextColor] = React.useState("off");
   const [first, setFirst] = React.useState(true);

   let now_link = window.location.pathname;
  
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
                                <Button onClick={handle_write_page} sx={{padding: 0}}>
                                    <AddCircleIcon className='shortcut_home on' style={{fontSize:'3rem'}}/>
                                </Button>
                            </li>
                            <li>
                                <a href='/search' className={now_link=='/search'? 'shortcut_search on': 'shortcut_search'}>
                                    <SearchIcon />
                                    <p>검색</p>
                                </a>
                            </li>
                            <li>
                                <a href='/mypage' className={now_link=='/mypage'? 'shortcut_mypage on': 'shortcut_mypage'}>
                                    {user.profile_img ?
                                        <IconButton
                                            sx={{
                                                color: "black", height: 24, position: "relative",
                                                marginBottom: '3px'

                                            }}
                                        >

                                            <div
                                                style={{
                                                    backgroundImage:
                                                        "URL(https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/"
                                                        + user.profile_img + ")"
                                                    ,
                                                    width: "24px",
                                                    height: "24px",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: 'center',
                                                    display: 'inline-block',
                                                    borderRadius: '50%',
                                                }}/>

                                        </IconButton> : <PersonIcon/>
                                    }
                                    <p>마이페이지</p>
                                </a>
                            </li>
                                
                        </ul>
                        
                        
                        
            
                    
                </Box>    

                
                
            }
        </div>
    )
    
}

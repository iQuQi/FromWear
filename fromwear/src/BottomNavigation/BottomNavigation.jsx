import { useMediaQuery } from '@mui/material';
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
   // const isMobile = useMediaQuery({ maxWidth: 391 })
   const [value, setValue] = React.useState(0);
   const [textColor, setTextColor] = React.useState("off");

    return (
        <div style={{ width: '390px' }}>
            {
                //isMobile &&
                <Box className="menu_shortcut">
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                     
                        <BottomNavigationAction className={textColor} label="홈" icon={<HomeIcon className='shortcut_home on'/>} />
                        <BottomNavigationAction className={textColor} label="피드" icon={<FormatListBulletedIcon className='shortcut_feed on'/>} />
                        <BottomNavigationAction className={textColor} style={{paddingTop:'0'}} icon={<AddCircleIcon style={{fontSize:'3rem'}} className='shortcut_write on'/>} />
                        <BottomNavigationAction className={textColor} label="검색" icon={<SearchIcon className='shortcut_search on'/>} />
                        <BottomNavigationAction className={textColor} label="마이페이지" icon={<PersonIcon className='shortcut_mypage on'/>} />
            
                    </BottomNavigation>
                </Box>    

                
                
            }
            
            {
                value==0?
                <p style={{position: "absolute"}}>홈</p>
                : value==1?
                <p style={{position: "absolute"}}>피드</p>
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

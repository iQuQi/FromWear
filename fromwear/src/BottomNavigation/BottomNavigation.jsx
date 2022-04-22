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
    return (
        <div>
            {
                //isMobile &&
                <Box className="menu_shortcut" sx={{ width: 390 }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        
                    <StyledEngineProvider injectFirst>
                        <BottomNavigationAction label="홈" icon={<HomeIcon className='shortcut_home on'/>} />
                        <BottomNavigationAction label="피드" icon={<FormatListBulletedIcon className='shortcut_feed on'/>} />
                        <BottomNavigationAction style={{paddingTop:'0'}} icon={<AddCircleIcon style={{fontSize:'3rem'}} className='shortcut_write on'/>} />
                        <BottomNavigationAction label="검색" icon={<SearchIcon className='shortcut_search on'/>} />
                        <BottomNavigationAction label="마이페이지" icon={<PersonIcon className='shortcut_mypage on'/>} />
            
                    </StyledEngineProvider>
                    
     
                    </BottomNavigation>
                </Box>           
            }
        </div>
    )
}

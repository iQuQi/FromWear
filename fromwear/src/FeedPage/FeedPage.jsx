import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import './FeedPage.css';
import MainPage from '../MainPage/MainPage';
import MyPage from '../MyPage/MyPage';
import FeedPost from './FeedPost';
import TitlebarImageList from './FeedPost';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';

import { Auth, API } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import { useMediaQuery } from 'react-responsive';

const drawerWidth = 390;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  marginTop: '40px',
  zIndex: '200',
}));


export default function FeedPage({now_user}) {
  const isMobile = useMediaQuery({ maxWidth: 391 })
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let user = now_user;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  return (
    <Box sx={{ display: 'flex'}}>
      {
        isMobile == false?
        <Toolbar>
          <div className='feed_open'>
            <button className = 'btn_feed_open'
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              style={{ ...(open && { display: 'none' })}}>
              ◀ 피드 보기
            </button>
          </div>
          
        </Toolbar>
        :<></>
      }
        

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
          '.MuiDrawer-paperAnchorDockedRight > div':{
            height:'52px',
            borderTop:'solid 7px lightgray',
            minHeight:'52px',
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <FeedPost user={user}/>
  



      
      </Drawer>
    </Box>
  );
}

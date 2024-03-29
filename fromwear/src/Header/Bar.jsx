import * as React from 'react';
import { API } from 'aws-amplify';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css'
import logo from './image/logo3.png';
import closet from './image/closet.png';

import SelectDay from './SelectDay';
import SelectGender from './SelectGender';
import SelectBoard from './SelectBoard';
import {deleteAlarm} from '../graphql/mutations.js';
import {Button} from '@mui/material';
import SignOutButton from './SignOutButton';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  height: 35,
  width: '700px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme , isMobile}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: isMobile ? 0 : `calc(1em + ${theme.spacing(8)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height:35,
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

function PrimarySearchAppBar({isMobile, handle_inputbase_on_change,handle_select_day,
  handle_select_gender,handle_select_board,handle_login_click, rank_1,user,input}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alarmAnchorEl, setAlarmAnchorEl] = React.useState(null);

  
  const isMenuOpen = Boolean(anchorEl);
  const isAlarmOpen = Boolean(alarmAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleAlarmOpen = (event) => {
    setAlarmAnchorEl(event.currentTarget);
  };



  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
  };
  const handleAlarmClose = e => {
    let index=e.target.value;

    if(user.alarm_list.items[index]){
      API.graphql({
        query: deleteAlarm,
        variables: { input: {
          id: user.alarm_list.items[index].id,

        }}

      }).then(res=>{
        console.log(res);
      })
      .catch(e=>console.log(e));
    }
    setAlarmAnchorEl(null);
  };
  


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{zIndex:140000}}


    >
      <a href="/mypage"><MenuItem style={{fontSize:13,paddingLeft:20}} onClick={handleMenuClose}>마이페이지</MenuItem></a>
      <MenuItem  onClick={handleLogout}><SignOutButton/></MenuItem>
    </Menu>
  );

  const renderAlarm = (
    <Menu
      anchorEl={alarmAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isAlarmOpen}
      onClose={handleAlarmClose}
      style={{zIndex:140000}}
    >
    {
     user.alarm_list?.items.map((item,index)=>{        
        const new_link='/'+item.link;
        return <a href={new_link} key={item.id}><MenuItem style={{fontSize:13}} onClick={handleAlarmClose} value={index}>{item.content}</MenuItem></a>;
      })
   }
    


    </Menu>
  );


 const isSearchPage = window.location.pathname===("/search"||"/search#"||"/search/");
 const isMyPage = window.location.pathname===("/mypage"||"/mypage#"||"/mypage/");

  return (
    <div
        className={'header_appbar'}
        >
      <AppBar
          sx={{ backgroundColor: "white",boxShadow:"0 0 0 0" ,height:'45px',padding: '10px'}} position="static">
        <Toolbar sx={{'&.MuiToolbar-gutters' : {minHeight: '25px', ...(isMobile && {p: 0})}}} >

          {((!isSearchPage && isMobile) || !isMobile)  &&
              <a href="/" style={{height: '40px', width: '120px'}}>
                <img src={closet} alt="closet" className="closet_img"/>
                <img src={logo} alt="logo" className="logo_img"/>
              </a>
          }


          {((isMobile && isSearchPage) || !isMobile ) &&
              <Search
                  style={{ backgroundColor: "#f2f2f2" , width: isMobile? "370px" : "730px", minWidth:"370px",
                    borderRadius: 10,position:"relative"}}>
                <SearchIconWrapper >
                  <SearchIcon style={{ color: "black" }}/>
                </SearchIconWrapper>
                <a href={isSearchPage?"#":"/search"}>
                  <StyledInputBase
                      value={input}
                      isMobile={isMobile}
                      style={{ color: "black", fontSize: "14px",width: isMobile? '80%':"60%",height:35,
                        position:'relative', left:isMobile? '10px': '-30px'}}
                      placeholder={"#오늘의 #태그는 #"+rank_1}
                      onChange={handle_inputbase_on_change}
                  />
                </a>

                <Box sx={{
                  display: 'inline',
                  ...(isMobile && {
                    position: 'absolute',
                    top: '50px',
                    left: 0,
                    '& .MuiInput-underline::before' : {borderBottom: 0},
                  })
                }}>
                  <SelectBoard handle_select_board={handle_select_board}/>
                  <SelectGender handle_select_gender={handle_select_gender}/>
                  <SelectDay handle_select_day={handle_select_day}/>
                </Box>

              </Search>
          }


          <Box sx={{ flexGrow: 1 }} />
          {user!=="noUser"?
          <Box sx={{ display: { xs: 'none', md: 'flex' }, '&.MuiBox-root' : {display: 'flex'} }}>
            {((!isSearchPage && isMobile) || !isMobile) &&
                <IconButton
                    style={{ color: "black", height:40 ,position:"relative", lineHeight: '40px'}}

                    aria-label="show 17 new notifications"
                    onClick={handleAlarmOpen}

                >
                  <NotificationsIcon style={{fontSize:25}}/>
                  <Badge
                      badgeContent={user.alarm_list?.items.length>999?"999+":user.alarm_list?.items.length}
                      color="primary"
                      style={{position:"relative",top:-10}}

                  >
                  </Badge>
                </IconButton>
            }

            {isMobile && isMyPage &&
                <SignOutButton/>
            }
            {!isMobile &&
                <IconButton
                    style={{color: "black", height: 45, position: "relative"}}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                >
                  <span className="bar_user_name ellips">{user.name}</span>
                  <span className="bar_user_name">님</span>
                  <div
                      style={{
                        backgroundImage: "URL(https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/" + user.profile_img + ")"
                        ,
                        width: "30px",
                        height: "30px",
                        backgroundSize: "cover",
                        backgroundPosition: 'center',
                        display: 'inline-block',
                        borderRadius: '50%',
                        marginRight: "5px"
                      }}/>

                </IconButton>
            })

            
          </Box>
          :
          <Button
            className="header_login"
            style={{color:"black"}}
            onClick={handle_login_click}
          >로그인</Button>
          }
        </Toolbar>
      </AppBar>
      {user.alarm_list?.items.length===0?"":renderAlarm}
      {renderMenu}
    </div>
  )
}



export default PrimarySearchAppBar;
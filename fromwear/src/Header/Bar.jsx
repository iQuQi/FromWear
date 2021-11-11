import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import './Header.css'
import logo from './image/logo.png';
import SelectDay from './SelectDay';
import SelectGender from './SelectGender';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

export default function PrimarySearchAppBar() {
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
  const handleAlarmClose = () => {
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
    >
      <MenuItem onClick={handleMenuClose}>마이페이지</MenuItem>
      <MenuItem onClick={handleMenuClose}>로그아웃</MenuItem>
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
    >
      <MenuItem onClick={handleAlarmClose}>"지현"님이 게시글에 좋아요를 눌렀습니다</MenuItem>
      <MenuItem onClick={handleAlarmClose}>연지님이 게시글에 좋아요를 눌렀습니다</MenuItem>
      <MenuItem onClick={handleAlarmClose}>연지님이 게시글에 좋아요를 눌렀습니다</MenuItem>
      <MenuItem onClick={handleAlarmClose}>지민님이 게시글에 댓글을 달았습니다</MenuItem>
      <MenuItem onClick={handleAlarmClose}>지현님이 게시글에 좋아요를 눌렀습니다</MenuItem>
      <MenuItem onClick={handleAlarmClose}>지현님이 유진님을 팔로우 하였습니다</MenuItem>
      <MenuItem onClick={handleAlarmClose}>지민님이 유진님을 팔로우 하였습니다</MenuItem>
      <MenuItem onClick={handleAlarmClose}>연지님이 유진님을 팔로우 하였습니다</MenuItem>


    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar style={{ backgroundColor: "white",boxShadow:"0 0 0 0" }} position="static">
        <Toolbar>
        
          <Typography
            style={{ backgroundColor: "white" }}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <button className="logo_button" >
            <img src={logo} alt="logo" className ="logo_img"/>
            </button>
          </Typography>

          <Search style={{ backgroundColor: "#f2f2f2" , width: "80%",minWidth:"1082px"}}>
            <SearchIconWrapper >
              <SearchIcon style={{ color: "black" }}/>
            </SearchIconWrapper>
            <StyledInputBase
              style={{ color: "black", fontSize: "20px",width: "80%"}}
              placeholder="#오늘의 #태그는 #청순한"
              inputProps={{ 'aria-label': 'search' }}
            />
            <SelectGender/>
            <SelectDay/>
          </Search>

        

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <IconButton
              style={{ color: "black" }}
              size="large"
              aria-label="show 17 new notifications"
              onClick={handleAlarmOpen}

            >
              <Badge 
                badgeContent={17} 
                color="error">
                <NotificationsIcon style={{fontSize:30}}/>
              </Badge>
            </IconButton>
            <IconButton
              style={{ color: "black" }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle style={{fontSize:35}}/>
            </IconButton>
          </Box>
 
        </Toolbar>
      </AppBar>
      {renderAlarm}
      {renderMenu}
    </Box>
  );
}



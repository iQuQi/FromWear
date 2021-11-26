import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';

import CustomizedDialogs from './ShowFollowers.jsx';

import { grey } from '@mui/material/colors';
import { white } from 'jest-matcher-utils/node_modules/chalk';
import { type } from 'os';
const btn = grey[500];

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const EditBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: white[500],
  borderColor: grey[700],
  color: grey[700],
  '&:hover': {
    borderColor: grey[700],
    backgroundColor: grey[200],
  },
  borderRadius: '16px',
}));

const RecoBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: white[500],
  borderColor: grey[700],
  color: grey[700],
  '&:hover': {
    borderColor: grey[700],
    backgroundColor: grey[200],
  },
  borderRadius: '7px',
  minWidth:'23px',
  width:'23px',
  height:'21px',
}));

let Profile = ({ user }) => {
  let taglist = [];
  let postnum = 0;

  if(user.my_tag_list){
    taglist = user.my_tag_list;
    console.log(taglist[0]);
  }

  if(user.my_post_list){
    postnum = user.my_post_list.items.length;
  }
  

  return (
    <div>
      <Paper sx={{ p: 2, margin: 'auto', maxWidth: 880, flexGrow: 1, boxShadow: '0px 0px 0px 0px' }}>
        <Grid container spacing={2}>
          <Grid item>
            <img style={{height:'300px', width:'300px'}}
              src={`${user.profile_img}?w=248&fit=crop&auto=format`}
              srcSet={`${user.profile_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={user.name}
              loading="lazy"
            />
          </Grid>
          <Grid item xs={4} sm container style={{padding:'70px 16px 0px 100px', textAlign:'left'}}>
            <Grid item container direction="row" spacing={2} >
              <Grid item xs={9} style={{padding:'10px', paddingBottom:'0px'}}>
                <h1>
                  {user.name}
                </h1>
              </Grid>
              <Grid item xs={3} style={{  padding: '5px 5px 0px 5px'}}>
                <EditBtn variant='outlined'>
                  프로필 편집
                </EditBtn>
              </Grid>
              <Grid item xs={12} style={{paddingTop:'0px', fontWeight:'border'}} > 
                <ButtonBase  style={{fontWeight:'border'}}>
                  팔로잉 {user.following_num}
                </ButtonBase> &emsp;
                <ButtonBase  style={{fontWeight:'2em'}} >
                  팔로워 {user.follower_num}
                </ButtonBase> &emsp;
                <ButtonBase disabled >
                  채택 {user.adopted}
                </ButtonBase> &emsp;
                <ButtonBase disabled >
                  게시글 {postnum}
                </ButtonBase> 
                
              </Grid>
              <Grid item xs={12} style={{paddingTop:'15px'}}>
                <Typography variant="body1" gutterBottom>
                  {user.introduce}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{paddingTop:'0px'}}>
                <p variant="body2" color="text.secondary" style={{lineHeight:'2em', fontSize:'0.9em'}}>
                  🏆 오늘의 착장 베스트 {user.award_today}회
                </p>
                <p variant="body2" color="text.secondary" style={{fontSize:'0.9em'}}>
                  🏆 이번주 태그 베스트 {user.award_week}회
                </p>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={2} > 
          <Grid item xs={3.2} style={{paddingTop:'36px', paddingLeft:'50px'}}>
            <p>#{taglist[0]} #{taglist[1]} #{taglist[2]}</p>
          </Grid>
          <Grid item xs={0.6} style={{paddingTop:'33px', paddingLeft:'0px'}}>
            <RecoBtn variant='outlined'>▼</RecoBtn>
          </Grid>
        </Grid>
      </Paper>
    
      <hr style={{margin:'20px auto', width:'920px'}}></hr>
    </div>
  )
}
  
export default Profile;
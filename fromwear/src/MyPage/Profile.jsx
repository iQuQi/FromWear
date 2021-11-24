import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import CustomizedDialogs from './ShowFollowers.jsx';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


let Profile = ({ user }) => {
  
  
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 880, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <img style={{height:'300px', width:'300px'}}
            src={`${user.profile_img}?w=248&fit=crop&auto=format`}
            srcSet={`${user.profile_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={user.name}
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12} sm container style={{padding:'50px 16px 0px 100px'}}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <h1 style={{textAlign:'left'}}>
                {user.name}
              </h1>
            </Grid>
            <Grid item xs> 
              <ButtonBase onClick={CustomizedDialogs()} >
                팔로잉 {user.following_num}
              </ButtonBase> &emsp;
              <ButtonBase onClick={CustomizedDialogs} >
                팔로워 {user.follower_num}
              </ButtonBase> &emsp;
              <ButtonBase onClick={CustomizedDialogs} >
                채택 {user.adopted}
              </ButtonBase> &emsp;
              <ButtonBase onClick={CustomizedDialogs} >
                게시글 {user.adopted}
              </ButtonBase> 
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
            </Grid>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
  
export default Profile;

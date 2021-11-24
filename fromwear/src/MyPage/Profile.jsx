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
        <Grid item xs={4} sm container style={{padding:'50px 16px 0px 100px', textAlign:'left'}}>
          <Grid item container direction="column" spacing={2} >
            <Grid item style={{padding:'10px'}}>
              <h1 >
                {user.name}
              </h1>
            </Grid>
            <Grid item dm={1} > 
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
              
            </Grid>
            <Grid item dm={3}>
              <Typography variant="body2" gutterBottom>
                {user.introduce}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
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

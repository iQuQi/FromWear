import {Component} from 'react';
import { API } from 'aws-amplify';
import { listPosts, getPost, listFollows } from '../graphql/queries.js';
import { styled } from '@mui/material/styles';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { grey } from '@mui/material/colors';
//111import { white } from 'jest-matcher-utils/node_modules/chalk';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


let scroll = 'paper';
const RecoBtn = styled(Button)(({ theme }) => ({
    // color: theme.palette.getContrastText(grey[500]),
    //111backgroundColor: white[500],
    borderColor: grey[700],
    color: grey[700],
    '&:hover': {
      //111borderColor: white[500],
      //111backgroundColor: white[500],
    },
    borderRadius: '7px',
    minWidth:'23px',
    width:'23px',
    height:'21px',
}));
const btn = grey[500];

const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: lightgrey;
}`

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

let link = '';

let link_follower = (item, now_user) => {
    item.follower.id == now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.follower.id
}
let link_following = (item, now_user) => {
    item.following.id == now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.following.id
}

export default function ShowFollowers({now_user, user, open, handleClose, mode}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return(
    <div>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth="md"
            minWidth="md"
            width="md"
            maxWidth="md"
        >
            <DialogTitle id="scroll-dialog-title">
                {mode=='following'?
                    <div>
                        팔로잉
                        <RecoBtn onClick={handleClose} style={{fontSize:'1em', position: 'absolute', right:'15px', marginTop:'5px'}}>✕</RecoBtn>
                    </div>      
                : 
                    <div>
                        팔로워
                        <RecoBtn onClick={handleClose} style={{fontSize:'1em', position: 'absolute', right:'15px', marginTop:'5px'}}>✕</RecoBtn>
                    </div>
                }
                
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <Grid container spacing={2} style={{margin:0, width:'100%'}}>
                {mode=='following'?
                    user.following_list.items.map((item) => (
                        <Grid style={{padding:'10px', paddingBottom:'0px'}}>
                            <Stack style={{textAlign:'center'}}>
                                {link_following(item, now_user)}
                                <a href={link}> 
                                    <span className='dimmed_layer'>	
                                        <img className='img_radius followingfollower_img' 
                                            src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.following.profile_img}`}
                                            srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.following.profile_img}`}
                                            alt={item.following.name}
                                            loading="lazy"
                                        />
                                        
                                    </span>
                                </a>
                                
                                <p className='followingfollower_name'>{item.following.name}</p>
                            </Stack>
                        </Grid>
                    ))
                    :
                    user.follower_list.items.map((item) => (
                        <Grid style={{padding:'10px', paddingBottom:'0px'}}>
                            <Stack style={{textAlign:'center'}}>
                                {link_follower(item, now_user)}
                                <a href={link}> 
                                    <span className='dimmed_layer'>	
                                        <img className='img_radius followingfollower_img'
                                            src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.follower.profile_img}`}
                                            srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.follower.profile_img}`}
                                            alt={item.follower.name}
                                            loading="lazy"
                                        />
                                        
                                    </span>
                                </a>
                                
                                <p className='followingfollower_name'>{item.follower.name}</p>
                            </Stack>
                        </Grid>
                    ))
                }
                </Grid>
            </DialogContent>
            <DialogActions>
            
            
            </DialogActions>
        </Dialog>
        </div>
  )
}




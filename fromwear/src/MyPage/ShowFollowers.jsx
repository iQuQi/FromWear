import {Component} from 'react';
import { API } from 'aws-amplify';
import { listPosts, getPost, listFollows } from '../graphql/queries.js';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

let scroll = 'paper';

export default function ShowFollowers({now_user, open, handleClose, follower_list, following_list}) {
    
  return(
    <div>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                {following_list.map((item) => (
                    <div>
                
                    <a href={'/mypage/'+item.id}> 
                    <span className='dimmed_layer'>	
                        <img style={{height:'80px', margin:'auto'}}
                            src={`${item.profile_img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.profile_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.name}
                            loading="lazy"
                        />
                        
                    </span>
                    </a>
                    <br/>
                    <p>{item.name}</p>
                </div>
                ))}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
        </div>
  )
}




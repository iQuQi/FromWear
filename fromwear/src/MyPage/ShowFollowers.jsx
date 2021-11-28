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

export default function ShowFollowers({now_user, open, handleClose}) {
    let follwing_list = [];

    API.graphql({
        query: listFollows,
        variables: { filter: {follower_id: {eq: now_user.id}} }
    })
    .then( res => {
        console.log(res.data.listFollows.items);
        follwing_list = res.data.listFollows.items;
        console.log(follwing_list);
    })
    .catch( e => console.log(e) );
  
    console.log(follwing_list);

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
            <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
            >
                {[...new Array(50)]
                .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
        </div>
  )
}




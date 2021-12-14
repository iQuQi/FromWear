import * as React from 'react';
import { Component } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import MyPostBoard from './MyPostBoard';

import { grey } from '@mui/material/colors';
import { white } from 'jest-matcher-utils/node_modules/chalk';
import MyPageComments from './MyPageComments';
import MyPageBookmark from './MyPageBookmark';
import MyPostBoard_SOS from './MyPostBoard_SOS';
const EditBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: white[500],
    
    color: grey[700],
    padding: '8px 20px',
    '&:hover': {
      borderColor: grey[700],
      backgroundColor: grey[200],
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: grey[200],
        
    },
    '&:focus': {
        
    },
    borderRadius: '0px',
    
  }));

const EditBtnGroup = styled(ButtonGroup)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: white[500],
    borderRight: 'none',
    color: grey[700],
    borderRadius: '0px',
    borderColor: grey[500],
    width: '310',
    padding: '0px'
  }));


export default class MyPageButtonGroup extends Component{
    constructor(props){
        super(props);

        this.state = {
            now_user: props.user,
            btn_clicked: 0
        }
    }
    
    componentDidUpdate(prevProps){
        let {now_user} = this.state;
        if(now_user!=this.props.user){
            this.setState({
                now_user: this.props.user
            })
        }
    }

    set_btn = (i) => {
        this.setState({
            btn_clicked: i
        })
    }
    
    render(){
        console.log(this.state.now_user);

        let {now_user, btn_clicked} = this.state;

        return (
            <div>
            <Box
              sx={{
                borderBottom: 1, borderColor: 'divider', margin:'auto', width: '310px', height:'50px', color:'black',
                padding: '0px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
              }}
            >
             
              <EditBtnGroup variant="text" aria-label="text button group">
                <EditBtn onClick={()=>this.set_btn(1)}>게시판</EditBtn>
                <EditBtn onClick={()=>this.set_btn(2)}>SOS</EditBtn>
                <EditBtn onClick={()=>this.set_btn(3)}>댓글</EditBtn>
                <EditBtn onClick={()=>this.set_btn(4)}>북마크</EditBtn>
              </EditBtnGroup>
            </Box>
            {btn_clicked==0? <MyPostBoard user={now_user} board={20}/> : 
                btn_clicked==1? <MyPostBoard user={now_user} board={20}/> : 
                btn_clicked==2? <MyPostBoard_SOS user={now_user} board={1}/> :
                btn_clicked==3? <MyPageComments user={now_user}/> :
                btn_clicked==4? <MyPageBookmark user={now_user}/> :
                <MyPostBoard user={now_user} board={20}/>
            }
            
            </div>

            
          );
    }
    
  }
  
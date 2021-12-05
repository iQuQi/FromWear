import {Component} from 'react';
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

//import searchSameTagUsers from '../PostBoard/searchSameTagUsers.jsx';
import Slider from 'react-slick';
import { API } from 'aws-amplify';
import { listUsers } from '../graphql/queries.js';

import ShowFollowers from './ShowFollowers.jsx';

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




export default class Profile extends Component {
  constructor(props){
    super();

    this.state = {
      user: props.user,
      tag_user_is_checked: false,
      tag_same_user_list: [],
      following_is_checked: false,
      follower_is_checked: false,
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user){
      this.setState({
        user: this.props.user,
       })
    }
  }

  componentWillMount(){
    this.dialog_get_follow();
  }

  find_same_tag_user = () => {
    let {tag_user_is_checked} = this.state;

    if(tag_user_is_checked){
      this.setState({
        tag_user_is_checked: false
      })
      
    }
    else if(tag_user_is_checked == false){
      this.setState({
        tag_user_is_checked: true,
      })
      this.searchSameTagUsers(this.state.user);
    }
  }

  searchSameTagUsers = () => {
    let {user} = this.state;
    let profileUser = user;

    let same3=[],same2=[],same1=[];
	  let result_user=[];

    
    API.graphql({
        query: listUsers
    }).then(res=>{
        res.data.listUsers.items.map((user)=>{
            // 지금 user와 비교
            if (user.id == profileUser.id) return false;

            //태그 필터링
            let same = 0;
            user.my_tag_list.items.map((user_tag)=>{
                profileUser.my_tag_list.items.map(tag=>{
                    if(user_tag.style_tag.value == tag.style_tag.value) same++;
                })
            })

            //console.log("same: "+ same);
            if(same == 3) same3=[...same3,user]
            else if(same==2) same2=[...same2,user]
            else if(same==1) same1=[...same1,user]
            return true;

        })
        
        same3=same3.sort(function(a,b){return b.follower_num-a.follower_num});
        same2=same2.sort(function(a,b){return b.follower_num-a.follower_num});
        same1=same1.sort(function(a,b){return b.follower_num-a.follower_num});

        result_user=[...same3,...same2,...same1];
  
        this.setState({
          tag_same_user_list: result_user,
        })
    })
    .catch(e=>console.log(e))  
  }

  dialog_click = (mode) => {
    let {following_is_checked, follower_is_checked} = this.state;

    if(mode=='following'){
      if(following_is_checked){   
        this.setState({
          following_is_checked: false,
        })
      }
      else{
        this.setState({
          following_is_checked: true,
        })
      }
    }
    else if(mode=='follower'){
      if(follower_is_checked){   
        this.setState({
          follower_is_checked: false,
        })
      }
      else{
        this.setState({
          follower_is_checked: true,
        })
      }
    }
    
    
  }

  handleClose = () => {
    this.setState({
      dialog_is_checked: false,
    })
  }
  
  dialog_get_follow = () => {
/*
    API.graphql({
      query: listFollows,
      variables: { filter: {follower_id: {eq: this.state.user.id}} }
    })
    .then( res => {
        
    })
    .catch( e => console.log(e) );*/
    /*if(this.state.user.following_list || this.state.user.follower_list){
      if(this.state.user.following_list.items || this.state.user.follower_list.items){
        this.setState({
          following_list: this.state.user.following_list.items,
          follower_list: this.state.user.follower_list.items
        })
      }
      
      API.graphql({
        query: listFollows,
        variables: { filter: {following_id: {eq: this.state.user.id}} }
      })
      .then( res => {
          
      })
      .catch( e => console.log(e) );
  
      
      
    }*/
    
    
  }

  render(){
    if(this.state.user.following_list || this.state.user.follower_list){
      console.log(this.state.user.follower_list.items.length);
    }
    
    console.log(this.state.user.my_tag_list);

    let {user, tag_user_is_checked, tag_same_user_list, following_is_checked, follower_is_checked} = this.state;

    let taglist = [];
    let postnum = 0;

    if(user.my_tag_list){
      if(user.my_tag_list.items){
        taglist = user.my_tag_list.items;
        console.log(taglist);
      }
    }

    if(user.my_post_list){
      postnum = user.my_post_list.items.length;
    }
    

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
    };

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
                  <ButtonBase onClick={() => this.dialog_click('following')} style={{fontWeight:'border'}}>
                    팔로잉 {user.following_list?
                            user.following_list.items.length 
                            : 0
                          }
                    {
                      following_is_checked && user.following_list? 
                      <ShowFollowers 
                        now_user = {user} 
                        open = {following_is_checked}
                        handleClose = {this.handleClose}
                        mode = 'following'
                      />
                      :
                      <p></p>
                    }
                  </ButtonBase> &emsp;
                  <ButtonBase  onClick={() => this.dialog_click('follower')} style={{fontWeight:'border'}}>
                    팔로워 {user.follower_list?
                            user.follower_list.items.length 
                            : 0
                          }
                    {
                      follower_is_checked && user.follower_list? 
                      <ShowFollowers 
                        now_user = {user} 
                        open = {follower_is_checked}
                        handleClose = {this.handleClose}
                        mode = 'follower'
                      />
                      :
                      <p></p>
                    }
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
              {
                user.my_tag_list?
                  <p>#{user.my_tag_list.items[0].style_tag.value} &nbsp;#{user.my_tag_list.items[1].style_tag.value} &nbsp;#{user.my_tag_list.items[2].style_tag.value}</p>
                  :<p></p>    
              }
              

            </Grid>
            <Grid item xs={0.6} style={{paddingTop:'33px', paddingLeft:'0px'}}>
              
              {
                tag_user_is_checked?           
                  <RecoBtn variant='outlined' onClick={this.find_same_tag_user}>▲</RecoBtn> :
                  <RecoBtn variant='outlined' onClick={this.find_same_tag_user}>▼</RecoBtn>   
              }

            </Grid>
          </Grid>
        </Paper>
        {
          tag_user_is_checked?
          <div>
            <hr style={{margin:'20px auto', width:'920px'}}></hr>
            <div className="container" style={{width:'850px', margin:'auto'}}>
              <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
              <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
              <style>{cssstyle}</style>
                <Slider {...settings}>
                  {tag_same_user_list.map((item) => (
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
                  
                  
                </Slider>

                
              </div>
                

          </div>
          :
          <p></p>
        }
      
        <hr style={{margin:'20px auto', width:'920px'}}></hr>
      </div>
    )
  }
}
  

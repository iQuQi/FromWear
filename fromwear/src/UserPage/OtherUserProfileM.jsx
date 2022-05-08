import {Component} from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';

import { grey } from '@mui/material/colors';
import { white } from 'jest-matcher-utils/node_modules/chalk';

//import searchSameTagUsers from '../PostBoard/searchSameTagUsers.jsx';
import Slider from 'react-slick';
import { API } from 'aws-amplify';
import { listUsers } from '../graphql/queries.js';
import { createFollowingFollower, deleteFollowingFollower } from '../graphql/mutations.js'


import ShowFollowers from '../MyPage/ShowFollowers.jsx';

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
  //color: theme.palette.getContrastText(grey[500]),
  backgroundColor: white[500],
  borderColor: grey[700],
  color: grey[700],
  '&:hover': {
    borderColor: grey[700],
    backgroundColor: grey[200],
  },
  borderRadius: '16px',
  fontSize: '0.8rem',
  padding: '3px 10px',
}));

const RecoBtn = styled(Button)(({ theme }) => ({
  //color: theme.palette.getContrastText(grey[500]),
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
      now_user: props.now_user,
      user: props.user,
      tag_user_is_checked: false,
      tag_same_user_list: [],
      following_is_checked: false,
      follower_is_checked: false,
      follow_click: false,
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user){
      this.setState({
        user: this.props.user,
      })
      this.state.user = this.props.user

      if(this.props.now_user !== prevProps.now_user){
        this.setState({
          now_user: this.props.now_user,
        })
        this.state.now_user = this.props.now_user
      }

      if(this.state.user.follower_list){
        this.state.user.follower_list.items.map((data) => {
          if(data.follower_id==this.state.now_user.id){
            this.setState({
              follow_click: true,
            })
          }
        })
      }
    }
    
      
    
    if(this.props.now_user !== prevProps.now_user){
      this.setState({
        now_user: this.props.now_user
      })
      this.state.now_user = this.props.now_user
      if(this.state.now_user.following_list){
        this.state.now_user.following_list.items.map((data) => {
          if(data.following_id==this.state.user.id){
            this.setState({
              follow_click: true,
            })
          }
        })
      }
    }
     
  }

  componentDidMount(){
    if(this.state.user!=undefined)  {
      this.find_from_follower_list();
    }   
  }

  find_from_follower_list = () => {
    let {user, now_user} = this.state;
    if(now_user.following_list){
      now_user.following_list.items.map((data) => {
        if(data.following_id==user.id){
          this.setState({
            follow_click: true,
          })
        }
      })
    }
    /*if(user.follower_list){
      user.follower_list.items.map((data) => {
        if(data.follower_id==now_user.id){
          this.setState({
            follow_click: true,
          })
        }
      })
    }*/
    
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
      dialog_is_checked: !this.state.dialog_is_checked,
    })
  }

  handle_follow = () => {
    if(this.state.follow_click==false){
      API.graphql({
        query: createFollowingFollower,
        variables:{ input: { id:this.state.now_user.id+this.state.user.id, follower_id:this.state.now_user.id, following_id:this.state.user.id } }
      })
      .then(res => {
        this.setState({
          follow_click: !this.state.follow_click
        })
      })
      .then(res => {
        window.location.reload();
      })
      .catch(e => console.log(e))
      
    }
    if(this.state.follow_click==true){
      API.graphql({
        query: deleteFollowingFollower,
        variables:{ input: { id:this.state.now_user.id+this.state.user.id } }
      })
      .then(res => {
        this.setState({
          follow_click: !this.state.follow_click
        })
      })
      .then(res => {
        window.location.reload();
      })
      .catch(e => console.log(e))
    }
    
    
  }
  

  render(){
/*    if(this.state.user.following_list || this.state.user.follower_list){
      console.log(this.state.user.follower_list.items.length);
    }*/
    

    let {now_user, follow_click, user, tag_user_is_checked, tag_same_user_list, following_is_checked, follower_is_checked} = this.state;

    let taglist = [];
    let postnum = 0;

    if(user.my_tag_list){
      if(user.my_tag_list.items){
        taglist = user.my_tag_list.items;
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
      <div id='profile'>
            <header>
                <div className='img_radius' 
                    style={{height:'200px', width:'200px', margin:'20px auto',
                    backgroundPosition: 'center',
                    backgroundImage:"url("+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+this.state.user.profile_img+")",
                    backgroundSize:"cover"}}
                    alt={user.name}
                    loading="lazy"
                />

                <div style={{margin: '10px 0 30px 0'}}> 
                    {
                    user.my_tag_list?
                        user.my_tag_list.items.length!=0?
                        
                        user.my_tag_list.items.sort((a,b)=>a.style_tag.id-b.style_tag.id).map(item=>
                        <span>#{item.style_tag.value}&nbsp;</span> 
                        )
                        
                        :<p></p>    
                        :<p></p>    
                    }

                    {
                    tag_user_is_checked?           
                        <RecoBtn variant='outlined' onClick={this.find_same_tag_user}>▲</RecoBtn> :
                        <RecoBtn variant='outlined' onClick={this.find_same_tag_user}>▼</RecoBtn>   
                    }
                </div>

                <section>
                    <p>
                        <span style={{margin:'0 20px', fontSize:'1.2rem', fontWeight:'600', paddingTop:'3px'}}>
                            {user.name}    
                        </span>
                        <EditBtn variant='outlined' onClick={this.handle_follow}>
                            {follow_click?'팔로우 취소'
                            :'팔로우하기'
                            }
                            
                        </EditBtn>
                    </p>
                    
                </section>
            </header>

            <ul>
                <li>
                    <ButtonBase onClick={() => this.dialog_click('following')} style={{fontWeight:'border'}}>
                        팔로잉 {user.following_list?
                                user.following_list.items.length 
                                : 0
                                }
                        {
                            following_is_checked && user.following_list? 
                            <ShowFollowers 
                                now_user = {now_user} 
                                user = {user} 
                                open = {following_is_checked}
                                handleClose = {this.handleClose}
                                mode = 'following'
                            />
                            :
                            <p></p>
                        }
                    </ButtonBase>
                </li>
                <li>
                    <ButtonBase  onClick={() => this.dialog_click('follower')} style={{fontWeight:'border'}}>
                        팔로워 {user.follower_list?
                                user.follower_list.items.length 
                                : 0
                            }
                        {
                        follower_is_checked && user.follower_list? 
                        <ShowFollowers 
                            now_user = {now_user}
                            user = {user} 
                            open = {follower_is_checked}
                            handleClose = {this.handleClose}
                            mode = 'follower'
                        />
                        :
                        <p></p>
                        }
                    </ButtonBase> 
                </li>
                <li>
                    <ButtonBase disabled >
                        채택 {user.adopted}
                    </ButtonBase>
                </li>
                <li>
                    <ButtonBase disabled >
                        게시글 {postnum}
                    </ButtonBase> 
                </li>
            </ul>          
          
            <div>
                <p className='profile_award'>
                    🏆 오늘의 착장 베스트 {user.award_today}회
                </p>
                <p className='profile_award'>
                    🏆 이번주 태그 베스트 {user.award_week}회
                </p>
            </div>

            <div className='devider'></div>

            <div>
                <p className='profile_intro'>
                    {user.introduce}
                </p>
            </div>
                
               
          
        {
          tag_user_is_checked?
          <div>
            <hr style={{margin:'20px auto', width:'100%'}}></hr>
            <div className="container" style={{width:'100%', margin:'auto'}}>
              <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
              <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
              <style>{cssstyle}</style>
                <Slider {...settings}>
                  {tag_same_user_list.map((item) => (
                    <div>
            
                      <a href={'/userpage/'+item.id}> 
                        <span className='dimmed_layer'>	
                          <img className='img_radius' style={{height:'50px', width:'50px', margin:'auto', objectFit:'cover'}}
                              src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.profile_img}`}
                              srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${item.profile_img}`}
                              alt={item.name}
                              loading="lazy"
                          />
                          
                        </span>
                      </a>
                      <br/>
                      <p className='name_ellipsis' style={{fontSize:'0.8rem'}}>{item.name}</p>
                    </div>
                  ))}
                  
                  
                </Slider>

                
              </div>
                

          </div>
          :
          <p></p>
        }
      
        <hr style={{margin:'20px auto 0 auto', width:'100%', borderLeft:0, borderRight:0}}></hr>
      </div>
    )
  }
}
  

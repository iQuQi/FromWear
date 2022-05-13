import {Component} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//post board

import './MyPostBoard.css';
import './MyPage.css';


//dimmed grid box
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import MoodBadIcon from '@mui/icons-material/MoodBad';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#ffffff',
  fontWeight: 'border',
  height: '20px',
  backgroundColor: 'rgba(0,0,0,0)',
  boxShadow: 'none',
}));


export default class TodayPostBoardPosts extends Component {
    constructor(props) {
		super(props);

		this.state = {
            post_state: 1,
            filter_gender: "",
            filter_day: "",
            user: props.user,
            board: props.board,
            post_list: [],
            count: 0,
            current_next_post_page: 1,
            is_mobile: props.is_mobile,
            sortVal: '',
		}
        
	}

    
    componentDidUpdate(){    
        let {user,count} = this.state;
        if(user!=this.props.user){
            this.setState({
                user: this.props.user
            })
            if(this.props.user.my_post_list!=undefined){
                if(this.props.board==1){
                    this.setState({
                        post_list : this.props.user.my_post_list.items.filter((item)=>{
                            return item.board_type==1
                        }).sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)})
                    })         
                }
                else{
                    this.setState({
                        post_list : this.props.user.my_post_list.items.filter((item)=>{
                            return item.board_type!=1
                        })
                    }) 
                }
            }
            count++;
        }
        if(user=={}){
            this.setState({
                user: this.props.user,
                post_list: this.props.user.my_post_list.items
            })
        }
        
           
    }

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        this.get_posts();
    }
    componentWillUnmount(){
		window.removeEventListener("scroll", this.handleScroll);
	}

    handleScroll = () => {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;
		const clientHeight = document.documentElement.clientHeight;
		if (scrollTop + clientHeight + 1 >= scrollHeight) {
		  // 페이지 끝에 도달하면 추가 데이터를 받아온다
		  this.setState({
			current_next_post_page: this.state.current_next_post_page+1
			})
		}
	}

    get_posts = () => {
        if(this.state.user.my_post_list!=undefined){
            if(this.state.board==1){
                this.setState({
                    post_list : this.state.user.my_post_list.items.filter((item)=>{
                        return item.board_type==1
                    }).sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)})
                })         
            }
            else{
                this.setState({
                    post_list : this.state.user.my_post_list.items.filter((item)=>{
                        return item.board_type!=1
                    }).sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)})
                }) 
            }
        }
    }

	handleSortLike = (e) => {

		this.setState({
            post_state: 1,
            post_list: this.state.post_list.sort(function(a,b){return b.like_user_num-a.like_user_num})
        })
	}

	handleSortView = (e) => {

		this.setState({
            post_state: 2,
            post_list: this.state.post_list.sort(function(a,b){return b.click_num-a.click_num})
        });
	}

    consolePrint = () => {
        console.log("success");
    }

	handleSortReply = (e) => {

        this.setState({
            post_state: 3,
            post_list: this.state.post_list.sort(function(a,b){return b.comment_list.items.length-a.comment_list.items.length})
        });

        
        this.consolePrint();
	}

	handleSortLatest = (e) => {
        //console.log(this.state.post_list.sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)}));
		this.setState({
            post_state: 4,
            post_list: this.state.post_list.sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)})
        })
	}

    handle_select_sort = (e) => {
        const sort = e.target.value;
        this.setState({ sortVal: sort });
    
        switch(sort) {
          case '':
            this.handleSortLatest(e);
            break;
          case 10:
            this.handleSortView(e);
            break;
          case 20:
            this.handleSortReply(e);
            break;
          case 30:
          case 40:
            this.handleSortLike(e);
            break;
          default:
            break;
        }
      };


    render() {


		let {user, sortVal, post_list, current_next_post_page, is_mobile} = this.state;

        return (<div id = 'contents'>

            {
                is_mobile?
                <div style={{height: '50px', float:'right'}}>

                <Box className="filter_layout" style={{}}>
                    <FormControl sx={{ m: 1.2, minWidth: 70 }}>
                        <Select
                            style={{
                                height: is_mobile? '30px':"35px",
                                fontSize: 14,
                                textAlign: "center",
                                borderRadius: "30px",
                                fontFamily:
                                    "'나눔고딕' ,NanumGothic, '돋움' , Dotum, sans-serif",
                                fontWeight: "bold",
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortVal}
                            onChange={this.handle_select_sort}
                            displayEmpty
                        >
                            <MenuItem style={{ fontSize: 13 }} value="">
                            최신순
                            </MenuItem>
                            <MenuItem style={{ fontSize: 13 }} value={10}>
                            조회수순
                            </MenuItem>
                            <MenuItem style={{ fontSize: 13 }} value={20}>
                            댓글순
                            </MenuItem>
                            
                            <MenuItem style={{ fontSize: 13 }} value={40}>
                                급해요순
                            </MenuItem>:
                                

                        </Select>
                    </FormControl>
              </Box>
              </div>
              :
                <form className="my_sort_font my_select_sort">
                    <input type="radio" id="sort_like" name="sort" onChange={this.handleSortLike}></input>
                    <label htmlFor="sort_like">급해요순</label>
                    <input type="radio" id="sort_view" name="sort" onChange={this.handleSortView}></input>
                    <label htmlFor="sort_view">조회수순</label>
                    <input type="radio" id="sort_reply" name="sort" onChange={this.handleSortReply}></input>
                    <label htmlFor="sort_reply">댓글순</label>
                    <input type="radio" id="sort_latest" name="sort" defaultChecked onChange={this.handleSortLatest}></input>
                    <label htmlFor="sort_latest">최신순</label>

                </form>
            }
            <br style={{clear:'right'}}/>

            <div id = 'today_post' >
                {post_list?
                    post_list?
                <ImageList cols={3} gap={is_mobile?1:8} style={{clear: 'left'}}>
                    {
                    post_list.map((post, index) => (
                        index<(current_next_post_page * 9) &&
                        <ImageListItem key={post.id} className='mypage_image_list_item'>
                            <img 
                                className='mypage_post_img'
                                style={{height : is_mobile?'130px':'322.55px'}}
                                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format`}
                                srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={user.name}
                                loading="lazy"
                            />
                            
                            <a href={'/post/'+post.id}> 
                                <span className='dimmed_layer'>	
                                    <span className='dimmed_info' >
                                        <Box style={{width: '40px'}}>
                                            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                                <Grid item xs={4}>
                                                    <Item><MoodBadIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{post.like_urgent_user_list.items.length}</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item><VisibilityIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{post.click_num}</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item><CommentIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{post.comment_list.items.length}
                                                    </Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </span>
                                
                                </span>
                            </a>
                        </ImageListItem>
                    ))}
                </ImageList>
                :<p></p>
                : <p></p>
                }
            </div>
        </div>)
    }
}
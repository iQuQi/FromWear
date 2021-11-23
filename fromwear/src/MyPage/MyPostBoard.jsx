import {Component} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//post board
import dayFilter from '../PostBoard/dayFilter';
import genderFilter from '../PostBoard/genderFilter';
import './MyPostBoard.css';
import './MyPage.css';
import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';
import { textAlign } from '@mui/system';

//dimmed grid box
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';


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
		super();

		this.state = {
            post_state: 1,
            filter_gender: "",
            filter_day: "",
            post_list:[],
            now_user_id: props.userid,
		}

	}

    componentWillMount() {
        console.log(this.state.now_user_id);
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {user_id: {eq: this.state.now_user_id}}}})
        .then(res => {
            this.setState({
                post_list: res.data.listPosts.items
            })    
            this.handleSortView();        
        })
        .catch(e => console.log(e));
        
    }

	handleSortLike = (e) => {
		console.log("like");
        
		this.setState({
            post_state: 1,
            post_list: this.state.post_list.sort(function(a,b){return b.like_user_num-a.like_user_num})
        })

        console.log(this.state.post_list);
	}

	handleSortView = (e) => {
		console.log("view");
        console.log(this.state.post_list);
		this.setState({
            post_state: 2,
            post_list: this.state.post_list.sort(function(a,b){return b.click_num-a.click_num})
        });
	}

    consolePrint = () => {
        console.log(this.state.post_list[0].comment_list.items);
    }

	handleSortReply = (e) => {
		console.log("reply");
		API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
			.then(res => {
                this.setState({
                post_state: 3,
                post_list: res.data.listPosts.items.sort(function(a,b){return b.comment_list.items-a.comment_list.items}) 
            })
        })
			.catch(e => console.log(e));

        API.graphql({ 
            query: listPosts, 
            variables: { filter: {board_type: {ne: 1}}}})
            .then(res => {
                console.log(Object.values(res.data.listPosts.items[0])); 
            })
        .catch(e => console.log(e));
        this.consolePrint();
	}

	handleSortLatest = (e) => {
		console.log("Latest");
		this.setState({
            post_state: 4,
            post_list: this.state.post_list.sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt)})
        })
	}


    render() {
		let {post_state, post_list} = this.state;

        return (<div>

            <form className="sort_font select_sort">
                <input type="radio" id="sort_like" name="sort" defaultChecked onChange={this.handleSortLike}></input>
                <label htmlFor="sort_like">좋아요순</label>
                <input type="radio" id="sort_view" name="sort" onChange={this.handleSortView}></input>
                <label htmlFor="sort_view">조회수순</label>
                <input type="radio" id="sort_reply" name="sort" onChange={this.handleSortReply}></input>
                <label htmlFor="sort_reply">댓글순</label>
                <input type="radio" id="sort_latest" name="sort" onChange={this.handleSortLatest}></input>
                <label htmlFor="sort_latest">최신순</label>

            </form>
            <genderFilter />
            {/* <genderFilter style={{width:100,height:100}} handle_select_gender={this.handle_select_gender}/> */}
            {/* <dayFilter handle_select_day={this.handle_select_day}/> */}
            
            <div id = 'today_post' className = 'mypage_collection'>
                <ImageList cols={3} gap={8} style={{clear: 'left'}}>
                    {post_list.map((post) => (
                        
                        <ImageListItem key={post.id} className='mypage_image_list_item'>
                            <img style={{height:'322.55px'}}
                                src={`${post.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={post.user.name}
                                loading="lazy"
                            />
                            
                            <a href={'/post/'+post.id}> 
                                <span className='dimmed_layer'>	
                                    <span className='dimmed_info' >
                                        <Box style={{width: '40px'}}>
                                            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                                <Grid item xs={4}>
                                                <Item><FavoriteIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                <Item>{post.like_user_num}</Item>
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
                                                <Item>{post.comm}</Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </span>
                                
                                </span>
                            </a>


                            				
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>)
    }
}
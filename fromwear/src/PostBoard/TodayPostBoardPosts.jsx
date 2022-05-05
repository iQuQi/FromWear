import * as React from 'react';
import {Component} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography  from '@mui/material/Typography';
import FlagIcon from '@mui/icons-material/Flag';
import CommentIcon from '@mui/icons-material/Comment';
import CreateIcon from '@mui/icons-material/Create';

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import defaultImg from '../PostView/Imgs/profile_skyblue.jpg';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import './CSS/TodayPostBoardPosts.css';
import { Box } from '@mui/system';
import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';
import { ThirtyFpsTwoTone } from '@mui/icons-material';
import { integerPropType } from '@mui/utils';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { ConsoleSqlOutlined } from '@ant-design/icons';

let link = '';

let link_change = (item, now_user) => {
    item.user.id == now_user.id ?
    link = '/mypage':
    link = '/userpage/'+item.user.id
}

export default class TodayPostBoardPosts extends Component {
  constructor(props) {
    super();

    this.state = {
      post_state: 4,
      genderVal: "",
      filter_gender: "",
      dayVal: "",
      filter_day: -1,
      post_list: [],

      board_type: props.board_type,
      user: props.user,
      current_next_post_page: 1,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ user: this.props.user });
    }
  }

  componentDidMount(){
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener("scroll", this.handleScroll);

	}

  componentWillMount() {
    this.handleFilteredData(this.state.post_state);
  }

  handleScroll = () => {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;
		const clientHeight = document.documentElement.clientHeight;
		if (scrollTop + clientHeight >= scrollHeight) {
		  // 페이지 끝에 도달하면 추가 데이터를 받아온다
		  this.setState({
			current_next_post_page: this.state.current_next_post_page+1
			})
		}
	}

  handleFilteredData = (sortVal) => {
    if (this.state.board_type == "0") {
      API.graphql({
        query: listPosts,
        variables: { filter: { board_type: { eq: 0 } } },
      })
        .then((res) => {
          let posts = res.data.listPosts.items.filter((post) => {
            //날짜 필터링

            let basis = new Date();
            if (this.state.filter_day == 10) {
              //오늘
              var base_y = basis.getFullYear();
              var base_m = basis.getMonth() + 1;
              var base_d = basis.getDate();
              var today_y = new Date(post.createdAt).getFullYear();
              var today_m = new Date(post.createdAt).getMonth() + 1;
              var today_d = new Date(post.createdAt).getDate();
              console.log(
                "today",
                post.id,
                base_y,
                base_m,
                base_d,
                today_y,
                today_m,
                today_d
              );

              if (
                !(base_y == today_y && base_m == today_m && base_d == today_d)
              ) {
                return false;
              }
            } else if (this.state.filter_day == 20) {
              //일주일
              basis.setDate(basis.getDate() - 7);
              if (new Date(post.createdAt) < basis) return false;
            } else if (this.state.filter_day == 30) {
              //한달
              basis.setMonth(basis.getMonth() - 1);

              if (new Date(post.createdAt) < basis) return false;
            } else if (this.state.filter_day == 40) {
              //6개월
              basis.setMonth(basis.getMonth() - 6);
              if (new Date(post.createdAt) < basis) return false;
            } else if (this.state.filter_day == 50) {
              //1년
              basis.setFullYear(basis.getFullYear() - 1);
              if (new Date(post.createdAt) < basis) return false;
            }

            if (
              this.state.filter_gender != "" &&
              this.state.filter_gender != post.user.gender
            )
              return false;

            return true;
          });
          if (sortVal == 1) {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return (
                  b.like_urgent_user_list.items.length -
                  a.like_urgent_user_list.items.length
                );
              }),
            });
          } else if (sortVal == 2) {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return b.click_num - a.click_num;
              }),
            });
          } else if (sortVal == 3) {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return (
                  b.comment_list.items.length - a.comment_list.items.length
                );
              }),
            });
          } else {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }),
            });
          }
        })
        .catch((e) => console.log(e));
    } else {
      API.graphql({
        query: listPosts,
        variables: { filter: { board_type: { eq: 1 } } },
      })
        .then((res) => {
          let posts = res.data.listPosts.items.filter((post) => {
            //날짜 필터링

            let basis = new Date();
            if (this.state.filter_day == 10) {
              //오늘
              var base_y = basis.getFullYear();
              var base_m = basis.getMonth() + 1;
              var base_d = basis.getDate();
              var today_y = new Date(post.createdAt).getFullYear();
              var today_m = new Date(post.createdAt).getMonth() + 1;
              var today_d = new Date(post.createdAt).getDate();
              console.log(
                "today",
                post.id,
                base_y,
                base_m,
                base_d,
                today_y,
                today_m,
                today_d
              );

              if (
                !(base_y == today_y && base_m == today_m && base_d == today_d)
              ) {
                return false;
              }
            } else if (this.state.filter_day == 20) {
              //일주일
              basis.setDate(basis.getDate() - 7);
              if (new Date(post.createdAt) < basis) return false;
            } else if (this.state.ilter_day == 30) {
              //한달
              console.log("created:" + new Date(post.createdAt));

              basis.setMonth(basis.getMonth() - 1);
              console.log("basis: " + basis);
              console.log(new Date(post.createdAt) < basis);

              if (new Date(post.createdAt) < basis) return false;
            } else if (this.state.filter_day == 40) {
              //6개월
              basis.setMonth(basis.getMonth() - 6);
              if (new Date(post.createdAt) < basis) return false;
            } else if (this.state.filter_day == 50) {
              //1년
              basis.setFullYear(basis.getFullYear() - 1);
              if (new Date(post.createdAt) < basis) return false;
            }

            if (
              this.state.filter_gender != "" &&
              this.state.filter_gender != post.user.gender
            )
              return false;

            return true;
          });
          if (sortVal == 1) {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return (
                  b.like_urgent_user_list.items.length -
                  a.like_urgent_user_list.items.length
                );
              }),
            });
          } else if (sortVal == 2) {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return b.click_num - a.click_num;
              }),
            });
          } else if (sortVal == 3) {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return (
                  b.comment_list.items.length - a.comment_list.items.length
                );
              }),
            });
          } else {
            this.setState({
              post_state: sortVal,
              post_list: posts.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }),
            });
          }
        })
        .catch((e) => console.log(e));
    }
    console.log(this.state.post_list);
  };

  handleSortLike = (e) => {
    console.log("like");
    this.handleFilteredData(1);
  };

  handleSortView = (e) => {
    console.log("view");
    this.handleFilteredData(2);
  };

  handleSortReply = (e) => {
    console.log("reply");
    this.handleFilteredData(3);
  };

  handleSortLatest = (e) => {
    console.log("Latest");
    this.handleFilteredData(4);
  };

  handlePostAgain = () => {
    let { post_state } = this.state;
    this.handleFilteredData(post_state);
  };

  handle_select_gender = (e) => {
    this.setState({ genderVal: e.target.value });
    let select = e.target.value;
    let gender = "";
    if (select == 10) gender = "F";
    else if (select == 20) gender = "M";

    this.setState({
      filter_gender: gender,
    });
    this.handlePostAgain();
  };

  handle_select_day = (e) => {
    this.setState({ dayVal: e.target.value });
    let select = e.target.value;
    let day = -1;
    if (day < select) day = select;

    this.setState({
      filter_day: day,
    });
    this.handlePostAgain();
  };

  handleWriteButton = (e) => {
    if (this.state.user == "noUser") {
      alert("로그인이 필요합니다.");
      return;
    }
    this.props.handle_write_page();
  };

  render() {
    let { post_state, post_list, user } = this.state;
    let { genderVal, dayVal, board_type, current_next_post_page } = this.state;

    return (
      <article className="wrap_recommend">
        <form className="sort_font select_sort">
          <input
            type="radio"
            id="sort_latest"
            name="sort"
            defaultChecked
            onChange={this.handleSortLatest}
          ></input>
          <label htmlFor="sort_latest">최신순</label>
          <input
            type="radio"
            id="sort_like"
            name="sort"
            onChange={this.handleSortLike}
          ></input>
          {board_type == 0 ? (
            <label htmlFor="sort_like">좋아요순</label>
          ) : (
            <label htmlFor="sort_like">급해요순</label>
          )}
          <input
            type="radio"
            id="sort_view"
            name="sort"
            onChange={this.handleSortView}
          ></input>
          <label htmlFor="sort_view">조회수순</label>
          <input
            type="radio"
            id="sort_reply"
            name="sort"
            onChange={this.handleSortReply}
          ></input>
          <label htmlFor="sort_reply">댓글순</label>
        </form>
        <div
          style={{
            verticalAlign: "center",
            height: "50px",
            lineHeight: "50px",
          }}
        >
          <Box className="filter_layout">
            <Button
              variant="contained"
              sx={{ m: 1.2, minWidth: 100 }}
              endIcon={<CreateIcon />}
              onClick={this.handleWriteButton}
              style={{
                height: "35px",
                fontSize: 14,
                textAlign: "center",
                borderRadius: "30px",
                fontFamily:
                  "'나눔고딕' ,NanumGothic, '돋움' , Dotum, sans-serif",
                fontWeight: "bold",
                color: "white",
                borderColor: "#253861",
                backgroundColor: "#253861",
              }}
            >
              글쓰기
            </Button>
          </Box>
          <Box className="filter_layout">
            <FormControl sx={{ m: 1.2, minWidth: 100 }}>
              <Select
                style={{
                  height: "35px",
                  fontSize: 14,
                  textAlign: "center",
                  borderRadius: "30px",
                  fontFamily:
                    "'나눔고딕' ,NanumGothic, '돋움' , Dotum, sans-serif",
                  fontWeight: "bold",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genderVal}
                onChange={this.handle_select_gender}
                displayEmpty
              >
                <MenuItem style={{ fontSize: 13 }} value="">
                  성별
                </MenuItem>
                <MenuItem style={{ fontSize: 13 }} value={10}>
                  여자
                </MenuItem>
                <MenuItem style={{ fontSize: 13 }} value={20}>
                  남자
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="filter_layout">
            <FormControl sx={{ m: 1.2, minWidth: 100 }}>
              <Select
                style={{
                  height: "35px",
                  fontSize: 14,
                  textAlign: "center",
                  borderRadius: "30px",
                  fontFamily:
                    "'나눔고딕' ,NanumGothic, '돋움' , Dotum, sans-serif",
                  fontWeight: "bold",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dayVal}
                onChange={this.handle_select_day}
                displayEmpty
              >
                <MenuItem style={{ fontSize: 13 }} value="">
                  기간
                </MenuItem>
                <MenuItem style={{ fontSize: 13 }} value={10}>
                  오늘
                </MenuItem>
                <MenuItem style={{ fontSize: 13 }} value={20}>
                  일주일
                </MenuItem>
                <MenuItem style={{ fontSize: 13 }} value={30}>
                  한달
                </MenuItem>
                <MenuItem style={{ fontSize: 13 }} value={40}>
                  6개월
                </MenuItem>
                <MenuItem style={{ fontSize: 13 }} value={50}>
                  1년
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div id="today_post" className="collection">
          {post_list.length != 0 ? (
            <div>
              <ImageList cols={5} gap={8} style={{ clear: "left" }}>
                {post_list.map((post, index) =>
                  index < current_next_post_page * 25 && (
                    <ImageListItem
                      key={post.id}
                      className="today_image_list_item"
                    >
                      <img
                        style={{ height: "318.18px", borderRadius: 16 }}
                        src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format`}
                        srcSet={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={post.user.name}
                        loading="lazy"
                      />
                      <a href={"/post/" + post.id}>
                        <span className="dimmed_layer" > </span>
                      </a>
                      <Stack direction="row" spacing={0}>
                      {link_change(post, user)}

                        <div className="user_profile">
                          {board_type == 1 && post.blind == true ? (
                            <span className='ellips' style={{width:'150px',height: '40px',textAlign:'left' }}>
                              <img
                                src={defaultImg}
                                alt="기본프로필이미지"
                                style={{
                                  margin: "7px 3px 7px 5px",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                }}
                              />
                              <span style={{position:'relative',bottom:'13px'}}>익명</span>
                            </span>
                          ) : (
                            <span className='ellips' style={{width:'150px',height: '40px',textAlign:'left' }}  >
                              <a href = {link} style={{width:'100px'}}>
                              <img
                                src={`https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/${post.user.profile_img}`}
                                alt="프로필이미지"
                                style={{
                                  margin: "0 3px 0 5px",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  position:'relative',
                                  top:'5px',
                                }}
                              />
                               {post.user.name}
                              </a>
                            </span>
                          )}
                        </div>
                        {(post_state == 1 || post_state == 4) && (
                          <div className="user_like">
                            <p style={{ margin: "16px 0px" }}>
                              {post.like_urgent_user_list.items.length}
                            </p>
                            {board_type == "0" ? (
                              <FavoriteBorderIcon
                                style={{
                                  margin: "7px 5px 7px 3px",
                                  color: "#000000",
                                }}
                                sx={{ fontSize: "1.1rem" }}
                              />
                            ) : (
                              <MoodBadIcon
                                style={{
                                  margin: "7px 5px 7px 3px",
                                  color: "#000000",
                                }}
                                sx={{ fontSize: "1.1rem" }}
                              />
                            )}
                          </div>
                        )}
                        {post_state == 2 && (
                          <div className="user_like">
                            <p style={{ margin: "16px 0px" }}>
                              {post.click_num}
                            </p>
                            <VisibilityIcon
                              style={{
                                margin: "7px 5px 7px 3px",
                                color: "#000000",
                              }}
                              sx={{ fontSize: "1.1rem" }}
                            />
                          </div>
                        )}
                        {post_state == 3 && (
                          <div className="user_like">
                            <p style={{ margin: "16px 0px" }}>
                              {post.comment_list.items.length}
                            </p>
                            <CommentIcon
                              style={{
                                margin: "7px 5px 7px 3px",
                                color: "#000000",
                              }}
                              sx={{ fontSize: "1.1rem" }}
                            />
                          </div>
                        )}
                      </Stack>
                    </ImageListItem>
                  )
                )}
              </ImageList>
            </div>
          ) : (
            <Typography
              style={{
                color: "black",
                marginTop: "20px",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              해당되는 게시물이 존재하지 않습니다.
            </Typography>
          )}
        </div>
      </article>
    );
  }
}
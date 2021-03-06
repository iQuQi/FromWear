import React from 'react';
import {Component} from 'react';
import './PostWritePage.css'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';

import PostWriteTagList from './PostWriteTagList'
import {v4 as uuid} from 'uuid';
import Storage from '@aws-amplify/storage';
import {post_tag_data} from "./PostTagData"
import { API } from 'aws-amplify';
import { listStyleTags } from "../graphql/queries.js";
import {
  createPost,
  createStyleTag,
  createPostStyleTag,
  updateStyleTag,
} from "../graphql/mutations";
import {Typography} from "@mui/material";

var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //37개 태그
let uuid_ = uuid();
let weeklyTagList = [];

class PostWritePage extends Component {
    constructor(props){
        super();

        this.state = {
          file: "",
          previewURL: "",
          tag_click: false,
          total_tag_num: 0,
          tag_contents: "", //tag contents
          contents: "", //contents
          board_type: props.board_type,
          user: props.user,
          isMobile: props.isMobile,
          blind: false,
          create_post: false,
          create_tag: false,
          img_upload: false,
          file_key: "",
        };
    }
    componentDidMount() {
      if(this.state.board_type==2){
        this.setState({
          tag_contents: `#이번주 태그 #귀여운 #러블리`,
        })
      }
    }
    componentDidUpdate(prevProps) {
        if(this.props.user !== prevProps.user){
            this.setState({user: this.props.user});
        }

        API.graphql({
          query: listStyleTags,
          variables: { filter: { is_weekly: { eq: true } } },
        })
          .then((res) =>
              weeklyTagList = res.data.listStyleTags.items.map(
                (data) => data.value
              )
          )
          .catch((e) => console.log(e));

    }

    handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        let filetype =file.name.split('.').pop();

        this.setState({file_key: `${uuid_}.${filetype}`})

        reader.onloadend = () => {
          this.setState({
            file : file,
            previewURL : reader.result
          })
        }
        reader.readAsDataURL(file);
      }
	
    onChangeTag = e => {
      let split_tags = [];
      e.target.value.split("#").forEach((data) => {
        split_tags = [...split_tags, data.split(" ").join("")];
  
        
      });
      split_tags = split_tags.slice(1, split_tags.length);

      post_tag_data.forEach((static_tag, static_tag_index) => {
        tag_clicked_list[static_tag_index] = 0;
        split_tags.forEach((current_tag) => {
          if (static_tag.name === current_tag) {
            tag_clicked_list[static_tag_index] = 1;
          }
        });
      });

      this.setState({ tag_contents: e.target.value });
    }

    onFocusTag = e => {
        this.setState({tag_click: !this.state.tag_click})
    }

    handle_tag_button_click=(e,index,name)=>{
      if(!tag_clicked_list[index]) {
        tag_clicked_list[index]= 1;
        this.setState({
                  tag_contents: this.state.tag_contents + `#${name}`,
                  // total_tag_num: this.state.total_tag_num + 1
        })
      }
      else {
        tag_clicked_list[index]=0;
        this.setState({
                  tag_contents: this.state.tag_contents.replaceAll(`#${name}`, ''),
                  // total_tag_num: this.state.total_tag_num - 1,
              });
      }

    }

    WeeklyTag = () => {
      
    }

    handleSubmit(e) {
      e.preventDefault();

      let split_tags = '';
      let tagLengthErrorCheck = false;
      let {tag_contents} = this.state;
      
      tag_contents.split("#").forEach((data) => {
        split_tags = [...split_tags, data.split(" ").join("")];
        if ( data.split(" ").join("").length>5){
          tagLengthErrorCheck = true
       } 
      });
      split_tags = split_tags.slice(1, split_tags.length);
  
      let dup_rmv_tags = new Set(split_tags);
      let check_empty_tag = false;
      dup_rmv_tags.forEach((tag) =>{
        if(tag === ''){ //공백 태그 입력
          check_empty_tag = true;
        }
      })
      
      if (this.state.file == "") {
        alert("사진을 등록해야 합니다.");
      } else if(check_empty_tag) {
        alert("태그에 내용을 추가해야 합니다.")
      } else if (dup_rmv_tags.size !== 3) {
        alert("태그는 3개를 등록해야 합니다.");
      } else if (tagLengthErrorCheck) {
        alert("태그의 길이는 5자 이하여야 합니다.");
      }  else {
        Storage.put(`${this.state.file_key}`, this.state.file)
        .then(res => this.setState({img_upload: true}))
        .catch(e => console.log("img upload error", e));

        // 글 추가          
        let current_board_type = this.state.board_type;
        if(current_board_type === "0") {
              let match = 0;
              weeklyTagList.forEach((weeklyTag) => {
                  dup_rmv_tags.forEach((tag) => {
                      if (weeklyTag === tag) match += 1;
                  });
              });
              if(match === 3) current_board_type = 2;
          }
        if(current_board_type === "0"){
          API.graphql({
            query: createPost,
            variables: {
              input: {
                board_type: current_board_type,
                click_num: "0",
                content: this.state.contents,
                img: this.state.file_key,
                user_id: this.state.user.id,
              },
            },
          })
            .then((res) => {
              let current_post_id = res.data.createPost.id;
              dup_rmv_tags.forEach((tag) => {
                let current_tag_id;
                API.graphql({
                  query: listStyleTags,
                  variables: { filter: { value: { eq: tag } } },
                })
                  .then((res) => {
                    if (res.data.listStyleTags.items.length === 0) {
                      //없었던 태그
                      API.graphql({
                        query: createStyleTag,
                        variables: {
                          input: {
                            num: 1,
                            value: tag,
                            is_static: false,
                            is_weekly: false, 
                          },
                        },
                      })
                        .then((res) => {
                          current_tag_id = res.data.createStyleTag.id;
                          API.graphql({
                              query: createPostStyleTag,
                              variables: {
                              input: {
                                  post_id: current_post_id,
                                  tag_id: current_tag_id,
                              },
                              },
                          })
                          .then((res) => this.setState({ create_tag: true }))
                          .catch((e) => console.log(e));
                        })
                        .catch((e) => console.log(e));
                    } else {
                      //존재하는 태그
                      current_tag_id = res.data.listStyleTags.items[0].id;
                      API.graphql({
                          query: createPostStyleTag,
                          variables: {
                          input: {
                              post_id: current_post_id,
                              tag_id: current_tag_id,
                          },
                          },
                      })
                          .then((res) => {
                          API.graphql({
                              query: updateStyleTag,
                              variables: {
                              input: {
                                  id: current_tag_id,
                                  num:
                                  res.data.createPostStyleTag.style_tag.num + 1,
                              },
                              },
                          })
                          .catch((e) => console.log(e));
                          })
                          .then((res) => this.setState({ create_tag: true }))
                          .catch((e) => console.log(e));
                      }
                  })
                  .catch((e) => console.log(e));
                  });
              })
            .then((res) => this.setState({ create_post: true }))
            .catch((e) => console.log(e));
        }
        else if(current_board_type === "1"){
          API.graphql({
            query: createPost,
            variables: {
              input: {
                board_type: current_board_type,
                click_num: "0",
                content: this.state.contents,
                img: this.state.file_key,
                user_id: this.state.user.id,
                blind: this.state.blind,
              },
            },
          })
            .then((res) => {
              let current_post_id = res.data.createPost.id;
              dup_rmv_tags.forEach((tag) => {
                let current_tag_id;
                API.graphql({
                  query: listStyleTags,
                  variables: { filter: { value: { eq: tag } } },
                })
                  .then((res) => {
                    if (res.data.listStyleTags.items.length === 0) {
                      //없었던 태그
                      API.graphql({
                        query: createStyleTag,
                        variables: {
                          input: {
                            num: 1,
                            value: tag,
                            is_static: false,
                            is_weekly: false, 
                          },
                        },
                      })
                        .then((res) => {
                          current_tag_id = res.data.createStyleTag.id;
                          API.graphql({
                              query: createPostStyleTag,
                              variables: {
                              input: {
                                  post_id: current_post_id,
                                  tag_id: current_tag_id,
                              },
                              },
                          })
                          .then((res) => this.setState({ create_tag: true }))
                          .catch((e) => console.log(e));
                        })
                        .catch((e) => console.log(e));
                    } else {
                      //존재하는 태그
                      current_tag_id = res.data.listStyleTags.items[0].id;
                      API.graphql({
                          query: createPostStyleTag,
                          variables: {
                          input: {
                              post_id: current_post_id,
                              tag_id: current_tag_id,
                          },
                          },
                      })
                          .then((res) => {
                          API.graphql({
                              query: updateStyleTag,
                              variables: {
                              input: {
                                  id: current_tag_id,
                                  num:
                                  res.data.createPostStyleTag.style_tag.num + 1,
                              },
                              },
                          })
                          .catch((e) => console.log(e));
                          })
                          .then((res) => this.setState({ create_tag: true }))
                          .catch((e) => console.log(e));
                      }
                  })
                  .catch((e) => console.log(e));
                  });
              })
            .then((res) => this.setState({ create_post: true }))
            .catch((e) => console.log(e));
        }
      }
    }

    changeTextArea(e) {
        this.setState({contents : e.target.value});
    }

    checkBlind(e) {
        if(e.target.value == 1) {
            this.setState({blind : true});
        }
        else this.setState({blind : false});
    }

    handleCloseButton(e) {
        this.props.handle_write_page();
    }

    render(){
        let {fileImage, setFileImage, tag_click} = this.state;
        let {tag_contents, contents, board_type, isMobile} = this.state;

        let profile_preview = null;
        if(this.state.file !== ''){
          profile_preview = <div alt="preview_img" className='upload_img' style={{backgroundImage: 'URL('+this.state.previewURL+')'}}></div>
        }

        // console.log("1 : ",this.state.create_post)
        // console.log("2 : ",this.state.create_tag)
        // console.log("3 : ",this.state.img_upload)
        if (this.state.create_post == true && this.state.create_tag == true && this.state.img_upload == true) {
            window.location.reload();
        }

		return (
      <div className="post_write_container">
        <div className="post_write_content">
          <Button
            style={{
              minWidth: 40,
              height: 40,
              margin: "0 5px 5px 20px",
              fontSize: "30px",
              fontWeight: 300,
              color: "black",
              position: "absolute",
              top: 10,
              left: -15,
            }}
            onClick={this.handleCloseButton.bind(this)}
          >
            <CloseIcon />
          </Button>
          <form action="doLogin" method="POST" className="loginForm">
            <div className="image_file_input">
              {profile_preview}
              <input
                id="to_click_img"
                className="img_file_form"
                type="file"
                accept="image/*"
                name="profile_img"
                onChange={this.handleFileOnChange}
            />사진을 업로드 해주세요
            </div>
            <label htmlFor="to_click_img" className="click_img">
              클릭해서 업로드
            </label>
            <div className="post_text_input">
              <h3>내용</h3>
              <div className="text_form">
                <textarea
                  className="content_write"
                  name=""
                  type="text"
                  placeholder="내용을 입력해주세요"
                  value={contents}
                  onChange={this.changeTextArea.bind(this)}
                ></textarea>
              </div>

              <h3>태그</h3>
              <div className="text_form tag_write">
                {
                  board_type == 2
                  ? <>
                          <Input value={tag_contents}
                                 style={{margin:"10px 0",width:"100%"}}
                                 placeholder={tag_contents}
                                 disabled
                          />
                          <Typography
                              sx={{color: 'red', fontSize: "9px",
                                  position: 'relative', right: '145px'}}>
                              ※ 이번주 태그는 태그 수정 불가
                          </Typography>
                      </>
                  : <Input value={tag_contents} 
                    style={{margin:"10px 0",width:"100%"}}
                    placeholder="태그를 입력해주세요"  
                    onChange={this.onChangeTag}
                    onClick={this.onFocusTag}
                    />
                }
              </div>
              {tag_click ? (
                <div className="tag_area">
                  <PostWriteTagList
                    target_button={tag_clicked_list}
                    handle_tag_button_click={this.handle_tag_button_click}
                  />
                  <Button
                    onClick={()=>this.setState({tag_click: false})}
                    style={isMobile ? 
                    {color:'black',backgroundColor: 'white', marginBottom: '20px', width: '100%',
                    border: 'solid 1px black', borderRadius: '30px', position:'relative', top:'10px'}
                    :
                    {color:'black',backgroundColor: 'white', marginBottom: '20px', width: '100%',
                    border: 'solid 1px black', borderRadius: '30px', position:'relative', top:'30px'}}
                    >닫기</Button>
                </div>
              ) : (
                <div></div>
              )}
              {board_type == 1 ? (
                <div className={tag_click ? "blind": "select_blind_wrap"}>
                  <h3>익명 여부 선택</h3>
                  <div className="select_blind">
                    <label className="radio">
                      <input
                        type="radio"
                        name="fruit"
                        value="1"
                        onClick={this.checkBlind.bind(this)}
                      />
                      <span>예</span>
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="fruit"
                        value="2"
                        onClick={this.checkBlind.bind(this)}
                        defaultChecked
                      />
                      <span>아니오</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {board_type == 1 ? 
                <div className={tag_click? "blind" : "submit_button"}>
                  <Button
                    type="submit"
                    style={isMobile? {
                      margin: "auto",
                      borderRadius: 30,
                      backgroundColor: "white",
                      padding: 10,
                      width: "30%",
                      color: "black",
                      border: '1px solid black',
                      position: 'relative',
                      top: '60px',
                      }
                    : {
                      margin: "auto",
                      borderRadius: 30,
                      backgroundColor: "white",
                      padding: 10,
                      width: "100%",
                      color: "black",
                      border: '1px solid black'
                    }}
                    variant="contained"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    등록
                  </Button>
                </div>
                :
                <div className={tag_click? "blind" : "submit_button"}>
                  <Button
                    type="submit"
                    style={isMobile? {
                      margin: "auto",
                      borderRadius: 30,
                      backgroundColor: "white",
                      padding: 10,
                      width: "30%",
                      color: "black",
                      border: '1px solid black',
                      position: 'relative',
                      top: '60px',
                      }
                    : {
                      margin: "auto",
                      borderRadius: 30,
                      backgroundColor: "white",
                      padding: 10,
                      width: "100%",
                      color: "black",
                      border: '1px solid black'
                    }}
                    variant="contained"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    등록
                  </Button>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    );
    }	

}

export default PostWritePage;
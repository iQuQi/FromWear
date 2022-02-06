import React, { useState } from 'react';
import {Component} from 'react';
import './PostWritePage.css'
import Header from "../Header/Header"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import TagData from '../SearchPage/TagData';

import PostWriteTagList from './PostWriteTagList'
//import PostWriteTagList from '../SearchPage/TagList';
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
          blind: false,
          create_post: false,
          create_tag: false,
          img_upload: false,
          file_key: "",
        };
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

    handleSubmit(e) {
        e.preventDefault();

        Storage.put(`${this.state.file_key}`, this.state.file)
        .then(res => this.setState({img_upload: true}))
        .catch(e => console.log("onChange error", e));
  

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

        

        if (this.state.file == "") {
          alert("사진을 등록해야 합니다.");
        } else if (dup_rmv_tags.size !== 3) {
          alert("태그는 3개를 등록해야 합니다.");
        } else if (tagLengthErrorCheck) {
          alert("태그 길이를 5자 이하로 맞춰주세요");
        } else {
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
                            input: { num: 0, value: tag },
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
                                }).catch((e) => console.log(e));
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
                            }).catch((e) => console.log(e));
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
        console.log("1");
        this.props.handle_write_page();
    }

    render(){
        let {fileImage, setFileImage, tag_click} = this.state;
        let {tag_contents, contents, board_type} = this.state;

        let profile_preview = null;
        if(this.state.file !== ''){
          profile_preview = <img alt="preivew_img" className='upload_img' src={this.state.previewURL}></img>
        }
 

        if (this.state.create_post == true && this.state.create_tag == true && this.state.img_upload == true) {
            if(this.state.board_type == 0) {
                window.location.href = './todayboard';
            }
            else {
                window.location.href = './sosboard';
            }
            //window.location.reload();
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
                <Input value={tag_contents} 
                                    style={{margin:"10px 0",width:"100%"}}
                                    placeholder="태그를 입력해주세요"  
                                    onChange={this.onChangeTag}
                                    onClick={this.onFocusTag}
                                    />

              </div>
              {tag_click ? (
                <div className="tag_area">
                  <PostWriteTagList
                    target_button={tag_clicked_list}
                    handle_tag_button_click={this.handle_tag_button_click}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {board_type == 1 ? (
                <div>
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

              <div className="submit_button">
                <Button
                  type="submit"
                  style={{
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
            </div>
          </form>
        </div>
      </div>
    );
    }	

}

export default PostWritePage;
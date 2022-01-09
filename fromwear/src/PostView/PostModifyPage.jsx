import React, { useState } from 'react';
import {Component} from 'react';
import '../PostWritePage/PostWritePage.css'
import Header from "../Header/Header"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import TagData from '../SearchPage/TagData';
import PostWriteTagList from '../PostWritePage/PostWriteTagList';
import {v4 as uuid} from 'uuid';
import Storage from '@aws-amplify/storage';
import {post_tag_data} from "../PostWritePage/PostTagData"
import { API } from 'aws-amplify';
import { updatePost, updatePostStyleTag } from '../graphql/mutations';

var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그
let uuid_ = uuid();

class PostModifyPage extends Component {
    constructor(props){
        super();

        this.state = {
            file : '',
            previewURL : '',
            tag_click: false,
			current_click_tag_num: 0,
            total_tag_num: 0,
            tag_contents: '', //tag contents
            contents: '', //contents
            board_type: props.board_type,
            user: props.user,
            blind: false,
            create_post: false,
            create_tag: false,
            file_key: '',
            now_post:props.now_post,
            before_img: '',
            tagLengthError: false,

        }
    }

    componentDidMount(){        
        this.setState({
            contents: this.state.now_post.content,
            before_img: 'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+this.state.now_post.img,
        })
        this.set_tag_list();
    }
    componentDidUpdate(prevProps) {
        if(this.props.user !== prevProps.user){
            this.setState({user: this.props.user});
            console.log(this.state.user);
        }
        if(this.props.now_post !== prevProps.now_post){
            this.setState({
                now_post: this.props.now_post,
                contents: this.props.now_post.content,
            });
        }
    }

    set_tag_list = () => {
        console.log(this.state.now_post.tag_list.items)
        if(this.state.now_post.tag_list.items.length > 0){
            this.state.now_post.tag_list.items.map((tag)=>{
                tag_clicked_list[tag.style_tag.id-1] = 1
            })

            this.setState({
                tag_contents: "#"+this.state.now_post.tag_list.items[0].style_tag.value+" #"+this.state.now_post.tag_list.items[1].style_tag.value +" #"+this.state.now_post.tag_list.items[2].style_tag.value,
                current_click_tag_num: 3,
                total_tag_num: 3,
            })
        }
    }

    handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        let filetype =file.name.split('.').pop();

        this.setState({file_key: `${uuid_}.${filetype}`})

        Storage.put(`${uuid_}.${filetype}`,file)
        .then(res=>console.log(res))
        .catch(e=> console.log('onChange error',e));

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

    changeTagTextArea() {
        let changeContents = '';
        tag_clicked_list.forEach((tag, index) => {
            if(tag == 1) {
                changeContents += `#${post_tag_data[index].name} `
            }
        })
        this.setState({
            tag_contents: changeContents
        })
    }

    handle_tag_button_click=(e,index)=>{
		if(!tag_clicked_list[index]) {
            if(this.state.total_tag_num == 3) {
                alert("태그는 3개를 등록해야 합니다.");
                return;
            } 

			tag_clicked_list[index]= 1;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num+1,
                total_tag_num: this.state.total_tag_num + 1
			})
		}
		else {
			tag_clicked_list[index]=0;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num-1,
                total_tag_num: this.state.total_tag_num - 1
			})
		}

        this.changeTagTextArea();
        
		//console.log("cur input tag7:"+this.state.current_input_tag);
/*
		this.update_post_data(this.state.filter_day,this.state.filter_gender,
			this.state.current_input_tag,
			this.state.filter_board);
*/
	}

    handleSubmit(e) {
        e.preventDefault();
        let split_tags = '';
        let {tag_contents} = this.state;
        let tagLengthErrorCheck = false;

        tag_contents.split("#").forEach((data) => {
          split_tags = [...split_tags, data.split(" ").join("")];
          if ( data.split(" ").join("").length>5){
            tagLengthErrorCheck = true
          }
        });
        split_tags = split_tags.slice(1, split_tags.length);
  
  
        let dup_rmv_tags = new Set(split_tags);
        // if(dup_rmv_tags.size !== split_tags.length) {
        //     alert("중복된 태그를 제거해주세요.");
        // }

        if(this.state.before_img=='' && this.state.file == ''){
            alert("사진을 등록해야 합니다.");
        }
        else if (dup_rmv_tags.size !== 3) {
            alert("태그는 3개를 등록해야 합니다.");
        }else if (tagLengthErrorCheck) {
            alert("태그 길이를 5자 이하로 맞춰주세요");
        }else {
            // 글 update
            let new_post_id = '';
            if(this.state.board_type == 0) {

                if(this.state.file == ''){ //사진 수정 X
                    var tag_index = []
                API.graphql({
                    query: updatePost, variables: {
                        input: 
                        {
                            id: this.state.now_post.id,
                            content: this.state.contents,
                            //img: this.state.file_key, img 수정 X
                        } 
                    }})
                    .then(res => {
                        console.log(this.state.now_post.tag_list)
                        console.log(tag_clicked_list)
                        
                        tag_clicked_list.forEach((tag, index) => {
                            if(tag == 1) {
                                tag_index = [...tag_index, index+1]
                            }
                        })
                        console.log(tag_index)
                    })
                    .then(res => {
                        var origin_post_id = [this.state.now_post.tag_list.items[0].id, this.state.now_post.tag_list.items[1].id, this.state.now_post.tag_list.items[2].id]
                        origin_post_id.map((origin_id, index)=>{
                                API.graphql({
                                    query: updatePostStyleTag, variables: {
                                        input: 
                                        {
                                            id: origin_id,
                                            post_id: this.state.now_post.id,
                                            tag_id: tag_index[index],
                                        } 
                                }})
                                .then(res => {
                                    if(index == 2){
                                        this.setState({create_tag:true})
                                    }
                                })
                        })
                    })
                    .then(res => this.setState({create_post: true}))
                    .catch(e => console.log(e));
                }
                else{
                    var tag_index = []
                    API.graphql({
                        query: updatePost, variables: {
                            input: 
                            {
                                id: this.state.now_post.id,
                                content: this.state.contents,
                                img: this.state.file_key,
                            } 
                        }})
                        .then(res => {
                            console.log(this.state.now_post.tag_list)
                            console.log(tag_clicked_list)
                            
                            tag_clicked_list.forEach((tag, index) => {
                                if(tag == 1) {
                                    tag_index = [...tag_index, index+1]
                                }
                            })
                            console.log(tag_index)
                        })
                        .then(res => {
                            var origin_post_id = [this.state.now_post.tag_list.items[0].id, this.state.now_post.tag_list.items[1].id, this.state.now_post.tag_list.items[2].id]
                            origin_post_id.map((origin_id, index)=>{
                                    API.graphql({
                                        query: updatePostStyleTag, variables: {
                                            input: 
                                            {
                                                id: origin_id,
                                                post_id: this.state.now_post.id,
                                                tag_id: tag_index[index],
                                            } 
                                    }})
                                    .then(res => {
                                        if(index == 2){
                                            this.setState({create_tag:true})
                                        }
                                    })
                            })
                        })
                        .then(res => this.setState({create_post: true}))
                        .catch(e => console.log(e));
                }
            }
            else {

                if(this.state.file == ''){
                    var tag_index = []
                
                    API.graphql({
                        query: updatePost, variables: {
                            input: 
                            {
                                id: this.state.now_post.id,
                                content: this.state.contents,
                                //img: this.state.file_key,
                                blind: this.state.blind,
                            } 
                        }})
                        .then(res => {
                            console.log(this.state.now_post.tag_list)
                            console.log(tag_clicked_list)
                            
                            tag_clicked_list.forEach((tag, index) => {
                                if(tag == 1) {
                                    tag_index = [...tag_index, index+1]
                                }
                            })
                            console.log(tag_index)
                        })
                        .then(res => {
                            console.log("현재 태그???", this.state.now_post.tag_list)
                            var origin_post_id = [this.state.now_post.tag_list.items[0].id, this.state.now_post.tag_list.items[1].id, this.state.now_post.tag_list.items[2].id]
                            origin_post_id.map((origin_id, index)=>{
                                    API.graphql({
                                        query: updatePostStyleTag, variables: {
                                            input: 
                                            {
                                                id: origin_id,
                                                post_id: this.state.now_post.id,
                                                tag_id: tag_index[index],
                                            } 
                                    }})
                                    .then(res => {
                                        if(index == 2){
                                            this.setState({create_tag:true})
                                        }
                                    })
                            })
                        })
                        .then(res => this.setState({create_post: true}))
                        .then(window.location.reload())
                        .catch(e => console.log(e));
                }
                else{
                    var tag_index = []
                
                    API.graphql({
                        query: updatePost, variables: {
                            input: 
                            {
                                id: this.state.now_post.id,
                                content: this.state.contents,
                                img: this.state.file_key,
                                blind: this.state.blind,
                            } 
                        }})
                        .then(res => {
                            console.log(this.state.now_post.tag_list)
                            console.log(tag_clicked_list)
                            
                            tag_clicked_list.forEach((tag, index) => {
                                if(tag == 1) {
                                    tag_index = [...tag_index, index+1]
                                }
                            })
                            console.log(tag_index)
                        })
                        .then(res => {
                            console.log("현재 태그???", this.state.now_post.tag_list)
                            var origin_post_id = [this.state.now_post.tag_list.items[0].id, this.state.now_post.tag_list.items[1].id, this.state.now_post.tag_list.items[2].id]
                            origin_post_id.map((origin_id, index)=>{
                                    API.graphql({
                                        query: updatePostStyleTag, variables: {
                                            input: 
                                            {
                                                id: origin_id,
                                                post_id: this.state.now_post.id,
                                                tag_id: tag_index[index],
                                            } 
                                    }})
                                    .then(res => {
                                        if(index == 2){
                                            this.setState({create_tag:true})
                                        }
                                    })
                            })
                        })
                        .then(res => this.setState({create_post: true}))
                        .then(window.location.reload())
                        .catch(e => console.log(e));
                }
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
        console.log("1");
        this.props.handle_write_page();
    }

    render(){
        let {fileImage, setFileImage, tag_click} = this.state;
        let {tag_contents, contents, board_type, now_post} = this.state;

        let profile_preview = null;
        if(this.state.file !== ''){
          profile_preview = <img alt="preivew_img" className='upload_img' src={this.state.previewURL}></img>
        }
        else {
            profile_preview = <img alt="preivew_img" className='upload_img' src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+this.state.now_post.img}></img>;
        }
 

        if (this.state.create_post == true && this.state.create_tag == true) {
            if(this.state.board_type == 0) {
                window.location.href = './post/'+now_post.id;
            }
            else {
                window.location.href = './sosboard';
            }
            window.location.reload();
        }

		return(
            <div className="post_write_container">
                <div className="post_write_content">
                    <Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", 
                    fontWeight: 300, color: "black",position:"absolute",top:10,left:-15}} onClick={this.handleCloseButton.bind(this)}>
							<CloseIcon/>	
					</Button>
                    <form action="doLogin" method="POST" className="loginForm">
                        <div className="image_file_input">
                            {profile_preview}
                            <input
                                id="to_click_img" className="img_file_form"
                                type='file' 
                                accept='image/*' 
                                name='profile_img' 
                                onChange={this.handleFileOnChange}>
                            </input>
                        </div>
                        <label htmlFor="to_click_img" className="click_img">클릭해서 업로드</label>
                        <div className="post_text_input">
                
                            <h3>내용</h3>
                            <div className="text_form">
                                <textarea className= "content_write" name="" type="text"
                                 placeholder="내용을 입력해주세요" value={contents} onChange={this.changeTextArea.bind(this)}></textarea>
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
                            {
                                tag_click ?
                                <div className="tag_area">
                                    <PostWriteTagList
                                    target_button={tag_clicked_list}
                                    handle_tag_button_click={this.handle_tag_button_click}
                                    />
                                </div>
                                :
                                <div>

                                </div>
                            }
                            {
                                board_type == 1 ?
                                <div>
                                    <h3>익명 여부 선택</h3>
                                    {
                                        now_post.blind ? //원래 post가 익명상태면, 익명 여부의 "예"가 default
                                        <div>
                                            <div className="select_blind">
                                                <label className="radio"><input type="radio" name="fruit" value="1" onClick={this.checkBlind.bind(this)} defaultChecked/><span>예</span></label>
                                                <label className="radio"><input type="radio" name="fruit" value="2" onClick={this.checkBlind.bind(this)}/><span>아니오</span></label>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="select_blind">
                                                <label className="radio"><input type="radio" name="fruit" value="1" onClick={this.checkBlind.bind(this)}/><span>예</span></label>
                                                <label className="radio"><input type="radio" name="fruit" value="2" onClick={this.checkBlind.bind(this)} defaultChecked/><span>아니오</span></label>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    </div>
                            }
                            
                            <div className="submit_button">
                                <Button type="submit" style={{
                                    margin: "auto",
                                    borderRadius: 30,
                                    backgroundColor: "white",
                                    padding: 10,
                                    width: "100%",
                                    color: "black",
                                    border: '1px solid black'
                                }} variant="contained" onClick={this.handleSubmit.bind(this)}>수정 완료</Button>
                            </div>
                        </div>
                    


                    </form>

                </div>
            </div>
        )
    }	

}

export default PostModifyPage;

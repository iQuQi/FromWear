import React, { useState } from 'react';
import {Component} from 'react';
import './PostWritePage.css'
import Header from "../Header/Header"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import TagData from '../SearchPage/TagData'
import PostWriteTagList from '../SearchPage/TagList'

let board_type = 1
var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그

class PostWritePage extends Component {
    constructor(){
        super();

        this.state = {
			target_tag_button: tag_clicked_list,
            file : '',
            previewURL : '',
            tag_click: false,
			current_click_tag_num: 0,
        }
    }
    
    handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file : file,
            previewURL : reader.result
          })
        }
        reader.readAsDataURL(file);
      }
	
    onClickTag = () => {
        this.setState({tag_click: !this.state.tag_click})
        console.log(this.state.tag_click)
    }

    handle_tag_button_click=(e,index)=>{
		if(!tag_clicked_list[index]) {
			tag_clicked_list[index]= 1;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num+1
			})
		}
		else {
			tag_clicked_list[index]=0;
			this.setState({
				current_click_tag_num: this.state.current_click_tag_num-1
			})
		}

		this.setState({
			target_tag_button: tag_clicked_list,
		})

		console.log("cur input tag7:"+this.state.current_input_tag);
/*
		this.update_post_data(this.state.filter_day,this.state.filter_gender,
			this.state.current_input_tag,
			this.state.filter_board);
*/
	}


    render(){
        let {fileImage, setFileImage, tag_click} = this.state;

        let profile_preview = null;
        if(this.state.file !== ''){
          profile_preview = <img alt="preivew_img" className='upload_img' src={this.state.previewURL}></img>
        }

		return(
            <div className="post_write_container">
                <div className="post_write_content">
                    <Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", 
                    fontWeight: 300, color: "black",position:"absolute",top:10,left:-15}}>
							<CloseIcon/>	
					</Button>
                    <form action="doLogin" method="POST" class="loginForm">
                        <div className="image_file_input">
                            {profile_preview}
                            <input
                                id="to_click_img" class="img_file_form"
                                type='file' 
                                accept='image/*' 
                                name='profile_img' 
                                onChange={this.handleFileOnChange}>
                            </input>
                        </div>
                        <label for="to_click_img" class="click_img">클릭해서 업로드</label>
                        <div className="post_text_input">
                
                            <h3>내용</h3>
                            <div class="text_form">
                                <textarea class= "content_write" name="" type="text" id=""
                                 placeholder="내용을 입력해주세요" onkeyup=""/>
                            </div>

                            <h3>태그</h3>
                            <div class="text_form tag_write">
                                <Input name="" type="" id=""
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요" onkeyup="" onClick={this.onClickTag}/>
                            </div>
                            {
                                tag_click ?
                                <div className="tag_area">
                                    <PostWriteTagList
                                    target_button={this.state.target_tag_button}
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
                                    <div class="select_blind">
                                        <label class="radio"><input type="radio" name="fruit" value="예" /><span>예</span></label>
                                        <label class="radio"><input type="radio" name="fruit" value="아니오" checked="checked"/><span>아니오</span></label>
                                    </div>
                                </div>
                                :
                                <div>
                                    </div>
                            }
                            
                            <div className="submit_button">
                                <Button type="submit" style={{margin:"auto",backgroundColor:"#d8c8b2",width:"100%",color:"black"}} variant="contained" >등록</Button>
                            </div>
                        </div>
                    


                    </form>

                </div>
            </div>
        )
    }	

}

export default PostWritePage;

/*

let PostWritePage = () => {
	const [fileImage, setFileImage] = useState(""); // 파일 저장
    const saveFileImage = (e) => { setFileImage(URL.createObjectURL(e.target.files[0])); };

    var tag_click = false;
    const onClickTag = () => {
        tag_click = !tag_click;
        console.log(tag_click)
    }

		return(
            <div className="post_write_container">
                <div className="post_write_content">
                    <Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", 
                    fontWeight: 300, color: "black",position:"absolute",top:10,left:-15}}>
							<CloseIcon/>	
					</Button>
                    <form action="doLogin" method="POST" class="loginForm">
                        <div className="image_file_input">
                            {
                            fileImage && ( <img alt="preivew_img" src={fileImage} class="upload_img" /> )
                            }
                            <input id="to_click_img" class="img_file_form" type="file" accept="image/*" onChange={saveFileImage} />
                        </div>
                        <label for="to_click_img" class="click_img">클릭해서 업로드</label>
                        
                        <div className="post_text_input">
                
                            <h3>내용</h3>
                            <div class="text_form">
                                <textarea class= "content_write" name="" type="text" id=""
                                 placeholder="내용을 입력해주세요" onkeyup=""/>
                            </div>

                            <h3>태그</h3>
                            <div class="text_form tag_write">
                                <Input name="" type="" id=""
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요" onkeyup="" onClick={onClickTag}/>
                            </div>
                            <PostWriteTag
                                tag_click={tag_click}
                            />
                            {
                                board_type == 1 ?
                                <div>
                                    <h3>익명 여부 선택</h3>
                                    <div class="select_blind">
                                        <label class="radio"><input type="radio" name="fruit" value="예" /><span>예</span></label>
                                        <label class="radio"><input type="radio" name="fruit" value="아니오" checked="checked"/><span>아니오</span></label>
                                    </div>
                                </div>
                                :
                                <div>
                                    </div>
                            }
                            

                            <Button type="submit" style={{margin:"auto",backgroundColor:"#d8c8b2",width:"100%",color:"black"}} variant="contained" >등록</Button>

                        </div>
                    


                    </form>

                </div>
            </div>
        )
			
		

}

export default PostWritePage;
*/

/*
class PostWritePage extends Component{
	constructor(){
		super();
	}
    
    onLoadFile= (e) => {
        console.log(e.target.files)
    }
    const [fileImage, setFileImage] = useState("");
    
	render(){
		return(
            <div className="post_write_container">
                <div className="post_write_content">
                    <Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", 
                    fontWeight: 300, color: "black",position:"absolute",top:10,left:-15}}>
							<CloseIcon/>	
					</Button>
                    <form action="doLogin" method="POST" class="loginForm">
                    
                        <div className="image_file_input">
                            <input type="file" id="to_click_img" onChange={this.onLoadFile} accept='image/*' onClick="return callSub();" class="img_file_form" alt="X"
                            />
                            <label for="to_click_img" class="click_img">클릭해서 업로드</label>
                        </div>
                        <div className="post_text_input">
                
                            <h3>내용</h3>
                            <div class="text_form">
                                <textarea class= "content_write" name="" type="text" id=""
                                 placeholder="내용을 입력해주세요" onkeyup=""/>
                            </div>
                            <h3>태그</h3>
                            <div class="text_form">
                                <Input name="" type="" id=""
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요" onkeyup=""/>
                            </div>
                            <Button style={{margin:"auto",backgroundColor:"#d8c8b2",width:"100%",color:"black"}} variant="contained" >저장</Button>
                        </div>
                    
                    </form>
                </div>
            </div>
        )
			
		
	}
}
export default PostWritePage;
*/
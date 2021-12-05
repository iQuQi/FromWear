import React, { useState } from 'react';
import {Component} from 'react';
import './PostWritePage.css'
import Header from "../Header/Header"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import TagData from '../SearchPage/TagData';
import PostWriteTagList from '../SearchPage/TagList';
import {v4 as uuid} from 'uuid';
import Storage from '@aws-amplify/storage';
import {static_tag_data} from "../SearchPage/TagData"
let board_type = 1
var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그

class PostWritePage extends Component {
    constructor(props){
        super();

        this.state = {
            file : '',
            previewURL : '',
            tag_click: false,
			current_click_tag_num: 0,
            total_tag_num: 0,
            contents: '',
            board_type: props.board_type,
        }
    }
    
    handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        let filetype =file.name.split('.').pop();
        Storage.put(`${uuid()}.${filetype}`,file)
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
	
    onClickTag = () => {
        this.setState({tag_click: !this.state.tag_click})
        console.log(this.state.tag_click)
    }

    changeTextArea() {
        let changeContents = '';
        tag_clicked_list.forEach((tag, index) => {
            if(tag == 1) {
                changeContents += `#${static_tag_data[index].name} `
            }
        })
        this.setState({
            contents: changeContents
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

        this.changeTextArea();
        
		//console.log("cur input tag7:"+this.state.current_input_tag);
/*
		this.update_post_data(this.state.filter_day,this.state.filter_gender,
			this.state.current_input_tag,
			this.state.filter_board);
*/
	}

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        if(this.state.file == '') {
            alert("사진을 등록해야 합니다.");
        }
        else if(this.state.total_tag_num != 3) {
            alert("태그는 3개를 등록해야 합니다.");
        }
        else {
            window.location.reload();
        }
    }

    handleCloseButton(e) {
        console.log("1");
        this.props.handle_write_page();
    }

    render(){
        let {fileImage, setFileImage, tag_click} = this.state;
        let {contents, board_type} = this.state;

        let profile_preview = null;
        if(this.state.file !== ''){
          profile_preview = <img alt="preivew_img" className='upload_img' src={this.state.previewURL}></img>
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
                                 placeholder="내용을 입력해주세요"></textarea>
                            </div>

                            <h3>태그</h3>
                            <div className="text_form tag_write">
                                <Input value={contents} 
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요"  
                                  onClick={this.onClickTag}/>
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
                                    <div className="select_blind">
                                        <label className="radio"><input type="radio" name="fruit" value="예" /><span>예</span></label>
                                        <label className="radio"><input type="radio" name="fruit" value="아니오" defaultChecked/><span>아니오</span></label>
                                    </div>
                                </div>
                                :
                                <div>
                                    </div>
                            }
                            
                            <div className="submit_button">
                                <Button type="submit" style={{margin:"auto",backgroundColor:"#d8c8b2",width:"100%",color:"black"}} variant="contained" onClick={this.handleSubmit.bind(this)}>등록</Button>
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
                    <form action="doLogin" method="POST" className="loginForm">
                        <div className="image_file_input">
                            {
                            fileImage && ( <img alt="preivew_img" src={fileImage} className="upload_img" /> )
                            }
                            <input id="to_click_img" className="img_file_form" type="file" accept="image/*" onChange={saveFileImage} />
                        </div>
                        <label for="to_click_img" className="click_img">클릭해서 업로드</label>
                        
                        <div className="post_text_input">
                
                            <h3>내용</h3>
                            <div className="text_form">
                                <textarea className= "content_write" name="" type="text" id=""
                                 placeholder="내용을 입력해주세요" onKeyUp=""/>
                            </div>

                            <h3>태그</h3>
                            <div className="text_form tag_write">
                                <Input name="" type="" id=""
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요" onKeyUp="" onClick={onClickTag}/>
                            </div>
                            <PostWriteTag
                                tag_click={tag_click}
                            />
                            {
                                board_type == 1 ?
                                <div>
                                    <h3>익명 여부 선택</h3>
                                    <div className="select_blind">
                                        <label className="radio"><input type="radio" name="fruit" value="예" /><span>예</span></label>
                                        <label className="radio"><input type="radio" name="fruit" value="아니오" checked="checked"/><span>아니오</span></label>
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
                    <form action="doLogin" method="POST" className="loginForm">
                    
                        <div className="image_file_input">
                            <input type="file" id="to_click_img" onChange={this.onLoadFile} accept='image/*' onClick="return callSub();" className="img_file_form" alt="X"
                            />
                            <label for="to_click_img" className="click_img">클릭해서 업로드</label>
                        </div>
                        <div className="post_text_input">
                
                            <h3>내용</h3>
                            <div className="text_form">
                                <textarea className= "content_write" name="" type="text" id=""
                                 placeholder="내용을 입력해주세요" onKeyUp=""/>
                            </div>
                            <h3>태그</h3>
                            <div className="text_form">
                                <Input name="" type="" id=""
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요" onKeyUp=""/>
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
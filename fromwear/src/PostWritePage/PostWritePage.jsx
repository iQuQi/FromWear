import React, { useState } from 'react';
import {Component} from 'react';
import './PostWritePage.css'
import Header from "../Header/Header"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';

let PostWritePage = () => {
	const [fileImage, setFileImage] = useState(""); // 파일 저장
    const saveFileImage = (e) => { setFileImage(URL.createObjectURL(e.target.files[0])); }; // 파일 삭제
    const deleteFileImage = () => { URL.revokeObjectURL(fileImage); setFileImage(""); };

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
                            <label for="to_click_img" class="click_img">클릭해서 업로드</label>
                            <button class="delete_img" onClick={() => deleteFileImage()} >삭제</button>
                        </div>
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
                                  placeholder="태그를 입력해주세요" onkeyup=""/>
                            </div>
                            
                            <h3>익명 여부 선택</h3>
                            <div class="select_blind">
                                <label class="radio"><input type="radio" name="fruit" value="예" /><span>예</span></label>
                                <label class="radio"><input type="radio" name="fruit" value="아니오" checked="checked"/><span>아니오</span></label>
                            </div>

                            <Button style={{margin:"auto",backgroundColor:"#d8c8b2",width:"100%",color:"black"}} variant="contained" >등록</Button>

                        </div>
                    



                    </form>

                </div>
            </div>
        )
			
		

}

export default PostWritePage;


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
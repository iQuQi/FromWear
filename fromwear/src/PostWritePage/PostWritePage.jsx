import * as React from 'react';
import {Component} from 'react';
import './PostWritePage.css'
import Header from "../Header/Header"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';

class PostWritePage extends Component{
	constructor(){
		super();
	}

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
                            클릭해서 업로드
                            <input type="file" onClick="return callSub();" class="img_file_form" alt="X"/>

                        </div>
                        <div className="post_text_input">
                            <h3>태그</h3>
                            <div class="text_form">
                                <Input name="" type="" id=""
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요" onkeyup=""/>
                            </div>
                
                            <h3>내용</h3>
                            <div class="text_form">
                                <Input name="" type="" id=""
                                 style={{margin:"10px 0", width:"100%",}}
                                 placeholder="내용을 입력해주세요" onkeyup=""/>
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

import * as React from 'react';
import {Component} from 'react';
import './PostWritePage.css'
import Header from "../Header/Header"

class PostWritePage extends Component{
	constructor(){
		super();
	}

	render(){
		return(
            <div className="post_write_container">
                <div className="post_write_content">

                    <form action="doLogin" method="POST" class="loginForm">
                        <div className="image_file_input">
                            <input type="file" onClick="return callSub();" class="cancel" alt="X"/>

                        </div>
                        <div className="post_text_input">
                            <h2>태그</h2>
                            <div class="textForm">
                                <input name="" type="" id="" placeholder="태그를 입력해주세요" onkeyup=""/>
                            </div>
                
                            <h2>내용</h2>
                            <div class="textForm">
                                <input name="" type="" id="" placeholder="내용을 입력해주세요" onkeyup=""/>
                            </div>
                        </div>
                    

                        <button type="submit" >저장</button>


                    </form>

                </div>
            </div>
        )
			
		
	}


}

export default PostWritePage;

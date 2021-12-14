import './ProfileEdit.css'
import * as React from 'react';
import {Component} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import TagData from '../SearchPage/TagData'
import ProfileEditTagList from './ProfileEditTagList';
import profile_skyblue from '../PostView/Imgs/profile_skyblue.jpg';

import {static_tag_data} from "../SearchPage/TagData"

let board_type = 1
var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그
class ProfileEdit extends Component{

    constructor(props){
		super();
		this.state = {
            file : '',
            previewURL : '',
            tag_click: false,
			current_click_tag_num: 0,
            total_tag_num: 0,
            contents: '',
            user : props.user,
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

    changeTextArea=()=> {
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

	}

    handleSubmit=(e)=> {
        e.preventDefault();
        console.log(this.state);
        
        if(this.state.total_tag_num != 3) {
            alert("태그는 3개를 등록해야 합니다.");
        }
        else {
            console.log("프로필 업데이트 성공!");
            window.location.reload();
        }
    }

    handleCloseButton=(e)=> {
        console.log("1");
        this.props.handle_write_page();
    }

    render(){
        let {fileImage, setFileImage, tag_click} = this.state;
        let {contents} = this.state;

        let profile_preview = <img alt="preivew_img" className='original_img' 
        style={{backgroundImage:"url("+profile_skyblue+")",backgroundSize:"cover",}}/>;
        if(this.state.file !== ''){
          profile_preview = <img alt="preivew_img" className='upload_img' 
          style={{backgroundImage:"url("+this.state.previewURL+")",backgroundSize:"cover",}}
          ></img>
        }
        return <div className="profile_page_container">
            <div className="profile_edit_page">
            <Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", 
                    fontWeight: 300, color: "black",position:"absolute",top:10,left:-15}} onClick={this.handleCloseButton.bind(this)}>
							<CloseIcon/>	
					</Button>
                    <form action="doLogin" method="POST" className="img_form">
                            {profile_preview}
                            <input
                                id="to_click_img" className="img_file_form"
                                type='file' 
                                accept='image/*' 
                                name='profile_img' 
                                onChange={this.handleFileOnChange}>
                            </input>
                            <label htmlFor="to_click_img" className="upload_button">프로필 업로드</label>
                
                             <div className="profile_introduce">
                                <h3>자기소개</h3>
                                <textarea name="" type="text" className="introduce_text"
                                 placeholder="내용을 입력해주세요"></textarea>
                            </div>

                            <div className="profile_mytag">
                                <h3>소개태그</h3>
                                <Input value={contents} 
                                  style={{margin:"10px 0",width:"100%"}}
                                  placeholder="태그를 입력해주세요"  
                                  onClick={this.onClickTag}/>
                            </div>
                            {
                                tag_click ?
                                <div className="my_tag_list">
                                    <ProfileEditTagList
                                    target_button={tag_clicked_list}
                                    handle_tag_button_click={this.handle_tag_button_click}
                                    />
                                </div>
                                :
                                <div>

                                </div>
                            }
                             <div className="profile_gender">
                                    <h3>성별</h3>
                                    <div className="select_blind">
                                        <label className="radio"><input type="radio" name="fruit" value="예" /><span>남자</span></label>
                                        <label className="radio"><input type="radio" name="fruit" value="아니오" /><span>여자</span></label>
                                        <label className="radio"><input type="radio" name="fruit" value="아니오" defaultChecked/><span>비공개</span></label>

                                    </div>
                            </div>
                            <div className="submit_button">
                                <Button type="submit" style={{margin:"auto",backgroundColor:"white",width:"100%",color:"black",fontSize:18,
                                borderRadius:30,border:"1px solid black"
                            }} variant="contained" onClick={this.handleSubmit.bind(this)}>등록</Button>
                            </div>

                    </form>
            </div>
        </div>
    
    }

}

export default ProfileEdit;
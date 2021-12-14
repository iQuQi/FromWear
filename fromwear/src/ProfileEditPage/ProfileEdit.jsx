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
import {v4 as uuid} from 'uuid';
import Storage from '@aws-amplify/storage';
import { API } from 'aws-amplify';
import { updateUser,createUserStyleTag,updateUserStyleTag } from '../graphql/mutations';
import {static_tag_data} from "../SearchPage/TagData"
import zIndex from '@mui/material/styles/zIndex';

let board_type = 1
var tag_clicked_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //36개 태그
let uuid_ = uuid();

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
            content_introduce: '',
            gender: props.user.gender,
            create_tag: false,
            create_tag: false,
            file_key: '',
		}
	}
    
    componentDidMount(){

    }
    
    componentDidUpdate(prevProps) {
        if(this.props.user !== prevProps.user){
            this.setState({
                user: this.props.user,
                content_introduce: this.props.introduce,
                gender: this.props.user.gender,
            });
            
        }
    }

    changeIntroduceArea(e) {
        this.setState({content_introduce : e.target.value});
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
    
    checkGender = e => {
        if(e.target.value == 1) {
            this.setState({gender : 'M'});
        }
        else if(e.target.value == 2) {
            this.setState({gender : 'F'});
        }
        else {
            this.setState({gender : ''});
        }
        
        
    }

    handleSubmit=(e)=> {
        e.preventDefault();
        console.log("현재 유저 :",this.state.user);
        console.log("현재 introduce :",this.state.content_introduce);
        
        if(this.state.total_tag_num != 3) {
            alert("태그는 3개를 등록해야 합니다.");
        }
        else {
            API.graphql({
                query: updateUser, variables:{input:{
                    id: this.state.user.id,
                    introduce: this.state.content_introduce,
                    gender: this.state.gender,
                    profile_img: this.state.file_key,
                }}
            })
            .then(e => console.log(e))
            .then(res => {
                //현재 사용자의 tag list의 id 불러옴
                var before_tag_list = [this.state.user.my_tag_list.items[0].id,this.state.user.my_tag_list.items[1].id,this.state.user.my_tag_list.items[2].id];
                console.log("befsd", before_tag_list)

                //check된 리스트
                var tag_index = [];
                tag_clicked_list.forEach((tag, index) => {
                    if(tag == 1) {
                        tag_index = [...tag_index, index+1]
                    }
                })

                before_tag_list.map((origin_id, index)=>{
                    API.graphql({
                        query: updateUserStyleTag, variables: {
                            input: 
                            {
                                id: origin_id,
                                style_tag_id: tag_index[index],
                            } 
                    }})
                    .then(res => {
                        if(index == 2){
                            this.setState({
                                create_tag:true
                            })
                        }
                    })
                })
            })

                // tag_clicked_list.forEach((tag, index) => {
                //     if(tag == 1) {
                //         API.graphql({
                //             query: updateUserStyleTag, variables: {
                //                 input: 
                //                 {
                //                     user_id: this.state.user.id,
                //                     style_tag_id: index+1,
                //                 } 
                //         }})
                //         .then(res => console.log(res))
                //         .then(res => this.setState({create_tag: true}))
                //         .catch(e => console.log(e));
                //     }
                // })

            console.log("프로필 업데이트 성공!");
            //window.location.reload();
            
        }
    }

    handleCloseButton=(e)=> {
        console.log("1");
        //this.props.handle_write_page();
    }

    render(){
        let {fileImage, setFileImage, tag_click, content_introduce} = this.state;
        let {contents} = this.state;

        let profile_preview = <img className='profile_original_img' 
        style={{backgroundImage:"url("+profile_skyblue+")",backgroundSize:"cover"}}/>;
        if(this.state.file !== ''){
          profile_preview = <img className='profile_upload_img' 
          style={{backgroundImage:"url("+this.state.previewURL+")",backgroundSize:"cover"}}
          ></img>
        }
        return <div className="profile_page_container" style={{ zIndex: 10000}}>
            <div className="profile_edit_page">
            <Button  style={{ minWidth: 40,height: 40,margin: "0 5px 5px 20px", fontSize:"30px", 
                    fontWeight: 300, color: "black",position:"absolute",top:10,left:-15}} onClick={this.props.handle_profile_edit}>
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
                            <label htmlFor="to_click_img" className="profile_upload_button">프로필 업로드</label>
                
                             <div className="profile_introduce">
                                <h3>자기소개</h3>
                                <textarea name="" type="text" className="profile_introduce_text"
                                 placeholder="내용을 입력해주세요" value={content_introduce} onChange={this.changeIntroduceArea.bind(this)}></textarea>
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
                                <div className="profile_my_tag_list">
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
                                        <label className="profile_radio"><input type="radio" name="gender" value="1" onClick={this.checkGender} /><span>남자</span></label>
                                        <label className="profile_radio"><input type="radio" name="gender" value="2" onClick={this.checkGender}/><span>여자</span></label>
                                        <label className="profile_radio"><input type="radio" name="gender" value="3" defaultChecked onClick={this.checkGender}/><span>비공개</span></label>

                                    </div>
                            </div>
                            <div className="profile_submit_button">
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
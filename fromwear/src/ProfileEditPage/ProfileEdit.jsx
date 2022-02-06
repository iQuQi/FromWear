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
import { updateUser,updateUserStyleTag } from '../graphql/mutations';
import {static_tag_data} from "../SearchPage/TagData"
import ProfileImgDialog from "./ProfileImgDialog"
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
            img_upload: false,
            create_tag: false,
            file_key: '',
            isDialogOpen: false,
		}
	}
    
    componentDidMount(){
        this.setState({
            content_introduce: this.state.user.introduce,
        })
        this.set_tag_list();
    }
    set_tag_list = () => {
        console.log("현재 유저 태그",this.state.user)
        if(this.state.user.my_tag_list.items.length > 0){
            var tmp_user_tag_list = this.state.user.my_tag_list.items;
            if(tmp_user_tag_list[0].style_tag.id==102 && tmp_user_tag_list[1].style_tag.id==103 && tmp_user_tag_list[2].style_tag.id==101){
                console.log("초기 상태") //초기 상태면 tag 아무것도 안넣어둠
            }
            else{
                tmp_user_tag_list.map((tag)=>{
                    tag_clicked_list[tag.style_tag.id-1] = 1
                })
                this.setState({
                    contents: "#"+tmp_user_tag_list[0].style_tag.value+" #"+tmp_user_tag_list[1].style_tag.value +" #"+tmp_user_tag_list[2].style_tag.value,
                    current_click_tag_num: 3,
                    total_tag_num: 3,
                })  
            }
        }
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
        this.setState({file_key: `${uuid_}.${filetype}`,isDialogOpen: false})
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
            if(this.state.file==''){ //사진을 등록 X 또는 기본 사진 'profile_skyblue.jpg' 사용
                API.graphql({
                    query: updateUser, variables:{input:{
                        id: this.state.user.id,
                        introduce: this.state.content_introduce,
                        gender: this.state.gender,
                        //profile_img: this.state.file_key,
                    }}
                })
                .then(e => console.log(e))
                .then(res => {
                    //현재 사용자의 tag list의 id 불러옴
                    var before_tag_list = [this.state.user.my_tag_list.items[0].id,this.state.user.my_tag_list.items[1].id,this.state.user.my_tag_list.items[2].id];
    
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
                                    create_tag: true,
                                    img_upload: true,
                                })
                                
                            }
                        })
                    })
                })
                // .then(res=>{
                //     window.location.reload();
                // })
            }
            // else {
            //     console.log("현재 여기")
            //     var before_user_img_delete = this.state.user.profile_img
            //     console.log("삭제할 경로 : ", before_user_img_delete)
            // }
            else{

                var before_user_img_delete = this.state.user.profile_img
                console.log("삭제할 경로 : ", before_user_img_delete)
                if(before_user_img_delete == 'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/profile_skyblue.jpg'){
                    console.log("기본 이미지는 s3 삭제 X")
                    before_user_img_delete = '';
                }
                
                API.graphql({
                    query: updateUser, variables:{input:{
                        id: this.state.user.id,
                        introduce: this.state.content_introduce,
                        gender: this.state.gender,
                        profile_img: this.state.file_key,
                    }}
                })
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
                // .then(res=>{
                //     window.location.reload();
                // })
                .then((res) => {
                    Storage.put(`${this.state.file_key}`, this.state.file)
                    .then(res => {
                        Storage.remove(before_user_img_delete)
                        .then(res => this.setState({img_upload: true}))
                        .catch((e) => console.log("onChange error", e));
                    })
                    .catch((e) => console.log("onChange error", e));
                })
                .catch((e) => console.log("onChange error", e))
            }
            
            console.log("프로필 업데이트 성공!");
            //window.location.reload();
            
        }

    }


    handleProfileUploadClickOpen=()=>{
        this.setState({
            isDialogOpen: true
        })
    }

    handleDialogClose = ()=>{
        this.setState({
            isDialogOpen: false
        })
    }

    handleChangetoDefault=()=>{
        this.setState({file_key: "profile_skyblue.jpg", file: "default"})
    }

    render(){
        let {isDialogOpen, tag_click, content_introduce} = this.state;
        let {contents} = this.state;

        if(this.state.create_tag == true && this.state.img_upload == true) {
            window.location.reload();
        }

        let profile_preview;
        if(this.state.file == ''||this.state.file == 'default'){
            if(this.state.user.profile_img == 'profile_skyblue.jpg'||this.state.file_key=="profile_skyblue.jpg"){
                profile_preview = <img className='profile_original_img' style={{backgroundImage:"url("+profile_skyblue+")",backgroundSize:"cover"}}/>;
            }
            else{ //프로필 이미지는 s3에 어떻게 업로드 되는지 보고 파악하면 될듯
                profile_preview = <img className='profile_original_img' style={{backgroundImage:"url("+'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+this.state.user.profile_img+")",backgroundSize:"cover"}}/>;
            }
        }
        else{
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
                           
                            <Button variant="outlined"
                            disableFocusRipple 
                            sx={{position: 'absolute',
                                top:'300px',
                                left:'105px',
                                border: '1px solid black',
                                boxSizing: 'border-box',
                                borderRadius: '30px',
                                color: 'black', 
                                '&:hover': {
                                    borderColor: 'black'
                                }}}
                             onClick={this.handleProfileUploadClickOpen}>
                                프로필 업로드
                            </Button>
                            <ProfileImgDialog
                                isOpen={isDialogOpen}
                                handleClose={this.handleDialogClose}
                                handleFileOnChange={this.handleFileOnChange}
                                handleChangetoDefault={this.handleChangetoDefault}
                            />
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
                                    {
                                        !this.state.user.gender ? //null
                                        <div className="select_blind">
                                            <label className="profile_radio"><input type="radio" name="gender" value="1" onClick={this.checkGender} /><span>남자</span></label>
                                            <label className="profile_radio"><input type="radio" name="gender" value="2" onClick={this.checkGender}/><span>여자</span></label>
                                            <label className="profile_radio"><input type="radio" name="gender" value="3" defaultChecked onClick={this.checkGender}/><span>비공개</span></label>
                                        </div>
                                        :<div>
                                            {
                                            this.state.user.gender == 'M' ?
                                            <div className="select_blind">
                                            <label className="profile_radio"><input type="radio" name="gender" value="1" defaultChecked onClick={this.checkGender} /><span>남자</span></label>
                                            <label className="profile_radio"><input type="radio" name="gender" value="2" onClick={this.checkGender}/><span>여자</span></label>
                                            <label className="profile_radio"><input type="radio" name="gender" value="3" onClick={this.checkGender}/><span>비공개</span></label>
                                            </div>
                                            :<div className="select_blind">
                                                <label className="profile_radio"><input type="radio" name="gender" value="1" onClick={this.checkGender} /><span>남자</span></label>
                                                <label className="profile_radio"><input type="radio" name="gender" value="2" defaultChecked onClick={this.checkGender}/><span>여자</span></label>
                                                <label className="profile_radio"><input type="radio" name="gender" value="3" onClick={this.checkGender}/><span>비공개</span></label>
                                            </div>
                                        }
                                        </div>
                                    }
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
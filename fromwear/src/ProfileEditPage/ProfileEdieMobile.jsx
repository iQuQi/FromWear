import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProfileImgDialog from "./ProfileImgDialog";
import Input from "@mui/material/Input";
import ProfileEditTagList from "./ProfileEditTagList";
import * as React from "react";
import {Box} from "@mui/system";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {DEFAULT_FONT, DEFAULT_FONT_BOLD} from "../style/common";
import TagList from "../SearchPage/TagList";

export default function ProfileEditMobile ({
    profile_preview,
    isDialogOpen,
    content_introduce,
    contents,
    tag_click,
    tag_clicked_list,
    handle_profile_edit,
    user,
    handleProfileUploadClickOpen,
    handleDialogClose,
    handleFileOnChange,
    handleChangetoDefault,
    handleSubmit,
    changeIntroduceArea,
    onClickTag,
    handle_tag_button_click,
    checkGender,
    handleClose,
 }) {


    return <Stack
                direction="column"
                sx={styles.container}
                justifyContent="start"
            >
                <Typography component="span" sx={styles.title}>
                    <Button style={styles.modalCloseButton} onClick={handle_profile_edit}>
                        <ArrowBackIosNewIcon />
                    </Button>
                    프로필 편집
                    <Button
                        type="submit"
                        style={styles.saveButton}
                        variant="contained"
                        onClick={handleSubmit}>
                        저장
                    </Button>
                </Typography>

                <Box sx={styles.profileImage}>
                    {profile_preview}
                    <Button
                        variant="outlined"
                        disableFocusRipple
                        sx={styles.imageUploadButton}
                        onClick={handleProfileUploadClickOpen}
                    >
                        프로필 업로드
                    </Button>
                    <ProfileImgDialog
                        isOpen={isDialogOpen}
                        handleClose={handleDialogClose}
                        handleFileOnChange={handleFileOnChange}
                        handleChangetoDefault={handleChangetoDefault}
                    />
                </Box>
                <form action="doLogin" method="POST" className="img_form">
                    <Box>
                        <h3>자기소개</h3>
                        <textarea
                            name=""
                            type="text"
                            style={styles.introduceSelf}
                            placeholder="내용을 입력해주세요"
                            value={content_introduce}
                            onChange={changeIntroduceArea}
                        />
                    </Box>
                    <Box>
                        <h3 style={{position :'relative'}}>
                            소개태그
                            <Button
                                style={styles.introduceTagButton}
                                onClick={onClickTag}
                            >
                                수정
                            </Button>
                        </h3>
                        <Typography sx={styles.introduceTag}>
                            {contents}
                        </Typography>
                    </Box>
                    {
                        tag_click &&
                            <Box sx={styles.tagList}>
                                <TagList
                                    isMobile
                                    topPos={50}
                                    target_button={tag_clicked_list}
                                    handle_tag_button_click={handle_tag_button_click}
                                />
                                <Button onClick={handleClose} sx={styles.tagCloseButton}>
                                    저장
                                </Button>
                            </Box>
                    }
                    <Box>
                        <h3>성별</h3>
                        <Box sx={styles.gender}>
                            <label className="profile_radio">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="1"
                                    defaultChecked={user.gender === 'M'}
                                    onClick={checkGender}
                                />
                                <span>남자</span>
                            </label>
                            <label className="profile_radio">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="2"
                                    defaultChecked={user.gender === 'F'}
                                    onClick={checkGender}
                                />
                                <span>여자</span>
                            </label>
                            <label className="profile_radio">
                                <input type="radio"
                                       name="gender"
                                       value="3"
                                       defaultChecked={!user.gender}
                                       onClick={checkGender}
                                />
                                <span>비공개</span>
                            </label>
                        </Box>
                    </Box>
                </form>
            </Stack>
}

const styles = {
    title: {
        ...DEFAULT_FONT_BOLD,
        fontSize: '18px',
        lineHeight: "45px",
        margin: '5px 0',
    },
    profileImage: {
        display: 'block',
        margin: '0 auto',
        '& .profile_original_img' :{
            margin: '0 30px',
            width: '220px',
            height: '220px',
            position: 'relative',
            top: 0,
            left: 0,
        }
    },
    imageUploadButton: {
        border: '1px solid black',
        boxSizing: 'border-box',
        borderRadius: '30px',
        color: 'black',
        margin: '10px 0',
        fontSize: '15px',
        '&:hover': {
            borderColor: 'black'
        }
    },
    tagList: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 99999,
    },
    container: {
        position: 'fixed',
        backgroundColor: 'white',
        zIndex: 1000,
        top: '45px',
        bottom: 0,
        right: 0,
        left: 0,
        padding: '0 25px',
        boxSizing: 'border-box',
    },
    introduceSelf : {
        width: '330px',
        height: '70px',
        margin: '10px 0 15px',
        resize:'none',
        padding: '13px',
        boxSizing: 'border-box',
    },
    introduceTag: {
        width: '330px',
        margin:"10px 0  15px",
        ...DEFAULT_FONT,
        color: 'royalblue',
        fontSize: '18px',
    },
    introduceTagButton: {
        width: '40px',
        minWidth: '40px',
        ...DEFAULT_FONT,
        color: 'black',
        fontSize: '12px',
        border: '1px solid black',
        padding: 0,
        borderRadius: '30px',
        position: 'absolute',
        top: '-3px',
        right: '90px',
    },
    gender: {
        ...DEFAULT_FONT,
        fontSize: '15px',
        margin: '10px 0  15px 25px',
    },
    modalCloseButton: {
        minWidth: 40,
        height: 40,
        margin: "0 5px 5px 20px",
        fontSize:"30px",
        fontWeight: 300,
        color: "black",
        position:"absolute",
        left:-15
    },
    tagCloseButton : {
        color:'black',
        backgroundColor: 'white',
        width: '50px',
        borderRadius: '30px',
        position:'absolute',
        ...DEFAULT_FONT_BOLD,
        fontSize:18,
        top:'10px',
        right: 0,
    },
    saveButton: {
        width:"70px",
        ...DEFAULT_FONT_BOLD,
        color: 'black',
        fontSize:18,
        border: 0,
        backgroundColor: 'white',
        boxShadow: 'none',
        position: 'absolute',
        right: '0',
    }
}
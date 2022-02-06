
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';


let ProfileDialog = ({handleClose,isOpen,handleFileOnChange,handleChangetoDefault}) => {
            return(
            <>
           
            <Dialog onClose={handleClose} open={isOpen} sx={{zIndex:1000000}}>
                <List sx={{ pt: 0 }}>
                    <ListItem >
                    <input
                        id="to_click_img" className="dialog_img_file_form"
                        type='file' 
                        accept='image/*' 
                        name='profile_img' 
                        onChange={handleFileOnChange}>
                    </input>
                    <label htmlFor="to_click_img" className='dialog_img_label'>사진 업로드</label> 
                    </ListItem>
                    <ListItem button onClick={() => {
                        handleChangetoDefault()
                        handleClose()}}>
                        기본 이미지로 변경
                    </ListItem>
                </List>
            </Dialog>
            </>
             
                
            )
};

            
         
export default ProfileDialog;
    
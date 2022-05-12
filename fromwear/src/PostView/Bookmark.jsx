import React, {Component} from 'react';
import './Bookmark.css';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

let Bookmark =(prop) => {
    let {bookmark_click, handleBookmarkButton} = prop;

   
    return (
        <div className="icons_list">
            <div className="bookmark_pc">
                {
                    bookmark_click ?
                    <BookmarkIcon className="button bookmark_filled" onClick={handleBookmarkButton}/>
                    : <BookmarkBorderIcon className="button bookmark_outlined" onClick={handleBookmarkButton}/>
                }
            </div>
            <div className="bookmark_mobile">
                {
                    bookmark_click ?
                    <BookmarkIcon className="button bookmark_filled" onClick={handleBookmarkButton} style={{fontSize: 30}}/>
                    : <BookmarkBorderIcon className="button bookmark_outlined" onClick={handleBookmarkButton} style={{fontSize: 30}}/>
                }
            </div>
        </div>
        )
    
}

export default Bookmark;
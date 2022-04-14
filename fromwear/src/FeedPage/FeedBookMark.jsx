import * as React from 'react';
import { useState } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { API } from 'aws-amplify';
import { createUserBookmarkPost, deleteUserBookmarkPost } from '../graphql/mutations';


export default function FeedBookMark({is_click, now_user, post_id}) {

    const [bookmarkClick, setBookmarkClick] = useState(is_click);
    
    const handleBookmark = () => {
        
        if(now_user == 'noUser'){
            alert("로그인해주세요.")    
            return
        }
        if(is_click == true){
            setBookmarkClick(prevBookmarkClick => !prevBookmarkClick);
    
            API.graphql({query: deleteUserBookmarkPost, variables:{input:
                {
                    id: now_user.id + post_id,
                }}
            })
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }
        else {
            setBookmarkClick(prevBookmarkClick => !prevBookmarkClick);
    
            API.graphql({query: createUserBookmarkPost, variables:{input:
                {
                    id: now_user.id + post_id,
                    user_id: now_user.id,
                    post_id: post_id,
                }}
            })
    
        }
    }

    return(
        <div>
            {
                is_click == true?
                <BookmarkIcon onClick={handleBookmark()} style={{margin: '7px 0px 7px 0px', color:'#000000'}} sx={{fontSize: '1.3rem'}}/>
                : <BookmarkBorderIcon onClick={handleBookmark()} style={{margin: '7px 0px 7px 0px', color:'#000000'}} sx={{fontSize: '1.3rem'}}/>
            }
        </div>
        
        
    )
}





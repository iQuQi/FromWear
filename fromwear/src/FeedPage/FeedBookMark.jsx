import * as React from 'react';
import { useState, useEffect } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { API } from 'aws-amplify';
import { createUserBookmarkPost, deleteUserBookmarkPost } from '../graphql/mutations';


export default function FeedBookMark({now_user, post}) {
    const [bookmarkClick, setBookmarkClick] = useState(false);

    useEffect(() => {
        post.bookmark_user_list.items.map((item) => {
            if(item.user_id == now_user.id){
                setBookmarkClick(true);
                console.log(bookmarkClick);
            }  
        })
    }, [now_user, post]); 
   
    const handleBookmark = () => {
        
        if(now_user == 'noUser'){
            alert("로그인해주세요.")    
            return
        }
        if(bookmarkClick == true){
            setBookmarkClick(false);
    
            API.graphql({query: deleteUserBookmarkPost, variables:{input:
                {
                    id: now_user.id + post.id,
                }}
            })
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }
        else {
            setBookmarkClick(true);
    
            API.graphql({query: createUserBookmarkPost, variables:{input:
                {
                    id: now_user.id + post.id,
                    user_id: now_user.id,
                    post_id: post.id,
                }}
            })
    
        }
    }

    return(
        <div>
            {
                bookmarkClick == true?
                <BookmarkIcon className='button' onClick={handleBookmark} style={{margin: '7px 0px 7px 0px', color:'#000000'}} sx={{fontSize: '1.3rem'}}/>
                : <BookmarkBorderIcon className='button' onClick={handleBookmark} style={{margin: '7px 0px 7px 0px', color:'#000000'}} sx={{fontSize: '1.3rem'}}/>
            }
        </div>
        
        
    )
}





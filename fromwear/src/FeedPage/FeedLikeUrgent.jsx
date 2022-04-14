import * as React from 'react';
import { useState, useEffect } from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { API } from 'aws-amplify';
import { createPostLikeUrgentUser, deletePostLikeUrgentUser, createAlarm } from '../graphql/mutations';

import './FeedIcon.css';

export default function FeedLikeUrgent({now_user, post}) {
    const [likeUrgentClick, setLikeUrgentClick] = useState(false);
    const [likeUrgentNum, setLikeUrgentNum] = useState(post.like_urgent_user_list.items.length);

    useEffect(() => {
        post.like_urgent_user_list.items.map((item) => {
            if(item.user_id == now_user.id){
                setLikeUrgentClick(true);
            }  
        })
    }, [now_user, post]); 

    const handleLikeUrgent = () => {
        if(now_user == 'noUser'){
            alert("로그인해주세요.")    
            return
        }
        
        if(likeUrgentClick == true){
            setLikeUrgentClick(false);
            setLikeUrgentNum(likeUrgentNum - 1);
    
            API.graphql({query: deletePostLikeUrgentUser, variables:{input:
                {
                    id: now_user.id + post.id,
                }}
            })
            .then(res => console.log(res))
            .catch(e => console.log(e));
    
        }
        else {
            setLikeUrgentClick(true);
            setLikeUrgentNum(likeUrgentNum + 1);
    
            API.graphql({query: createPostLikeUrgentUser, variables:{input:
                {
                    id: now_user.id + post.id, //id는 안적어도 자동 생성되는데 그럼 delete때 id를 못넣어줘서 따로 지정하는 것
                    user_id: now_user.id,
                    post_id: post.id,
                }}
            })
            
            API.graphql({query: createAlarm, variables:{input:
                {
                    user_id: post.user_id,
                    content: now_user.name+'님이 게시글에 좋아요를 눌렀습니다',
                    link:'post/' + post.id
    
                }}
            })
            .then(e => console.log(e))
        }
    
    }

    return(
        <div>
            {
                likeUrgentClick == true?
                <HeartFilled className='btn' onClick={handleLikeUrgent} style={{margin: '8px 2px 7px 2px', color:'red', fontSize: '1.1rem'}} />
                : <HeartOutlined className='btn' onClick={handleLikeUrgent} style={{margin: '8px 2px 7px 2px', color:'#000000', fontSize: '1.1rem'}} />
            }
            <span style={{margin: '19px 5px 7px 0px', fontSize: '1.1rem'}}>
                {likeUrgentNum>1000?
                    likeUrgentNum/1000 + '.k'
                    : likeUrgentNum}</span>
        </div>
        
    )
}

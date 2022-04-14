import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { API } from 'aws-amplify';
import { createPostLikeUrgentUser, deletePostLikeUrgentUser, createAlarm } from '../graphql/mutations';

export default function FeedLikeUrgent({is_click}) {
    return(
        <FavoriteBorderIcon style={{margin: '7px 2px 7px 3px', color:'#000000'}} sx={{fontSize: '1.3rem'}}/>
    )
}
/*handleLikeUrgent = () => {
    if(this.state.now_user == 'noUser'){
        alert("로그인해주세요.")    
        return
    }
    
    if(this.state.like_urgent_click == true){
        this.setState((prev) => {
            return {
                like_urgent_click: false,
                like_urgent_num: this.state.like_urgent_num-1,
            }

        });

        API.graphql({query: deletePostLikeUrgentUser, variables:{input:
            {
                id: this.state.now_user.id + this.state.post_id,
            }}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e));

    }
    else {
        this.setState((prev) => {
            return {
                like_urgent_click: true,
                like_urgent_num: this.state.like_urgent_num+1,
            }
        });

        API.graphql({query: createPostLikeUrgentUser, variables:{input:
            {
                id: this.state.now_user.id + this.state.post_id, //id는 안적어도 자동 생성되는데 그럼 delete때 id를 못넣어줘서 따로 지정하는 것
                user_id: this.state.now_user.id,
                post_id: this.state.post_id,
            }}
        })
        
        API.graphql({query: createAlarm, variables:{input:
            {
                user_id: this.state.now_writer.id,
                content: this.state.now_user.name+'님이 게시글에 좋아요를 눌렀습니다',
                link:'post/' + this.state.post_id

            }}
        })
        .then(e => console.log(e))
    }

}*/
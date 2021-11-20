import * as React from 'react';
import {API} from 'aws-amplify';
import {getPost,listPosts} from '../graphql/queries.js';


let get_post_data =  (handle_post_data) =>{
      API.graphql({
        query: listPosts,
        variables:{filter: {board_type: {ne:1}}}
      }).then(res=>{
        let result_post=res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num});
        let limit_post = result_post.slice(0,25);
        return handle_post_data(limit_post);
      })
      .catch(e=>console.log(e))


}

export default get_post_data;
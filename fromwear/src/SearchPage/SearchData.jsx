import * as React from 'react';
import {API} from 'aws-amplify';
import {getPost,listPosts} from '../graphql/queries.js';


let get_post_data =  (handle_post_data) =>{
      var post_data;
      API.graphql({
        query: listPosts,
      }).then(res=>{
        post_data = res.data.listPosts.items.filter(
          item=> item.board_type==0 || item.board_type==2
        );
        return post_data.sort(function(a,b){return b.like_user_num-a.like_user_num});
      })
      .then((res)=>
        handle_post_data(res)
      )
      .catch(e=>console.log(e))


}

export default get_post_data;
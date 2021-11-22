import * as React from 'react';
import WeeklyTagPage from "./WeeklyTagPage";
import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries';
import { getUser } from '../graphql/queries';

let get_post_list = ({ postlist_0 }) => {
    let post = [];
    API.graphql({ query: listPosts, variables: { filter: {board_type: {eq: 0}}  }})
    .then( res => { 
        console.log(res.data.listPosts.items);
        post = res.data.listPosts.items;
        console.log(post);
    })
    .catch( e => console.log(e));

    console.log(post);
    return post;
}

export default get_post_list;
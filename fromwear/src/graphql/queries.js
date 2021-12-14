/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phone
      profile_img
      introduce
      gender
      adopted
      following_list {
        items {
          id
          following_id
          follower_id
          createdAt
          updatedAt
        }
        nextToken
      }
      follower_list {
        items {
          id
          following_id
          follower_id
          createdAt
          updatedAt
        }
        nextToken
      }
      my_post_list {
        items {
          id
          img
          content
          user_id
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        nextToken
      }
      my_bookmark_post_list {
        items {
          id
          user_id
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      my_comment_list {
        items {
          id
          user_id
          content
          adopted
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      my_tag_list {
        items {
          id
          user_id
          style_tag_id
          createdAt
          updatedAt
        }
        nextToken
      }
      alarm_list {
        items {
          id
          user_id
          content
          link
          createdAt
          updatedAt
        }
        nextToken
      }
      award_today
      award_week
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAlarm = /* GraphQL */ `
  query GetAlarm($id: ID!) {
    getAlarm(id: $id) {
      id
      user_id
      content
      link
      createdAt
      updatedAt
    }
  }
`;
export const listAlarms = /* GraphQL */ `
  query ListAlarms(
    $filter: ModelAlarmFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlarms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        content
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      user_id
      user {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      content
      adopted
      like_user_list {
        items {
          id
          user_id
          comment_id
          createdAt
          updatedAt
        }
        nextToken
      }
      post_id
      post {
        id
        comment_list {
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list {
          nextToken
        }
        like_urgent_user_list {
          nextToken
        }
        tag_list {
          nextToken
        }
        board_type
        click_num
        blind
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        content
        adopted
        like_user_list {
          nextToken
        }
        post_id
        post {
          id
          img
          content
          user_id
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      comment_list {
        items {
          id
          user_id
          content
          adopted
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      img
      content
      user_id
      user {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      bookmark_user_list {
        items {
          id
          user_id
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      like_urgent_user_list {
        items {
          id
          user_id
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      tag_list {
        items {
          id
          tag_id
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      board_type
      click_num
      blind
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        comment_list {
          items{
            id
          }
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list {
          items{
            id
          }
          nextToken
        }
        like_urgent_user_list {
          items{
            id
          }
          nextToken
        }
        tag_list {
          items{
            id
            tag_id
            post_id
            style_tag{
              id
              value
            }
            post{
              id
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        board_type
        click_num
        blind
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStyleTag = /* GraphQL */ `
  query GetStyleTag($id: ID!) {
    getStyleTag(id: $id) {
      id
      value
      num
      is_static
      is_weekly
      user_list {
        items {
          id
          user_id
          style_tag_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listStyleTags = /* GraphQL */ `
  query ListStyleTags(
    $filter: ModelStyleTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStyleTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        num
        is_static
        is_weekly
        user_list {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserBookmarkPost = /* GraphQL */ `
  query GetUserBookmarkPost($id: ID!) {
    getUserBookmarkPost(id: $id) {
      id
      user_id
      post_id
      user {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      post {
        id
        comment_list {
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list {
          nextToken
        }
        like_urgent_user_list {
          nextToken
        }
        tag_list {
          nextToken
        }
        board_type
        click_num
        blind
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserBookmarkPosts = /* GraphQL */ `
  query ListUserBookmarkPosts(
    $filter: ModelUserBookmarkPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserBookmarkPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        post {
          id
          img
          content
          user_id
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFollowingFollower = /* GraphQL */ `
  query GetFollowingFollower($id: ID!) {
    getFollowingFollower(id: $id) {
      id
      following_id
      follower_id
      following {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      follower {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFollowingFollowers = /* GraphQL */ `
  query ListFollowingFollowers(
    $filter: ModelFollowingFollowerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowingFollowers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        following_id
        follower_id
        following {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        follower {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserStyleTag = /* GraphQL */ `
  query GetUserStyleTag($id: ID!) {
    getUserStyleTag(id: $id) {
      id
      user_id
      style_tag_id
      user {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          items{
            id
            user_id
            content
            link
          }
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      style_tag {
        id
        value
        num
        is_static
        is_weekly
        user_list {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserStyleTags = /* GraphQL */ `
  query ListUserStyleTags(
    $filter: ModelUserStyleTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserStyleTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        style_tag_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        style_tag {
          id
          value
          num
          is_static
          is_weekly
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommentLikeUser = /* GraphQL */ `
  query GetCommentLikeUser($id: ID!) {
    getCommentLikeUser(id: $id) {
      id
      user_id
      comment_id
      user {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      comment {
        id
        user_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        content
        adopted
        like_user_list {
          nextToken
        }
        post_id
        post {
          id
          img
          content
          user_id
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCommentLikeUsers = /* GraphQL */ `
  query ListCommentLikeUsers(
    $filter: ModelCommentLikeUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentLikeUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        comment_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        comment {
          id
          user_id
          content
          adopted
          post_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostLikeUrgentUser = /* GraphQL */ `
  query GetPostLikeUrgentUser($id: ID!) {
    getPostLikeUrgentUser(id: $id) {
      id
      user_id
      post_id
      user {
        id
        name
        email
        phone
        profile_img
        introduce
        gender
        adopted
        following_list {
          nextToken
        }
        follower_list {
          nextToken
        }
        my_post_list {
          nextToken
        }
        my_bookmark_post_list {
          nextToken
        }
        my_comment_list {
          nextToken
        }
        my_tag_list {
          nextToken
        }
        alarm_list {
          nextToken
        }
        award_today
        award_week
        createdAt
        updatedAt
      }
      post {
        id
        comment_list {
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list {
          nextToken
        }
        like_urgent_user_list {
          nextToken
        }
        tag_list {
          nextToken
        }
        board_type
        click_num
        blind
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostLikeUrgentUsers = /* GraphQL */ `
  query ListPostLikeUrgentUsers(
    $filter: ModelPostLikeUrgentUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostLikeUrgentUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        post {
          id
          img
          content
          user_id
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostStyleTag = /* GraphQL */ `
  query GetPostStyleTag($id: ID!) {
    getPostStyleTag(id: $id) {
      id
      tag_id
      post_id
      style_tag {
        id
        value
        num
        is_static
        is_weekly
        user_list {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        comment_list {
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          email
          phone
          profile_img
          introduce
          gender
          adopted
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list {
          nextToken
        }
        like_urgent_user_list {
          nextToken
        }
        tag_list {
          nextToken
        }
        board_type
        click_num
        blind
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostStyleTags = /* GraphQL */ `
  query ListPostStyleTags(
    $filter: ModelPostStyleTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostStyleTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tag_id
        post_id
        style_tag {
          id
          value
          num
          is_static
          is_weekly
          createdAt
          updatedAt
        }
        post {
          id
          img
          content
          user_id
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;


/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      email
      phone
      profile_img
      introduce
      gender
      adopted
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
      award_today
      award_week
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      email
      phone
      profile_img
      introduce
      gender
      adopted
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
      award_today
      award_week
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      email
      phone
      profile_img
      introduce
      gender
      adopted
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
      award_today
      award_week
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onCreateStyleTag = /* GraphQL */ `
  subscription OnCreateStyleTag {
    onCreateStyleTag {
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
export const onUpdateStyleTag = /* GraphQL */ `
  subscription OnUpdateStyleTag {
    onUpdateStyleTag {
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
export const onDeleteStyleTag = /* GraphQL */ `
  subscription OnDeleteStyleTag {
    onDeleteStyleTag {
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
export const onCreateUserBookmarkPost = /* GraphQL */ `
  subscription OnCreateUserBookmarkPost {
    onCreateUserBookmarkPost {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onUpdateUserBookmarkPost = /* GraphQL */ `
  subscription OnUpdateUserBookmarkPost {
    onUpdateUserBookmarkPost {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onDeleteUserBookmarkPost = /* GraphQL */ `
  subscription OnDeleteUserBookmarkPost {
    onDeleteUserBookmarkPost {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onCreateFollowingFollower = /* GraphQL */ `
  subscription OnCreateFollowingFollower {
    onCreateFollowingFollower {
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
        follower_list {
          nextToken
        }
        following_list {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onUpdateFollowingFollower = /* GraphQL */ `
  subscription OnUpdateFollowingFollower {
    onUpdateFollowingFollower {
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
        follower_list {
          nextToken
        }
        following_list {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onDeleteFollowingFollower = /* GraphQL */ `
  subscription OnDeleteFollowingFollower {
    onDeleteFollowingFollower {
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
        follower_list {
          nextToken
        }
        following_list {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onCreateUserStyleTag = /* GraphQL */ `
  subscription OnCreateUserStyleTag {
    onCreateUserStyleTag {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onUpdateUserStyleTag = /* GraphQL */ `
  subscription OnUpdateUserStyleTag {
    onUpdateUserStyleTag {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onDeleteUserStyleTag = /* GraphQL */ `
  subscription OnDeleteUserStyleTag {
    onDeleteUserStyleTag {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onCreateCommentLikeUser = /* GraphQL */ `
  subscription OnCreateCommentLikeUser {
    onCreateCommentLikeUser {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onUpdateCommentLikeUser = /* GraphQL */ `
  subscription OnUpdateCommentLikeUser {
    onUpdateCommentLikeUser {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onDeleteCommentLikeUser = /* GraphQL */ `
  subscription OnDeleteCommentLikeUser {
    onDeleteCommentLikeUser {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onCreatePostLikeUrgentUser = /* GraphQL */ `
  subscription OnCreatePostLikeUrgentUser {
    onCreatePostLikeUrgentUser {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onUpdatePostLikeUrgentUser = /* GraphQL */ `
  subscription OnUpdatePostLikeUrgentUser {
    onUpdatePostLikeUrgentUser {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onDeletePostLikeUrgentUser = /* GraphQL */ `
  subscription OnDeletePostLikeUrgentUser {
    onDeletePostLikeUrgentUser {
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
        follower_list {
          nextToken
        }
        following_list {
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
export const onCreatePostStyleTag = /* GraphQL */ `
  subscription OnCreatePostStyleTag {
    onCreatePostStyleTag {
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
export const onUpdatePostStyleTag = /* GraphQL */ `
  subscription OnUpdatePostStyleTag {
    onUpdatePostStyleTag {
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
export const onDeletePostStyleTag = /* GraphQL */ `
  subscription OnDeletePostStyleTag {
    onDeletePostStyleTag {
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

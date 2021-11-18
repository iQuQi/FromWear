/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      passwd
      profile_img
      introduce
      gender
      adopted
      follower_num
      following_num
      my_post_list {
        items {
          id
          like_user_num
          urgent_user_num
          img
          content
          user_id
          bookmark_user_list
          like_user_list
          tag_list
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        nextToken
      }
      my_bookmark_post_list
      my_comment_list {
        items {
          id
          user_id
          content
          adopted
          like
          like_user_list
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      my_tag_list
      award_today
      award_week
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      passwd
      profile_img
      introduce
      gender
      adopted
      follower_num
      following_num
      my_post_list {
        items {
          id
          like_user_num
          urgent_user_num
          img
          content
          user_id
          bookmark_user_list
          like_user_list
          tag_list
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        nextToken
      }
      my_bookmark_post_list
      my_comment_list {
        items {
          id
          user_id
          content
          adopted
          like
          like_user_list
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      my_tag_list
      award_today
      award_week
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      passwd
      profile_img
      introduce
      gender
      adopted
      follower_num
      following_num
      my_post_list {
        items {
          id
          like_user_num
          urgent_user_num
          img
          content
          user_id
          bookmark_user_list
          like_user_list
          tag_list
          board_type
          click_num
          blind
          createdAt
          updatedAt
        }
        nextToken
      }
      my_bookmark_post_list
      my_comment_list {
        items {
          id
          user_id
          content
          adopted
          like
          like_user_list
          post_id
          createdAt
          updatedAt
        }
        nextToken
      }
      my_tag_list
      award_today
      award_week
      createdAt
      updatedAt
    }
  }
`;
export const createFollow = /* GraphQL */ `
  mutation CreateFollow(
    $input: CreateFollowInput!
    $condition: ModelfollowConditionInput
  ) {
    createFollow(input: $input, condition: $condition) {
      id
      following_id
      follower_id
      createdAt
      updatedAt
    }
  }
`;
export const updateFollow = /* GraphQL */ `
  mutation UpdateFollow(
    $input: UpdateFollowInput!
    $condition: ModelfollowConditionInput
  ) {
    updateFollow(input: $input, condition: $condition) {
      id
      following_id
      follower_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollow = /* GraphQL */ `
  mutation DeleteFollow(
    $input: DeleteFollowInput!
    $condition: ModelfollowConditionInput
  ) {
    deleteFollow(input: $input, condition: $condition) {
      id
      following_id
      follower_id
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      user_id
      user {
        id
        name
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
        }
        my_tag_list
        award_today
        award_week
        createdAt
        updatedAt
      }
      content
      adopted
      like
      like_user_list
      post_id
      post {
        id
        like_user_num
        urgent_user_num
        comment_list {
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          passwd
          profile_img
          introduce
          gender
          adopted
          follower_num
          following_num
          my_bookmark_post_list
          my_tag_list
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list
        like_user_list
        tag_list
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      user_id
      user {
        id
        name
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
        }
        my_tag_list
        award_today
        award_week
        createdAt
        updatedAt
      }
      content
      adopted
      like
      like_user_list
      post_id
      post {
        id
        like_user_num
        urgent_user_num
        comment_list {
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          passwd
          profile_img
          introduce
          gender
          adopted
          follower_num
          following_num
          my_bookmark_post_list
          my_tag_list
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list
        like_user_list
        tag_list
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      user_id
      user {
        id
        name
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
        }
        my_tag_list
        award_today
        award_week
        createdAt
        updatedAt
      }
      content
      adopted
      like
      like_user_list
      post_id
      post {
        id
        like_user_num
        urgent_user_num
        comment_list {
          nextToken
        }
        img
        content
        user_id
        user {
          id
          name
          passwd
          profile_img
          introduce
          gender
          adopted
          follower_num
          following_num
          my_bookmark_post_list
          my_tag_list
          award_today
          award_week
          createdAt
          updatedAt
        }
        bookmark_user_list
        like_user_list
        tag_list
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      like_user_num
      urgent_user_num
      comment_list {
        items {
          id
          user_id
          content
          adopted
          like
          like_user_list
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
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
        }
        my_tag_list
        award_today
        award_week
        createdAt
        updatedAt
      }
      bookmark_user_list
      like_user_list
      tag_list
      board_type
      click_num
      blind
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      like_user_num
      urgent_user_num
      comment_list {
        items {
          id
          user_id
          content
          adopted
          like
          like_user_list
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
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
        }
        my_tag_list
        award_today
        award_week
        createdAt
        updatedAt
      }
      bookmark_user_list
      like_user_list
      tag_list
      board_type
      click_num
      blind
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      like_user_num
      urgent_user_num
      comment_list {
        items {
          id
          user_id
          content
          adopted
          like
          like_user_list
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
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
        }
        my_tag_list
        award_today
        award_week
        createdAt
        updatedAt
      }
      bookmark_user_list
      like_user_list
      tag_list
      board_type
      click_num
      blind
      createdAt
      updatedAt
    }
  }
`;
export const createPostBoard = /* GraphQL */ `
  mutation CreatePostBoard(
    $input: CreatePostBoardInput!
    $condition: ModelPostBoardConditionInput
  ) {
    createPostBoard(input: $input, condition: $condition) {
      id
      board_type
      best_post_list
      createdAt
      updatedAt
    }
  }
`;
export const updatePostBoard = /* GraphQL */ `
  mutation UpdatePostBoard(
    $input: UpdatePostBoardInput!
    $condition: ModelPostBoardConditionInput
  ) {
    updatePostBoard(input: $input, condition: $condition) {
      id
      board_type
      best_post_list
      createdAt
      updatedAt
    }
  }
`;
export const deletePostBoard = /* GraphQL */ `
  mutation DeletePostBoard(
    $input: DeletePostBoardInput!
    $condition: ModelPostBoardConditionInput
  ) {
    deletePostBoard(input: $input, condition: $condition) {
      id
      board_type
      best_post_list
      createdAt
      updatedAt
    }
  }
`;
export const createTagList = /* GraphQL */ `
  mutation CreateTagList(
    $input: CreateTagListInput!
    $condition: ModelTagListConditionInput
  ) {
    createTagList(input: $input, condition: $condition) {
      id
      static_tag_list
      week_tag_list
      createdAt
      updatedAt
    }
  }
`;
export const updateTagList = /* GraphQL */ `
  mutation UpdateTagList(
    $input: UpdateTagListInput!
    $condition: ModelTagListConditionInput
  ) {
    updateTagList(input: $input, condition: $condition) {
      id
      static_tag_list
      week_tag_list
      createdAt
      updatedAt
    }
  }
`;
export const deleteTagList = /* GraphQL */ `
  mutation DeleteTagList(
    $input: DeleteTagListInput!
    $condition: ModelTagListConditionInput
  ) {
    deleteTagList(input: $input, condition: $condition) {
      id
      static_tag_list
      week_tag_list
      createdAt
      updatedAt
    }
  }
`;
export const createUserTag = /* GraphQL */ `
  mutation CreateUserTag(
    $input: CreateUserTagInput!
    $condition: ModelUserTagConditionInput
  ) {
    createUserTag(input: $input, condition: $condition) {
      id
      user_id_list
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateUserTag = /* GraphQL */ `
  mutation UpdateUserTag(
    $input: UpdateUserTagInput!
    $condition: ModelUserTagConditionInput
  ) {
    updateUserTag(input: $input, condition: $condition) {
      id
      user_id_list
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserTag = /* GraphQL */ `
  mutation DeleteUserTag(
    $input: DeleteUserTagInput!
    $condition: ModelUserTagConditionInput
  ) {
    deleteUserTag(input: $input, condition: $condition) {
      id
      user_id_list
      value
      createdAt
      updatedAt
    }
  }
`;
export const createStyleTag = /* GraphQL */ `
  mutation CreateStyleTag(
    $input: CreateStyleTagInput!
    $condition: ModelStyleTagConditionInput
  ) {
    createStyleTag(input: $input, condition: $condition) {
      id
      value
      num

      createdAt
      updatedAt
    }
  }
`;
export const updateStyleTag = /* GraphQL */ `
  mutation UpdateStyleTag(
    $input: UpdateStyleTagInput!
    $condition: ModelStyleTagConditionInput
  ) {
    updateStyleTag(input: $input, condition: $condition) {
      id
      value
      num

      createdAt
      updatedAt
    }
  }
`;
export const deleteStyleTag = /* GraphQL */ `
  mutation DeleteStyleTag(
    $input: DeleteStyleTagInput!
    $condition: ModelStyleTagConditionInput
  ) {
    deleteStyleTag(input: $input, condition: $condition) {
      id
      value
      num

      createdAt
      updatedAt
    }
  }
`;

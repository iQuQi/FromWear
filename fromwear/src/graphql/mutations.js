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
      award_today
      award_week
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createStyleTag = /* GraphQL */ `
  mutation CreateStyleTag(
    $input: CreateStyleTagInput!
    $condition: ModelStyleTagConditionInput
  ) {
    createStyleTag(input: $input, condition: $condition) {
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
export const updateStyleTag = /* GraphQL */ `
  mutation UpdateStyleTag(
    $input: UpdateStyleTagInput!
    $condition: ModelStyleTagConditionInput
  ) {
    updateStyleTag(input: $input, condition: $condition) {
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
export const deleteStyleTag = /* GraphQL */ `
  mutation DeleteStyleTag(
    $input: DeleteStyleTagInput!
    $condition: ModelStyleTagConditionInput
  ) {
    deleteStyleTag(input: $input, condition: $condition) {
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
export const createUserBookmarkPost = /* GraphQL */ `
  mutation CreateUserBookmarkPost(
    $input: CreateUserBookmarkPostInput!
    $condition: ModelUserBookmarkPostConditionInput
  ) {
    createUserBookmarkPost(input: $input, condition: $condition) {
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
export const updateUserBookmarkPost = /* GraphQL */ `
  mutation UpdateUserBookmarkPost(
    $input: UpdateUserBookmarkPostInput!
    $condition: ModelUserBookmarkPostConditionInput
  ) {
    updateUserBookmarkPost(input: $input, condition: $condition) {
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
export const deleteUserBookmarkPost = /* GraphQL */ `
  mutation DeleteUserBookmarkPost(
    $input: DeleteUserBookmarkPostInput!
    $condition: ModelUserBookmarkPostConditionInput
  ) {
    deleteUserBookmarkPost(input: $input, condition: $condition) {
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
export const createFollowingFollower = /* GraphQL */ `
  mutation CreateFollowingFollower(
    $input: CreateFollowingFollowerInput!
    $condition: ModelFollowingFollowerConditionInput
  ) {
    createFollowingFollower(input: $input, condition: $condition) {
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
export const updateFollowingFollower = /* GraphQL */ `
  mutation UpdateFollowingFollower(
    $input: UpdateFollowingFollowerInput!
    $condition: ModelFollowingFollowerConditionInput
  ) {
    updateFollowingFollower(input: $input, condition: $condition) {
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
export const deleteFollowingFollower = /* GraphQL */ `
  mutation DeleteFollowingFollower(
    $input: DeleteFollowingFollowerInput!
    $condition: ModelFollowingFollowerConditionInput
  ) {
    deleteFollowingFollower(input: $input, condition: $condition) {
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
export const createUserStyleTag = /* GraphQL */ `
  mutation CreateUserStyleTag(
    $input: CreateUserStyleTagInput!
    $condition: ModelUserStyleTagConditionInput
  ) {
    createUserStyleTag(input: $input, condition: $condition) {
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
export const updateUserStyleTag = /* GraphQL */ `
  mutation UpdateUserStyleTag(
    $input: UpdateUserStyleTagInput!
    $condition: ModelUserStyleTagConditionInput
  ) {
    updateUserStyleTag(input: $input, condition: $condition) {
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
export const deleteUserStyleTag = /* GraphQL */ `
  mutation DeleteUserStyleTag(
    $input: DeleteUserStyleTagInput!
    $condition: ModelUserStyleTagConditionInput
  ) {
    deleteUserStyleTag(input: $input, condition: $condition) {
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
export const createCommentLikeUser = /* GraphQL */ `
  mutation CreateCommentLikeUser(
    $input: CreateCommentLikeUserInput!
    $condition: ModelCommentLikeUserConditionInput
  ) {
    createCommentLikeUser(input: $input, condition: $condition) {
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
export const updateCommentLikeUser = /* GraphQL */ `
  mutation UpdateCommentLikeUser(
    $input: UpdateCommentLikeUserInput!
    $condition: ModelCommentLikeUserConditionInput
  ) {
    updateCommentLikeUser(input: $input, condition: $condition) {
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
export const deleteCommentLikeUser = /* GraphQL */ `
  mutation DeleteCommentLikeUser(
    $input: DeleteCommentLikeUserInput!
    $condition: ModelCommentLikeUserConditionInput
  ) {
    deleteCommentLikeUser(input: $input, condition: $condition) {
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
export const createPostLikeUrgentUser = /* GraphQL */ `
  mutation CreatePostLikeUrgentUser(
    $input: CreatePostLikeUrgentUserInput!
    $condition: ModelPostLikeUrgentUserConditionInput
  ) {
    createPostLikeUrgentUser(input: $input, condition: $condition) {
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
export const updatePostLikeUrgentUser = /* GraphQL */ `
  mutation UpdatePostLikeUrgentUser(
    $input: UpdatePostLikeUrgentUserInput!
    $condition: ModelPostLikeUrgentUserConditionInput
  ) {
    updatePostLikeUrgentUser(input: $input, condition: $condition) {
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
export const deletePostLikeUrgentUser = /* GraphQL */ `
  mutation DeletePostLikeUrgentUser(
    $input: DeletePostLikeUrgentUserInput!
    $condition: ModelPostLikeUrgentUserConditionInput
  ) {
    deletePostLikeUrgentUser(input: $input, condition: $condition) {
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
export const createPostStyleTag = /* GraphQL */ `
  mutation CreatePostStyleTag(
    $input: CreatePostStyleTagInput!
    $condition: ModelPostStyleTagConditionInput
  ) {
    createPostStyleTag(input: $input, condition: $condition) {
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
export const updatePostStyleTag = /* GraphQL */ `
  mutation UpdatePostStyleTag(
    $input: UpdatePostStyleTagInput!
    $condition: ModelPostStyleTagConditionInput
  ) {
    updatePostStyleTag(input: $input, condition: $condition) {
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
export const deletePostStyleTag = /* GraphQL */ `
  mutation DeletePostStyleTag(
    $input: DeletePostStyleTagInput!
    $condition: ModelPostStyleTagConditionInput
  ) {
    deletePostStyleTag(input: $input, condition: $condition) {
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

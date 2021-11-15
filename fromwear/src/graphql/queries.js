/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          startedAt
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
          startedAt
        }
        my_tag_list
        award_today
        award_week
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          date
          board_type
          click_num
          blind
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      my_tag_list
      award_today
      award_week
      _version
      _deleted
      _lastChangedAt
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
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
          startedAt
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
          startedAt
        }
        my_tag_list
        award_today
        award_week
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFollows = /* GraphQL */ `
  query SyncFollows(
    $filter: ModelfollowFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFollows(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        following_id
        follower_id
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getFollow = /* GraphQL */ `
  query GetFollow($id: ID!) {
    getFollow(id: $id) {
      id
      following_id
      follower_id
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listFollows = /* GraphQL */ `
  query ListFollows(
    $filter: ModelfollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        following_id
        follower_id
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          my_bookmark_post_list
          my_tag_list
          award_today
          award_week
          _version
          _deleted
          _lastChangedAt
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
          img
          content
          user_id
          bookmark_user_list
          like_user_list
          tag_list
          date
          board_type
          click_num
          blind
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
        passwd
        profile_img
        introduce
        gender
        adopted
        follower_num
        following_num
        my_post_list {
          nextToken
          startedAt
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
          startedAt
        }
        my_tag_list
        award_today
        award_week
        _version
        _deleted
        _lastChangedAt
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
          startedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bookmark_user_list
        like_user_list
        tag_list
        date
        board_type
        click_num
        blind
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
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
          img
          content
          user_id
          bookmark_user_list
          like_user_list
          tag_list
          date
          board_type
          click_num
          blind
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        like_user_num
        urgent_user_num
        comment_list {
          nextToken
          startedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bookmark_user_list
        like_user_list
        tag_list
        date
        board_type
        click_num
        blind
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
          startedAt
        }
        my_bookmark_post_list
        my_comment_list {
          nextToken
          startedAt
        }
        my_tag_list
        award_today
        award_week
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      bookmark_user_list
      like_user_list
      tag_list
      date
      board_type
      click_num
      blind
      _version
      _deleted
      _lastChangedAt
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
        like_user_num
        urgent_user_num
        comment_list {
          nextToken
          startedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bookmark_user_list
        like_user_list
        tag_list
        date
        board_type
        click_num
        blind
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPostBoards = /* GraphQL */ `
  query SyncPostBoards(
    $filter: ModelPostBoardFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPostBoards(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        board_type
        best_post_list
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPostBoard = /* GraphQL */ `
  query GetPostBoard($id: ID!) {
    getPostBoard(id: $id) {
      id
      board_type
      best_post_list
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listPostBoards = /* GraphQL */ `
  query ListPostBoards(
    $filter: ModelPostBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        board_type
        best_post_list
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTagLists = /* GraphQL */ `
  query SyncTagLists(
    $filter: ModelTagListFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTagLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        static_tag_list
        week_tag_list
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTagList = /* GraphQL */ `
  query GetTagList($id: ID!) {
    getTagList(id: $id) {
      id
      static_tag_list
      week_tag_list
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listTagLists = /* GraphQL */ `
  query ListTagLists(
    $filter: ModelTagListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        static_tag_list
        week_tag_list
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserTags = /* GraphQL */ `
  query SyncUserTags(
    $filter: ModelUserTagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        user_id_list
        value
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserTag = /* GraphQL */ `
  query GetUserTag($id: ID!) {
    getUserTag(id: $id) {
      id
      user_id_list
      value
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listUserTags = /* GraphQL */ `
  query ListUserTags(
    $filter: ModelUserTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id_list
        value
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStyleTags = /* GraphQL */ `
  query SyncStyleTags(
    $filter: ModelStyleTagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStyleTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        value
        num
        today_date
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getStyleTag = /* GraphQL */ `
  query GetStyleTag($id: ID!) {
    getStyleTag(id: $id) {
      id
      value
      num
      today_date
      _version
      _deleted
      _lastChangedAt
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
        today_date
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;

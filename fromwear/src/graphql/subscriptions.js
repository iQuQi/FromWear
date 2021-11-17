/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFollow = /* GraphQL */ `
  subscription OnCreateFollow {
    onCreateFollow {
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
export const onUpdateFollow = /* GraphQL */ `
  subscription OnUpdateFollow {
    onUpdateFollow {
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
export const onDeleteFollow = /* GraphQL */ `
  subscription OnDeleteFollow {
    onDeleteFollow {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreatePostBoard = /* GraphQL */ `
  subscription OnCreatePostBoard {
    onCreatePostBoard {
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
export const onUpdatePostBoard = /* GraphQL */ `
  subscription OnUpdatePostBoard {
    onUpdatePostBoard {
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
export const onDeletePostBoard = /* GraphQL */ `
  subscription OnDeletePostBoard {
    onDeletePostBoard {
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
export const onCreateTagList = /* GraphQL */ `
  subscription OnCreateTagList {
    onCreateTagList {
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
export const onUpdateTagList = /* GraphQL */ `
  subscription OnUpdateTagList {
    onUpdateTagList {
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
export const onDeleteTagList = /* GraphQL */ `
  subscription OnDeleteTagList {
    onDeleteTagList {
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
export const onCreateUserTag = /* GraphQL */ `
  subscription OnCreateUserTag {
    onCreateUserTag {
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
export const onUpdateUserTag = /* GraphQL */ `
  subscription OnUpdateUserTag {
    onUpdateUserTag {
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
export const onDeleteUserTag = /* GraphQL */ `
  subscription OnDeleteUserTag {
    onDeleteUserTag {
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
export const onCreateStyleTag = /* GraphQL */ `
  subscription OnCreateStyleTag {
    onCreateStyleTag {
      id
      value
      num
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;

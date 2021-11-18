import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type followMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostBoardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TagListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserTagMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type StyleTagMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly passwd: string;
  readonly profile_img: string;
  readonly introduce?: string;
  readonly gender: string;
  readonly adopted: number;
  readonly follower_num: number;
  readonly following_num: number;
  readonly my_post_list?: (Post | null)[];
  readonly my_bookmark_post_list?: (string | null)[];
  readonly my_comment_list?: (Comment | null)[];
  readonly my_tag_list?: (string | null)[];
  readonly award_today: number;
  readonly award_week: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly like_user_num: number;
  readonly urgent_user_num: number;
  readonly comment_list?: (Comment | null)[];
  readonly img: string;
  readonly content: string;
  readonly user?: User;
  readonly bookmark_user_list?: (string | null)[];
  readonly like_user_list?: (string | null)[];
  readonly tag_list?: string[];
  readonly date: string;
  readonly board_type: number;
  readonly click_num: number;
  readonly blind?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly user?: User;
  readonly content: string;
  readonly adopted: boolean;
  readonly like: number;
  readonly like_user_list?: (string | null)[];
  readonly post?: Post;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class follow {
  readonly id: string;
  readonly following_id: string;
  readonly follower_id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<follow, followMetaData>);
  static copyOf(source: follow, mutator: (draft: MutableModel<follow, followMetaData>) => MutableModel<follow, followMetaData> | void): follow;
}

export declare class PostBoard {
  readonly id: string;
  readonly board_type: number;
  readonly best_post_list?: string[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PostBoard, PostBoardMetaData>);
  static copyOf(source: PostBoard, mutator: (draft: MutableModel<PostBoard, PostBoardMetaData>) => MutableModel<PostBoard, PostBoardMetaData> | void): PostBoard;
}

export declare class TagList {
  readonly id: string;
  readonly static_tag_list?: (string | null)[];
  readonly week_tag_list?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TagList, TagListMetaData>);
  static copyOf(source: TagList, mutator: (draft: MutableModel<TagList, TagListMetaData>) => MutableModel<TagList, TagListMetaData> | void): TagList;
}

export declare class UserTag {
  readonly id: string;
  readonly user_id_list?: (string | null)[];
  readonly value: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserTag, UserTagMetaData>);
  static copyOf(source: UserTag, mutator: (draft: MutableModel<UserTag, UserTagMetaData>) => MutableModel<UserTag, UserTagMetaData> | void): UserTag;
}

export declare class StyleTag {
  readonly id: string;
  readonly value: string;
  readonly num: number;
  readonly today_date: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<StyleTag, StyleTagMetaData>);
  static copyOf(source: StyleTag, mutator: (draft: MutableModel<StyleTag, StyleTagMetaData>) => MutableModel<StyleTag, StyleTagMetaData> | void): StyleTag;
}
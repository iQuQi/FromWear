import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
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
  readonly tag_list?: string[];
  readonly date: string;
  readonly board_type: number;
  readonly click_num: number;
  readonly blind?: boolean;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly user?: User;
  readonly content: string;
  readonly adopted: boolean;
  readonly like: number;
  readonly post?: Post;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

export declare class follow {
  readonly id: string;
  readonly following_id: string;
  readonly follower_id: string;
  constructor(init: ModelInit<follow>);
  static copyOf(source: follow, mutator: (draft: MutableModel<follow>) => MutableModel<follow> | void): follow;
}

export declare class PostBoard {
  readonly id: string;
  readonly board_type: number;
  readonly best_post_list?: string[];
  constructor(init: ModelInit<PostBoard>);
  static copyOf(source: PostBoard, mutator: (draft: MutableModel<PostBoard>) => MutableModel<PostBoard> | void): PostBoard;
}

export declare class TagList {
  readonly id: string;
  readonly static_tag_list?: (string | null)[];
  readonly week_tag_list?: (string | null)[];
  constructor(init: ModelInit<TagList>);
  static copyOf(source: TagList, mutator: (draft: MutableModel<TagList>) => MutableModel<TagList> | void): TagList;
}

export declare class UserTag {
  readonly id: string;
  readonly user_id_list?: (string | null)[];
  readonly value: string;
  constructor(init: ModelInit<UserTag>);
  static copyOf(source: UserTag, mutator: (draft: MutableModel<UserTag>) => MutableModel<UserTag> | void): UserTag;
}

export declare class StyleTag {
  readonly id: string;
  readonly value: string;
  readonly num: number;
  readonly today_date: string;
  constructor(init: ModelInit<StyleTag>);
  static copyOf(source: StyleTag, mutator: (draft: MutableModel<StyleTag>) => MutableModel<StyleTag> | void): StyleTag;
}
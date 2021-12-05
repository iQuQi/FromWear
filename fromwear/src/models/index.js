// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Post, Comment, follow, PostBoard, TagList, UserTag, StyleTag, AppInfo } = initSchema(schema);

export {
  User,
  Post,
  Comment,
  follow,
  PostBoard,
  TagList,
  UserTag,
  StyleTag,
  AppInfo
};
import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: {
      type: UUIDType
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    authorId: {
      type: UUIDType
    },
  }
});

export const CreatePostType = new GraphQLInputObjectType({
  name: 'CreatePostType',
  fields: {
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    authorId: {
      type: UUIDType
    },
  },
});

export const UpdatePostType = new GraphQLInputObjectType({
  name: 'UpdatePostType',
  fields: {
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
  },
});

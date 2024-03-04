import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { Static } from "@sinclair/typebox";
import { createPostSchema } from "../../posts/schemas.js";

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
  name: 'CreatePostInput',
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

// export const ChangePostType = new GraphQLInputObjectType({
//   name: 'ChangePostInput',
//   fields: {
//     title: {
//       type: GraphQLString
//     },
//     content: {
//       type: GraphQLString
//     },
//   },
// });

export const ChangePostType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
     title: { 
        type: GraphQLString,
      },
      content: { 
        type: GraphQLString,
      },
  }),
});

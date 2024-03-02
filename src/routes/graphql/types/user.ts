import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: { 
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    profile: {
      type: ProfileType,
      resolve: async (user, _args, context) => {
        return context.profile.findUnique({
          where: {
            userId: user.id,
          },
        });
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user, _args, context) => {
        return context.post.findMany({
          where: {
            authorId: user.id,
          },
        });
      }
    }
  }
});
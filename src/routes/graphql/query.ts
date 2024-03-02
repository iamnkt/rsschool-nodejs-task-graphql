import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberType, MemberTypeIdType } from "./types/memberType.js";
import { PostType } from "./types/post.js";
import { UUIDType } from "./types/uuid.js";
import { UserType } from "./types/user.js";
import { ProfileType } from "./types/profile.js";

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_, _args, context) => {
        return context.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdType),
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, _args, context) => {
        return context.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.post.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, _args, context) => {
        return context.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, _args, context) => {
        return context.profile.findMany();
      },
    },
    profile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
  }
});
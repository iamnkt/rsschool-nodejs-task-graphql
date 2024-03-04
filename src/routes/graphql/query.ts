import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
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
        return context.prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: {
          type: MemberTypeIdType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, _args, context) => {
        return context.prisma.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, _args, context) => {
        return context.prisma.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, _args, context) => {
        return context.prisma.profile.findMany();
      },
    },
    profile: {
      type: ProfileType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
  }
});
